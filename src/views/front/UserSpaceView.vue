<template>
  <div class="user-space-page" v-loading="profileLoading">
    <section v-if="profile" class="space-hero">
      <div class="space-hero-main">
        <el-avatar
          :size="108"
          :src="profile.avatar ? $resolveImg(profile.avatar) : ''"
          class="hero-avatar"
          @click="switchTab('profile')"
        >
          {{ avatarText(profile.nick_name || profile.user_name) }}
        </el-avatar>

        <div class="hero-copy">
          <div class="hero-headline">
            <div>
              <p class="hero-kicker">User Space</p>
              <h1>{{ profile.nick_name || profile.user_name || `用户${profile.id}` }}</h1>
            </div>
            <div class="hero-actions">
              <el-button @click="switchTab('profile')">查看资料</el-button>
              <el-button @click="switchTab('posts')">访问空间</el-button>
              <el-button
                v-if="canFollowUser"
                type="success"
                plain
                @click="toggleFollow"
              >
                {{ socialRelation?.is_following ? (socialRelation?.is_friend ? '已是好友' : '已关注') : '关注' }}
              </el-button>
              <el-button
                v-if="canSendPrivateMessage"
                type="primary"
                @click="startPrivateMessage(profile.id)"
              >
                发私信
              </el-button>
              <el-button
                v-if="canBlockUser"
                :type="socialRelation?.is_blocked ? 'warning' : 'danger'"
                plain
                @click="toggleBlock"
              >
                {{ socialRelation?.is_blocked ? '取消拉黑' : '拉黑' }}
              </el-button>
              <el-button
                v-if="profile.is_self"
                type="primary"
                plain
                @click="router.push({ name: 'Profile' })"
              >
                编辑资料
              </el-button>
            </div>
          </div>

          <p class="hero-sign">{{ profile.sign || '这个人很懒，还没有留下签名。' }}</p>

          <div class="hero-meta">
            <span>博客号：#{{ profile.id }}</span>
            <span>角色：{{ profile.role || '普通用户' }}</span>
            <span>注册于 {{ formatDateTime(profile.created_at, false) }}</span>
            <span v-if="socialRelation?.is_friend">你们已互相关注</span>
            <span v-else-if="socialRelation?.follows_me">TA 已关注你</span>
            <a
              v-if="profile.link"
              :href="profile.link"
              target="_blank"
              rel="noopener noreferrer"
              class="hero-link"
            >
              个人主页
            </a>
          </div>

          <div class="hero-stats">
            <div class="stat-card">
              <span>动态</span>
              <strong>{{ profile.stats?.post_count || 0 }}</strong>
            </div>
            <div class="stat-card">
              <span>留言</span>
              <strong>{{ profile.stats?.guestbook_count || 0 }}</strong>
            </div>
            <div class="stat-card">
              <span>文章</span>
              <strong>{{ profile.stats?.article_count || 0 }}</strong>
            </div>
            <div class="stat-card">
              <span>等级</span>
              <strong>Lv.{{ profile.level || 1 }}</strong>
            </div>
            <div class="stat-card">
              <span>经验</span>
              <strong>{{ profile.experience || 0 }}</strong>
            </div>
            <div class="stat-card">
              <span>积分</span>
              <strong>{{ profile.points || 0 }}</strong>
            </div>
          </div>

          <div v-if="Array.isArray(profile.managed_boards) && profile.managed_boards.length" class="managed-boards">
            <span class="managed-label">负责板块</span>
            <el-tag
              v-for="board in profile.managed_boards"
              :key="board"
              effect="plain"
              round
            >
              {{ board }}
            </el-tag>
          </div>
        </div>
      </div>
    </section>

    <el-tabs v-if="profile" v-model="activeTab" class="space-tabs">
      <el-tab-pane label="个人信息" name="profile">
        <section class="panel profile-panel">
          <div class="info-grid">
            <article class="info-card">
              <span>博客号</span>
              <strong>#{{ profile.id || '-' }}</strong>
            </article>
            <article class="info-card">
              <span>用户名</span>
              <strong>{{ profile.user_name || '-' }}</strong>
            </article>
            <article class="info-card">
              <span>昵称</span>
              <strong>{{ profile.nick_name || '-' }}</strong>
            </article>
            <article class="info-card">
              <span>角色</span>
              <strong>{{ profile.role || '普通用户' }}</strong>
            </article>
            <article class="info-card">
              <span>等级</span>
              <strong>Lv.{{ profile.level || 1 }}</strong>
            </article>
            <article class="info-card">
              <span>经验</span>
              <strong>{{ profile.experience || 0 }}</strong>
            </article>
            <article class="info-card">
              <span>积分</span>
              <strong>{{ profile.points || 0 }}</strong>
            </article>
          </div>
        </section>
      </el-tab-pane>

      <el-tab-pane label="空间动态" name="posts">
        <section v-if="canCreatePost" class="panel composer-panel">
          <div class="panel-header">
            <h3>发布动态</h3>
            <span>类似 QQ 空间的说说，可附带文件</span>
          </div>
          <el-input
            v-model="postForm.content"
            type="textarea"
            :rows="5"
            maxlength="5000"
            show-word-limit
            placeholder="分享一下最近的状态、心得、项目更新..."
          />
          <div class="composer-tools">
            <div class="tool-left">
              <el-switch v-model="postForm.is_private" />
              <span>仅自己和管理员可见</span>
            </div>
            <el-upload :show-file-list="false" :http-request="handlePostAttachmentUpload">
              <el-button plain>上传文件</el-button>
            </el-upload>
          </div>
          <div v-if="postForm.attachments.length" class="attachment-list">
            <div
              v-for="(item, index) in postForm.attachments"
              :key="`${item.url}-${index}`"
              class="attachment-item"
            >
              <button type="button" class="attachment-link" @click="downloadAttachment(item)">
                {{ item.name || `附件 ${index + 1}` }}
              </button>
              <span>{{ formatFileSize(item.size) }}</span>
              <el-button type="danger" link @click="removePostAttachment(index)">移除</el-button>
            </div>
          </div>
          <div class="composer-actions">
            <el-button type="primary" :loading="postSubmitting" @click="submitPost">发布动态</el-button>
          </div>
        </section>

        <section class="panel list-panel" v-loading="postLoading">
          <div class="panel-header">
            <h3>空间动态</h3>
            <span>{{ postTotal }} 条</span>
          </div>

          <div v-if="posts.length" class="space-list">
            <article v-for="item in posts" :key="item.id" class="space-card">
              <header class="space-card-header">
                <div class="space-author">
                  <el-avatar :size="42" :src="item.user_avatar ? $resolveImg(item.user_avatar) : ''">
                    {{ avatarText(item.user_nick_name) }}
                  </el-avatar>
                  <div>
                    <strong>{{ item.user_nick_name || `用户${item.user_id}` }}</strong>
                    <span>{{ formatDateTime(item.created_at) }}</span>
                  </div>
                </div>
                <div class="space-card-actions">
                  <el-tag v-if="item.is_private" type="warning" size="small" effect="plain">私密</el-tag>
                  <el-button
                    v-if="canDeletePost(item)"
                    type="danger"
                    link
                    @click="removePost(item.id)"
                  >
                    删除
                  </el-button>
                </div>
              </header>
              <div class="space-content">{{ item.content }}</div>
              <div v-if="Array.isArray(item.attachments) && item.attachments.length" class="attachment-list">
                <div
                  v-for="(attachment, index) in item.attachments"
                  :key="`${attachment.url}-${index}`"
                  class="attachment-item"
                >
                  <button type="button" class="attachment-link" @click="downloadAttachment(attachment)">
                    {{ attachment.name || `附件 ${index + 1}` }}
                  </button>
                  <span>{{ formatFileSize(attachment.size) }}</span>
                </div>
              </div>
            </article>
          </div>
          <el-empty v-else-if="!postLoading" description="还没有空间动态" />

          <el-pagination
            v-if="postTotal > postPageSize"
            background
            layout="total, prev, pager, next"
            :current-page="postPage"
            :page-size="postPageSize"
            :total="postTotal"
            class="pager"
            @current-change="loadPosts"
          />
        </section>
      </el-tab-pane>

      <el-tab-pane label="文章" name="articles">
        <section class="panel list-panel" v-loading="articleLoading">
          <div class="panel-header">
            <h3>发布文章</h3>
            <span>{{ articleTotal }} 篇</span>
          </div>

          <div v-if="articles.length" class="article-list">
            <article
              v-for="item in articles"
              :key="item.id"
              class="article-card"
              @click="router.push({ name: 'ArticleDetail', params: { id: item.id } })"
            >
              <div class="article-head">
                <h4>{{ item.title }}</h4>
                <div class="article-tags">
                  <el-tag v-if="item.is_private" type="warning" size="small" effect="plain">私密</el-tag>
                  <el-tag
                    v-if="Number(item.review_status) === 1"
                    type="warning"
                    size="small"
                    effect="plain"
                  >
                    待审核
                  </el-tag>
                  <el-tag
                    v-else-if="Number(item.review_status) === 3"
                    type="danger"
                    size="small"
                    effect="plain"
                  >
                    已驳回
                  </el-tag>
                </div>
              </div>
              <p>{{ item.abstract || '暂无摘要' }}</p>
              <footer>
                <span>{{ formatDateTime(item.created_at) }}</span>
                <span>{{ item.look_count || 0 }} 浏览 · {{ item.comment_count || 0 }} 评论</span>
              </footer>
            </article>
          </div>
          <el-empty v-else-if="!articleLoading" description="暂无文章" />

          <el-pagination
            v-if="articleTotal > articlePageSize"
            background
            layout="total, prev, pager, next"
            :current-page="articlePage"
            :page-size="articlePageSize"
            :total="articleTotal"
            class="pager"
            @current-change="loadArticles"
          />
        </section>
      </el-tab-pane>

      <el-tab-pane label="留言板" name="guestbook">
        <section class="panel composer-panel">
          <div class="panel-header">
            <h3>留言板</h3>
            <span>给 TA 留下一句话</span>
          </div>
          <div v-if="userStore.isLoggedIn" class="guestbook-form">
            <el-input
              v-model="messageForm.content"
              type="textarea"
              :rows="4"
              maxlength="1000"
              show-word-limit
              placeholder="写下你的留言..."
            />
            <div class="composer-tools">
              <div class="tool-left">
                <el-switch v-model="messageForm.is_private" />
                <span>设为私密留言</span>
              </div>
              <el-button type="primary" :loading="messageSubmitting" @click="submitMessage">发送留言</el-button>
            </div>
          </div>
          <div v-else class="guestbook-login">
            需要登录后才能留言。
            <el-button type="primary" link @click="router.push('/login')">去登录</el-button>
          </div>
        </section>

        <section class="panel list-panel" v-loading="messageLoading">
          <div class="panel-header">
            <h3>空间留言</h3>
            <span>{{ messageTotal }} 条</span>
          </div>

          <div v-if="messages.length" class="space-list">
            <article v-for="item in messages" :key="item.id" class="space-card">
              <header class="space-card-header">
                <div class="space-author">
                  <el-avatar
                    :size="40"
                    :src="item.user_avatar ? $resolveImg(item.user_avatar) : ''"
                    class="clickable-avatar"
                    @click="goUserSpace(item.user_id, 'profile')"
                  >
                    {{ avatarText(item.user_nick_name) }}
                  </el-avatar>
                  <div>
                    <strong class="clickable-name" @click="goUserSpace(item.user_id, 'posts')">
                      {{ item.user_nick_name || `用户${item.user_id}` }}
                    </strong>
                    <span>{{ formatDateTime(item.created_at) }}</span>
                  </div>
                </div>
                <div class="space-card-actions">
                  <el-tag v-if="item.is_private" type="warning" size="small" effect="plain">私密</el-tag>
                  <el-button
                    v-if="canDeleteGuestbook(item)"
                    type="danger"
                    link
                    @click="removeMessage(item.id)"
                  >
                    删除
                  </el-button>
                </div>
              </header>
              <div class="space-content">{{ item.content }}</div>
            </article>
          </div>
          <el-empty v-else-if="!messageLoading" description="还没有留言" />

          <el-pagination
            v-if="messageTotal > messagePageSize"
            background
            layout="total, prev, pager, next"
            :current-page="messagePage"
            :page-size="messagePageSize"
            :total="messageTotal"
            class="pager"
            @current-change="loadMessages"
          />
        </section>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { apiGetArticleList, apiUploadArticleFile } from '@/api/article'
