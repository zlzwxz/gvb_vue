<template>
  <div class="post-detail-page" v-loading="loading">
    <template v-if="post">
      <section class="hero-card">
        <div class="hero-left">
          <el-button text @click="goBack">
            返回{{ scene === 'bounty' ? '赏金大厅' : '闲聊广场' }}
          </el-button>
          <div class="hero-title-row">
            <el-tag v-if="post.is_pinned" type="warning" effect="dark">置顶</el-tag>
            <el-tag :type="scene === 'bounty' ? 'danger' : 'primary'" effect="plain">
              {{ post.category || '综合交流' }}
            </el-tag>
            <el-tag effect="plain">{{ post.status_label }}</el-tag>
          </div>
          <h1>{{ post.title }}</h1>
          <p class="hero-summary">{{ post.summary || post.content }}</p>
          <div class="hero-meta">
            <div class="author-line">
              <el-avatar :size="34" :src="post.user_avatar ? $resolveImg(post.user_avatar) : ''">
                {{ avatarText(post.user_nick_name) }}
              </el-avatar>
              <span>{{ post.user_nick_name || `用户${post.user_id}` }}</span>
            </div>
            <span><el-icon><View /></el-icon>{{ post.view_count || 0 }} 浏览</span>
            <span><el-icon><ChatDotRound /></el-icon>{{ post.reply_count || 0 }} 回复</span>
            <span>{{ formatTime(post.created_at) }}</span>
          </div>
        </div>

        <div class="hero-right">
          <div v-if="scene === 'bounty'" class="bounty-board">
            <div class="bounty-item">
              <span>赏金</span>
              <strong>{{ Number(post.budget || 0) }} {{ post.reward_unit || '积分' }}</strong>
            </div>
            <div class="bounty-item">
              <span>承接人</span>
              <strong>{{ post.accepted_user_nick || '待认领' }}</strong>
            </div>
            <div class="bounty-item">
              <span>截止时间</span>
              <strong>{{ formatDate(post.deadline) }}</strong>
            </div>
          </div>

          <div class="action-board">
            <el-button
              v-if="scene === 'bounty' && post.can_accept"
              type="primary"
              @click="acceptBounty"
            >
              立即接单
            </el-button>
            <el-button v-if="post.can_edit" type="danger" plain @click="removePost">
              删除帖子
            </el-button>
            <el-button v-if="!userStore.isLoggedIn" @click="goLogin">
              登录后互动
            </el-button>
          </div>

          <div v-if="post.can_manage_status" class="status-board">
            <el-select v-model="statusDraft" style="width: 100%">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-button type="primary" plain :loading="statusSaving" @click="updateStatus">
              更新状态
            </el-button>
          </div>
        </div>
      </section>

      <div class="detail-layout">
        <section class="content-column">
          <article class="panel content-panel">
            <div v-if="post.cover_image" class="cover-wrap">
              <img :src="$resolveImg(post.cover_image)" :alt="post.title" />
            </div>
            <div v-if="post.tags?.length" class="tag-list">
              <span v-for="tag in post.tags" :key="`${post.id}-${tag}`" class="tag-chip">#{{ tag }}</span>
            </div>
            <div class="content-body">{{ post.content }}</div>
          </article>

          <section class="panel reply-panel">
            <div class="panel-header">
              <div>
                <h3>回复区</h3>
                <span>{{ replies.length }} 条回复</span>
              </div>
            </div>

            <div v-if="replyTargetNick" class="reply-target-bar">
              正在回复 {{ replyTargetNick }}
              <el-button link type="primary" @click="clearReplyTarget">取消</el-button>
            </div>

            <div v-if="userStore.isLoggedIn" class="reply-editor">
              <el-input
                v-model="replyContent"
                type="textarea"
                :rows="4"
                maxlength="2000"
                show-word-limit
                :placeholder="post.can_reply ? '输入你的回复内容' : '当前状态下不可回复'"
              />
              <div class="reply-actions">
                <span>{{ post.can_reply ? '支持回复楼层，适合做贴吧式串楼交流。' : '帖子当前不可继续回复。' }}</span>
                <el-button type="primary" :disabled="!post.can_reply" :loading="replySubmitting" @click="submitReply">
                  发送回复
                </el-button>
              </div>
            </div>

            <div v-else class="login-tip">
              <p>登录后可以参与回复、接单和状态流转。</p>
              <el-button type="primary" @click="goLogin">去登录</el-button>
            </div>

            <div class="reply-list">
              <article v-for="item in replies" :key="item.id" class="reply-card">
                <div class="reply-head">
                  <div class="author-line">
                    <el-avatar :size="32" :src="item.user_avatar ? $resolveImg(item.user_avatar) : ''">
                      {{ avatarText(item.user_nick_name) }}
                    </el-avatar>
                    <div>
                      <strong>{{ item.user_nick_name || `用户${item.user_id}` }}</strong>
                      <span>{{ formatTime(item.created_at) }}</span>
                    </div>
                  </div>
                  <div class="reply-tools">
                    <el-tag v-if="item.is_official" type="danger" effect="plain" size="small">官方</el-tag>
                    <el-button
                      v-if="userStore.isLoggedIn && post.can_reply"
                      link
                      type="primary"
                      @click="setReplyTarget(item)"
                    >
                      回复 TA
                    </el-button>
                  </div>
                </div>
                <div v-if="item.quoted_user_nick" class="quoted-line">
                  回复 @{{ item.quoted_user_nick }}
                </div>
                <div class="reply-content">{{ item.content }}</div>
              </article>
              <el-empty v-if="!replies.length" description="还没有回复，来抢第一个沙发" />
            </div>
          </section>
        </section>

        <aside class="side-column">
          <section class="panel">
            <div class="panel-header">
              <div>
                <h3>{{ scene === 'bounty' ? '任务说明' : '帖子信息' }}</h3>
                <span>基础概览</span>
              </div>
            </div>
            <div class="info-list">
              <div class="info-item">
                <span>场景</span>
                <strong>{{ scene === 'bounty' ? '赏金' : '交流' }}</strong>
              </div>
              <div class="info-item">
                <span>状态</span>
                <strong>{{ post.status_label }}</strong>
              </div>
              <div class="info-item">
                <span>最后活跃</span>
                <strong>{{ formatTime(post.updated_at) }}</strong>
              </div>
              <div class="info-item">
                <span>最后回复</span>
                <strong>{{ post.last_reply_nick || '暂无' }}</strong>
              </div>
            </div>
          </section>

          <section class="panel" v-if="related.length">
            <div class="panel-header">
              <div>
                <h3>{{ scene === 'bounty' ? '相似任务' : '相关帖子' }}</h3>
                <span>同分类内容</span>
              </div>
            </div>
            <div class="related-list">
              <button
                v-for="item in related"
                :key="`related-${item.id}`"
                type="button"
                class="related-item"
                @click="goRelated(item)"
              >
                <strong>{{ item.title }}</strong>
                <span>{{ item.reply_count || 0 }} 回复 · {{ item.view_count || 0 }} 浏览</span>
              </button>
            </div>
          </section>
        </aside>
      </div>
    </template>

    <el-empty v-else-if="!loading" description="帖子不存在或已被删除">
      <el-button type="primary" @click="goBack">返回列表</el-button>
    </el-empty>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'
