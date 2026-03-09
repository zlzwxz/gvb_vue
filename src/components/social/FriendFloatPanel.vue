<template>
  <div
    v-if="userStore.isLoggedIn"
    class="friend-float-wrap"
    @mouseenter="openHover"
    @mouseleave="closeHover"
  >
    <button
      class="friend-launcher"
      type="button"
      @click="toggleExpanded"
    >
      <div class="launcher-badge">{{ socialStore.summary.online_friend_count || 0 }}</div>
      <div class="launcher-copy">
        <strong>QQ 好友</strong>
        <span>{{ socialStore.summary.friend_count || 0 }} 位好友</span>
        <small>{{ presenceLabel }}</small>
      </div>
    </button>

    <transition name="float-card">
      <section
        v-if="expanded"
        class="friend-card"
      >
        <header class="card-header">
          <div>
            <strong>好友列表</strong>
            <span>{{ socialStore.summary.friend_count || 0 }} 位好友，{{ socialStore.summary.online_friend_count || 0 }} 位在线</span>
          </div>
          <div class="header-actions">
            <el-tag :type="socialStore.socketConnected ? 'success' : 'warning'" size="small" effect="plain">
              {{ socialStore.socketConnected ? '已连接' : '重连中' }}
            </el-tag>
            <el-button link type="primary" @click="openMessageCenter">全部查看</el-button>
          </div>
        </header>

        <section class="presence-panel">
          <div class="presence-top">
            <div class="presence-user">
              <div class="avatar-box">
                <el-avatar :size="42" :src="userStore.userInfo?.avatar ? $resolveImg(userStore.userInfo.avatar) : ''">
                  {{ avatarText(selfDisplayName) }}
                </el-avatar>
                <span class="presence-dot" :class="presenceModeClass(selfPresenceSummary)"></span>
              </div>
              <div class="presence-copy">
                <div class="presence-name">
                  <strong>{{ selfDisplayName }}</strong>
                  <span class="mode-pill" :class="presenceModeClass(selfPresenceSummary)">{{ presenceModeLabel(selfPresenceSummary) }}</span>
                </div>
                <span>{{ presenceLabel }}</span>
                <small>{{ presenceForm.status_text || '像 QQ 一样挂一句状态签名。' }}</small>
              </div>
            </div>
            <el-button link type="primary" @click="showPresenceEditor = !showPresenceEditor">
              {{ showPresenceEditor ? '收起' : '编辑状态' }}
            </el-button>
          </div>

          <div v-if="showPresenceEditor" class="presence-editor">
            <div class="presence-editor-row">
              <el-select v-model="presenceForm.mode" size="small" :teleported="false">
                <el-option v-for="item in presenceOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <el-switch
                v-model="presenceForm.is_invisible"
                size="small"
                inline-prompt
                active-text="隐"
                inactive-text="公"
              />
              <el-button size="small" type="primary" plain :loading="saving" @click="savePresence">保存</el-button>
            </div>
            <el-input
              v-model="presenceForm.status_text"
              size="small"
              maxlength="60"
              placeholder="例如：摸鱼中、在写代码、吃饭中"
            />
          </div>
        </section>

        <section class="friend-section">
          <div class="section-head">
            <strong>好友分组</strong>
            <span>{{ filteredCount }} 人</span>
          </div>

          <div class="filter-row">
            <button
              v-for="item in friendTabs"
              :key="item.key"
              type="button"
              class="filter-chip"
              :class="{ active: friendFilter === item.key }"
              @click="friendFilter = item.key"
            >
              {{ item.label }}
              <span>{{ item.count }}</span>
            </button>
          </div>

          <el-input v-model="friendKeyword" size="small" clearable placeholder="搜索好友昵称、状态或最近消息">
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>

          <div v-if="sections.length" class="friend-list">
            <section v-for="section in sections" :key="section.key" class="friend-group">
              <button type="button" class="group-head" @click="toggleSection(section.key)">
                <div>
                  <strong>{{ section.title }}</strong>
                  <span>{{ section.items.length }} 人</span>
                </div>
                <span>{{ sectionCollapse[section.key] ? '展开' : '收起' }}</span>
              </button>

              <div v-if="!sectionCollapse[section.key]" class="group-body">
                <div
                  v-for="item in sectionItems(section)"
                  :key="item.user_id"
                  class="friend-row"
                  role="button"
                  tabindex="0"
                  @click="openConversation(item.user_id)"
                  @keyup.enter="openConversation(item.user_id)"
                >
                  <div class="avatar-box">
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
                      <span>{{ compactLastActive(item.last_active_at) }}</span>
                    </div>
                    <div class="friend-state-line">
                      <span class="mode-pill" :class="presenceModeClass(item)">{{ presenceModeLabel(item) }}</span>
                      <span>{{ presenceText(item) }}</span>
                    </div>
                    <small>{{ previewText(item) }}</small>
                  </div>
                  <div class="friend-actions" @click.stop>
                    <button class="action-btn" type="button" title="私信" @click="openConversation(item.user_id)">
                      <el-icon><ChatDotRound /></el-icon>
                    </button>
                    <button class="action-btn" type="button" title="语音通话" :disabled="!item.can_call" @click="callFriend(item)">
                      <el-icon><PhoneFilled /></el-icon>
                    </button>
                  </div>
                </div>

                <div v-if="section.items.length > sectionPageSize" class="pager-row">
                  <button class="pager-btn" type="button" :disabled="sectionPages[section.key] <= 1" @click="changePage(section.key, -1)">上一页</button>
                  <span>第 {{ sectionPages[section.key] }} / {{ sectionPageCount(section) }} 页</span>
                  <button class="pager-btn" type="button" :disabled="sectionPages[section.key] >= sectionPageCount(section)" @click="changePage(section.key, 1)">下一页</button>
                </div>
              </div>
            </section>
          </div>

          <el-empty v-else :description="emptyText" :image-size="56" />
        </section>
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
const sectionPageSize = 6

