<template>
  <div class="social-page">
    <section class="summary-row">
      <div class="summary-card"><span>好友</span><strong>{{ socialStore.summary.friend_count || 0 }}</strong></div>
      <div class="summary-card"><span>在线</span><strong>{{ socialStore.summary.online_friend_count || 0 }}</strong></div>
      <div class="summary-card"><span>群组</span><strong>{{ groups.length }}</strong></div>
      <div class="summary-card"><span>状态</span><strong>{{ currentPresenceText }}</strong></div>
    </section>

    <div class="social-shell">
      <aside class="conversation-panel">
        <div class="panel-head">
          <div>
            <p class="panel-kicker">Social Hub</p>
            <h2>好友私信</h2>
          </div>
          <div class="panel-head-actions">
            <el-button :icon="Search" circle @click="openDiscoveryDrawer" />
            <el-button :icon="PhoneFilled" circle @click="openCallLogDrawer" />
            <el-button :icon="RefreshRight" circle @click="refreshAll" />
          </div>
        </div>

        <el-input v-model="keyword" clearable placeholder="搜索好友或群组">
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>

        <div class="action-row">
          <el-button type="primary" plain :icon="Plus" @click="groupDialogVisible = true">建群</el-button>
          <el-button plain :icon="Search" @click="openDiscoveryDrawer">搜索号</el-button>
          <el-button plain :icon="User" @click="friendDrawerVisible = true">好友</el-button>
          <el-button plain :icon="Lock" @click="blockDrawerVisible = true">黑名单</el-button>
          <el-button plain :icon="PhoneFilled" @click="openCallLogDrawer">通话记录</el-button>
        </div>

        <div v-loading="conversationLoading" class="conversation-list">
          <button
            v-for="item in filteredConversations"
            :key="item.conversation_key"
            type="button"
            class="conversation-item"
            :class="{ active: selectedConversation?.conversation_key === item.conversation_key }"
            @click="selectConversation(item)"
          >
            <el-badge :value="item.unread_count || 0" :hidden="!item.unread_count">
              <el-avatar :src="item.avatar ? $resolveImg(item.avatar) : ''" :size="40">{{ avatarText(item.title) }}</el-avatar>
            </el-badge>
            <div class="conversation-main">
              <div class="conversation-title">
                <strong>{{ item.title }}</strong>
                <span>{{ formatTime(item.latest_at, true) }}</span>
              </div>
              <div class="conversation-desc">
                <p>{{ item.latest_message || (item.conversation_type === 'group' ? '新建群组，打个招呼吧' : '点击开始聊天') }}</p>
                <el-tag size="small" :type="item.conversation_type === 'group' ? 'success' : 'primary'" effect="plain">
                  {{ item.conversation_type === 'group' ? '群组' : (item.is_friend ? '好友' : '私聊') }}
                </el-tag>
              </div>
            </div>
          </button>
          <el-empty v-if="!conversationLoading && !filteredConversations.length" description="还没有聊天会话" :image-size="72" />
        </div>
      </aside>

      <section class="chat-panel">
        <template v-if="selectedConversation">
          <div class="chat-head">
            <div class="chat-user">
              <el-avatar :src="selectedConversation.avatar ? $resolveImg(selectedConversation.avatar) : ''" :size="46">
                {{ avatarText(selectedConversation.title) }}
              </el-avatar>
              <div>
                <h3>{{ selectedConversation.title }}</h3>
                <p>{{ chatSubTitle }}</p>
              </div>
            </div>
            <div class="chat-tools">
              <template v-if="isDirectConversation">
                <el-button v-if="canFollowCurrent" type="success" plain @click="toggleFollow">
                  {{ relation?.is_following ? (relation?.is_friend ? '已是好友' : '已关注') : '关注' }}
                </el-button>
                <el-button v-if="canCallCurrent" type="primary" plain :icon="PhoneFilled" @click="callCurrentUser">通话</el-button>
                <el-button v-if="canBlockCurrent" :type="relation?.is_blocked ? 'warning' : 'danger'" plain @click="toggleBlock">
                  {{ relation?.is_blocked ? '取消拉黑' : '拉黑' }}
                </el-button>
                <el-button type="primary" link @click="goUserSpace(selectedConversation.user_id, 'profile')">资料</el-button>
              </template>
              <template v-else>
                <el-tag v-if="groupDetail?.group_no" effect="plain" type="success">群号 {{ groupDetail.group_no }}</el-tag>
                <el-button type="primary" plain @click="openGroupDetailDrawer">群详情</el-button>
              </template>
              <el-button v-if="selectedConversation" plain @click="openMessageSearchDrawer">搜索消息</el-button>
            </div>
          </div>

          <div ref="messageListRef" class="message-list" v-loading="messageLoading">
            <div
              v-for="item in messages"
              :key="item.id"
              class="message-row"
              :class="{ mine: isMine(item) }"
              :data-message-id="item.id"
            >
              <el-avatar :src="item.send_user_avatar ? $resolveImg(item.send_user_avatar) : ''" :size="38">
                {{ avatarText(item.send_user_nick_name) }}
              </el-avatar>
              <div class="message-box">
                <div class="message-meta">
                  <div class="message-meta-main">
                    <strong>{{ isMine(item) ? '我' : (item.send_user_nick_name || `用户${item.send_user_id}`) }}</strong>
                    <span>{{ formatTime(item.created_at) }}</span>
                    <span v-if="isMine(item)" class="read-status">{{ item.read_status_text || (item.is_read ? '已读' : '未读') }}</span>
                  </div>
                  <el-button v-if="item.can_recall && !item.is_recalled" type="primary" link @click="recallMessage(item)">撤回</el-button>
                </div>
                <div v-if="item.is_recalled" class="system-card recalled-card">该消息已撤回</div>
                <div v-else-if="item.msg_type === 'file'" class="file-card">
                  <div>
                    <strong>{{ item.file_name || '文件' }}</strong>
                    <p>{{ formatFileSize(item.file_size) }}</p>
                  </div>
                  <el-button type="primary" plain size="small" :icon="FolderOpened" @click="downloadFile(item)">下载</el-button>
                </div>
                <div v-else-if="item.msg_type === 'call'" class="system-card">{{ item.content }}</div>
                <div v-else class="text-card">{{ item.content }}</div>
              </div>
            </div>
            <el-empty v-if="!messageLoading && !messages.length" description="先发一条消息开始聊天吧" :image-size="90" />
          </div>

          <div class="composer">
            <el-input
              v-model="draft"
              type="textarea"
              :rows="4"
              maxlength="2000"
              show-word-limit
              resize="none"
              :disabled="composerDisabled"
              :placeholder="composerPlaceholder"
              @keydown.enter.prevent.exact="sendTextMessage"
            />
            <div class="composer-foot">
              <span>{{ composerTips }}</span>
              <div class="composer-actions">
                <el-upload v-if="canSendFiles" :show-file-list="false" :http-request="sendFileMessage">
                  <el-button plain>发送文件</el-button>
                </el-upload>
                <el-button type="primary" :loading="sending" :disabled="composerDisabled" @click="sendTextMessage">发送</el-button>
              </div>
            </div>
          </div>
        </template>
        <div v-else class="empty-panel">
          <el-empty description="从左侧选择好友或群组开始聊天" :image-size="110" />
        </div>
      </section>
    </div>

    <el-drawer v-model="friendDrawerVisible" title="好友列表" size="460px">
      <div class="drawer-toolbar friend-drawer-toolbar">
        <div class="friend-drawer-summary">
          <span>全部 {{ socialStore.summary.friend_count || socialStore.friends.length }}</span>
          <span>在线 {{ socialStore.summary.online_friend_count || 0 }}</span>
          <span>未读 {{ friendDrawerStats.unread }}</span>
        </div>
        <div class="friend-drawer-filters">
          <button
            v-for="item in friendDrawerTabs"
            :key="item.key"
            type="button"
            class="friend-chip"
            :class="{ active: friendDrawerFilter === item.key }"
            @click="friendDrawerFilter = item.key"
          >
            {{ item.label }}
            <span>{{ item.count }}</span>
          </button>
        </div>
        <el-input v-model="friendDrawerKeyword" clearable placeholder="搜索好友昵称、状态或最近消息">
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
      </div>
      <div class="drawer-list friend-drawer-list">
        <div v-for="item in filteredFriendDrawerList" :key="item.user_id" class="drawer-item friend-drawer-item">
          <div class="drawer-user">
            <el-avatar :src="item.avatar ? $resolveImg(item.avatar) : ''" :size="40">{{ avatarText(item.nick_name || item.user_name) }}</el-avatar>
            <div>
              <strong>{{ item.nick_name || item.user_name || `用户${item.user_id}` }}</strong>
              <p>{{ friendDrawerStatusText(item) }}</p>
            </div>
          </div>
          <div class="drawer-actions">
            <el-button link type="primary" @click="openDirectByUserId(item.user_id)">私信</el-button>
            <el-button link type="success" :disabled="!item.can_call" @click="socialStore.startAudioCall(item.user_id, item)">通话</el-button>
          </div>
        </div>
        <el-empty v-if="!filteredFriendDrawerList.length" :description="friendDrawerEmptyText" :image-size="70" />
      </div>
    </el-drawer>

    <el-drawer v-model="blockDrawerVisible" title="黑名单管理" size="420px">
      <div class="drawer-list">
        <div v-for="item in socialStore.blocks" :key="item.user_id" class="drawer-item">
          <div class="drawer-user">
            <el-avatar :src="item.avatar ? $resolveImg(item.avatar) : ''" :size="40">{{ avatarText(item.nick_name || item.user_name) }}</el-avatar>
            <div>
              <strong>{{ item.nick_name || item.user_name || `用户${item.user_id}` }}</strong>
              <p>{{ item.reason || '已拉黑' }}</p>
            </div>
          </div>
          <div class="drawer-actions">
            <el-button link type="warning" @click="unblockUser(item.user_id)">取消拉黑</el-button>
          </div>
        </div>
        <el-empty v-if="!socialStore.blocks.length" description="黑名单为空" :image-size="70" />
      </div>
    </el-drawer>

    <el-dialog v-model="groupDialogVisible" title="创建好友群组" width="640px">
      <div class="group-form">
        <el-input v-model="groupForm.name" maxlength="30" placeholder="群组名称" />
        <el-input v-model="groupForm.notice" maxlength="100" placeholder="群公告（可选）" />
        <el-input v-model="groupSearch" clearable placeholder="搜索好友，按最近聊天排序">
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        <el-checkbox-group v-model="groupForm.member_ids" class="member-list">
          <label v-for="item in candidateFriends" :key="item.user_id" class="member-item">
            <el-checkbox :label="item.user_id">
              <span>{{ item.nick_name || item.user_name || `用户${item.user_id}` }}</span>
              <small>{{ item.last_message_preview || presenceModeText(item.presence_mode) }}</small>
            </el-checkbox>
          </label>
        </el-checkbox-group>
      </div>
      <template #footer>
        <el-button @click="groupDialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="groupSubmitting" @click="submitGroup">创建群组</el-button>
      </template>
    </el-dialog>

    <el-drawer v-model="searchDrawerVisible" title="搜索博客号 / 群组号" size="560px">
      <div class="drawer-toolbar">
        <el-input v-model="searchText" clearable placeholder="输入博客号、昵称、用户名或群号" @keyup.enter="runDiscovery">
          <template #append>
            <el-button :loading="searchLoading" @click="runDiscovery">搜索</el-button>
          </template>
        </el-input>
      </div>

      <section class="discovery-section">
        <div class="section-title">用户</div>
        <div class="drawer-list">
          <div v-for="item in discoveryResult.users" :key="`user-${item.user_id}`" class="drawer-item discovery-item">
            <div class="drawer-user">
              <el-avatar :src="item.avatar ? $resolveImg(item.avatar) : ''" :size="42">{{ avatarText(item.nick_name || item.user_name) }}</el-avatar>
              <div>
                <strong>{{ item.nick_name || item.user_name || `用户${item.user_id}` }}</strong>
                <p>博客号 #{{ item.blog_no }} · {{ item.is_online ? '在线' : '离线' }}</p>
              </div>
            </div>
            <div class="drawer-actions">
              <el-button link type="primary" @click="openDiscoveryUser(item)">私信</el-button>
              <el-button v-if="!item.is_self" link type="success" @click="followDiscoveryUser(item)">
                {{ item.relation?.is_following ? '已关注' : '关注' }}
              </el-button>
            </div>
          </div>
          <el-empty v-if="!searchLoading && !discoveryResult.users.length" description="没有匹配的用户" :image-size="66" />
        </div>
      </section>

      <section class="discovery-section">
        <div class="section-title">群组</div>
        <div class="drawer-list">
          <div v-for="item in discoveryResult.groups" :key="`group-${item.id}`" class="drawer-item discovery-item">
            <div class="drawer-user">
              <el-avatar :src="item.avatar ? $resolveImg(item.avatar) : ''" :size="42">{{ avatarText(item.name) }}</el-avatar>
              <div>
                <strong>{{ item.name }}</strong>
                <p>群号 {{ item.group_no }} · {{ item.member_count || 0 }} 人</p>
              </div>
            </div>
            <div class="drawer-actions">
              <el-button v-if="item.is_joined" link type="primary" @click="openDiscoveryGroup(item)">进入</el-button>
              <el-button v-else link type="success" @click="joinDiscoveryGroup(item)">加入</el-button>
            </div>
          </div>
          <el-empty v-if="!searchLoading && !discoveryResult.groups.length" description="没有匹配的群组" :image-size="66" />
        </div>
      </section>
    </el-drawer>

    <el-drawer v-model="messageSearchDrawerVisible" title="消息搜索" size="520px">
      <div class="drawer-toolbar">
        <el-input v-model="messageSearchKeyword" clearable placeholder="输入关键词搜索当前会话" @keyup.enter="runMessageSearch">
          <template #append>
            <el-button :loading="messageSearchLoading" @click="runMessageSearch">搜索</el-button>
          </template>
        </el-input>
      </div>
      <div class="drawer-list">
        <div v-for="item in messageSearchResults" :key="`search-${item.id}`" class="search-item" @click="locateMessage(item.id)">
          <strong>{{ isMine(item) ? '我' : (item.send_user_nick_name || `用户${item.send_user_id}`) }}</strong>
          <span>{{ formatTime(item.created_at) }}</span>
          <p>{{ item.content || '该消息已撤回' }}</p>
        </div>
        <el-empty v-if="!messageSearchLoading && !messageSearchResults.length" description="没有搜索结果" :image-size="72" />
      </div>
    </el-drawer>

    <el-drawer v-model="callLogDrawerVisible" title="通话记录" size="520px">
      <div class="drawer-toolbar">
        <el-button :loading="callLogLoading" @click="loadCallLogs">刷新</el-button>
      </div>
      <div class="drawer-list">
        <div v-for="item in callLogs" :key="item.id" class="drawer-item call-log-item">
          <div class="drawer-user">
            <el-avatar :src="item.partner_avatar ? $resolveImg(item.partner_avatar) : ''" :size="40">{{ avatarText(item.partner_nick_name) }}</el-avatar>
            <div>
              <strong>{{ item.partner_nick_name || `用户${item.partner_user_id}` }}</strong>
              <p>{{ item.direction === 'incoming' ? '呼入' : '呼出' }} · {{ item.status_label }}</p>
            </div>
          </div>
          <div class="drawer-actions">
            <span class="call-log-duration">{{ formatCallDuration(item.duration_sec) }}</span>
            <el-button link type="primary" @click="openDirectByUserId(item.partner_user_id)">私信</el-button>
          </div>
        </div>
        <el-empty v-if="!callLogLoading && !callLogs.length" description="暂无通话记录" :image-size="72" />
      </div>
    </el-drawer>

    <el-drawer v-model="groupDetailDrawerVisible" title="群详情" size="640px">
      <div v-loading="groupDetailLoading" class="group-detail" v-if="groupDetail">
        <div class="group-hero">
          <el-avatar :src="groupDetail.avatar ? $resolveImg(groupDetail.avatar) : ''" :size="56">{{ avatarText(groupDetail.name) }}</el-avatar>
          <div class="group-copy">
            <h3>{{ groupDetail.name }}</h3>
            <p>群号 {{ groupDetail.group_no }} · {{ groupDetail.members?.length || 0 }} 人 · 你的身份：{{ groupDetail.viewer_role_label }}</p>
            <p class="group-notice">{{ groupDetail.notice || '暂无群公告' }}</p>
          </div>
        </div>

        <div v-if="groupDetail.can_manage || groupDetail.viewer_role === 'member'" class="group-manage-panel">
          <el-select
            v-if="groupDetail.can_manage"
            v-model="groupInviteMemberIds"
            multiple
            collapse-tags
            collapse-tags-tooltip
            clearable
            placeholder="从好友中拉人进群"
            style="width: 100%"
          >
            <el-option
              v-for="item in groupInviteCandidates"
              :key="item.user_id"
              :label="formatGroupInviteLabel(item)"
              :value="item.user_id"
            />
          </el-select>
          <div class="group-manage-actions">
            <el-button v-if="groupDetail.can_manage" type="primary" :loading="groupManageLoading" @click="submitAddGroupMembers">拉人进群</el-button>
            <el-button v-if="groupDetail.viewer_role === 'member'" type="danger" plain :loading="groupManageLoading" @click="leaveCurrentGroup">退出群组</el-button>
          </div>
        </div>

        <div class="drawer-list">
          <div v-for="member in groupDetail.members || []" :key="`member-${member.user_id}`" class="drawer-item group-member-item">
            <div class="drawer-user">
              <el-avatar :src="member.avatar ? $resolveImg(member.avatar) : ''" :size="40">{{ avatarText(member.nick_name || member.user_name) }}</el-avatar>
              <div>
                <strong>{{ member.nick_name || member.user_name || `用户${member.user_id}` }}</strong>
                <p>博客号 #{{ member.blog_no || member.user_id }} · {{ member.role_label }}</p>
              </div>
            </div>
            <div class="drawer-actions">
              <el-button
                v-if="canToggleGroupAdmin(member)"
                link
                type="warning"
                @click="toggleGroupAdmin(member)"
              >
                {{ member.role === 'admin' ? '取消管理员' : '设为管理员' }}
              </el-button>
              <el-button
                v-if="canTransferGroupOwner(member)"
                link
                type="success"
                @click="transferGroupOwner(member)"
              >
                转让群主
              </el-button>
              <el-button
                v-if="canRemoveGroupMember(member)"
                link
                type="danger"
                @click="removeGroupMember(member)"
              >
                {{ Number(member.user_id) === Number(userStore.currentUserId) ? '退出' : '移出' }}
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { FolderOpened, Lock, PhoneFilled, Plus, RefreshRight, Search, User } from '@element-plus/icons-vue'
import request from '@/utils/request'
import { useSocialStore } from '@/stores/social'
import { useUserStore } from '@/stores/user'
import { apiGetUserPublicProfile } from '@/api/user'
import {
  apiAddSocialGroupMembers,
  apiBlockUser,
  apiCreateSocialDirectMessage,
  apiCreateSocialGroup,
  apiCreateSocialGroupMessage,
  apiFollowUser,
  apiGetSocialCallLogs,
  apiGetSocialConversations,
  apiGetSocialDiscovery,
  apiGetSocialGroupDetail,
  apiGetSocialDirectMessages,
  apiGetSocialGroupMessages,
  apiGetSocialGroups,
  apiGetSocialRelation,
  apiJoinSocialGroup,
  apiRecallSocialMessage,
  apiRemoveSocialGroupMember,
  apiSearchSocialMessages,
  apiTransferSocialGroupOwner,
  apiUnblockUser,
  apiUnfollowUser,
  apiUpdateSocialGroupMemberRole,
  apiUploadSocialFile
} from '@/api/social'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const socialStore = useSocialStore()

