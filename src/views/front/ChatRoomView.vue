<template>
  <div class="chat-room-page container">
    <div class="chat-container">
      <!-- 头部 -->
      <div class="chat-header">
        <h2>GVB博客在线聊天室</h2>
        <p>在线人数: {{ onlineCount }}</p>
      </div>

      <!-- 消息列表 -->
      <div class="chat-messages" ref="msgListRef">
        <div v-if="historyLoading" style="text-align:center;padding:20px;color:#999;">加载历史消息中...</div>
        <div v-for="(msg, idx) in messages" :key="idx" class="msg-row" :class="{ 'is-me': isMe(msg), 'is-system': msg.msg_type >= 3 }">
          <template v-if="msg.msg_type === 3">
            <div class="system-msg">{{ msg.content }}</div>
          </template>
          <template v-else>
            <div class="msg-avatar" :style="{ background: getAvatarColor(msg.nick_name || '匿') }">
              {{ (msg.nick_name || '匿').charAt(0) }}
            </div>
            <div class="msg-content">
              <div class="msg-top">
                <span class="msg-name">{{ msg.nick_name || '匿名访客' }}</span>
                <span class="msg-time">{{ formatTime(msg.date || msg.created_at) }}</span>
              </div>
              <div class="msg-bubble">{{ msg.content }}</div>
            </div>
          </template>
        </div>
        <el-empty v-if="!historyLoading && !messages.length" description="暂无消息，快来聊天吧~" :image-size="60" />
      </div>

      <!-- 输入区 -->
      <div class="chat-input-area">
        <el-input
          v-model="inputMsg"
          type="textarea"
          :rows="3"
          resize="none"
          placeholder="聊天内容..."
          @keydown.enter.prevent.exact="handleSend"
        />
        <div class="input-footer">
          <span class="tips" v-if="myNickName">你的昵称: <strong>{{ myNickName }}</strong></span>
          <span class="tips" v-else>点击"进入聊天室"开始聊天</span>
          <div class="btn-group">
            <el-button v-if="!wsConnected" type="primary" @click="enterChatRoom">进入聊天室</el-button>
            <el-button v-else type="primary" @click="handleSend">发送</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useUserStore } from '@/stores/user'
import { apiGetChatList } from '@/api/chat'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const messages = ref([])
const inputMsg = ref('')
const msgListRef = ref(null)
const historyLoading = ref(false)
const onlineCount = ref(0)
const myNickName = ref('')
const wsConnected = ref(false)
const sentSet = new Set() // Track what we sent
let ws = null
let reconnectTimer = null

const avatarColors = ['#f56565','#ed8936','#ecc94b','#48bb78','#38b2ac','#4299e1','#667eea','#9f7aea','#ed64a6','#718096']
function getAvatarColor(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

function formatTime(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')} ${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}:${String(d.getSeconds()).padStart(2,'0')}`
}

async function loadHistory() {
  historyLoading.value = true
  try {
    const res = await apiGetChatList({ limit: 50 })
    const list = Array.isArray(res.data) ? res.data : (res.data?.list || [])
    // Filter out 4 and 5 from history
    messages.value = list.filter(m => m.msg_type != 4 && m.msg_type != 5).reverse()
    scrollToBottom(true)
  } catch (e) { console.error(e) }
  finally { historyLoading.value = false }
}

function enterChatRoom() {
  initWebSocket()
}

function initWebSocket() {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
  const wsUrl = `${protocol}//${window.location.host}/api/chat_groups_records`
  ws = new WebSocket(wsUrl)

  ws.onopen = () => {
    wsConnected.value = true
    if (reconnectTimer) { clearInterval(reconnectTimer); reconnectTimer = null }
    ws.send(JSON.stringify({ content: '', msg_type: 4 }))
  }

  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      if (data.online_count !== undefined) onlineCount.value = data.online_count

        // If it's entering/leaving or explicitly type 4/5, ignore entirely
        if (data.msg_type == 4 || data.msg_type == 5 || (!data.msg_type && (data.content.includes('进入聊天室') || data.content.includes('离开聊天室')))) {
          return
        }

        // Detect if this message is exactly what we just sent
        if (data.msg_type === 1 && sentSet.has(data.content)) {
          if (!myNickName.value && data.nick_name) {
            myNickName.value = data.nick_name
          }
          data._isMe = true
          sentSet.delete(data.content)
        } else if (data.nick_name && data.nick_name === myNickName.value) {
          data._isMe = true
        }

        messages.value.push(data)
        scrollToBottom()
    } catch (e) { console.error(e) }
  }

  ws.onerror = () => { wsConnected.value = false }
  ws.onclose = () => {
    wsConnected.value = false
    if (!reconnectTimer) {
      reconnectTimer = setInterval(() => initWebSocket(), 5000)
    }
  }
}