import { apiBlockUser, apiFollowUser, apiGetSocialRelation, apiUnblockUser, apiUnfollowUser } from '@/api/social'
import {
  apiCreateUserSpaceMessage,
  apiCreateUserSpacePost,
  apiDeleteUserSpaceMessage,
  apiDeleteUserSpacePost,
  apiGetUserPublicProfile,
  apiGetUserSpaceMessages,
  apiGetUserSpacePosts
} from '@/api/user'
import request from '@/utils/request'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const profile = ref(null)
const profileLoading = ref(false)
const socialRelation = ref(null)

const activeTab = ref('posts')

const posts = ref([])
const postLoading = ref(false)
const postSubmitting = ref(false)
const postPage = ref(1)
const postPageSize = 10
const postTotal = ref(0)
const postForm = ref({
  content: '',
  attachments: [],
  is_private: false
})

const articles = ref([])
const articleLoading = ref(false)
const articlePage = ref(1)
const articlePageSize = 8
const articleTotal = ref(0)

const messages = ref([])
const messageLoading = ref(false)
const messageSubmitting = ref(false)
const messagePage = ref(1)
const messagePageSize = 10
const messageTotal = ref(0)
const messageForm = ref({
  content: '',
  is_private: false
})

const spaceUserId = computed(() => Number(route.params.id) || 0)
const canCreatePost = computed(() => Boolean(profile.value?.is_self))
const canFollowUser = computed(() => {
  return userStore.isLoggedIn && !profile.value?.is_self && Number(profile.value?.id) > 0
})
const canBlockUser = computed(() => canFollowUser.value)
const canSendPrivateMessage = computed(() => {
  if (!userStore.isLoggedIn || profile.value?.is_self) return false
  if (!socialRelation.value) return true
  return Boolean(socialRelation.value.can_direct_message)
})