const keyword = ref('')
const draft = ref('')
const groupSearch = ref('')
const friendDrawerKeyword = ref('')
const friendDrawerFilter = ref('all')
const messageListRef = ref(null)
const conversationLoading = ref(false)
const messageLoading = ref(false)
const sending = ref(false)
const groupSubmitting = ref(false)
const friendDrawerVisible = ref(false)
const blockDrawerVisible = ref(false)
const groupDialogVisible = ref(false)
const searchDrawerVisible = ref(false)
const searchLoading = ref(false)
const searchText = ref('')
const messageSearchDrawerVisible = ref(false)
const messageSearchKeyword = ref('')
const messageSearchLoading = ref(false)
const callLogDrawerVisible = ref(false)
const callLogLoading = ref(false)
const groupDetailDrawerVisible = ref(false)
const groupDetailLoading = ref(false)
const groupManageLoading = ref(false)

const conversationRecords = ref([])
const groups = ref([])
const messages = ref([])
const relation = ref(null)
const placeholderConversation = ref(null)
const groupForm = ref({ name: '', notice: '', member_ids: [] })
const discoveryResult = ref({ users: [], groups: [] })
const messageSearchResults = ref([])
const callLogs = ref([])
const groupDetail = ref(null)
const groupInviteMemberIds = ref([])

