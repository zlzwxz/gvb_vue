<template>
  <div v-if="userStore.isLoggedIn" class="friend-float-wrap">
    <button class="friend-launcher" type="button" @click="expanded = !expanded">
      <span class="launcher-count">{{ socialStore.summary.online_friend_count || 0 }}</span>
      <div class="launcher-copy">
        <strong>好友面板</strong>
        <small>{{ socialStore.summary.friend_count || 0 }} 位好友 · {{ presenceLabel }}</small>
      </div>
    </button>

    <transition name="float-card">
      <section v-if="expanded" class="friend-card">
        <header class="card-header">
          <div class="card-header-copy">
            <strong>好友</strong>
            <span>{{ socialStore.summary.friend_count || 0 }} 位好友，{{ socialStore.summary.online_friend_count || 0 }} 位在线</span>
          </div>
          <div class="card-header-actions">
            <el-tag :type="socialStore.socketConnected ? 'success' : 'warning'" size="small" effect="plain">
              {{ socialStore.socketConnected ? '已连接' : '重连中' }}
            </el-tag>
            <el-button link type="primary" @click="openMessageCenter">全部查看</el-button>
          </div>
        </header>

        <div class="presence-panel">
          <div class="presence-overview">
            <div class="presence-user">
              <div class="friend-avatar-wrap self-avatar-wrap">
                <el-avatar :size="42" :src="userStore.userInfo?.avatar ? $resolveImg(userStore.userInfo.avatar) : ''">
                  {{ avatarText(selfDisplayName) }}
                </el-avatar>
                <span class="presence-dot" :class="presenceModeClass(selfPresenceSummary)"></span>
              </div>
              <div class="presence-copy">
                <div class="presence-copy-top">
                  <strong>{{ selfDisplayName }}</strong>
                  <span class="presence-summary-pill" :class="presenceModeClass(selfPresenceSummary)">
                    {{ presenceModeLabel(selfPresenceSummary) }}
                  </span>
                </div>
                <span>{{ presenceLabel }}</span>
                <small>{{ presenceForm.status_text || '点一下编辑状态，挂一句签名会更像 QQ。' }}</small>
              </div>
            </div>
            <div class="presence-side">
              <el-button link type="primary" @click="showPresenceEditor = !showPresenceEditor">
                {{ showPresenceEditor ? '收起' : '编辑状态' }}
              </el-button>
            </div>
          </div>

          <transition name="presence-editor">
            <div v-if="showPresenceEditor" class="presence-editor">
              <div class="presence-editor-row">
                <el-select v-model="presenceForm.mode" size="small" class="presence-mode-select">
                  <el-option v-for="item in presenceOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <div class="presence-switch-wrap">
                  <span>{{ presenceForm.is_invisible ? '隐身' : '公开' }}</span>
                  <el-switch
                    v-model="presenceForm.is_invisible"
                    size="small"
                    inline-prompt
                    active-text="隐"
                    inactive-text="公"
                  />
                </div>
                <el-button size="small" type="primary" plain :loading="saving" @click="savePresence">保存</el-button>
              </div>
              <el-input
                v-model="presenceForm.status_text"
                size="small"
                maxlength="60"
                placeholder="自定义状态，例如：摸鱼中、在写代码"
              />
            </div>
          </transition>
        </div>

        <div class="friend-section">
          <div class="section-title-row">
            <div class="section-title">{{ friendSectionTitle }}</div>
            <span class="section-subtitle">{{ filteredFriends.length }} 人</span>
          </div>

          <div class="friend-filter-row">
            <button
              v-for="item in friendTabs"
              :key="item.key"
              type="button"
              class="friend-filter-chip"
              :class="{ active: friendFilter === item.key }"
              @click="friendFilter = item.key"
            >
              {{ item.label }}
              <span>{{ item.count }}</span>
            </button>
          </div>

          <el-input
            v-model="friendKeyword"
            size="small"
            clearable
            placeholder="搜索好友昵称、状态或最近消息"
          >
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>

          <div v-if="filteredFriends.length" class="friend-list-scroll">
            <div class="friend-list">
              <div
                v-for="item in filteredFriends"
                :key="item.user_id"
                class="friend-row"
                role="button"
                tabindex="0"
                @click="openConversation(item.user_id)"
                @keyup.enter="openConversation(item.user_id)"
              >
                <div class="friend-avatar-wrap">
                  <el-badge :value="item.unread_count || 0" :hidden="!item.unread_count" :max="99">
                    <el-avatar :size="40" :src="item.avatar ? $resolveImg(item.avatar) : ''">
                      {{ avatarText(friendName(item)) }}
                    </el-avatar>
                  </el-badge>
                  <span class="presence-dot" :class="presenceModeClass(item)"></span>
                </div>

                <div class="friend-main">
                  <div class="friend-main-top">
                    <strong>{{ friendName(item) }}</strong>
                    <span v-if="compactLastActive(item.last_active_at)" class="friend-time">{{ compactLastActive(item.last_active_at) }}</span>
                  </div>
                  <div class="friend-state-line">
                    <span class="friend-status-badge" :class="presenceModeClass(item)">{{ presenceModeLabel(item) }}</span>
                    <span class="friend-status-text">{{ detailText(item) }}</span>
                  </div>
                  <small>{{ friendPreviewText(item) }}</small>
                </div>

                <div class="friend-actions" @click.stop>
                  <button class="friend-action-btn" type="button" title="私信" @click="openConversation(item.user_id)">
                    <el-icon><ChatDotRound /></el-icon>
                  </button>
                  <button
                    class="friend-action-btn"
                    type="button"
                    title="语音通话"
                    :disabled="!item.can_call"
                    @click="callFriend(item)"
                  >
                    <el-icon><PhoneFilled /></el-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <el-empty v-else :description="friendEmptyText" :image-size="56" />
        </div>
      </section>
    </transition>

    <el-dialog v-model="incomingVisible" title="语音来电" width="360px" :show-close="false" append-to-body>
      <div v-if="socialStore.incomingCall" class="call-box">
        <el-avatar :size="64" :src="socialStore.incomingCall.avatar ? $resolveImg(socialStore.incomingCall.avatar) : ''">
          {{ avatarText(socialStore.incomingCall.displayName) }}
        </el-avatar>
        <strong>{{ socialStore.incomingCall.displayName }}</strong>
        <span>正在呼叫你</span>
      </div>
      <template #footer>
        <el-button @click="socialStore.rejectIncomingCall()">拒绝</el-button>
        <el-button type="primary" @click="socialStore.acceptIncomingCall()">接听</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="callVisible" title="语音通话" width="380px" append-to-body :close-on-click-modal="false">
      <div v-if="socialStore.activeCall" class="call-box">
        <el-avatar :size="72" :src="socialStore.activeCall.avatar ? $resolveImg(socialStore.activeCall.avatar) : ''">
          {{ avatarText(socialStore.activeCall.displayName) }}
        </el-avatar>
        <strong>{{ socialStore.activeCall.displayName }}</strong>
        <span>{{ callStatusText }}</span>
        <span v-if="socialStore.activeCall.startedAt" class="call-duration">{{ callDuration }}</span>
      </div>
      <template #footer>
        <el-button @click="socialStore.toggleMute()">{{ socialStore.activeCall?.muted ? '取消静音' : '静音' }}</el-button>
        <el-button type="danger" @click="socialStore.cleanupCall()">挂断</el-button>
      </template>
    </el-dialog>

    <audio ref="remoteAudioRef" autoplay playsinline></audio>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { useSocialStore } from '@/stores/social'