const hoverCapable = ref(false)
const expanded = ref(false)
const saving = ref(false)
const showPresenceEditor = ref(false)
const friendKeyword = ref('')
const friendFilter = ref('all')
const closeTimer = ref(0)
const now = ref(Date.now())
const timer = ref(0)
const remoteAudioRef = ref(null)
const sectionCollapse = ref({ online: false, offline: false, unread: false })
const sectionPages = ref({ online: 1, offline: 1, unread: 1 })
const presenceForm = ref({ mode: 'online', status_text: '', is_invisible: false })

const presenceOptions = [
  { value: 'online', label: '在线' },
  { value: 'busy', label: '忙碌' },
  { value: 'away', label: '离开' },
  { value: 'vacation', label: '放假中' },
  { value: 'travel', label: '旅游中' },
  { value: 'invisible', label: '隐身' }
]

const allFriends = computed(() => socialStore.friends || [])
const onlineFriends = computed(() => allFriends.value.filter((item) => item.is_online))
const offlineFriends = computed(() => allFriends.value.filter((item) => !item.is_online))
const unreadFriends = computed(() => allFriends.value.filter((item) => Number(item.unread_count || 0) > 0))
const friendTabs = computed(() => ([
  { key: 'all', label: '全部', count: allFriends.value.length },
  { key: 'online', label: '在线', count: onlineFriends.value.length },
  { key: 'offline', label: '离线', count: offlineFriends.value.length },
  { key: 'unread', label: '未读', count: unreadFriends.value.length }
]))
const selfDisplayName = computed(() => userStore.userInfo?.nick_name || userStore.userInfo?.user_name || '我')
const selfPresenceSummary = computed(() => ({ ...socialStore.summary.presence, is_online: !socialStore.summary.presence?.is_invisible }))
const incomingVisible = computed({
  get: () => Boolean(socialStore.incomingCall),
  set: (value) => { if (!value) socialStore.rejectIncomingCall() }
})
const callVisible = computed({
  get: () => Boolean(socialStore.activeCall),
  set: (value) => { if (!value) socialStore.cleanupCall() }
})
const presenceLabel = computed(() => socialStore.summary.presence?.is_invisible ? '隐身中' : presenceText(socialStore.summary.presence))
const sections = computed(() => buildSections())
const filteredCount = computed(() => sections.value.reduce((sum, section) => sum + section.items.length, 0))
const emptyText = computed(() => {
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
  return `${String(Math.floor(diff / 60)).padStart(2, '0')}:${String(diff % 60).padStart(2, '0')}`
})