function normalizeTab(value) {
  return ['profile', 'posts', 'articles', 'guestbook'].includes(String(value)) ? String(value) : 'posts'
}

function avatarText(name) {
  return (name || '空').trim().charAt(0) || '空'
}

function switchTab(tab) {
  activeTab.value = normalizeTab(tab)
}

function formatDateTime(value, withTime = true) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  if (!withTime) return `${y}-${m}-${d}`
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

function formatFileSize(size) {
  const num = Number(size || 0)
  if (num < 1024) return `${num}B`
  if (num < 1024 * 1024) return `${(num / 1024).toFixed(1)}KB`
  return `${(num / 1024 / 1024).toFixed(1)}MB`
}

function goUserSpace(userId, tab = 'posts') {
  const target = Number(userId) || 0
  if (!target) return
  router.push({ name: 'UserSpace', params: { id: String(target) }, query: { tab: normalizeTab(tab) } })
}

function startPrivateMessage(userId) {
  router.push({ name: 'PrivateMessages', query: { user_id: String(userId) } })
}

function canDeletePost(item) {
  return Boolean(profile.value?.can_manage_space) || userStore.isAdmin || Number(item?.user_id) === Number(userStore.currentUserId)
}

function canDeleteGuestbook(item) {
  return userStore.isAdmin || Boolean(profile.value?.can_manage_space) || Number(item?.user_id) === Number(userStore.currentUserId)
}