const router = useRouter()
const userStore = useUserStore()
const socialStore = useSocialStore()
const remoteAudioRef = ref(null)
const expanded = ref(false)
const saving = ref(false)
const timer = ref(null)
const now = ref(Date.now())
const friendKeyword = ref('')
const friendFilter = ref('all')
const showPresenceEditor = ref(false)

const presenceOptions = [
  { value: 'online', label: '在线' },
  { value: 'busy', label: '忙碌' },
  { value: 'away', label: '离开' },
  { value: 'vacation', label: '放假中' },
  { value: 'travel', label: '旅游中' },
  { value: 'invisible', label: '隐身' }
]

const presenceForm = ref({
  mode: 'online',
  status_text: '',
  is_invisible: false
})

const allFriends = computed(() => socialStore.friends || [])
const onlineFriends = computed(() => socialStore.onlineFriends)
const offlineFriends = computed(() => allFriends.value.filter((item) => !item.is_online))
const unreadFriends = computed(() => allFriends.value.filter((item) => Number(item.unread_count || 0) > 0))
const friendTabs = computed(() => ([
  { key: 'all', label: '全部', count: allFriends.value.length },
  { key: 'online', label: '在线', count: onlineFriends.value.length },
  { key: 'offline', label: '离线', count: offlineFriends.value.length },
  { key: 'unread', label: '未读', count: unreadFriends.value.length }
]))
const selfDisplayName = computed(() => userStore.userInfo?.nick_name || userStore.userInfo?.user_name || '我')
const selfPresenceSummary = computed(() => ({
  ...socialStore.summary.presence,
  is_online: !socialStore.summary.presence?.is_invisible
}))
const filteredFriends = computed(() => {
  let list = [...allFriends.value]

  if (friendFilter.value === 'online') list = [...onlineFriends.value]
  if (friendFilter.value === 'offline') list = [...offlineFriends.value]
  if (friendFilter.value === 'unread') list = [...unreadFriends.value]

  const keyword = friendKeyword.value.trim().toLowerCase()
  if (keyword) {
    list = list.filter((item) => {
      const searchText = [
        item.nick_name,
        item.user_name,
        item.presence_text,
        item.last_message_preview,
        item.user_id
      ].filter(Boolean).join(' ').toLowerCase()
      return searchText.includes(keyword)
    })
  }

  return list.sort((left, right) => {
    const leftUnread = Number(left.unread_count || 0) > 0 ? 1 : 0
    const rightUnread = Number(right.unread_count || 0) > 0 ? 1 : 0
    if (leftUnread !== rightUnread) return rightUnread - leftUnread

    const leftOnline = isPresenceOnline(left) ? 1 : 0
    const rightOnline = isPresenceOnline(right) ? 1 : 0
    if (leftOnline !== rightOnline) return rightOnline - leftOnline

    const leftActive = activityTimestamp(left.last_active_at)
    const rightActive = activityTimestamp(right.last_active_at)
    if (leftActive !== rightActive) return rightActive - leftActive

    return friendName(left).localeCompare(friendName(right), 'zh-Hans-CN')
  })
})
const incomingVisible = computed({
  get: () => Boolean(socialStore.incomingCall),
  set: (value) => {
    if (!value) socialStore.rejectIncomingCall()
  }
})
const callVisible = computed({
  get: () => Boolean(socialStore.activeCall),
  set: (value) => {
    if (!value) socialStore.cleanupCall()
  }
})
const presenceLabel = computed(() => {
  if (socialStore.summary.presence?.is_invisible) return '隐身中'
  return presenceText(socialStore.summary.presence)
})
const friendSectionTitle = computed(() => {
  if (friendFilter.value === 'online') return '当前在线'
  if (friendFilter.value === 'offline') return '最近离线'
  if (friendFilter.value === 'unread') return '未读联系人'
  return '全部好友'
})
const friendEmptyText = computed(() => {
  if (friendKeyword.value.trim()) return '没有匹配的好友'
  if (friendFilter.value === 'online') return '暂无在线好友'
  if (friendFilter.value === 'offline') return '暂无离线好友'
  if (friendFilter.value === 'unread') return '当前没有未读会话'
  return '暂时还没有好友'
})
const callStatusText = computed(() => {
  const status = socialStore.activeCall?.status
  if (status === 'ringing') return '等待对方接听...'
  if (status === 'connecting') return '正在建立连接...'
  if (status === 'active') return '语音通话中'
  return '准备通话'
})
const callDuration = computed(() => {
  const startedAt = Number(socialStore.activeCall?.startedAt || 0)
  if (!startedAt) return '00:00'
  const diff = Math.max(0, Math.floor((now.value - startedAt) / 1000))
  const mm = String(Math.floor(diff / 60)).padStart(2, '0')
  const ss = String(diff % 60).padStart(2, '0')
  return `${mm}:${ss}`
})

