<template>
  <div class="message-page">
    <div class="message-shell">
      <aside class="conversation-panel">
        <div class="panel-header">
          <div>
            <p class="panel-kicker">Private Message</p>
            <h2>我的私信</h2>
          </div>
          <el-button type="primary" plain @click="refreshAll" :loading="conversationLoading">刷新</el-button>
        </div>

        <el-input
          v-model="keyword"
          clearable
          placeholder="搜索会话昵称"
          class="search-input"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>

        <div class="starter-box">
          <div class="starter-title">发起新会话</div>
          <el-select
            v-model="startUserId"
            filterable
            clearable
            placeholder="选择一个用户"
            style="width: 100%"
            @change="handleStartConversation"
          >
            <el-option
              v-for="user in availableUsers"
              :key="user.id"
              :label="user.nick_name || user.user_name || `用户${user.id}`"
              :value="user.id"
            />
          </el-select>
        </div>

        <div v-loading="conversationLoading" class="conversation-list">
          <div
            v-for="item in pagedConversations"
            :key="item.user_id"
            class="conversation-item"
            :class="{ 'is-active': item.user_id === selectedUserId }"
            @click="selectConversation(item.user_id)"
          >
            <el-badge :value="item.unread_count || 0" :hidden="!item.unread_count" class="conversation-badge">
              <el-avatar :src="item.avatar ? $resolveImg(item.avatar) : ''" :size="42">
                {{ avatarText(item.nick_name || item.user_name) }}
              </el-avatar>
            </el-badge>
            <div class="conversation-main">
              <div class="conversation-top">
                <strong>{{ item.nick_name || item.user_name || `用户${item.user_id}` }}</strong>
                <span>{{ formatTime(item.created_at, true) }}</span>
              </div>
              <div class="conversation-bottom">
                <p>{{ buildPreview(item) }}</p>
                <span>{{ item.message_count || 0 }} 条</span>
              </div>
            </div>
          </div>

          <el-empty v-if="!conversationLoading && !filteredConversations.length" description="还没有私信会话" :image-size="70" />
        </div>
        <el-pagination
          v-if="filteredConversations.length > 0"
          small
          background
          layout="prev, pager, next"
          :page-size="conversationPageSize"
          :total="filteredConversations.length"
          :current-page="conversationPage"
          @current-change="conversationPage = $event"
        />
      </aside>

      <section class="chat-panel">
        <template v-if="selectedConversation">
          <div class="chat-header">
            <div class="chat-user">
              <el-avatar :src="selectedConversation.avatar ? $resolveImg(selectedConversation.avatar) : ''" :size="48">
                {{ avatarText(selectedConversation.nick_name || selectedConversation.user_name) }}
              </el-avatar>
              <div>
                <h3>{{ selectedConversation.nick_name || selectedConversation.user_name || `用户${selectedConversation.user_id}` }}</h3>
                <p>
                  用户ID {{ selectedConversation.user_id }}
                  <span v-if="selectedConversation.unread_count"> · {{ selectedConversation.unread_count }} 条未读已清空</span>
                </p>
              </div>
            </div>
          </div>

          <div ref="messageListRef" class="message-list" v-loading="recordLoading">
            <div
              v-for="item in pagedRecords"
              :key="item.id"
              class="message-row"
              :class="{ 'is-me': Number(item.send_user_id) === currentUserId }"
            >
              <el-avatar
                :src="resolveRecordAvatar(item) ? $resolveImg(resolveRecordAvatar(item)) : ''"
                :size="40"
                class="bubble-avatar"
              >
                {{ avatarText(resolveRecordName(item)) }}
              </el-avatar>
              <div class="bubble-box">
                <div class="bubble-meta">
                  <strong>{{ resolveRecordName(item) }}</strong>
                  <span>{{ formatTime(item.created_at) }}</span>
                </div>
                <div class="bubble-content">{{ item.content }}</div>
              </div>
            </div>
            <el-empty v-if="!recordLoading && !records.length" description="暂无聊天记录，发第一条消息吧" :image-size="80" />
          </div>
          <el-pagination
            v-if="records.length > 0"
            small
            background
            layout="total, prev, pager, next"
            :page-size="recordPageSize"
            :total="records.length"
            :current-page="recordPage"
            @current-change="recordPage = $event"
            class="record-pager"
          />

          <div class="composer">
            <el-input
              v-model="draft"
              type="textarea"
              :rows="4"
              resize="none"
              maxlength="1000"
              show-word-limit
              placeholder="输入私信内容，Enter 发送，Shift+Enter 换行"
              @keydown.enter.prevent.exact="handleSend"
            />
            <div class="composer-footer">
              <span>当前对话：{{ selectedConversation.nick_name || selectedConversation.user_name || `用户${selectedConversation.user_id}` }}</span>
              <el-button type="primary" :loading="sending" @click="handleSend">发送私信</el-button>
            </div>
          </div>
        </template>

        <div v-else class="empty-panel">
          <el-empty description="从左侧选择会话，或先发起一个新会话" :image-size="100" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { apiCreateMessage, apiGetMessageList, apiGetMessageRecord } from '@/api/message'