function updateHoverCapability() {
  hoverCapable.value = Boolean(window.matchMedia?.('(hover: hover) and (pointer: fine)').matches)
}

function clearHoverTimer() {
  if (closeTimer.value) {
    window.clearTimeout(closeTimer.value)
    closeTimer.value = 0
  }
}

function openHover() {
  if (!hoverCapable.value) return
  clearHoverTimer()
  expanded.value = true
}

function closeHover() {
  if (!hoverCapable.value) return
  if (showPresenceEditor.value || saving.value) return
  clearHoverTimer()
  closeTimer.value = window.setTimeout(() => {
    expanded.value = false
    closeTimer.value = 0
  }, 180)
}

function toggleExpanded() {
  if (hoverCapable.value) return
  expanded.value = !expanded.value
}

function avatarText(value) {
  return String(value || '友').trim().charAt(0) || '友'
}

function friendName(item) {
  return item?.nick_name || item?.user_name || `用户${item?.user_id || ''}`
}

function activityTime(value) {
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
  return {
    online: '在线',
    busy: '忙碌',
    away: '离开',
    vacation: '放假',
    travel: '出游'
  }[item?.presence_mode || item?.mode || 'online'] || '在线'
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
  return item?.presence_text || item?.status_text || {
    online: '在线',
    busy: '忙碌',
    away: '离开',
    vacation: '放假中',
    travel: '旅游中',
    invisible: '隐身',
    offline: '离线'
  }[item?.presence_mode || item?.mode || 'offline'] || '在线'
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

function previewText(item) {
  return String(item?.last_message_preview || '').trim() || (isPresenceOnline(item) ? '在线中，点一下直接开始聊天' : '最近有空再聊')
}

function sortFriends(list) {
  return [...list].sort((left, right) => {
    const leftUnread = Number(left.unread_count || 0) > 0 ? 1 : 0
    const rightUnread = Number(right.unread_count || 0) > 0 ? 1 : 0
    if (leftUnread !== rightUnread) return rightUnread - leftUnread
    const leftOnline = isPresenceOnline(left) ? 1 : 0
    const rightOnline = isPresenceOnline(right) ? 1 : 0
    if (leftOnline !== rightOnline) return rightOnline - leftOnline
    return activityTime(right.last_active_at) - activityTime(left.last_active_at)
  })
}

function keywordFilter(list) {
  const keyword = friendKeyword.value.trim().toLowerCase()
  const base = sortFriends(list)
  if (!keyword) return base
  return base.filter((item) => [item.nick_name, item.user_name, item.presence_text, item.last_message_preview, item.user_id].filter(Boolean).join(' ').toLowerCase().includes(keyword))
}

function buildSections() {
  if (friendFilter.value === 'online') return [{ key: 'online', title: '在线好友', items: keywordFilter(onlineFriends.value) }]
  if (friendFilter.value === 'offline') return [{ key: 'offline', title: '离线好友', items: keywordFilter(offlineFriends.value) }]
  if (friendFilter.value === 'unread') return [{ key: 'unread', title: '未读联系人', items: keywordFilter(unreadFriends.value) }]
  return [
    { key: 'online', title: '在线好友', items: keywordFilter(onlineFriends.value) },
    { key: 'offline', title: '离线好友', items: keywordFilter(offlineFriends.value) }
  ].filter((item) => item.items.length)
}

function sectionPageCount(section) {
  return Math.max(1, Math.ceil(section.items.length / sectionPageSize))
}

function sectionItems(section) {
  const page = Math.min(sectionPages.value[section.key] || 1, sectionPageCount(section))
  const start = (page - 1) * sectionPageSize
  return section.items.slice(start, start + sectionPageSize)
}

function changePage(key, delta) {
  const section = sections.value.find((item) => item.key === key)
  if (!section) return
  const next = Math.min(Math.max((sectionPages.value[key] || 1) + delta, 1), sectionPageCount(section))
  sectionPages.value = { ...sectionPages.value, [key]: next }
}

function toggleSection(key) {
  sectionCollapse.value = { ...sectionCollapse.value, [key]: !sectionCollapse.value[key] }
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
  } catch (error) {
    ElMessage.error(error?.response?.data?.msg || '状态更新失败')
  } finally {
    saving.value = false
  }
}