function avatarText(name) {
  return (name || '友').trim().charAt(0) || '友'
}

function friendName(item) {
  return item?.nick_name || item?.user_name || `用户${item?.user_id || ''}`
}

function activityTimestamp(value) {
  const time = new Date(value || '').getTime()
  return Number.isFinite(time) ? time : 0
}

function isPresenceOnline(item) {
  if (typeof item?.is_online === 'boolean') return item.is_online
  if (item?.is_invisible) return false
  const mode = item?.presence_mode || item?.mode || 'online'
  return mode !== 'offline' && mode !== 'invisible'
}

function presenceModeLabel(item) {
  if (!isPresenceOnline(item)) return '离线'
  const mode = item?.presence_mode || item?.mode || 'online'
  return {
    online: '在线',
    busy: '忙碌',
    away: '离开',
    vacation: '放假',
    travel: '出游',
    invisible: '隐身'
  }[mode] || '在线'
}

function presenceModeClass(item) {
  if (!isPresenceOnline(item)) return 'offline'
  const mode = item?.presence_mode || item?.mode || 'online'
  if (mode === 'busy') return 'busy'
  if (mode === 'away') return 'away'
  if (mode === 'vacation' || mode === 'travel') return 'relaxed'
  return 'online'
}

function presenceText(item) {
  const mode = item?.presence_mode || item?.mode || 'offline'
  const text = item?.presence_text || item?.status_text || ''
  const map = {
    online: '在线',
    busy: '忙碌',
    away: '离开',
    vacation: '放假中',
    travel: '旅游中',
    invisible: '隐身',
    offline: '离线'
  }
  return text || map[mode] || '在线'
}