import {
  apiAcceptCommunityBounty,
  apiCreateCommunityReply,
  apiDeleteCommunityPost,
  apiGetCommunityPostDetail,
  apiUpdateCommunityPostStatus
} from '@/api/social'
import { ChatDotRound, View } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const replySubmitting = ref(false)
const statusSaving = ref(false)
const post = ref(null)
const replies = ref([])
const related = ref([])
const replyContent = ref('')
const replyParentId = ref(0)
const replyTargetNick = ref('')
const statusDraft = ref('')

const scene = computed(() => route.meta.scene === 'bounty' ? 'bounty' : 'plaza')
const postId = computed(() => Number(route.params.id || 0))
const statusOptions = computed(() => {
  if (scene.value === 'bounty') {
    return [
      { label: '招募中', value: 'open' },
      { label: '进行中', value: 'in_progress' },
      { label: '已完成', value: 'resolved' },
      { label: '已关闭', value: 'closed' }
    ]
  }
  return [
    { label: '交流中', value: 'published' },
    { label: '已解决', value: 'resolved' },
    { label: '已归档', value: 'closed' }
  ]
})

function avatarText(value) {
  return String(value || '帖').trim().charAt(0) || '帖'
}

function formatTime(value) {
  if (!value) return '刚刚'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  const diff = Date.now() - date.getTime()
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  if (diff < hour) return `${Math.max(1, Math.floor(diff / minute))} 分钟前`
  if (diff < day) return `${Math.floor(diff / hour)} 小时前`
  if (diff < day * 7) return `${Math.floor(diff / day)} 天前`
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function formatDate(value) {
  if (!value) return '未设置'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function sceneListRouteName() {
  return scene.value === 'bounty' ? 'BountyHub' : 'CommunityHub'
}

function sceneDetailRouteName() {
  return scene.value === 'bounty' ? 'BountyPostDetail' : 'CommunityPostDetail'
}

function goBack() {
  router.push({ name: sceneListRouteName() })
}

function goLogin() {
  router.push({
    path: '/login',
    query: {
      redirect: route.fullPath
    }
  })
}

function clearReplyTarget() {
  replyParentId.value = 0
  replyTargetNick.value = ''
}

function setReplyTarget(item) {
  replyParentId.value = Number(item.id || 0)
  replyTargetNick.value = item.user_nick_name || `用户${item.user_id}`
}

async function loadDetail() {
  if (!postId.value) {
    post.value = null
    replies.value = []
    related.value = []
    return
  }
  loading.value = true
  try {
    const res = await apiGetCommunityPostDetail(postId.value)
    post.value = res.data?.post || null
    replies.value = res.data?.replies || []
    related.value = res.data?.related || []
    statusDraft.value = post.value?.status || ''
    clearReplyTarget()
  } catch (error) {
    post.value = null
    replies.value = []
    related.value = []
    ElMessage.error(error?.message || '获取帖子详情失败')
  } finally {
    loading.value = false
  }
}

async function submitReply() {
  if (!userStore.isLoggedIn) {
    goLogin()
    return
  }
  if (!replyContent.value.trim()) {
    ElMessage.warning('请输入回复内容')
    return
  }
  replySubmitting.value = true
  try {
    await apiCreateCommunityReply(postId.value, {
      content: replyContent.value.trim(),
      parent_id: replyParentId.value || 0
    })
    replyContent.value = ''
    clearReplyTarget()
    ElMessage.success('回复已发送')
    await loadDetail()
  } catch (error) {
    ElMessage.error(error?.message || '回复失败')
  } finally {
    replySubmitting.value = false
  }
}

async function acceptBounty() {
  if (!userStore.isLoggedIn) {
    goLogin()
    return
  }
  try {
    await apiAcceptCommunityBounty(postId.value)
    ElMessage.success('已成功接单')
    await loadDetail()
  } catch (error) {
    ElMessage.error(error?.message || '接单失败')
  }
}

async function updateStatus() {
  if (!statusDraft.value || statusDraft.value === post.value?.status) return
  statusSaving.value = true
  try {
    await apiUpdateCommunityPostStatus(postId.value, { status: statusDraft.value })
    ElMessage.success('帖子状态已更新')
    await loadDetail()
  } catch (error) {
    ElMessage.error(error?.message || '更新状态失败')
  } finally {
    statusSaving.value = false
  }
}

async function removePost() {
  try {
    await ElMessageBox.confirm('确定删除这条帖子吗？删除后回复会一起清空。', '删除帖子', {
      type: 'warning'
    })
    await apiDeleteCommunityPost(postId.value)
    ElMessage.success('帖子已删除')
    goBack()
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') {
      ElMessage.error(error?.message || '删除失败')
    }
  }
}

function goRelated(item) {
  router.push({
    name: sceneDetailRouteName(),
    params: { id: String(item.id) },
    query: { title: item.title || '' }
  })
}

function syncBreadcrumbQuery() {
  const nextTitle = String(post.value?.title || '').trim()
  if (!nextTitle || String(route.query.title || '').trim() === nextTitle) return
  router.replace({
    name: sceneDetailRouteName(),
    params: { id: String(postId.value) },
    query: {
      ...route.query,
      title: nextTitle
    }
  })
}

watch(() => route.params.id, () => {
  replyContent.value = ''
  loadDetail()
}, { immediate: true })

watch(post, () => {
  syncBreadcrumbQuery()
})
</script>

<style scoped>
.post-detail-page {
  display: grid;
  gap: 16px;
}

.hero-card,
.panel {
  border-radius: 22px;
  border: 1px solid rgba(216, 226, 238, 0.92);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.05);
}