function openConversation(userId) {
  if (!hoverCapable.value) expanded.value = false
  router.push({ name: 'PrivateMessages', query: { user_id: String(userId) } })
}

function openMessageCenter() {
  if (!hoverCapable.value) expanded.value = false
  router.push({ name: 'PrivateMessages' })
}

function callFriend(friend) {
  socialStore.startAudioCall(friend.user_id, friend)
}

watch(() => socialStore.summary.presence, (value) => {
  presenceForm.value = {
    mode: value?.mode || 'online',
    status_text: value?.status_text || '',
    is_invisible: Boolean(value?.is_invisible)
  }
}, { immediate: true, deep: true })

watch(() => socialStore.remoteStream, (stream) => {
  if (remoteAudioRef.value) remoteAudioRef.value.srcObject = stream || null
})

watch(() => userStore.isLoggedIn, async (value) => {
  if (value) await socialStore.ensureStarted()
  else socialStore.stop()
}, { immediate: true })

watch([friendFilter, friendKeyword], () => {
  sectionPages.value = { online: 1, offline: 1, unread: 1 }
})

onMounted(() => {
  updateHoverCapability()
  window.addEventListener('resize', updateHoverCapability)
  timer.value = window.setInterval(() => { now.value = Date.now() }, 1000)
})

onBeforeUnmount(() => {
  clearHoverTimer()
  if (timer.value) window.clearInterval(timer.value)
  window.removeEventListener('resize', updateHoverCapability)
})
</script>