function formatLastActive(value) {
  if (!value) return '暂无最近互动'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '最近活跃'
  const diff = Date.now() - date.getTime()
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  if (diff < minute) return '刚刚活跃'
  if (diff < hour) return `${Math.max(1, Math.floor(diff / minute))} 分钟前活跃`
  if (diff < day) return `${Math.floor(diff / hour)} 小时前活跃`
  return `${Math.floor(diff / day)} 天前活跃`
}

function compactLastActive(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  const diff = Date.now() - date.getTime()
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  if (diff < minute) return '刚刚'
  if (diff < hour) return `${Math.max(1, Math.floor(diff / minute))}分前`
  if (diff < day) return `${Math.floor(diff / hour)}小时前`
  if (diff < day * 2) return '昨天'
  return `${date.getMonth() + 1}/${date.getDate()}`
}

function detailText(item) {
  return presenceText(item)
}

function friendPreviewText(item) {
  const preview = String(item?.last_message_preview || '').trim()
  if (preview) return preview
  if (isPresenceOnline(item)) return '在线中，点一下直接开始聊天'
  return formatLastActive(item?.last_active_at)
}

async function savePresence() {
  saving.value = true
  try {
    await socialStore.updatePresence({
      mode: presenceForm.value.mode,
      status_text: presenceForm.value.status_text,
      is_invisible: Boolean(presenceForm.value.is_invisible)
    })
    showPresenceEditor.value = false
    ElMessage.success('在线状态已更新')
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '状态更新失败')
  } finally {
    saving.value = false
  }
}

function openConversation(userId) {
  expanded.value = false
  router.push({ name: 'PrivateMessages', query: { user_id: String(userId) } })
}

function openMessageCenter() {
  expanded.value = false
  router.push({ name: 'PrivateMessages' })
}

function callFriend(friend) {
  socialStore.startAudioCall(friend.user_id, friend)
}

