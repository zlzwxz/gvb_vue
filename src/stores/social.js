// `src/stores/social.js` 是当前项目里最复杂的前端 store 之一。
// 它把“好友系统 + WebSocket 实时消息 + WebRTC 语音通话”三条链路揉在了一起。
//
// 你可以把它拆成 4 个子职责理解：
// 1. 社交概览数据：好友数、在线数、黑名单数、我的在线状态；
// 2. 实时连接：维护 WebSocket 连接，接收后端主动推送的消息；
// 3. 页面同步：消息、群组、好友状态变化后，通知页面刷新；
// 4. 音视频信令：通过 WebSocket 交换 offer/answer/candidate，建立 WebRTC 语音通话。
import { computed, ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus'
import {
  apiGetSocialBlocks,
  apiGetSocialFriends,
  apiGetSocialSummary,
  apiUpdateSocialPresence
} from '@/api/social'
import { useUserStore } from '@/stores/user'

// WebRTC 在点对点建立连接时，通常需要一个 STUN 服务器帮助双方探测公网地址。
// 这里用了一个公开 STUN 服务，足够当前项目使用。
const STUN_SERVERS = [{ urls: 'stun:stun.l.google.com:19302' }]

export const useSocialStore = defineStore('social', () => {
  const userStore = useUserStore()

  // `summary` 保存“社交模块总览信息”，常用于私信页头部、好友浮层、角标统计。
  const summary = ref({
    presence: {
      mode: 'offline',
      status_text: '',
      is_invisible: false,
      is_online: false,
      last_active_at: null
    },
    friend_count: 0,
    online_friend_count: 0,
    block_count: 0
  })
  // `friends` 保存好友列表原始数据。
  const friends = ref([])
  // `blocks` 保存黑名单列表。
  const blocks = ref([])
  // `socketConnected` 代表浏览器底层 WebSocket 是否连上。
  const socketConnected = ref(false)
  // `socketReady` 代表后端应用层是否完成初始化握手。
  const socketReady = ref(false)
  // `messageVersion` 是一个轻量“刷新信号量”，页面可通过 watch 它来刷新消息相关数据。
  const messageVersion = ref(0)
  // `started` 用来避免重复启动社交模块。
  const started = ref(false)

  // 下面四个状态用于语音通话。
  const incomingCall = ref(null)
  const activeCall = ref(null)
  // 使用 shallowRef 保存浏览器原生对象，避免 Vue 对它们做深层代理。
  const remoteStream = shallowRef(null)
  const localStream = shallowRef(null)

  const socketRef = shallowRef(null)
  const peerConnection = shallowRef(null)
  let reconnectTimer = null

  // 常用派生状态：在线好友，以及 user_id -> 好友对象 的快速映射。
  const onlineFriends = computed(() => friends.value.filter(item => item.is_online))
  const friendMap = computed(() => {
    const map = new Map()
    friends.value.forEach(item => {
      map.set(Number(item.user_id), item)
    })
    return map
  })

  async function refreshSummary() {
    if (!userStore.isLoggedIn) return
    try {
      const res = await apiGetSocialSummary()
      summary.value = {
        ...summary.value,
        ...(res.data || {})
      }
    } catch {
      // ignore
    }
  }

  async function refreshFriends(params = {}) {
    if (!userStore.isLoggedIn) return
    try {
      const res = await apiGetSocialFriends(params)
      friends.value = Array.isArray(res.data) ? res.data : []
      summary.value.friend_count = friends.value.length
      summary.value.online_friend_count = friends.value.filter(item => item.is_online).length
    } catch {
      friends.value = []
    }
  }

  async function refreshBlocks() {
    if (!userStore.isLoggedIn) return
    try {
      const res = await apiGetSocialBlocks()
      blocks.value = Array.isArray(res.data) ? res.data : []
      summary.value.block_count = blocks.value.length
    } catch {
      blocks.value = []
    }
  }

  // 一次并发刷新社交模块的三块基础数据。
  async function refreshSocialData() {
    if (!userStore.isLoggedIn) return
    await Promise.all([refreshSummary(), refreshFriends(), refreshBlocks()])
  }

  // 统一构造 WebSocket 地址。
  // 当前页面是什么协议，就跟着使用 `ws` 或 `wss`。
  function buildSocketUrl() {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    const token = localStorage.getItem('token') || ''
    return `${protocol}//${window.location.host}/api/social/ws?token=${encodeURIComponent(token)}`
  }

  // 统一发送 socket 消息，成功发出返回 true，否则返回 false。
  function sendSocket(action, data = {}) {
    const ws = socketRef.value
    if (!ws || ws.readyState !== WebSocket.OPEN) return false
    ws.send(JSON.stringify({ action, ...data }))
    return true
  }

  // 局部修补单个好友的在线状态，而不是整表重刷。
  function patchPresence(payload = {}) {
    const userId = Number(payload.user_id)
    if (!userId) return
    friends.value = friends.value.map(item => {
      if (Number(item.user_id) !== userId) return item
      return {
        ...item,
        is_online: Boolean(payload.is_online),
        presence_mode: payload.presence_mode || item.presence_mode,
        presence_text: payload.presence_text ?? item.presence_text,
        is_invisible: Boolean(payload.is_invisible),
        last_active_at: payload.last_active_at ?? item.last_active_at
      }
    })
    summary.value.online_friend_count = friends.value.filter(item => item.is_online).length
  }

  // 只要这个数字变化了，说明“和消息相关的实时事件发生过一次”。
  function incrementMessageVersion() {
    messageVersion.value += 1
  }

  // WebSocket 事件总分发中心。
  // 这里把服务端推过来的各种 `event` 分发到不同处理分支。
  function handleSocketMessage(payload) {
    const event = payload?.event
    const data = payload?.data
    switch (event) {
      case 'socket_ready':
        socketReady.value = true
        break
      case 'self_presence':
        summary.value = {
          ...summary.value,
          presence: data || summary.value.presence
        }
        break
      case 'presence_change':
        patchPresence(data)
        break
      case 'friend_update':
      case 'group_created':
      case 'group_updated':
      case 'group_removed':
      case 'new_direct_message':
      case 'new_group_message':
      case 'message_recalled':
        incrementMessageVersion()
        void refreshSummary()
        void refreshFriends()
        if (event === 'group_created') {
          ElMessage.success('你被加入了一个新群组')
        }
        if (event === 'group_removed') {
          ElMessage.warning('你已被移出群组')
        }
        break
      case 'socket_error':
        if (data?.message) ElMessage.warning(data.message)
        break
      case 'call_invite':
        if (activeCall.value) {
          sendSocket('call_reject', {
            target_user_id: Number(data?.from_user_id),
            call_id: data?.call_id || '',
            payload: { reason: 'busy' }
          })
          return
        }
        incomingCall.value = {
          fromUserId: Number(data?.from_user_id) || 0,
          callId: data?.call_id || '',
          displayName: data?.payload?.nick_name || `用户${data?.from_user_id || ''}`,
          avatar: data?.payload?.avatar || ''
        }
        break
      case 'call_accept':
        void handleCallAccepted(data)
        break
      case 'call_reject':
        if (data?.payload?.reason === 'offline') ElMessage.info('对方当前不在线')
        else ElMessage.info('对方已拒绝语音通话')
        cleanupCall(false)
        break
      case 'call_end':
        ElMessage.info('语音通话已结束')
        cleanupCall(false)
        break
      case 'webrtc_offer':
        void handleWebRTCOffer(data)
        break
      case 'webrtc_answer':
        void handleWebRTCAnswer(data)
        break
      case 'webrtc_candidate':
        void handleWebRTCCandidate(data)
        break
      default:
        break
    }
  }

  // 建立 WebSocket 连接，并处理自动重连。
  function connectSocket() {
    if (!userStore.isLoggedIn) return
    const current = socketRef.value
    if (current && (current.readyState === WebSocket.OPEN || current.readyState === WebSocket.CONNECTING)) return
    const ws = new WebSocket(buildSocketUrl())
    socketRef.value = ws
    socketReady.value = false
    ws.onopen = () => {
      socketConnected.value = true
      if (reconnectTimer) {
        clearTimeout(reconnectTimer)
        reconnectTimer = null
      }
    }
    ws.onmessage = (event) => {
      try {
        handleSocketMessage(JSON.parse(event.data))
      } catch {
        // ignore
      }
    }
    ws.onerror = () => {
      socketConnected.value = false
    }
    ws.onclose = () => {
      socketConnected.value = false
      socketReady.value = false
      socketRef.value = null
      if (started.value && userStore.isLoggedIn && !reconnectTimer) {
        reconnectTimer = window.setTimeout(() => {
          reconnectTimer = null
          connectSocket()
        }, 4000)
      }
    }
  }

  // 对外暴露的“启动社交系统”入口。
  // 页面只需要关心“需要社交能力时调用 ensureStarted()”，不用自己管理 socket 生命周期。
  async function ensureStarted() {
    if (started.value || !userStore.isLoggedIn) return
    started.value = true
    await refreshSocialData()
    connectSocket()
  }

  // 主动停止 socket，并清理自动重连计时器。
  function stopSocket() {
    if (reconnectTimer) {
      clearTimeout(reconnectTimer)
      reconnectTimer = null
    }
    const ws = socketRef.value
    if (ws) {
      ws.onclose = null
      ws.close()
    }
    socketRef.value = null
    socketConnected.value = false
    socketReady.value = false
  }

  // 更新“我自己的在线状态”后，再刷新好友列表，保证列表显示同步。
  async function updatePresence(data) {
    const res = await apiUpdateSocialPresence(data)
    summary.value = {
      ...summary.value,
      presence: res.data || summary.value.presence
    }
    await refreshFriends()
    return res
  }

  // 获取本地麦克风音频流。浏览器权限弹窗也会在这里触发。
  async function createLocalAudioStream() {
    if (localStream.value) return localStream.value
    if (!navigator?.mediaDevices?.getUserMedia) {
      throw new Error('当前浏览器不支持语音通话')
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    localStream.value = stream
    return stream
  }

  // 创建 WebRTC 对等连接。
  // 真正的音频数据走这个连接，WebSocket 只负责传递协商信令。
  function createPeer(targetUserId, callId) {
    const connection = new RTCPeerConnection({ iceServers: STUN_SERVERS })
    const remote = new MediaStream()
    remoteStream.value = remote

    connection.onicecandidate = (event) => {
      if (!event.candidate) return
      sendSocket('webrtc_candidate', {
        target_user_id: targetUserId,
        call_id: callId,
        payload: { candidate: event.candidate }
      })
    }
    connection.ontrack = (event) => {
      event.streams?.[0]?.getTracks()?.forEach(track => {
        remote.addTrack(track)
      })
      if (activeCall.value) {
        activeCall.value = {
          ...activeCall.value,
          status: 'active',
          startedAt: activeCall.value.startedAt || Date.now()
        }
      }
    }
    peerConnection.value = connection
    return connection
  }

  // 对方接听后，主叫方开始创建 offer。
  async function handleCallAccepted(data) {
    const fromUserId = Number(data?.from_user_id || 0)
    const callId = data?.call_id || ''
    if (!activeCall.value || activeCall.value.callId !== callId || Number(activeCall.value.targetUserId) !== fromUserId) return
    const stream = await createLocalAudioStream()
    const connection = createPeer(fromUserId, callId)
    stream.getTracks().forEach(track => connection.addTrack(track, stream))
    const offer = await connection.createOffer()
    await connection.setLocalDescription(offer)
    activeCall.value = {
      ...activeCall.value,
      status: 'connecting'
    }
    sendSocket('webrtc_offer', {
      target_user_id: fromUserId,
      call_id: callId,
      payload: { sdp: offer }
    })
  }

  // 收到对方的 offer 后，本地需要设置远端描述并回一个 answer。
  async function handleWebRTCOffer(data) {
    const fromUserId = Number(data?.from_user_id || 0)
    const callId = data?.call_id || ''
    if (!activeCall.value || activeCall.value.callId !== callId || Number(activeCall.value.targetUserId) !== fromUserId) return
    const stream = await createLocalAudioStream()
    const connection = peerConnection.value || createPeer(fromUserId, callId)
    stream.getTracks().forEach(track => {
      const exists = connection.getSenders().some(sender => sender.track?.id === track.id)
      if (!exists) connection.addTrack(track, stream)
    })
    if (data?.payload?.sdp) {
      await connection.setRemoteDescription(new RTCSessionDescription(data.payload.sdp))
    }
    const answer = await connection.createAnswer()
    await connection.setLocalDescription(answer)
    activeCall.value = {
      ...activeCall.value,
      status: 'connecting'
    }
    sendSocket('webrtc_answer', {
      target_user_id: fromUserId,
      call_id: callId,
      payload: { sdp: answer }
    })
  }

  // 收到 answer 后，主叫方的协商流程完成。
  async function handleWebRTCAnswer(data) {
    const fromUserId = Number(data?.from_user_id || 0)
    const callId = data?.call_id || ''
    if (!activeCall.value || activeCall.value.callId !== callId || Number(activeCall.value.targetUserId) !== fromUserId) return
    if (!peerConnection.value || !data?.payload?.sdp) return
    await peerConnection.value.setRemoteDescription(new RTCSessionDescription(data.payload.sdp))
    activeCall.value = {
      ...activeCall.value,
      status: 'active',
      startedAt: activeCall.value.startedAt || Date.now()
    }
  }

  // 收到 ICE candidate 后，继续补充候选网络路径。
  async function handleWebRTCCandidate(data) {
    const fromUserId = Number(data?.from_user_id || 0)
    const callId = data?.call_id || ''
    if (!activeCall.value || activeCall.value.callId !== callId || Number(activeCall.value.targetUserId) !== fromUserId) return
    if (!peerConnection.value || !data?.payload?.candidate) return
    try {
      await peerConnection.value.addIceCandidate(new RTCIceCandidate(data.payload.candidate))
    } catch {
      // ignore
    }
  }

  // 主动发起语音通话。
  async function startAudioCall(targetUserId, meta = {}) {
    if (!socketConnected.value) {
      ElMessage.warning('语音服务连接中，请稍后重试')
      return
    }
    if (activeCall.value || incomingCall.value) {
      ElMessage.warning('当前已有通话处理中')
      return
    }
    const callId = `call_${Date.now()}_${targetUserId}`
    activeCall.value = {
      callId,
      targetUserId: Number(targetUserId),
      displayName: meta.nick_name || meta.displayName || `用户${targetUserId}`,
      avatar: meta.avatar || '',
      direction: 'outgoing',
      status: 'ringing',
      startedAt: null,
      muted: false
    }
    sendSocket('call_invite', {
      target_user_id: Number(targetUserId),
      call_id: callId,
      payload: {
        nick_name: activeCall.value.displayName,
        avatar: activeCall.value.avatar
      }
    })
  }

  // 接听来电。
  async function acceptIncomingCall() {
    if (!incomingCall.value) return
    const payload = incomingCall.value
    activeCall.value = {
      callId: payload.callId,
      targetUserId: payload.fromUserId,
      displayName: payload.displayName,
      avatar: payload.avatar,
      direction: 'incoming',
      status: 'connecting',
      startedAt: null,
      muted: false
    }
    incomingCall.value = null
    await createLocalAudioStream()
    createPeer(payload.fromUserId, payload.callId)
    sendSocket('call_accept', {
      target_user_id: payload.fromUserId,
      call_id: payload.callId
    })
  }

  // 拒绝来电。
  function rejectIncomingCall() {
    if (!incomingCall.value) return
    sendSocket('call_reject', {
      target_user_id: incomingCall.value.fromUserId,
      call_id: incomingCall.value.callId,
      payload: { reason: 'reject' }
    })
    incomingCall.value = null
  }

  // 释放浏览器音频流和 RTCPeerConnection。
  function cleanupMedia() {
    if (peerConnection.value) {
      peerConnection.value.close()
      peerConnection.value = null
    }
    if (localStream.value) {
      localStream.value.getTracks().forEach(track => track.stop())
      localStream.value = null
    }
    if (remoteStream.value) {
      remoteStream.value.getTracks().forEach(track => track.stop())
      remoteStream.value = null
    }
  }

  // 挂断当前通话。
  // `notify` 为 false 时表示“这是被动结束”，不需要再向对方发一次结束消息。
  function cleanupCall(notify = true) {
    const currentCall = activeCall.value
    if (notify && currentCall) {
      sendSocket('call_end', {
        target_user_id: currentCall.targetUserId,
        call_id: currentCall.callId
      })
    }
    cleanupMedia()
    activeCall.value = null
    incomingCall.value = null
  }

  // 本地静音只关闭自己麦克风轨道，不会直接断开整条通话。
  function toggleMute() {
    if (!localStream.value || !activeCall.value) return
    const nextMuted = !activeCall.value.muted
    localStream.value.getAudioTracks().forEach(track => {
      track.enabled = !nextMuted
    })
    activeCall.value = {
      ...activeCall.value,
      muted: nextMuted
    }
  }

  // 完整停止社交模块：断开 socket、结束通话、清空内存状态。
  function stop() {
    started.value = false
    stopSocket()
    cleanupCall(false)
    friends.value = []
    blocks.value = []
    summary.value = {
      presence: {
        mode: 'offline',
        status_text: '',
        is_invisible: false,
        is_online: false,
        last_active_at: null
      },
      friend_count: 0,
      online_friend_count: 0,
      block_count: 0
    }
  }

  return {
    summary,
    friends,
    blocks,
    onlineFriends,
    friendMap,
    socketConnected,
    socketReady,
    messageVersion,
    incomingCall,
    activeCall,
    remoteStream,
    localStream,
    ensureStarted,
    stop,
    refreshSummary,
    refreshFriends,
    refreshBlocks,
    refreshSocialData,
    updatePresence,
    startAudioCall,
    acceptIncomingCall,
    rejectIncomingCall,
    cleanupCall,
    toggleMute
  }
})