import { apiGetUserList } from '@/api/user'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const keyword = ref('')
const startUserId = ref(undefined)
const selectedUserId = ref(0)
const draft = ref('')
const conversations = ref([])
const userOptions = ref([])
const records = ref([])
const conversationLoading = ref(false)
const recordLoading = ref(false)
const sending = ref(false)
const messageListRef = ref(null)
const conversationPage = ref(1)
const conversationPageSize = 8
const recordPage = ref(1)
const recordPageSize = 30

const currentUserId = computed(() => Number(userStore.currentUserId) || 0)
const filteredConversations = computed(() => {
  const text = keyword.value.trim().toLowerCase()
  if (!text) return conversations.value
  return conversations.value.filter(item => {
    const name = `${item.nick_name || ''}${item.user_name || ''}${item.user_id || ''}`.toLowerCase()
    return name.includes(text)
  })
})
const pagedConversations = computed(() => {
  const start = (conversationPage.value - 1) * conversationPageSize
  return filteredConversations.value.slice(start, start + conversationPageSize)
})
const availableUsers = computed(() => userOptions.value.filter(item => Number(item.id) !== currentUserId.value))
const selectedConversation = computed(() => {
  if (!selectedUserId.value) return null
  return conversations.value.find(item => Number(item.user_id) === Number(selectedUserId.value)) || buildUserConversation(selectedUserId.value)
})
const pagedRecords = computed(() => {
  const start = (recordPage.value - 1) * recordPageSize
  return records.value.slice(start, start + recordPageSize)
})

function avatarText(name) {
  return (name || '私').trim().charAt(0) || '私'
}

function formatTime(value, compact = false) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  if (compact) return `${m}-${d} ${hh}:${mm}`
  const ss = String(date.getSeconds()).padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

function buildPreview(item) {
  if (!item?.content) return '暂无消息'
  const prefix = Number(item.send_user_id) === currentUserId.value ? '我：' : ''
  return `${prefix}${item.content}`
}

function buildUserConversation(userId) {
  const user = userOptions.value.find(item => Number(item.id) === Number(userId))
  if (!user) return null
  return {
    user_id: user.id,
    nick_name: user.nick_name,
    user_name: user.user_name,
    avatar: user.avatar,
    content: '',
    created_at: '',
    unread_count: 0,
    message_count: 0,
    send_user_id: 0
  }
}

function resolveRecordName(item) {
  return Number(item.send_user_id) === currentUserId.value
    ? (item.send_user_nick_name || '我')
    : (item.send_user_nick_name || item.rev_user_nick_name || `用户${item.send_user_id}`)
}