watch(
  () => socialStore.summary.presence,
  (value) => {
    presenceForm.value = {
      mode: value?.mode || 'online',
      status_text: value?.status_text || '',
      is_invisible: Boolean(value?.is_invisible)
    }
  },
  { immediate: true, deep: true }
)

watch(
  () => socialStore.remoteStream,
  (stream) => {
    if (!remoteAudioRef.value) return
    remoteAudioRef.value.srcObject = stream || null
  }
)

watch(
  () => userStore.isLoggedIn,
  async (value) => {
    if (value) {
      await socialStore.ensureStarted()
    } else {
      socialStore.stop()
    }
  },
  { immediate: true }
)

onMounted(() => {
  timer.value = window.setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer.value) window.clearInterval(timer.value)
})
</script>

<style scoped>
.friend-float-wrap {
  position: fixed;
  right: 22px;
  top: 96px;
  z-index: 240;
}

.friend-launcher {
  width: 96px;
  min-height: 96px;
  border: none;
  border-radius: 24px;
  background: linear-gradient(145deg, rgba(16, 185, 129, 0.94), rgba(14, 165, 233, 0.94));
  color: #fff;
  box-shadow: 0 18px 40px rgba(15, 118, 110, 0.32);
  cursor: pointer;
  display: grid;
  place-items: center;
  padding: 12px;
}

.launcher-count {
  font-size: 30px;
  font-weight: 800;
  line-height: 1;
}

.launcher-copy {
  text-align: center;
}

.launcher-copy strong,
.launcher-copy small {
  display: block;
}

.launcher-copy small {
  opacity: 0.88;
  line-height: 1.35;
}

.friend-card {
  margin-top: 12px;
  width: 392px;
  max-height: min(78vh, 820px);
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(245, 250, 255, 0.98), rgba(255, 255, 255, 0.98));
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.16);
  padding: 16px;
  display: grid;
  gap: 12px;
}

.card-header,
.presence-overview,
.presence-user,
.presence-copy-top,
.card-header-actions,
.presence-side,
.section-title-row,
.friend-main-top,
.friend-state-line,
.friend-row,
.friend-actions {
  display: flex;
  align-items: center;
}

.card-header,
.presence-overview,
.section-title-row,
.friend-main-top,
.friend-row {
  justify-content: space-between;
  gap: 12px;
}

.card-header {
  align-items: flex-start;
}

.card-header-copy {
  display: grid;
  gap: 2px;
}

.card-header strong,
.friend-main strong,
.presence-copy strong {
  color: #0f172a;
}

.card-header span,
.section-subtitle,
.friend-time,
.presence-copy span,
.presence-switch-wrap span,
.friend-status-text,
.friend-main small {
  color: #64748b;
  font-size: 12px;
}

.card-header-actions {
  gap: 8px;
}

.presence-panel {
  display: grid;
  gap: 10px;
  padding: 12px;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(235, 244, 255, 0.94), rgba(246, 250, 255, 0.96));
  border: 1px solid rgba(191, 219, 254, 0.82);
}

.presence-user {
  gap: 10px;
  min-width: 0;
}

.presence-copy {
  min-width: 0;
  display: grid;
  gap: 2px;
}

.presence-copy strong {
  font-size: 14px;
}

.presence-copy small {
  color: #7b8da4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.presence-copy-top {
  gap: 8px;
  min-width: 0;
}

.presence-summary-pill,
.friend-status-badge {
  height: 20px;
  padding: 0 8px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  flex-shrink: 0;
}

.presence-summary-pill.online,
.friend-status-badge.online {
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}

.presence-summary-pill.busy,
.friend-status-badge.busy {
  background: rgba(249, 115, 22, 0.14);
  color: #c2410c;
}

.presence-summary-pill.away,
.friend-status-badge.away {
  background: rgba(250, 204, 21, 0.18);
  color: #a16207;
}

.presence-summary-pill.relaxed,
.friend-status-badge.relaxed {
  background: rgba(59, 130, 246, 0.12);
  color: #1d4ed8;
}

.presence-summary-pill.offline,
.friend-status-badge.offline {
  background: rgba(148, 163, 184, 0.18);
  color: #64748b;
}