function normalizeDownloadUrl(url) {
  const value = String(url || '').trim()
  if (!value) return '#'
  if (value.startsWith('http')) return value
  if (value.startsWith('/')) return value
  return `/${value}`
}

function parseAttachmentFileId(url) {
  const matched = normalizeDownloadUrl(url).match(/\/api\/files\/(\d+)\/download/i)
  return matched?.[1] || ''
}

function resolveDownloadFileName(disposition, fallback) {
  const value = String(disposition || '')
  const utf8Match = value.match(/filename\*=UTF-8''([^;]+)/i)
  if (utf8Match?.[1]) {
    try {
      return decodeURIComponent(utf8Match[1])
    } catch {
      return utf8Match[1]
    }
  }
  const plainMatch = value.match(/filename=\"?([^\";]+)\"?/i)
  return plainMatch?.[1] || fallback || `附件_${Date.now()}`
}

async function downloadAttachment(item) {
  const fileId = parseAttachmentFileId(item?.url)
  if (!fileId) {
    ElMessage.warning('附件地址不合法')
    return
  }
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录后再下载附件')
    router.push({ path: '/login', query: { redirect: route.fullPath } })
    return
  }

  try {
    const response = await request.get(`/files/${fileId}/download`, {
      responseType: 'blob'
    })
    const fileName = resolveDownloadFileName(
      response.headers?.['content-disposition'],
      item?.name || `附件_${fileId}`
    )
    const blob = response.data instanceof Blob ? response.data : new Blob([response.data])
    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(blobUrl)
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '附件下载失败')
  }
}