function resolveRecordAvatar(item) {
  return Number(item.send_user_id) === currentUserId.value ? item.send_user_avatar : item.send_user_avatar || item.rev_user_avatar
}

async function loadUsers() {
  const res = await apiGetUserList({ limit: 0 })
  userOptions.value = res.data?.list || []
}

async function loadConversations(preferredUserId = 0) {
  conversationLoading.value = true
  try {
    const res = await apiGetMessageList()
    conversations.value = (res.data || []).map(item => ({
      ...item,
      user_id: Number(item.user_id)
    }))
    conversationPage.value = 1

    const routeUserId = Number(route.query.user_id) || 0
    const nextUserId = preferredUserId || routeUserId || selectedUserId.value
    if (nextUserId) {
      selectedUserId.value = nextUserId
    } else if (conversations.value.length > 0) {
      selectedUserId.value = Number(conversations.value[0].user_id)
    }
  } finally {
    conversationLoading.value = false
  }
}

async function loadRecords(userId = selectedUserId.value) {
  if (!userId) {
    records.value = []
    return
  }
  recordLoading.value = true
  try {
    const res = await apiGetMessageRecord({ user_id: userId })
    records.value = res.data || []
    recordPage.value = Math.max(1, Math.ceil(records.value.length / recordPageSize))
    await nextTick()
    scrollToBottom()
  } finally {
    recordLoading.value = false
  }
}

async function refreshAll() {
  try {
    await Promise.all([loadUsers(), loadConversations()])
    if (selectedUserId.value) {
      await loadRecords(selectedUserId.value)
    }
  } catch (e) {
    ElMessage.error('刷新私信数据失败')
  }
}

function scrollToBottom() {
  if (!messageListRef.value) return
  messageListRef.value.scrollTop = messageListRef.value.scrollHeight
}

function updateRoute(userId) {
  router.replace({
    name: 'PrivateMessages',
    query: userId ? { user_id: String(userId) } : {}
  })
}

async function selectConversation(userId) {
  selectedUserId.value = Number(userId) || 0
  updateRoute(selectedUserId.value)
  await loadRecords(selectedUserId.value)
  await loadConversations(selectedUserId.value)
}

async function handleStartConversation(userId) {
  if (!userId) return
  await selectConversation(userId)
}

async function handleSend() {
  const content = draft.value.trim()
  if (!selectedUserId.value) {
    ElMessage.warning('请先选择一个会话对象')
    return
  }
  if (!content) {
    ElMessage.warning('消息内容不能为空')
    return
  }

  sending.value = true
  try {
    await apiCreateMessage({
      rev_user_id: selectedUserId.value,
      content
    })
    draft.value = ''
    await Promise.all([
      loadConversations(selectedUserId.value),
      loadRecords(selectedUserId.value)
    ])
    ElMessage.success('发送成功')
  } catch (e) {
    ElMessage.error('发送私信失败')
  } finally {
    sending.value = false
  }
}

watch(() => route.query.user_id, async (value) => {
  const userId = Number(value) || 0
  if (!userId || userId === selectedUserId.value) return
  selectedUserId.value = userId
  await loadRecords(userId)
})

watch(keyword, () => {
  conversationPage.value = 1
})

onMounted(async () => {
  try {
    await Promise.all([loadUsers(), loadConversations()])
    if (selectedUserId.value) {
      await loadRecords(selectedUserId.value)
    }
  } catch (e) {
    ElMessage.error('初始化私信页面失败')
  }
})
</script>

<style scoped>
.message-page {
  min-height: calc(100vh - 120px);
  height: calc(100vh - 120px);
}

.message-shell {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 18px;
  min-height: calc(100vh - 150px);
  height: calc(100vh - 150px);
}

.conversation-panel,
.chat-panel {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(209, 213, 219, 0.55);
  border-radius: 24px;
  box-shadow: 0 18px 55px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(12px);
}