<style scoped>
.friend-float-wrap{position:fixed;right:18px;top:88px;z-index:240;width:88px;padding-bottom:12px;display:flex;justify-content:flex-end;overflow:visible}
.friend-launcher,.friend-card,.presence-panel,.friend-section,.friend-group,.friend-row,.group-head{box-shadow:0 18px 40px rgba(15,23,42,.12)}
.friend-launcher{position:relative;z-index:2;width:88px;min-height:128px;border:none;border-radius:24px;background:linear-gradient(180deg,rgba(56,189,248,.96),rgba(14,116,144,.96));color:#fff;display:grid;gap:10px;justify-items:center;align-content:center;padding:14px 10px;cursor:pointer}
.launcher-badge{width:38px;height:38px;border-radius:14px;background:rgba(255,255,255,.18);display:grid;place-items:center;font-size:22px;font-weight:800}
.launcher-copy{text-align:center}.launcher-copy strong,.launcher-copy span,.launcher-copy small{display:block}.launcher-copy span{margin-top:6px;font-size:12px}.launcher-copy small{margin-top:4px;opacity:.86;line-height:1.4}
.friend-card{position:absolute;right:0;top:calc(100% - 4px);z-index:1;width:376px;max-height:min(80vh,860px);overflow:hidden;border-radius:24px;background:linear-gradient(180deg,rgba(247,251,255,.98),rgba(255,255,255,.98));border:1px solid rgba(148,163,184,.22);padding:16px;display:grid;gap:12px}
.card-header,.presence-top,.presence-user,.presence-name,.header-actions,.section-head,.friend-main-top,.friend-state-line,.friend-row,.friend-actions,.group-head,.pager-row{display:flex;align-items:center}
.card-header,.presence-top,.section-head,.friend-main-top,.friend-row,.group-head,.pager-row{justify-content:space-between;gap:12px}
.card-header strong,.presence-copy strong,.friend-main strong,.group-head strong{color:#0f172a}.card-header span,.presence-copy span,.presence-copy small,.section-head span,.friend-main span,.friend-main small,.group-head span,.pager-row span{color:#64748b;font-size:12px}
.presence-panel,.friend-section{border-radius:18px;padding:12px;border:1px solid rgba(191,219,254,.82);background:linear-gradient(180deg,rgba(235,244,255,.94),rgba(246,250,255,.96))}
.presence-user,.friend-row{gap:10px}.presence-copy,.friend-main{min-width:0;display:grid;gap:4px}.presence-copy small,.friend-main small{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.avatar-box{position:relative;flex-shrink:0}.presence-dot{position:absolute;right:2px;bottom:2px;width:10px;height:10px;border-radius:50%;border:2px solid #fff;background:#cbd5e1}
.presence-dot.online{background:#22c55e}.presence-dot.busy{background:#f97316}.presence-dot.away{background:#facc15}.presence-dot.relaxed{background:#3b82f6}.presence-dot.offline{background:#cbd5e1}
.mode-pill{height:20px;padding:0 8px;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:700}.mode-pill.online{background:rgba(34,197,94,.12);color:#15803d}.mode-pill.busy{background:rgba(249,115,22,.14);color:#c2410c}.mode-pill.away{background:rgba(250,204,21,.18);color:#a16207}.mode-pill.relaxed{background:rgba(59,130,246,.12);color:#1d4ed8}.mode-pill.offline{background:rgba(148,163,184,.18);color:#64748b}
.presence-editor{display:grid;gap:10px;padding-top:10px;border-top:1px solid rgba(191,219,254,.82)}.presence-editor-row{display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:8px;align-items:center}
.filter-row{display:flex;gap:6px;flex-wrap:wrap}.filter-chip{border:1px solid #d9e5f1;background:#fff;color:#315472;border-radius:999px;padding:5px 10px;font-size:12px;cursor:pointer;display:inline-flex;align-items:center;gap:6px}.filter-chip span{color:#0f7ea5}.filter-chip.active{border-color:#9dcfe2;background:#eef9fd;color:#0f6f8d}
.friend-list{min-height:0;max-height:min(48vh,470px);overflow:auto;display:grid;gap:10px;padding-right:4px}.friend-group{border-radius:16px;border:1px solid #dce7f1;background:rgba(255,255,255,.96);overflow:hidden}
.group-head{width:100%;border:none;background:linear-gradient(180deg,#f8fbff 0%,#eef6fd 100%);padding:12px 14px;cursor:pointer;text-align:left}.group-body{display:grid;gap:6px;padding:8px}
.friend-row{padding:10px 12px;border-radius:14px;background:#fff;border:1px solid transparent;cursor:pointer;transition:.18s}.friend-row:hover,.friend-row:focus-visible{border-color:#c8ddf5;transform:translateY(-1px);outline:none}
.friend-main{flex:1}.friend-main strong{font-size:14px;font-weight:600}.friend-main-top strong,.friend-main span,.friend-main small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.friend-state-line{gap:8px}.friend-actions{gap:6px;opacity:0;transition:opacity .18s}.friend-row:hover .friend-actions,.friend-row:focus-within .friend-actions{opacity:1}
.action-btn,.pager-btn{border:none;border-radius:10px;cursor:pointer}.action-btn{width:28px;height:28px;background:#eef4fb;color:#547392;display:grid;place-items:center}.action-btn:disabled{opacity:.42;cursor:not-allowed}.pager-row{padding:6px 4px 2px}.pager-btn{background:#ecf4fb;color:#28557e;padding:5px 10px;font-size:12px}.pager-btn:disabled{opacity:.45;cursor:not-allowed}
.call-box{display:grid;justify-items:center;gap:12px;padding:12px 0}.call-duration{color:#0f766e;font-weight:700}
.float-card-enter-active,.float-card-leave-active{transition:all .18s ease}.float-card-enter-from,.float-card-leave-to{opacity:0;transform:translateY(-6px) scale(.985)}
@media (max-width:960px){.friend-float-wrap{right:12px;top:auto;bottom:84px}.friend-card{width:min(94vw,376px)}.friend-actions{opacity:1}}
@media (max-width:640px){.card-header,.presence-top,.friend-row,.pager-row{flex-direction:column;align-items:flex-start}.presence-editor-row{grid-template-columns:1fr}}
</style>