async function loadProfile() {
  if (!spaceUserId.value) {
    profile.value = null
    return
  }
  profileLoading.value = true
  try {
    const res = await apiGetUserPublicProfile(spaceUserId.value)
    profile.value = res.data || null
  } catch {
    profile.value = null
    ElMessage.error('获取用户空间失败')
  } finally {
    profileLoading.value = false
  }
}

async function loadSocialRelation() {
  if (!spaceUserId.value || !userStore.isLoggedIn || Number(spaceUserId.value) === Number(userStore.currentUserId)) {
    socialRelation.value = null
    return
  }
  try {
    const res = await apiGetSocialRelation(spaceUserId.value)
    socialRelation.value = res.data || null
  } catch {
    socialRelation.value = null
  }
}

async function loadPosts(page = 1) {
  if (!spaceUserId.value) return
  postPage.value = page
  postLoading.value = true
  try {
    const res = await apiGetUserSpacePosts(spaceUserId.value, {
      page,
      limit: postPageSize
    })
    const data = res.data || {}
    posts.value = data.list || []
    postTotal.value = Number(data.count || data.total || 0)
  } catch {
    posts.value = []
    postTotal.value = 0
    ElMessage.error('获取空间动态失败')
  } finally {
    postLoading.value = false
  }
}

async function loadArticles(page = 1) {
  if (!spaceUserId.value) return
  articlePage.value = page
  articleLoading.value = true
  try {
    const params = {
      page,
      limit: articlePageSize,
      sort: 'created_at desc'
    }

    if (profile.value?.is_self) {
      params.is_user = true
    } else {
      params.user_id = spaceUserId.value
      if (profile.value?.can_manage_space && userStore.isAdmin) {
        params.review_scope = 'all'
      }
    }

    const res = await apiGetArticleList(params)
    const data = res.data || {}
    articles.value = data.list || []
    articleTotal.value = Number(data.count || data.total || 0)
  } catch {
    articles.value = []
    articleTotal.value = 0
    ElMessage.error('获取文章列表失败')
  } finally {
    articleLoading.value = false
  }
}

async function loadMessages(page = 1) {
  if (!spaceUserId.value) return
  messagePage.value = page
  messageLoading.value = true
  try {
    const res = await apiGetUserSpaceMessages(spaceUserId.value, {
      page,
      limit: messagePageSize
    })
    const data = res.data || {}
    messages.value = data.list || []
    messageTotal.value = Number(data.count || data.total || 0)
  } catch {
    messages.value = []
    messageTotal.value = 0
    ElMessage.error('获取留言板失败')
  } finally {
    messageLoading.value = false
  }
}

async function refreshSpace() {
  await loadProfile()
  if (!profile.value) return
  await loadSocialRelation()
  await Promise.all([loadPosts(1), loadArticles(1), loadMessages(1)])
}