.conversation-panel {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
}

.panel-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.panel-kicker {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #1d4ed8;
}

.panel-header h2 {
  margin: 0;
  font-size: 26px;
  color: #0f172a;
}

.search-input {
  margin-top: 4px;
}

.starter-box {
  padding: 14px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(14, 165, 233, 0.14));
}

.starter-title {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 700;
  color: #1e3a8a;
}

.conversation-list {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-right: 4px;
}

.conversation-panel :deep(.el-pagination) {
  justify-content: center;
}

.conversation-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.conversation-item:hover {
  background: #f8fbff;
  border-color: rgba(59, 130, 246, 0.18);
  transform: translateY(-1px);
}

.conversation-item.is-active {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(14, 165, 233, 0.18));
  border-color: rgba(59, 130, 246, 0.25);
}

.conversation-badge {
  flex-shrink: 0;
}

.conversation-main {
  min-width: 0;
  flex: 1;
}

.conversation-top,
.conversation-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.conversation-top strong {
  color: #0f172a;
  font-size: 15px;
}

.conversation-top span,
.conversation-bottom span {
  flex-shrink: 0;
  font-size: 12px;
  color: #64748b;
}

.conversation-bottom {
  margin-top: 6px;
}

.conversation-bottom p {
  margin: 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #475569;
  font-size: 13px;
}

.chat-panel {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}

.chat-header {
  padding: 22px 26px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.9);
}

.chat-user {
  display: flex;
  align-items: center;
  gap: 14px;
}

.chat-user h3 {
  margin: 0 0 4px;
  color: #0f172a;
  font-size: 22px;
}

.chat-user p {
  margin: 0;
  color: #64748b;
  font-size: 13px;
}

.message-list {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 24px 26px;
  background:
    radial-gradient(circle at top right, rgba(14, 165, 233, 0.08), transparent 32%),
    linear-gradient(180deg, #f8fbff 0%, #fefefe 100%);
}

.record-pager {
  padding: 8px 12px 0;
  display: flex;
  justify-content: center;
}

.message-row {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 18px;
}

.message-row.is-me {
  flex-direction: row-reverse;
}

.bubble-avatar {
  flex-shrink: 0;
}

.bubble-box {
  max-width: min(75%, 680px);
}

.bubble-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
  color: #64748b;
  font-size: 12px;
}

.message-row.is-me .bubble-meta {
  justify-content: flex-end;
}

.bubble-content {
  padding: 12px 16px;
  border-radius: 18px 18px 18px 6px;
  background: #ffffff;
  border: 1px solid rgba(203, 213, 225, 0.8);
  color: #0f172a;
  line-height: 1.65;
  white-space: pre-wrap;
  word-break: break-word;
  box-shadow: 0 10px 24px rgba(15, 23, 42, 0.05);
}

.message-row.is-me .bubble-content {
  border-radius: 18px 18px 6px 18px;
  background: linear-gradient(135deg, #2563eb, #0ea5e9);
  border-color: transparent;
  color: #fff;
}

.composer {
  flex-shrink: 0;
  padding: 18px 22px 22px;
  border-top: 1px solid rgba(226, 232, 240, 0.9);
  background: rgba(255, 255, 255, 0.92);
}

.composer-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 12px;
  color: #64748b;
  font-size: 13px;
}

.empty-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 960px) {
  .message-page {
    height: auto;
  }

  .message-shell {
    grid-template-columns: 1fr;
    height: auto;
  }

  .conversation-panel {
    min-height: 360px;
    max-height: 460px;
  }

  .chat-panel {
    min-height: 520px;
  }
}

@media (max-width: 640px) {
  .message-page {
    padding: 0 2px;
  }

  .conversation-panel,
  .chat-panel {
    border-radius: 18px;
  }

  .composer-footer,
  .conversation-top,
  .conversation-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .bubble-box {
    max-width: 100%;
  }
}
</style>