.hero-card {
  padding: 24px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 18px;
}

.hero-title-row,
.hero-meta,
.author-line,
.reply-head,
.reply-tools,
.reply-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.hero-title-row {
  flex-wrap: wrap;
}

.hero-left h1 {
  margin: 14px 0 0;
  color: #12385b;
  font-size: 34px;
  line-height: 1.45;
}

.hero-summary {
  margin: 14px 0 0;
  color: #536a84;
  line-height: 1.85;
}

.hero-meta {
  margin-top: 18px;
  flex-wrap: wrap;
  color: #6f839d;
  font-size: 12px;
}

.author-line span {
  color: #56708c;
}

.hero-meta span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.hero-right,
.action-board,
.status-board,
.content-column,
.side-column,
.info-list,
.related-list,
.reply-list {
  display: grid;
  gap: 12px;
}

.bounty-board {
  display: grid;
  gap: 10px;
}

.bounty-item {
  border-radius: 16px;
  padding: 14px;
  background: #fff9f1;
  border: 1px solid #f2deca;
}

.bounty-item span {
  display: block;
  color: #a56522;
  font-size: 12px;
}

.bounty-item strong {
  display: block;
  margin-top: 8px;
  color: #7c4210;
  font-size: 18px;
}

.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 16px;
  align-items: start;
}