async function toggleFollow() {
  if (!spaceUserId.value) return
  try {
    if (socialRelation.value?.is_following) {
      await apiUnfollowUser(spaceUserId.value)
      ElMessage.success('已取消关注')
    } else {
      await apiFollowUser(spaceUserId.value)
      ElMessage.success('关注成功')
    }
    await loadSocialRelation()
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '操作失败')
  }
}

async function toggleBlock() {
  if (!spaceUserId.value) return
  try {
    if (socialRelation.value?.is_blocked) {
      await apiUnblockUser(spaceUserId.value)
      ElMessage.success('已取消拉黑')
    } else {
      await apiBlockUser(spaceUserId.value, {})
      ElMessage.success('已加入黑名单')
    }
    await loadSocialRelation()
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '操作失败')
  }
}

async function handlePostAttachmentUpload(option) {
  try {
    const formData = new FormData()
    formData.append('file', option.file)
    const res = await apiUploadArticleFile(formData)
    const item = res.data || {}
    postForm.value.attachments.push({
      file_id: Number(item.id || 0),
      name: item.name || option.file.name,
      url: item.url,
      size: Number(item.size || option.file.size || 0)
    })
    ElMessage.success('文件上传成功')
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '文件上传失败')
  }
}

function removePostAttachment(index) {
  postForm.value.attachments.splice(index, 1)
}

async function submitPost() {
  const content = postForm.value.content.trim()
  if (!content) {
    ElMessage.warning('动态内容不能为空')
    return
  }
  postSubmitting.value = true
  try {
    await apiCreateUserSpacePost({
      content,
      attachments: postForm.value.attachments,
      is_private: Boolean(postForm.value.is_private)
    })
    ElMessage.success('动态发布成功')
    postForm.value = {
      content: '',
      attachments: [],
      is_private: false
    }
    await Promise.all([loadProfile(), loadPosts(1)])
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '动态发布失败')
  } finally {
    postSubmitting.value = false
  }
}

async function removePost(id) {
  try {
    await ElMessageBox.confirm('确定删除这条动态吗？', '删除确认', { type: 'warning' })
    await apiDeleteUserSpacePost(id)
    ElMessage.success('动态已删除')
    await Promise.all([loadProfile(), loadPosts(postPage.value)])
  } catch {
    // ignore
  }
}

async function submitMessage() {
  const content = messageForm.value.content.trim()
  if (!content) {
    ElMessage.warning('留言内容不能为空')
    return
  }
  if (!spaceUserId.value) return
  messageSubmitting.value = true
  try {
    await apiCreateUserSpaceMessage({
      space_user_id: spaceUserId.value,
      content,
      is_private: Boolean(messageForm.value.is_private)
    })
    ElMessage.success('留言成功')
    messageForm.value = {
      content: '',
      is_private: false
    }
    await Promise.all([loadProfile(), loadMessages(1)])
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '留言失败')
  } finally {
    messageSubmitting.value = false
  }
}

async function removeMessage(id) {
  try {
    await ElMessageBox.confirm('确定删除这条留言吗？', '删除确认', { type: 'warning' })
    await apiDeleteUserSpaceMessage(id)
    ElMessage.success('留言已删除')
    await Promise.all([loadProfile(), loadMessages(messagePage.value)])
  } catch {
    // ignore
  }
}

watch(
  () => route.query.tab,
  (value) => {
    activeTab.value = normalizeTab(value)
  },
  { immediate: true }
)

watch(activeTab, (value) => {
  const normalized = normalizeTab(value)
  const current = normalizeTab(route.query.tab)
  if (current === normalized) return

  const nextQuery = { ...route.query }
  if (normalized === 'posts') {
    delete nextQuery.tab
  } else {
    nextQuery.tab = normalized
  }
  router.replace({ query: nextQuery })
})

watch(
  () => route.params.id,
  async () => {
    await refreshSpace()
  }
)

onMounted(async () => {
  await refreshSpace()
})
</script>

<style scoped>
.user-space-page {
  display: grid;
  gap: 16px;
}