const currentPresenceText = computed(() => socialStore.summary.presence?.status_text || presenceModeText(socialStore.summary.presence?.mode))
const friendDrawerStats = computed(() => ({
  all: socialStore.friends.length,
  online: socialStore.friends.filter((item) => item.is_online).length,
  offline: socialStore.friends.filter((item) => !item.is_online).length,
  unread: socialStore.friends.filter((item) => Number(item.unread_count || 0) > 0).length
}))
const friendDrawerTabs = computed(() => ([
  { key: 'all', label: '全部', count: friendDrawerStats.value.all },
  { key: 'online', label: '在线', count: friendDrawerStats.value.online },
  { key: 'offline', label: '离线', count: friendDrawerStats.value.offline },
  { key: 'unread', label: '未读', count: friendDrawerStats.value.unread }
]))

const allConversations = computed(() => {
  const map = new Map()
  conversationRecords.value.forEach(item => map.set(item.conversation_key, item))
  groups.value.forEach(item => {
    const key = item.conversation_key || `group:${item.id}`
    if (map.has(key)) return
    map.set(key, {
      conversation_key: key,
      conversation_type: 'group',
      group_id: item.id,
      title: item.name,
      avatar: item.avatar,
      latest_message: '',
      latest_at: item.created_at,
      unread_count: 0,
      member_count: item.member_count || item.member_ids?.length || 0
    })
  })
  return Array.from(map.values()).sort((a, b) => new Date(b.latest_at || 0) - new Date(a.latest_at || 0))
})