.panel {
  padding: 18px;
}

.panel-header {
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.panel-header h3 {
  margin: 0;
  color: #14395d;
  font-size: 18px;
}

.panel-header span {
  color: #6f849d;
  font-size: 12px;
}

.cover-wrap {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid #e3ebf4;
  background: #edf2f8;
}

.cover-wrap img {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  display: block;
}

.tag-list {
  margin-top: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-chip {
  border-radius: 999px;
  border: 1px solid #dce7f2;
  background: #f7fbff;
  color: #265178;
  padding: 5px 12px;
  font-size: 12px;
}

.content-body {
  margin-top: 16px;
  color: #293f58;
  line-height: 1.95;
  white-space: pre-wrap;
  word-break: break-word;
}

.reply-target-bar {
  margin-bottom: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #eef9fd;
  border: 1px solid #cfe7f0;
  color: #0f728f;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.reply-editor {
  display: grid;
  gap: 12px;
}

.reply-actions {
  justify-content: space-between;
  flex-wrap: wrap;
}

.reply-actions span,
.login-tip p,
.quoted-line,
.info-item span,
.related-item span,
.reply-head span {
  color: #6f839d;
  font-size: 12px;
}

.login-tip {
  border-radius: 16px;
  padding: 14px 16px;
  border: 1px solid #dbe7f2;
  background: #f8fbff;
}

.login-tip p {
  margin: 0 0 12px;
}

.reply-card,
.related-item {
  border-radius: 16px;
  border: 1px solid #e3ebf4;
  background: #f9fcff;
}

.reply-card {
  padding: 14px 16px;
}

.reply-head {
  justify-content: space-between;
}

.reply-head strong {
  display: block;
  color: #12365a;
}

.quoted-line {
  margin-top: 10px;
  color: #0f728f;
}

.reply-content {
  margin-top: 10px;
  color: #324960;
  line-height: 1.8;
  white-space: pre-wrap;
  word-break: break-word;
}

.info-item {
  border-radius: 14px;
  padding: 12px 14px;
  background: #f8fbff;
  border: 1px solid #e3ebf4;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info-item strong {
  color: #14395d;
  font-size: 14px;
}

.related-item {
  text-align: left;
  padding: 12px 14px;
  cursor: pointer;
}

.related-item strong {
  display: block;
  color: #14395d;
  line-height: 1.6;
}

.related-item span {
  display: block;
  margin-top: 6px;
}

@media (max-width: 1180px) {
  .hero-card,
  .detail-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-left h1 {
    font-size: 28px;
  }

  .reply-head,
  .reply-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
