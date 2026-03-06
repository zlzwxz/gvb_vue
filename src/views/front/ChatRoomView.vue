<template>
  <div class="chat-page">
    <section class="chat-shell">
      <header class="chat-header">
        <div class="header-title">
          <strong>公共聊天频道（在线：{{ onlineCount }}）</strong>
          <span v-if="myNickName">当前昵称：{{ myNickName }}</span>
        </div>
        <div class="header-actions">
          <el-button v-if="!wsConnected" type="primary" @click="enterChatRoom">进入聊天室</el-button>
          <el-button v-else @click="disconnect">断开连接</el-button>
          <el-button @click="loadHistory" :loading="historyLoading">刷新历史</el-button>
        </div>
      </header>

      <main ref="msgListRef" class="chat-messages">
        <div v-if="historyLoading" class="system-tip">正在加载历史消息...</div>
        <div
          v-for="(msg, idx) in messages"
          :key="`${msg.created_at || msg.date || ''}-${idx}`"
          class="msg-row"
          :class="{ 'is-me': isMe(msg), 'is-system': msg.msg_type >= 3 }"
        >
          <template v-if="msg.msg_type >= 3">
            <div class="system-tip">{{ msg.content }}</div>
          </template>
          <template v-else>
            <div class="msg-avatar" :style="{ background: getAvatarColor(msg.nick_name || '匿') }">
              {{ (msg.nick_name || '匿').charAt(0) }}
            </div>
            <div class="msg-content">
              <div class="msg-top">
                <strong>{{ msg.nick_name || '匿名访客' }}</strong>
                <span>{{ formatTime(msg.date || msg.created_at) }}</span>
              </div>
              <div v-if="msg.msg_type === 2" class="msg-bubble image">
                <el-image
                  :src="$resolveImg(msg.content)"
                  :preview-src-list="[$resolveImg(msg.content)]"
                  fit="cover"
                  class="chat-img"
                />
              </div>
              <div v-else class="msg-bubble">{{ msg.content }}</div>
            </div>
          </template>
        </div>
        <el-empty v-if="!historyLoading && !messages.length" description="暂无聊天内容" :image-size="70" />
      </main>

      <footer class="composer">
        <el-input
          v-model="inputMsg"
          type="textarea"
          :rows="3"
          resize="none"
          maxlength="1000"
          show-word-limit
          placeholder="输入聊天内容..."
          @keydown.enter.prevent.exact="handleSend"
        />
        <div class="composer-actions">
          <span v-if="wsConnected">连接稳定，消息实时同步</span>
          <span v-else>请先点击“进入聊天室”建立连接</span>
          <el-button type="primary" :disabled="!wsConnected" @click="handleSend">发送消息</el-button>
        </div>
      </footer>
    </section>
  </div>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { apiGetChatList } from '@/api/chat'

const userStore = useUserStore()
const messages = ref([])
const inputMsg = ref('')
const msgListRef = ref(null)
const historyLoading = ref(false)
const onlineCount = ref(0)
const myNickName = ref('')
const wsConnected = ref(false)
const sentSet = new Set()
let ws = null
let reconnectTimer = null

const avatarColors = ['#f56565', '#ed8936', '#ecc94b', '#48bb78', '#38b2ac', '#4299e1', '#667eea', '#9f7aea', '#ed64a6', '#718096']

function getAvatarColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

function formatTime(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  return `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`
}

async function loadHistory() {
  historyLoading.value = true
  try {
    const res = await apiGetChatList({ page: 1, size: 80, limit: 80 })
    const list = Array.isArray(res.data) ? res.data : (res.data?.list || [])
    messages.value = list.filter((item) => item.msg_type !== 0 && item.msg_type !== 5).reverse()
    scrollToBottom(true)
  } finally {
    historyLoading.value = false
  }
}

function enterChatRoom() {
  initWebSocket()
}