const filteredConversations = computed(() => {
  const text = keyword.value.trim().toLowerCase()
  if (!text) return allConversations.value
  return allConversations.value.filter(item => `${item.title || ''}${item.latest_message || ''}`.toLowerCase().includes(text))
})

const selectedConversation = computed(() => {
  const groupId = Number(route.query.group_id) || 0
  if (groupId) return allConversations.value.find(item => Number(item.group_id) === groupId) || placeholderConversation.value
  const userId = Number(route.query.user_id) || 0
  if (userId) return allConversations.value.find(item => Number(item.user_id) === userId) || placeholderConversation.value
  return placeholderConversation.value || allConversations.value[0] || null
})

const isDirectConversation = computed(() => selectedConversation.value?.conversation_type === 'direct')
const canFollowCurrent = computed(() => isDirectConversation.value && Number(selectedConversation.value?.user_id) > 0)
const canBlockCurrent = computed(() => canFollowCurrent.value)
const canCallCurrent = computed(() => Boolean(relation.value?.can_call))
const canSendFiles = computed(() => selectedConversation.value?.conversation_type === 'group' || Boolean(relation.value?.can_send_file))
const composerDisabled = computed(() => {
  if (!selectedConversation.value) return true
  if (isDirectConversation.value && relation.value && !relation.value.can_direct_message) return true
  return false
})
const composerPlaceholder = computed(() => {
  if (composerDisabled.value) return '当前会话不可发送消息'
  if (selectedConversation.value?.conversation_type === 'group') return '输入群消息，Enter 发送'
  return relation.value?.is_friend ? '输入私信内容，好友支持文件和语音' : '非好友仅支持文字私信'
})
const composerTips = computed(() => {
  if (selectedConversation.value?.conversation_type === 'group') return '群成员可发送文件'
  if (!relation.value) return '正在加载关系'
  if (relation.value.is_blocked || relation.value.blocked_by_them) return '存在拉黑关系，当前无法发消息'
  return relation.value.is_friend ? '已是好友，可发文件和语音' : '非好友仅支持文字私信'
})
const chatSubTitle = computed(() => {
  if (!selectedConversation.value) return ''
  if (selectedConversation.value.conversation_type === 'group') return `${selectedConversation.value.member_count || 0} 位成员`
  if (!relation.value) return '正在加载关系...'
  if (relation.value.is_blocked) return '你已拉黑对方'
  if (relation.value.blocked_by_them) return '对方已拉黑你'
  if (relation.value.is_friend) {
    const item = socialStore.friendMap.get(Number(selectedConversation.value.user_id))
    return `${item?.is_online ? '在线' : '离线'} · ${item?.presence_text || presenceModeText(item?.presence_mode)}`
  }
  return relation.value.follows_me ? 'TA 已关注你' : '非好友，可发送文字私信'
})
const candidateFriends = computed(() => {
  const text = groupSearch.value.trim().toLowerCase()
  return socialStore.friends.filter(item => {
    if (!text) return true
    return `${item.nick_name || ''}${item.user_name || ''}${item.last_message_preview || ''}`.toLowerCase().includes(text)
  })
})
const filteredFriendDrawerList = computed(() => {
  let list = socialStore.friends
  if (friendDrawerFilter.value === 'online') {
    list = list.filter((item) => item.is_online)
  }
  if (friendDrawerFilter.value === 'offline') {
    list = list.filter((item) => !item.is_online)
  }
  if (friendDrawerFilter.value === 'unread') {
    list = list.filter((item) => Number(item.unread_count || 0) > 0)
  }

  const text = friendDrawerKeyword.value.trim().toLowerCase()
  if (!text) return list
  return list.filter((item) => {
    return [
      item.nick_name,
      item.user_name,
      item.presence_text,
      item.last_message_preview,
      item.user_id
    ].filter(Boolean).join(' ').toLowerCase().includes(text)
  })
})
const friendDrawerEmptyText = computed(() => {
  if (friendDrawerKeyword.value.trim()) return '没有匹配的好友'
  if (friendDrawerFilter.value === 'online') return '暂无在线好友'
  if (friendDrawerFilter.value === 'offline') return '暂无离线好友'
  if (friendDrawerFilter.value === 'unread') return '当前没有未读会话'
  return '还没有好友'
})
const groupInviteCandidates = computed(() => {
  const memberSet = new Set((groupDetail.value?.members || []).map(item => Number(item.user_id)))
  return socialStore.friends.filter(item => !memberSet.has(Number(item.user_id)))
})