.presence-editor {
  display: grid;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid rgba(191, 219, 254, 0.82);
}

.presence-editor-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 8px;
  align-items: center;
}

.presence-switch-wrap {
  height: 32px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  border-radius: 12px;
  border: 1px solid rgba(191, 219, 254, 0.95);
  background: rgba(255, 255, 255, 0.88);
}

.friend-section {
  display: grid;
  gap: 10px;
  min-height: 0;
  padding: 10px;
  border-radius: 18px;
  background: rgba(248, 251, 255, 0.92);
  border: 1px solid rgba(219, 234, 254, 0.82);
}

.section-title {
  color: #0f172a;
  font-size: 13px;
  font-weight: 700;
}

.friend-filter-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.friend-filter-chip {
  border: 1px solid #d9e5f1;
  background: #fff;
  color: #315472;
  border-radius: 999px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.friend-filter-chip span {
  color: #0f7ea5;
}

.friend-filter-chip.active {
  border-color: #9dcfe2;
  background: #eef9fd;
  color: #0f6f8d;
}

.friend-list-scroll {
  min-height: 0;
  max-height: min(44vh, 430px);
  overflow: auto;
  padding-right: 4px;
}

.friend-list {
  display: grid;
  gap: 6px;
}

.friend-row {
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease, transform 0.18s ease;
}

.friend-row:hover,
.friend-row:focus-visible {
  border-color: #c8ddf5;
  background: #fff;
  transform: translateY(-1px);
  outline: none;
}

.friend-avatar-wrap {
  position: relative;
  flex-shrink: 0;
}

.presence-dot {
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #fff;
  background: #cbd5e1;
}

.self-avatar-wrap .presence-dot {
  width: 11px;
  height: 11px;
}

.presence-dot.online {
  background: #22c55e;
}

.presence-dot.busy {
  background: #f97316;
}

.presence-dot.away {
  background: #facc15;
}

.presence-dot.relaxed {
  background: #3b82f6;
}

.presence-dot.offline {
  background: #cbd5e1;
}

.friend-main {
  flex: 1;
  min-width: 0;
  display: grid;
  gap: 4px;
}

.friend-main-top strong {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
  font-weight: 600;
}

.friend-time {
  flex-shrink: 0;
  color: #94a3b8;
  font-size: 11px;
}

.friend-state-line {
  gap: 8px;
  min-width: 0;
}

.friend-status-text {
  min-width: 0;
  color: #5b718b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.friend-main small {
  color: #7b8da4;
  line-height: 1.45;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.friend-actions {
  gap: 6px;
  flex-shrink: 0;
  opacity: 0;
  transition: opacity 0.18s ease;
}

.friend-row:hover .friend-actions,
.friend-row:focus-within .friend-actions {
  opacity: 1;
}

.friend-action-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 10px;
  background: #eef4fb;
  color: #547392;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
}

.friend-action-btn:hover {
  background: #dff0ff;
  color: #0f6f8d;
  transform: translateY(-1px);
}

.friend-action-btn:disabled {
  opacity: 0.42;
  cursor: not-allowed;
  transform: none;
}

.call-box {
  display: grid;
  justify-items: center;
  gap: 12px;
  padding: 12px 0;
}

.call-duration {
  color: #0f766e;
  font-weight: 700;
}

.float-card-enter-active,
.float-card-leave-active,
.presence-editor-enter-active,
.presence-editor-leave-active {
  transition: all 0.2s ease;
}

.float-card-enter-from,
.float-card-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

.presence-editor-enter-from,
.presence-editor-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

@media (max-width: 960px) {
  .friend-float-wrap {
    right: 12px;
    top: auto;
    bottom: 84px;
  }

  .friend-card {
    width: min(94vw, 392px);
  }

  .friend-actions {
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .card-header,
  .presence-overview {
    flex-direction: column;
    align-items: flex-start;
  }

  .presence-editor-row {
    grid-template-columns: 1fr;
  }

  .friend-row {
    align-items: flex-start;
  }
}
</style>