function initWebSocket() {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const wsUrl = `${protocol}//${window.location.host}/api/chat_groups_records`
  ws = new WebSocket(wsUrl)

  ws.onopen = () => {
    wsConnected.value = true
    if (reconnectTimer) {
      clearInterval(reconnectTimer)
      reconnectTimer = null
    }
    ws.send(JSON.stringify({ content: '', msg_type: 0 }))
  }

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      if (data.online_count !== undefined) onlineCount.value = data.online_count

      if (data.msg_type === 0 || data.msg_type === 5) return
      if (!data.msg_type && typeof data.content === 'string' && (data.content.includes('进入聊天室') || data.content.includes('离开聊天室'))) return

      if ((data.msg_type === 1 || data.msg_type === 2) && sentSet.has(data.content)) {
        data._isMe = true
        sentSet.delete(data.content)
        if (!myNickName.value && data.nick_name) myNickName.value = data.nick_name
      } else if (data.nick_name && data.nick_name === myNickName.value) {
        data._isMe = true
      }

      messages.value.push(data)
      scrollToBottom()
    } catch {
      // ignore invalid payload
    }
  }

  ws.onerror = () => {
    wsConnected.value = false
  }

  ws.onclose = () => {
    wsConnected.value = false
    if (!reconnectTimer) {
      reconnectTimer = setInterval(() => initWebSocket(), 5000)
    }
  }
}

function disconnect() {
  if (!ws) return
  ws.onclose = null
  ws.close()
  ws = null
  wsConnected.value = false
  if (reconnectTimer) {
    clearInterval(reconnectTimer)
    reconnectTimer = null
  }
}

function handleSend() {
  const content = inputMsg.value.trim()
  if (!content) return
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    ElMessage.warning('请先进入聊天室')
    return
  }
  sentSet.add(content)
  ws.send(JSON.stringify({ content, msg_type: 1 }))
  inputMsg.value = ''
}

function isMe(msg) {
  if (msg.msg_type >= 3) return false
  if (msg._isMe) return true
  if (myNickName.value && msg.nick_name === myNickName.value) return true
  return userStore.isLoggedIn && Number(msg.user_id) === Number(userStore.userInfo?.id)
}

function scrollToBottom(force = false) {
  nextTick(() => {
    if (!msgListRef.value) return
    const el = msgListRef.value
    if (force || el.scrollHeight - el.scrollTop - el.clientHeight < 120) {
      el.scrollTop = el.scrollHeight
    }
  })
}

onMounted(() => {
  loadHistory()
})

onUnmounted(() => {
  disconnect()
})
</script>

<style scoped>
.chat-page {
  height: calc(100vh - 190px);
  min-height: 520px;
}

.chat-shell {
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dbe7f2;
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100%;
  min-height: 0;
}

.chat-header {
  padding: 14px;
  border-bottom: 1px solid #e5edf6;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.header-title strong {
  display: block;
  color: #1b3e63;
}

.header-title span {
  display: block;
  margin-top: 4px;
  color: #6f849e;
  font-size: 12px;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.chat-messages {
  overflow-y: auto;
  padding: 16px;
  background: linear-gradient(180deg, #f7fbff 0%, #ffffff 100%);
}

.msg-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 14px;
}

.msg-row.is-me {
  flex-direction: row-reverse;
}

.msg-row.is-system {
  justify-content: center;
}

.system-tip {
  border-radius: 999px;
  background: #e8f2fb;
  color: #5f7894;
  padding: 6px 12px;
  font-size: 12px;
}

.msg-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #fff;
  font-weight: 700;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.msg-content {
  max-width: 70%;
}

.msg-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.msg-top strong {
  font-size: 13px;
  color: #1f466e;
}

.msg-top span {
  font-size: 11px;
  color: #7490aa;
}

.msg-bubble {
  background: #fff;
  border: 1px solid #dce8f4;
  border-radius: 12px;
  padding: 10px 12px;
  color: #1e4368;
  line-height: 1.7;
  word-break: break-word;
}

.msg-row.is-me .msg-bubble {
  background: #e9f6ff;
  border-color: #c2dfef;
}

.msg-bubble.image {
  padding: 0;
  border: none;
  background: transparent;
}

.chat-img {
  width: 180px;
  max-width: 100%;
  border-radius: 10px;
}

.composer {
  border-top: 1px solid #e5edf6;
  padding: 12px 14px 14px;
}

.composer-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  color: #6f849e;
  font-size: 12px;
}

@media (max-width: 768px) {
  .header-actions,
  .composer-actions {
    flex-wrap: wrap;
  }

  .msg-content {
    max-width: 84%;
  }

  .chat-page {
    height: auto;
    min-height: 500px;
  }

  .chat-shell {
    height: 70vh;
    min-height: 500px;
  }
}
</style>