function avatarText(name) {
  return (name || '聊').trim().charAt(0) || '聊'
}
function isMine(item) {
  return Number(item?.send_user_id) === Number(userStore.currentUserId)
}
function presenceModeText(mode) {
  return { online: '在线', busy: '忙碌', away: '离开', vacation: '放假中', travel: '旅游中', invisible: '隐身', offline: '离线' }[mode] || '在线'
}
function friendDrawerStatusText(item) {
  const presence = item.presence_text || presenceModeText(item.presence_mode)
  const state = item.is_online ? '在线' : '离线'
  if (item.last_message_preview) {
    return `${state} · ${presence} · ${item.last_message_preview}`
  }
  return `${state} · ${presence}`
}
function formatTime(value, compact = false) {
  if (!value) return '-'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return value
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  if (compact) return `${m}-${day} ${hh}:${mm}`
  return `${y}-${m}-${day} ${hh}:${mm}:${String(d.getSeconds()).padStart(2, '0')}`
}
function formatFileSize(size) {
  const num = Number(size || 0)
  if (num < 1024) return `${num}B`
  if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)}KB`
  if (num < 1024 * 1024 * 1024) return `${(num / 1024 / 1024).toFixed(1)}MB`
  return `${(num / 1024 / 1024 / 1024).toFixed(1)}GB`
}
function formatCallDuration(duration) {
  const total = Math.max(0, Number(duration || 0))
  const minute = String(Math.floor(total / 60)).padStart(2, '0')
  const second = String(total % 60).padStart(2, '0')
  return `${minute}:${second}`
}
function formatGroupInviteLabel(item) {
  const name = item?.nick_name || item?.user_name || `用户${item?.user_id || ''}`
  return `${name}（#${item?.blog_no || item?.user_id || ''}）`
}
function goUserSpace(userId, tab = 'posts') {
  if (!userId) return
  router.push({ name: 'UserSpace', params: { id: String(userId) }, query: tab === 'posts' ? {} : { tab } })
}
function scrollBottom() {
  nextTick(() => {
    if (messageListRef.value) messageListRef.value.scrollTop = messageListRef.value.scrollHeight
  })
}
function scrollToMessage(messageId) {
  nextTick(() => {
    const target = messageListRef.value?.querySelector?.(`[data-message-id="${messageId}"]`)
    target?.scrollIntoView?.({ behavior: 'smooth', block: 'center' })
  })
}
function currentConversationSearchParams(keyword) {
  if (!selectedConversation.value) return null
  const payload = { keyword: keyword.trim() }
  if (!payload.keyword) return null
  if (selectedConversation.value.conversation_type === 'group') {
    payload.group_id = selectedConversation.value.group_id
  } else {
    payload.user_id = selectedConversation.value.user_id
  }
  return payload
}
function canToggleGroupAdmin(member) {
  return groupDetail.value?.viewer_role === 'owner' && member?.role !== 'owner'
}
function canTransferGroupOwner(member) {
  return groupDetail.value?.viewer_role === 'owner' && member?.role !== 'owner'
}
function canRemoveGroupMember(member) {
  if (!member) return false
  const selfId = Number(userStore.currentUserId)
  if (groupDetail.value?.viewer_role === 'owner') {
    return member.role !== 'owner'
  }
  if (groupDetail.value?.viewer_role === 'admin') {
    return member.role === 'member'
  }
  return Number(member.user_id) === selfId && member.role !== 'owner'
}