function handleSend() {
  if (!inputMsg.value.trim()) return
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    ElMessage.warning('请先进入聊天室')
    return
  }
  sentSet.add(inputMsg.value)
  ws.send(JSON.stringify({ content: inputMsg.value, msg_type: 1 }))
  inputMsg.value = ''
}

function isMe(msg) {
  // System messages are never "me"
  if (msg.msg_type >= 3) return false
  if (msg._isMe) return true
  // Match by assigned nick_name
  if (myNickName.value && msg.nick_name === myNickName.value) return true
  // Match by logged-in user_id
  if (userStore.isLoggedIn && msg.user_id && msg.user_id === userStore.userInfo?.id) return true
  return false
}

function scrollToBottom(force = false) {
  nextTick(() => {
    if (!msgListRef.value) return
    const el = msgListRef.value
    if (force || el.scrollHeight - el.scrollTop - el.clientHeight < 100) {
      el.scrollTop = el.scrollHeight
    }
  })
}

onMounted(() => loadHistory())
onUnmounted(() => {
  if (reconnectTimer) clearInterval(reconnectTimer)
  if (ws) { ws.onclose = null; ws.close() }
})
</script>

<style scoped>
.chat-room-page { padding: 20px 0; min-height: calc(100vh - 80px); }
.chat-container {
  max-width: 900px; margin: 0 auto; background: var(--bg-card, #fff);
  border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); overflow: hidden;
  display: flex; flex-direction: column; height: calc(100vh - 120px);
}

.chat-header { padding: 20px 30px; text-align: center; border-bottom: 1px solid var(--border-color, #eee); }
.chat-header h2 { margin: 0 0 4px; font-size: 18px; font-weight: 700; color: var(--text-primary); }
.chat-header p { margin: 0; font-size: 13px; color: var(--text-muted, #999); }

.chat-messages {
  flex: 1; overflow-y: auto; padding: 20px 30px; background: #f8f9fa; scroll-behavior: smooth;
}

/* System messages */
.system-msg {
  text-align: center; font-size: 12px; color: #999; padding: 8px 16px;
  background: rgba(0,0,0,0.04); border-radius: 20px; display: inline-block;
  margin: 4px auto; width: auto;
}
.msg-row.is-system { display: flex; justify-content: center; margin-bottom: 12px; }

/* Normal messages */
.msg-row { display: flex; gap: 12px; margin-bottom: 28px; align-items: flex-start; }
.msg-row.is-me { flex-direction: row-reverse; }

.msg-avatar {
  width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center;
  justify-content: center; font-size: 16px; font-weight: 700; color: #fff; flex-shrink: 0;
}

.msg-content { max-width: 70%; }
.msg-top { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
.msg-row.is-me .msg-top { flex-direction: row-reverse; }

.msg-name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.msg-time { font-size: 11px; color: #bbb; }

.msg-bubble {
  background: #e8e8e8; padding: 10px 16px; border-radius: 10px; font-size: 14px;
  line-height: 1.5; color: var(--text-primary); word-break: break-word; display: inline-block;
}
.msg-row.is-me .msg-bubble { background: var(--primary-color, #409eff); color: #fff; }

/* Input area */
.chat-input-area { padding: 16px 30px; border-top: 1px solid var(--border-color, #eee); background: var(--bg-card, #fff); }
.input-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
.tips { font-size: 12px; color: var(--text-muted, #999); }
</style>