.space-hero {
  border-radius: 26px;
  padding: 24px;
  background:
    radial-gradient(circle at top right, rgba(14, 165, 233, 0.18), transparent 32%),
    linear-gradient(135deg, #122f52 0%, #0f7899 100%);
  color: #effaff;
}

.space-hero-main {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 20px;
  align-items: center;
}

.hero-avatar {
  border: 4px solid rgba(255, 255, 255, 0.24);
  cursor: pointer;
}

.hero-kicker {
  margin: 0 0 8px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  opacity: 0.82;
}

.hero-headline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.hero-headline h1 {
  margin: 0;
  font-size: 34px;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.hero-sign {
  margin: 12px 0 0;
  line-height: 1.8;
  opacity: 0.94;
}

.hero-meta {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 13px;
  opacity: 0.92;
}

.hero-link {
  color: #f6fbff;
}

.hero-stats {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
}

.stat-card {
  border-radius: 16px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
}

.stat-card span {
  display: block;
  font-size: 12px;
  opacity: 0.8;
}

.stat-card strong {
  display: block;
  margin-top: 6px;
  font-size: 20px;
}

.managed-boards {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.managed-label {
  font-size: 13px;
  opacity: 0.85;
}

.space-tabs :deep(.el-tabs__header) {
  margin-bottom: 8px;
}

.panel {
  border-radius: 20px;
  border: 1px solid rgba(214, 225, 236, 0.9);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 16px 42px rgba(15, 23, 42, 0.05);
  padding: 18px;
}

.panel-header {
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.panel-header h3 {
  margin: 0;
  color: #12395f;
  font-size: 18px;
}

.panel-header span {
  font-size: 12px;
  color: #6c819b;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.info-card {
  border-radius: 16px;
  border: 1px solid #e2eaf2;
  padding: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #f9fcff 100%);
}

.info-card span {
  display: block;
  font-size: 12px;
  color: #7389a2;
}

.info-card strong {
  display: block;
  margin-top: 8px;
  color: #12385b;
  font-size: 18px;
}

.composer-panel {
  display: grid;
  gap: 12px;
}

.composer-tools {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.tool-left {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #60748e;
  font-size: 13px;
}

.composer-actions {
  display: flex;
  justify-content: flex-end;
}

.space-list,
.article-list {
  display: grid;
  gap: 12px;
}

.space-card,
.article-card {
  border-radius: 16px;
  border: 1px solid #e4ecf4;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  padding: 16px;
}

.space-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.space-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.space-author strong {
  display: block;
  color: #173b61;
}

.space-author span {
  display: block;
  margin-top: 4px;
  color: #6d839d;
  font-size: 12px;
}

.space-card-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.space-content {
  margin-top: 14px;
  color: #2d435d;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
}

.attachment-list {
  margin-top: 12px;
  display: grid;
  gap: 8px;
}

.attachment-item {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 8px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f7fbff;
  border: 1px solid #e1ebf4;
}

.attachment-link {
  border: none;
  background: transparent;
  padding: 0;
  text-align: left;
  color: #0f7897;
  cursor: pointer;
}

.article-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.08);
}

.article-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.article-head h4 {
  margin: 0;
  font-size: 18px;
  color: #133a5f;
}

.article-tags {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.article-card p {
  margin: 10px 0 0;
  color: #61758f;
  line-height: 1.7;
}

.article-card footer {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #70849f;
  font-size: 12px;
  flex-wrap: wrap;
}

.guestbook-form,
.guestbook-login {
  display: grid;
  gap: 12px;
}

.clickable-avatar,
.clickable-name {
  cursor: pointer;
}

.pager {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

@media (max-width: 1100px) {
  .hero-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .info-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .space-hero-main,
  .hero-headline,
  .space-card-header {
    grid-template-columns: 1fr;
    display: grid;
  }

  .hero-actions,
  .composer-tools {
    justify-content: flex-start;
  }

  .hero-stats,
  .info-grid {
    grid-template-columns: 1fr 1fr;
  }

  .attachment-item {
    grid-template-columns: 1fr;
  }
}
</style>