async function loadConversations() {
  const res = await apiGetSocialConversations()
  conversationRecords.value = Array.isArray(res.data) ? res.data : []
}
async function loadGroups() {
  const res = await apiGetSocialGroups()
  groups.value = Array.isArray(res.data) ? res.data : []
}
async function loadGroupDetail(groupId = Number(selectedConversation.value?.group_id || 0)) {
  if (!groupId) {
    groupDetail.value = null
    return
  }
  groupDetailLoading.value = true
  try {
    const res = await apiGetSocialGroupDetail(groupId)
    groupDetail.value = res.data || null
  } catch (e) {
    groupDetail.value = null
    ElMessage.error(e?.response?.data?.msg || '获取群详情失败')
  } finally {
    groupDetailLoading.value = false
  }
}
async function loadRelation(userId) {
  if (!userId) { relation.value = null; return }
  try {
    const res = await apiGetSocialRelation(userId)
    relation.value = res.data || null
  } catch {
    relation.value = null
  }
}
async function loadDirectMessages(userId) {
  messageLoading.value = true
  try {
    const res = await apiGetSocialDirectMessages({ user_id: userId })
    messages.value = Array.isArray(res.data) ? res.data : []
    scrollBottom()
  } catch (e) {
    messages.value = []
    ElMessage.error(e?.response?.data?.msg || '获取私信记录失败')
  } finally {
    messageLoading.value = false
  }
}
async function loadGroupMessages(groupId) {
  messageLoading.value = true
  try {
    const res = await apiGetSocialGroupMessages(groupId)
    messages.value = Array.isArray(res.data) ? res.data : []
    scrollBottom()
  } catch (e) {
    messages.value = []
    ElMessage.error(e?.response?.data?.msg || '获取群消息失败')
  } finally {
    messageLoading.value = false
  }
}
async function loadCallLogs() {
  callLogLoading.value = true
  try {
    const res = await apiGetSocialCallLogs({ limit: 50 })
    callLogs.value = Array.isArray(res.data) ? res.data : []
  } catch (e) {
    callLogs.value = []
    ElMessage.error(e?.response?.data?.msg || '获取通话记录失败')
  } finally {
    callLogLoading.value = false
  }
}
async function buildDirectPlaceholder(userId) {
  try {
    const res = await apiGetUserPublicProfile(userId)
    const profile = res.data || {}
    return {
      conversation_key: `direct:${Math.min(Number(userId), Number(userStore.currentUserId))}:${Math.max(Number(userId), Number(userStore.currentUserId))}`,
      conversation_type: 'direct',
      user_id: Number(userId),
      title: profile.nick_name || profile.user_name || `用户${userId}`,
      avatar: profile.avatar || '',
      latest_message: '',
      latest_at: '',
      unread_count: 0,
      is_friend: false
    }
  } catch {
    return null
  }
}
async function syncSelectionFromRoute() {
  const groupId = Number(route.query.group_id) || 0
  const userId = Number(route.query.user_id) || 0
  if (groupId) {
    placeholderConversation.value = null
    await Promise.all([loadGroupMessages(groupId), loadGroupDetail(groupId)])
    relation.value = null
    return
  }
  if (userId) {
    groupDetailDrawerVisible.value = false
    groupDetail.value = null
    const found = allConversations.value.find(item => Number(item.user_id) === userId)
    placeholderConversation.value = found ? null : await buildDirectPlaceholder(userId)
    await Promise.all([loadRelation(userId), loadDirectMessages(userId)])
    return
  }
  placeholderConversation.value = null
  groupDetailDrawerVisible.value = false
  groupDetail.value = null
  if (allConversations.value[0]) await selectConversation(allConversations.value[0])
}
function openDiscoveryDrawer() {
  searchDrawerVisible.value = true
  if (!searchText.value.trim()) {
    searchText.value = String(selectedConversation.value?.title || '').trim()
  }
  if (searchText.value.trim()) {
    runDiscovery()
  }
}
async function runDiscovery() {
  const key = searchText.value.trim()
  if (!key) {
    ElMessage.warning('请输入博客号、昵称或群组号')
    return
  }
  searchLoading.value = true
  try {
    const res = await apiGetSocialDiscovery({ key })
    discoveryResult.value = {
      users: Array.isArray(res.data?.users) ? res.data.users : [],
      groups: Array.isArray(res.data?.groups) ? res.data.groups : []
    }
  } catch (e) {
    discoveryResult.value = { users: [], groups: [] }
    ElMessage.error(e?.response?.data?.msg || '搜索失败')
  } finally {
    searchLoading.value = false
  }
}
async function followDiscoveryUser(item) {
  if (!item?.user_id) return
  try {
    if (item.relation?.is_following) {
      await apiUnfollowUser(item.user_id)
      ElMessage.success('已取消关注')
    } else {
      await apiFollowUser(item.user_id)
      ElMessage.success('关注成功')
    }
    await Promise.all([runDiscovery(), socialStore.refreshSocialData()])
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '操作失败')
  }
}
function openDiscoveryUser(item) {
  searchDrawerVisible.value = false
  router.push({ name: 'PrivateMessages', query: { user_id: String(item.user_id) } })
}
function openDiscoveryGroup(item) {
  searchDrawerVisible.value = false
  router.push({ name: 'PrivateMessages', query: { group_id: String(item.id) } })
}
async function joinDiscoveryGroup(item) {
  try {
    await apiJoinSocialGroup({ group_no: item.group_no })
    ElMessage.success('已加入群组')
    await Promise.all([loadGroups(), loadConversations()])
    openDiscoveryGroup(item)
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '加入群组失败')
  }
}
function openMessageSearchDrawer() {
  if (!selectedConversation.value) return
  messageSearchDrawerVisible.value = true
  messageSearchResults.value = []
  messageSearchKeyword.value = ''
}
async function runMessageSearch() {
  const params = currentConversationSearchParams(messageSearchKeyword.value)
  if (!params) {
    ElMessage.warning('请输入搜索关键词')
    return
  }
  messageSearchLoading.value = true
  try {
    const res = await apiSearchSocialMessages(params)
    messageSearchResults.value = Array.isArray(res.data) ? res.data : []
  } catch (e) {
    messageSearchResults.value = []
    ElMessage.error(e?.response?.data?.msg || '消息搜索失败')
  } finally {
    messageSearchLoading.value = false
  }
}
function locateMessage(messageId) {
  messageSearchDrawerVisible.value = false
  scrollToMessage(messageId)
}
function openCallLogDrawer() {
  callLogDrawerVisible.value = true
  loadCallLogs()
}
async function openGroupDetailDrawer() {
  if (!selectedConversation.value?.group_id) return
  groupDetailDrawerVisible.value = true
  groupInviteMemberIds.value = []
  await loadGroupDetail(selectedConversation.value.group_id)
}
async function refreshAll() {
  conversationLoading.value = true
  try {
    await socialStore.ensureStarted()
    await Promise.all([socialStore.refreshSocialData(), loadConversations(), loadGroups(), loadCallLogs()])
    await syncSelectionFromRoute()
  } catch {
    ElMessage.error('刷新聊天数据失败')
  } finally {
    conversationLoading.value = false
  }
}
async function selectConversation(item) {
  if (!item) return
  if (item.conversation_type === 'group') {
    await router.replace({ name: 'PrivateMessages', query: { group_id: String(item.group_id) } })
    return
  }
  await router.replace({ name: 'PrivateMessages', query: { user_id: String(item.user_id) } })
}
async function refreshAfterSend() {
  await Promise.all([loadConversations(), loadGroups()])
  if (selectedConversation.value?.conversation_type === 'group') {
    await Promise.all([loadGroupMessages(selectedConversation.value.group_id), groupDetailDrawerVisible.value ? loadGroupDetail(selectedConversation.value.group_id) : Promise.resolve()])
  } else if (selectedConversation.value?.user_id) {
    await Promise.all([loadDirectMessages(selectedConversation.value.user_id), socialStore.refreshFriends()])
  }
}
async function sendTextMessage() {
  const content = draft.value.trim()
  if (!selectedConversation.value || !content) {
    if (!content) ElMessage.warning('消息内容不能为空')
    return
  }
  sending.value = true
  try {
    if (selectedConversation.value.conversation_type === 'group') {
      await apiCreateSocialGroupMessage(selectedConversation.value.group_id, { content, msg_type: 'text' })
    } else {
      await apiCreateSocialDirectMessage({ rev_user_id: selectedConversation.value.user_id, content, msg_type: 'text' })
    }
    draft.value = ''
    await refreshAfterSend()
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '发送失败')
  } finally {
    sending.value = false
  }
}
async function sendFileMessage(option) {
  try {
    const formData = new FormData()
    formData.append('file', option.file)
    const uploadRes = await apiUploadSocialFile(formData)
    const file = uploadRes.data || {}
    if (selectedConversation.value?.conversation_type === 'group') {
      await apiCreateSocialGroupMessage(selectedConversation.value.group_id, { msg_type: 'file', file_id: file.id })
    } else {
      await apiCreateSocialDirectMessage({ rev_user_id: selectedConversation.value?.user_id, msg_type: 'file', file_id: file.id })
    }
    ElMessage.success('文件发送成功')
    await refreshAfterSend()
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '文件发送失败')
  }
}
async function downloadFile(item) {
  try {
    const response = await request.get(`/social/files/${item.file_id}/download`, { responseType: 'blob' })
    const blob = response.data instanceof Blob ? response.data : new Blob([response.data])
    const matched = String(response.headers?.['content-disposition'] || '').match(/filename\*=UTF-8''([^;]+)|filename=\"?([^\";]+)\"?/i)
    const fileName = matched?.[1] ? decodeURIComponent(matched[1]) : (matched?.[2] || item.file_name || `文件_${Date.now()}`)
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(url)
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '下载失败')
  }
}
async function toggleFollow() {
  const userId = Number(selectedConversation.value?.user_id || 0)
  if (!userId) return
  try {
    if (relation.value?.is_following) {
      await apiUnfollowUser(userId)
      ElMessage.success('已取消关注')
    } else {
      await apiFollowUser(userId)
      ElMessage.success('关注成功')
    }
    await Promise.all([loadRelation(userId), socialStore.refreshSocialData()])
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '操作失败')
  }
}
async function toggleBlock() {
  const userId = Number(selectedConversation.value?.user_id || 0)
  if (!userId) return
  try {
    if (relation.value?.is_blocked) {
      await apiUnblockUser(userId)
      ElMessage.success('已取消拉黑')
    } else {
      await apiBlockUser(userId, {})
      ElMessage.success('已加入黑名单')
    }
    await Promise.all([loadRelation(userId), socialStore.refreshSocialData(), loadConversations()])
    await loadDirectMessages(userId)
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '操作失败')
  }
}
function callCurrentUser() {
  const userId = Number(selectedConversation.value?.user_id || 0)
  if (!userId) return
  const friend = socialStore.friendMap.get(userId)
  socialStore.startAudioCall(userId, friend || { user_id: userId, nick_name: selectedConversation.value?.title, avatar: selectedConversation.value?.avatar })
}
async function unblockUser(userId) {
  try {
    await apiUnblockUser(userId)
    ElMessage.success('已取消拉黑')
    await socialStore.refreshSocialData()
    if (Number(selectedConversation.value?.user_id || 0) === Number(userId)) await loadRelation(userId)
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '操作失败')
  }
}
async function submitGroup() {
  if (!groupForm.value.name.trim()) return ElMessage.warning('请输入群组名称')
  if (!groupForm.value.member_ids.length) return ElMessage.warning('请至少选择一位好友')
  groupSubmitting.value = true
  try {
    const res = await apiCreateSocialGroup({
      name: groupForm.value.name.trim(),
      notice: groupForm.value.notice.trim(),
      member_ids: groupForm.value.member_ids
    })
    groupDialogVisible.value = false
    groupForm.value = { name: '', notice: '', member_ids: [] }
    groupSearch.value = ''
    await Promise.all([loadGroups(), loadConversations()])
    const groupId = Number(res.data?.id || 0)
    if (groupId) await router.replace({ name: 'PrivateMessages', query: { group_id: String(groupId) } })
    ElMessage.success('群组创建成功')
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '群组创建失败')
  } finally {
    groupSubmitting.value = false
  }
}
async function recallMessage(item) {
  try {
    await apiRecallSocialMessage(item.id)
    ElMessage.success('消息已撤回')
    await refreshAfterSend()
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '撤回失败')
  }
}
async function submitAddGroupMembers() {
  if (!selectedConversation.value?.group_id || !groupInviteMemberIds.value.length) {
    ElMessage.warning('请先选择要拉进群的好友')
    return
  }
  groupManageLoading.value = true
  try {
    await apiAddSocialGroupMembers(selectedConversation.value.group_id, {
      member_ids: groupInviteMemberIds.value
    })
    ElMessage.success('已拉人进群')
    groupInviteMemberIds.value = []
    await Promise.all([loadGroupDetail(selectedConversation.value.group_id), loadGroups(), loadConversations()])
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '拉人进群失败')
  } finally {
    groupManageLoading.value = false
  }
}
async function toggleGroupAdmin(member) {
  if (!selectedConversation.value?.group_id || !member?.user_id) return
  groupManageLoading.value = true
  try {
    await apiUpdateSocialGroupMemberRole(selectedConversation.value.group_id, member.user_id, {
      role: member.role === 'admin' ? 'member' : 'admin'
    })
    ElMessage.success(member.role === 'admin' ? '已取消管理员' : '已设为管理员')
    await loadGroupDetail(selectedConversation.value.group_id)
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '更新群成员角色失败')
  } finally {
    groupManageLoading.value = false
  }
}
async function transferGroupOwner(member) {
  if (!selectedConversation.value?.group_id || !member?.user_id) return
  const memberName = member.nick_name || member.user_name || `用户${member.user_id}`
  try {
    await ElMessageBox.confirm(`确定将群主转让给 ${memberName} 吗？`, '转让群主', { type: 'warning' })
    groupManageLoading.value = true
    await apiTransferSocialGroupOwner(selectedConversation.value.group_id, { user_id: member.user_id })
    ElMessage.success('群主转让成功')
    await Promise.all([loadGroupDetail(selectedConversation.value.group_id), loadGroups(), loadConversations()])
  } catch (e) {
    if (e !== 'cancel' && e !== 'close') {
      ElMessage.error(e?.response?.data?.msg || '转让群主失败')
    }
  } finally {
    groupManageLoading.value = false
  }
}
async function removeGroupMember(member) {
  if (!selectedConversation.value?.group_id || !member?.user_id) return
  const isSelf = Number(member.user_id) === Number(userStore.currentUserId)
  const memberName = member.nick_name || member.user_name || `用户${member.user_id}`
  try {
    await ElMessageBox.confirm(isSelf ? '确定退出当前群组吗？' : `确定将 ${memberName} 移出群组吗？`, isSelf ? '退出群组' : '移出成员', { type: 'warning' })
    groupManageLoading.value = true
    await apiRemoveSocialGroupMember(selectedConversation.value.group_id, member.user_id)
    ElMessage.success(isSelf ? '已退出群组' : '已移出群成员')
    await Promise.all([loadGroups(), loadConversations()])
    if (isSelf) {
      groupDetailDrawerVisible.value = false
      groupDetail.value = null
      const next = allConversations.value[0]
      if (next) {
        await selectConversation(next)
      } else {
        await router.replace({ name: 'PrivateMessages', query: {} })
        messages.value = []
      }
      return
    }
    await loadGroupDetail(selectedConversation.value.group_id)
  } catch (e) {
    if (e !== 'cancel' && e !== 'close') {
      ElMessage.error(e?.response?.data?.msg || '操作失败')
    }
  } finally {
    groupManageLoading.value = false
  }
}
function leaveCurrentGroup() {
  const self = (groupDetail.value?.members || []).find(item => Number(item.user_id) === Number(userStore.currentUserId))
  if (self) removeGroupMember(self)
}
function openDirectByUserId(userId) {
  friendDrawerVisible.value = false
  searchDrawerVisible.value = false
  callLogDrawerVisible.value = false
  router.push({ name: 'PrivateMessages', query: { user_id: String(userId) } })
}

watch(() => [route.query.user_id, route.query.group_id], async () => {
  await syncSelectionFromRoute()
})
watch(() => socialStore.messageVersion, async () => {
  await loadConversations()
  if (selectedConversation.value?.conversation_type === 'group') {
    await Promise.all([
      loadGroupMessages(selectedConversation.value.group_id),
      groupDetailDrawerVisible.value ? loadGroupDetail(selectedConversation.value.group_id) : Promise.resolve()
    ])
    return
  }
  if (selectedConversation.value?.user_id) {
    await Promise.all([loadDirectMessages(selectedConversation.value.user_id), socialStore.refreshFriends()])
  }
  if (callLogDrawerVisible.value) {
    await loadCallLogs()
  }
})
onMounted(async () => {
  await refreshAll()
})
</script>

<style scoped>
.social-page { display: grid; gap: 16px; }
.summary-row { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
.summary-card, .conversation-panel, .chat-panel { background: rgba(255,255,255,0.96); border: 1px solid rgba(148,163,184,0.2); box-shadow: 0 18px 46px rgba(15,23,42,0.08); }
.summary-card { border-radius: 22px; padding: 18px 20px; background: linear-gradient(145deg, rgba(14,165,233,0.12), rgba(16,185,129,0.12)); }
.summary-card span, .conversation-title span, .conversation-desc p, .chat-user p, .message-meta span, .composer-foot span, .drawer-user p, .member-item small { color: #64748b; font-size: 12px; }
.summary-card strong { display: block; margin-top: 6px; color: #0f172a; font-size: 24px; }
.social-shell { display: grid; grid-template-columns: 320px minmax(0, 1fr); gap: 18px; min-height: calc(100vh - 250px); }
.conversation-panel, .chat-panel { border-radius: 26px; }
.conversation-panel { display: flex; flex-direction: column; gap: 14px; padding: 20px; }
.panel-head-actions { display: flex; align-items: center; gap: 8px; }
.panel-head, .chat-head, .conversation-title, .conversation-desc, .composer-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.panel-kicker { margin: 0 0 6px; color: #0284c7; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; }
.panel-head h2, .chat-user h3 { margin: 0; color: #0f172a; }
.action-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
.conversation-list { flex: 1; min-height: 0; overflow: auto; display: grid; gap: 10px; }
.conversation-item { width: 100%; display: flex; gap: 12px; align-items: center; padding: 14px; border-radius: 20px; background: #f8fbff; border: 1px solid transparent; cursor: pointer; text-align: left; transition: all 0.2s ease; }
.conversation-item:hover, .conversation-item.active { border-color: rgba(14,165,233,0.24); background: linear-gradient(145deg, rgba(14,165,233,0.12), rgba(16,185,129,0.12)); }
.conversation-main { flex: 1; min-width: 0; }
.conversation-title strong, .chat-user h3, .message-meta strong, .drawer-user strong { color: #0f172a; }
.conversation-desc { margin-top: 6px; }
.conversation-desc p { margin: 0; flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.chat-panel { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.chat-head { padding: 22px 24px; border-bottom: 1px solid rgba(226,232,240,0.9); }
.chat-user { display: flex; align-items: center; gap: 14px; }
.chat-tools { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.message-list { flex: 1; min-height: 0; overflow: auto; padding: 24px; background: radial-gradient(circle at top right, rgba(14,165,233,0.08), transparent 32%), linear-gradient(180deg, #f8fbff 0%, #ffffff 100%); }
.message-row { display: flex; align-items: flex-end; gap: 12px; margin-bottom: 18px; }
.message-row.mine { flex-direction: row-reverse; }
.message-box { max-width: min(76%, 720px); }
.message-meta { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
.message-meta-main { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.read-status { padding: 2px 8px; border-radius: 999px; background: #eef6ff; color: #0f6fa3; }
.text-card, .file-card, .system-card { border-radius: 18px; border: 1px solid rgba(203,213,225,0.82); background: #fff; box-shadow: 0 12px 24px rgba(15,23,42,0.05); }
.text-card { padding: 12px 16px; color: #0f172a; line-height: 1.7; white-space: pre-wrap; word-break: break-word; }
.message-row.mine .text-card { background: linear-gradient(145deg, #0ea5e9, #2563eb); color: #fff; border-color: transparent; }
.file-card { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px 16px; }
.file-card p { margin: 4px 0 0; color: #64748b; font-size: 12px; }
.system-card { padding: 10px 14px; color: #0f766e; }
.recalled-card { color: #8a5a1b; background: #fff7ed; border-color: #fed7aa; }
.composer { padding: 18px 22px 22px; border-top: 1px solid rgba(226,232,240,0.9); }
.composer-actions { display: flex; align-items: center; gap: 8px; }
.empty-panel { flex: 1; display: grid; place-items: center; }
.drawer-list { display: grid; gap: 12px; }
.drawer-item { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px; border-radius: 18px; background: #f8fbff; border: 1px solid #dbeafe; }
.drawer-user { display: flex; align-items: center; gap: 12px; }
.drawer-actions { display: flex; align-items: center; gap: 6px; }
.drawer-toolbar { margin-bottom: 12px; }
.friend-drawer-toolbar { display: grid; gap: 12px; }
.friend-drawer-summary { display: flex; gap: 10px; flex-wrap: wrap; color: #64748b; font-size: 12px; }
.friend-drawer-filters { display: flex; gap: 8px; flex-wrap: wrap; }
.friend-chip { border: 1px solid #d9e5f1; background: #fff; color: #315472; border-radius: 999px; padding: 6px 10px; font-size: 12px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
.friend-chip span { color: #0f7ea5; }
.friend-chip.active { border-color: #9dcfe2; background: #eef9fd; color: #0f6f8d; }
.friend-drawer-list { max-height: calc(100vh - 210px); overflow: auto; padding-right: 2px; }
.friend-drawer-item { align-items: flex-start; }
.friend-drawer-item .drawer-user p { max-width: 240px; line-height: 1.6; }
.discovery-section + .discovery-section { margin-top: 18px; }
.section-title { margin-bottom: 10px; color: #1e3a5f; font-size: 14px; font-weight: 700; }
.discovery-item { align-items: flex-start; }
.search-item { padding: 12px 14px; border-radius: 16px; border: 1px solid #dbeafe; background: #f8fbff; cursor: pointer; display: grid; gap: 6px; }
.search-item strong { color: #0f172a; }
.search-item p { margin: 0; color: #3d556f; line-height: 1.7; }
.call-log-item { align-items: center; }
.call-log-duration { min-width: 48px; color: #0f6fa3; font-size: 12px; text-align: right; }
.group-detail { display: grid; gap: 16px; }
.group-hero { display: flex; gap: 14px; align-items: flex-start; padding: 14px; border-radius: 18px; background: linear-gradient(145deg, rgba(14,165,233,0.1), rgba(16,185,129,0.12)); }
.group-copy h3 { margin: 0; color: #0f172a; }
.group-copy p { margin: 6px 0 0; color: #4a617b; line-height: 1.7; }
.group-notice { color: #0f6b8a; }
.group-manage-panel { display: grid; gap: 10px; padding: 14px; border-radius: 18px; border: 1px solid #dbeafe; background: #f8fbff; }
.group-manage-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.group-form { display: grid; gap: 12px; }
.member-list { max-height: 340px; overflow: auto; display: grid; gap: 8px; }
.member-item { display: block; padding: 10px 12px; border-radius: 14px; background: #f8fbff; border: 1px solid #dbeafe; }
.member-item span { display: block; color: #0f172a; }
@media (max-width: 1100px) { .summary-row { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 960px) { .social-shell { grid-template-columns: 1fr; } }
@media (max-width: 640px) {
  .summary-row, .action-row { grid-template-columns: 1fr; }
  .panel-head, .chat-head, .conversation-title, .conversation-desc, .composer-foot, .chat-tools, .drawer-item, .file-card, .group-hero { flex-direction: column; align-items: flex-start; }
  .message-box { max-width: 100%; }
}
</style>
