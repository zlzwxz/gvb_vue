<template>
  <div class="community-page">
    <section class="hero">
      <div class="hero-main">
        <p class="hero-kicker">{{ sceneKicker }}</p>
        <h1>{{ sceneTitle }}</h1>
        <p class="hero-description">{{ sceneDescription }}</p>
        <div class="hero-actions">
          <el-button type="primary" @click="openCreateDialog">
            <el-icon><Plus /></el-icon>
            {{ createButtonText }}
          </el-button>
          <el-button @click="refreshPage" :loading="booting || loading">
            <el-icon><RefreshRight /></el-icon>
            刷新
          </el-button>
        </div>
      </div>

      <div class="hero-stats">
        <article class="hero-stat-card">
          <span>{{ scene === 'bounty' ? '赏金任务' : '交流主题' }}</span>
          <strong>{{ meta.total || 0 }}</strong>
        </article>
        <article class="hero-stat-card">
          <span>分类数量</span>
          <strong>{{ categoryOptions.length }}</strong>
        </article>
        <article class="hero-stat-card">
          <span>{{ scene === 'bounty' ? '招募中' : '交流中' }}</span>
          <strong>{{ activeStatusCount }}</strong>
        </article>
        <article class="hero-stat-card">
          <span>已完成/已归档</span>
          <strong>{{ closedStatusCount }}</strong>
        </article>
      </div>
    </section>

    <section class="panel filter-panel">
      <div class="filter-row">
        <el-input
          v-model="filters.key"
          clearable
          placeholder="搜索标题、内容、作者或分类"
          @clear="fetchPosts(1)"
          @keyup.enter="fetchPosts(1)"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        <el-select v-model="filters.sort" style="width: 180px" @change="fetchPosts(1)">
          <el-option
            v-for="item in sortOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select v-model="filters.status" style="width: 170px" @change="fetchPosts(1)">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>

      <div class="category-row">
        <button
          type="button"
          class="category-chip"
          :class="{ active: !filters.category }"
          @click="setCategory('')"
        >
          全部分类
          <span>{{ meta.total || 0 }}</span>
        </button>
        <button
          v-for="item in categoryOptions"
          :key="item.category"
          type="button"
          class="category-chip"
          :class="{ active: filters.category === item.category }"
          @click="setCategory(item.category)"
        >
          {{ item.category }}
          <span>{{ item.count }}</span>
        </button>
      </div>
    </section>

    <div class="community-layout">
      <section class="panel post-panel">
        <div class="panel-header">
          <div>
            <h3>{{ scene === 'bounty' ? '赏金列表' : '交流帖子' }}</h3>
            <span>{{ total }} 条内容</span>
          </div>
          <el-button type="primary" plain @click="openCreateDialog">
            发布{{ scene === 'bounty' ? '赏金' : '帖子' }}
          </el-button>
        </div>

        <div v-loading="loading" class="post-list">
          <article
            v-for="item in posts"
            :key="item.id"
            class="post-card"
            @click="goDetail(item)"
          >
            <div class="post-main">
              <div class="post-top">
                <div class="post-title-row">
                  <el-tag v-if="item.is_pinned" type="warning" effect="dark" size="small">置顶</el-tag>
                  <el-tag size="small" effect="plain" :type="scene === 'bounty' ? 'danger' : 'primary'">
                    {{ item.category || '综合交流' }}
                  </el-tag>
                  <h4>{{ item.title }}</h4>
                </div>
                <span class="post-time">{{ formatTime(item.created_at) }}</span>
              </div>

              <p class="post-summary">{{ item.summary || item.content }}</p>

              <div class="post-tags" v-if="item.tags?.length">
                <span v-for="tag in item.tags.slice(0, 5)" :key="`${item.id}-${tag}`" class="tag-chip">
                  #{{ tag }}
                </span>
              </div>

              <div v-if="scene === 'bounty'" class="bounty-strip">
                <div class="bounty-stat">
                  <span>赏金</span>
                  <strong>{{ Number(item.budget || 0) }} {{ item.reward_unit || '积分' }}</strong>
                </div>
                <div class="bounty-stat">
                  <span>状态</span>
                  <strong>{{ item.status_label }}</strong>
                </div>
                <div class="bounty-stat">
                  <span>承接人</span>
                  <strong>{{ item.accepted_user_nick || '待认领' }}</strong>
                </div>
                <div class="bounty-stat">
                  <span>截止</span>
                  <strong>{{ formatDate(item.deadline) }}</strong>
                </div>
              </div>

              <div class="post-footer">
                <div class="author-line">
                  <el-avatar :size="28" :src="item.user_avatar ? $resolveImg(item.user_avatar) : ''">
                    {{ avatarText(item.user_nick_name) }}
                  </el-avatar>
                  <span>{{ item.user_nick_name || `用户${item.user_id}` }}</span>
                </div>
                <div class="meta-line">
                  <span><el-icon><View /></el-icon>{{ item.view_count || 0 }}</span>
                  <span><el-icon><ChatDotRound /></el-icon>{{ item.reply_count || 0 }}</span>
                  <span>{{ item.last_reply_nick ? `最后回复 ${item.last_reply_nick}` : '还没有回复' }}</span>
                </div>
              </div>
            </div>

            <div v-if="item.cover_image" class="post-cover">
              <img :src="$resolveImg(item.cover_image)" :alt="item.title" />
            </div>
          </article>

          <el-empty
            v-if="!loading && !posts.length"
            :description="scene === 'bounty' ? '暂时还没有符合条件的赏金任务' : '暂时还没有符合条件的交流帖子'"
          />
        </div>

        <el-pagination
          v-if="total > pageSize"
          background
          layout="total, prev, pager, next"
          :current-page="page"
          :page-size="pageSize"
          :total="total"
          class="pager"
          @current-change="fetchPosts"
        />
      </section>

      <aside class="side-column">
        <section class="panel">
          <div class="panel-header">
            <div>
              <h3>{{ scene === 'bounty' ? '任务状态' : '帖子节奏' }}</h3>
              <span>按当前场景聚合</span>
            </div>
          </div>
          <div class="status-list">
            <div v-for="item in statusOptions.slice(1)" :key="item.value" class="status-item">
              <span>{{ item.label }}</span>
              <strong>{{ Number(meta.status?.[item.value] || 0) }}</strong>
            </div>
          </div>
        </section>

        <section class="panel">
          <div class="panel-header">
            <div>
              <h3>{{ scene === 'bounty' ? '发布建议' : '发帖建议' }}</h3>
            </div>
          </div>
          <div class="tip-list">
            <p v-for="item in tipList" :key="item">{{ item }}</p>
          </div>
        </section>

        <section class="panel" v-if="posts.length">
          <div class="panel-header">
            <div>
              <h3>{{ scene === 'bounty' ? '最新任务' : '活跃帖子' }}</h3>
              <span>当前页精选</span>
            </div>
          </div>
          <div class="side-post-list">
            <button
              v-for="item in sidePosts"
              :key="`side-${item.id}`"
              type="button"
              class="side-post-item"
              @click="goDetail(item)"
            >
              <strong>{{ item.title }}</strong>
              <span>{{ item.reply_count || 0 }} 回复 · {{ item.view_count || 0 }} 浏览</span>
            </button>
          </div>
        </section>
      </aside>
    </div>

    <el-dialog
      v-model="createVisible"
      :title="createDialogTitle"
      width="720px"
      destroy-on-close
    >
      <el-form label-width="92px">
        <el-form-item label="标题">
          <el-input v-model="createForm.title" maxlength="80" placeholder="一句话说明这条帖子要聊什么" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input
            v-model="createForm.summary"
            type="textarea"
            :rows="2"
            maxlength="120"
            show-word-limit
            placeholder="列表摘要，留空会自动用正文前 120 字生成"
          />
        </el-form-item>
        <el-form-item label="正文">
          <el-input
            v-model="createForm.content"
            type="textarea"
            :rows="8"
            maxlength="5000"
            show-word-limit
            placeholder="把需求、想法、规则或上下文写完整一些，后续互动会顺畅很多"
          />
        </el-form-item>
        <div class="create-grid">
          <el-form-item label="分类">
            <el-input v-model="createForm.category" maxlength="24" placeholder="例如：日常交流、技术互助" />
          </el-form-item>
          <el-form-item label="标签">
            <el-input v-model="createForm.tagsText" maxlength="80" placeholder="多个标签用逗号分隔" />
          </el-form-item>
          <el-form-item label="封面图" class="full-line">
            <el-input
              v-model="createForm.cover_image"
              placeholder="可填写图片库路径，例如 /uploads/file/u_xxx/demo.png"
            />
          </el-form-item>
          <template v-if="scene === 'bounty'">
            <el-form-item label="赏金值">
              <el-input-number v-model="createForm.budget" :min="1" :max="999999" style="width: 100%" />
            </el-form-item>
            <el-form-item label="单位">
              <el-select v-model="createForm.reward_unit" style="width: 100%">
                <el-option label="积分" value="积分" />
                <el-option label="元" value="元" />
              </el-select>
            </el-form-item>
            <el-form-item label="截止时间" class="full-line">
              <el-date-picker
                v-model="createForm.deadline"
                type="datetime"
                value-format="YYYY-MM-DD HH:mm:ss"
                placeholder="可选，设置招募截止时间"
                style="width: 100%"
              />
            </el-form-item>
          </template>
        </div>
      </el-form>
      <template #footer>
        <el-button @click="createVisible = false">取消</el-button>
        <el-button type="primary" :loading="createSubmitting" @click="submitCreate">
          立即发布
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import {
  apiCreateCommunityPost,
  apiGetCommunityMeta,
  apiGetCommunityPostList
} from '@/api/social'
import {
  ChatDotRound,
  Plus,
  RefreshRight,
  Search,
  View
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const pageSize = 10
const booting = ref(false)
const loading = ref(false)
const createVisible = ref(false)
const createSubmitting = ref(false)
const page = ref(1)
const total = ref(0)
const posts = ref([])
const meta = ref({
  total: 0,
  categories: [],
  status: {}
})
const filters = reactive({
  key: '',
  sort: '',
  status: 'all',
  category: ''
})
const createForm = reactive(buildDefaultForm())

const scene = computed(() => route.meta.scene === 'bounty' ? 'bounty' : 'plaza')
const sceneTitle = computed(() => scene.value === 'bounty' ? '赏金大厅' : '闲聊广场')
const sceneKicker = computed(() => scene.value === 'bounty' ? 'Bounty Hall' : 'Community Plaza')
const sceneDescription = computed(() => scene.value === 'bounty'
  ? '把需求、求助、协作和可交付结果挂出来，谁能做、什么时候交、多少赏金，一页看明白。'
  : '做成贴吧式的帖子流入口，日常交流、技术互助、经验分享都能直接发帖沉淀。')
const createDialogTitle = computed(() => scene.value === 'bounty' ? '发布赏金任务' : '发布交流帖子')
const createButtonText = computed(() => scene.value === 'bounty' ? '发布赏金任务' : '发布交流帖子')
const categoryOptions = computed(() => Array.isArray(meta.value.categories) ? meta.value.categories : [])
const sortOptions = computed(() => {
  if (scene.value === 'bounty') {
    return [
      { label: '默认排序', value: '' },
      { label: '最新发布', value: 'latest' },
      { label: '赏金优先', value: 'reward' },
      { label: '截止优先', value: 'deadline' },
      { label: '热度优先', value: 'hot' }
    ]
  }
  return [
    { label: '默认排序', value: '' },
    { label: '最新发布', value: 'latest' },
    { label: '热度优先', value: 'hot' }
  ]
})
const statusOptions = computed(() => {
  if (scene.value === 'bounty') {
    return [
      { label: '全部状态', value: 'all' },
      { label: '招募中', value: 'open' },
      { label: '进行中', value: 'in_progress' },
      { label: '已完成', value: 'resolved' },
      { label: '已关闭', value: 'closed' }
    ]
  }
  return [
    { label: '全部状态', value: 'all' },
    { label: '交流中', value: 'published' },
    { label: '已解决', value: 'resolved' },
    { label: '已归档', value: 'closed' }
  ]
})
const activeStatusCount = computed(() => {
  const current = meta.value.status || {}
  return Number(current[scene.value === 'bounty' ? 'open' : 'published'] || 0)
})
const closedStatusCount = computed(() => {
  const current = meta.value.status || {}
  return Number(current.closed || 0) + Number(current.resolved || 0)
})
const sidePosts = computed(() => {
  return [...posts.value]
    .sort((left, right) => Number(right.reply_count || 0) - Number(left.reply_count || 0))
    .slice(0, 5)
})
const tipList = computed(() => {
  if (scene.value === 'bounty') {
    return [
      '标题直接写清楚需求、时间和预期结果，接单的人会更快判断。',
      '正文把交付物、边界条件、验收方式写全，减少反复追问。',
      '如果要用到私有图片，先去图片库设置权限，避免赏金详情页预览失败。'
    ]
  }
  return [
    '帖子标题尽量口语化，像贴吧一样让人一眼看懂在聊什么。',
    '分类和标签建议固定下来，后面做精华、运营和检索都会轻松很多。',
    '如果要插图，先去图片库给图片设好公开/私有，再把路径贴过来。'
  ]
})

function buildDefaultForm() {
  return {
    title: '',
    summary: '',
    content: '',
    category: '',
    tagsText: '',
    cover_image: '',
    budget: 100,
    reward_unit: '积分',
    deadline: ''
  }
}

function resetCreateForm() {
  Object.assign(createForm, buildDefaultForm(), {
    category: filters.category || ''
  })
}

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

function sceneRouteName() {
  return scene.value === 'bounty' ? 'BountyPostDetail' : 'CommunityPostDetail'
}

function goDetail(item) {
  router.push({
    name: sceneRouteName(),
    params: { id: String(item.id) },
    query: { title: item.title || '' }
  })
}

function openCreateDialog() {
  if (!userStore.isLoggedIn) {
    router.push({
      path: '/login',
      query: {
        redirect: scene.value === 'bounty' ? '/bounty' : '/community'
      }
    })
    return
  }
  resetCreateForm()
  createVisible.value = true
}

function setCategory(category) {
  filters.category = category
  fetchPosts(1)
}

function buildQuery(nextPage = page.value) {
  const params = {
    page: nextPage,
    limit: pageSize,
    scene: scene.value
  }
  if (filters.key.trim()) params.key = filters.key.trim()
  if (filters.sort) params.sort = filters.sort
  if (filters.category) params.category = filters.category
  if (filters.status && filters.status !== 'all') params.status = filters.status
  return params
}

async function fetchMeta() {
  const res = await apiGetCommunityMeta({ scene: scene.value })
  meta.value = res.data || { total: 0, categories: [], status: {} }
}

async function fetchPosts(nextPage = 1) {
  page.value = nextPage
  loading.value = true
  try {
    const res = await apiGetCommunityPostList(buildQuery(nextPage))
    posts.value = res.data?.list || []
    total.value = Number(res.data?.count || res.data?.total || 0)
  } catch (error) {
    posts.value = []
    total.value = 0
    ElMessage.error(error?.message || '获取帖子列表失败')
  } finally {
    loading.value = false
  }
}

async function refreshPage() {
  booting.value = true
  try {
    await Promise.all([fetchMeta(), fetchPosts(1)])
  } finally {
    booting.value = false
  }
}

function parseTags(text) {
  return String(text || '')
    .split(/[,\n，]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

async function submitCreate() {
  if (!createForm.title.trim()) {
    ElMessage.warning('请先填写标题')
    return
  }
  if (!createForm.content.trim()) {
    ElMessage.warning('请先填写正文')
    return
  }
  if (scene.value === 'bounty' && Number(createForm.budget || 0) <= 0) {
    ElMessage.warning('赏金金额必须大于 0')
    return
  }

  createSubmitting.value = true
  try {
    const res = await apiCreateCommunityPost({
      scene: scene.value,
      title: createForm.title.trim(),
      summary: createForm.summary.trim(),
      content: createForm.content.trim(),
      category: createForm.category.trim(),
      tags: parseTags(createForm.tagsText),
      cover_image: createForm.cover_image.trim(),
      budget: scene.value === 'bounty' ? Number(createForm.budget || 0) : 0,
      reward_unit: scene.value === 'bounty' ? createForm.reward_unit : '',
      deadline: scene.value === 'bounty' ? createForm.deadline : ''
    })
    createVisible.value = false
    ElMessage.success(scene.value === 'bounty' ? '赏金任务已发布' : '交流帖子已发布')
    await Promise.all([fetchMeta(), fetchPosts(1)])
    if (res.data?.id) {
      router.push({ name: sceneRouteName(), params: { id: String(res.data.id) } })
    }
  } catch (error) {
    ElMessage.error(error?.message || '发布失败')
  } finally {
    createSubmitting.value = false
  }
}

watch(scene, () => {
  filters.key = ''
  filters.sort = ''
  filters.status = 'all'
  filters.category = ''
  total.value = 0
  posts.value = []
  resetCreateForm()
  refreshPage()
}, { immediate: true })

onMounted(() => {
  resetCreateForm()
})
</script>

<style scoped>
.community-page {
  display: grid;
  gap: 16px;
}

.hero {
  border-radius: 28px;
  padding: 24px;
  background:
    radial-gradient(circle at top right, rgba(250, 204, 21, 0.22), transparent 30%),
    linear-gradient(135deg, #12395d 0%, #176f8f 100%);
  color: #eff9ff;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 18px;
}

.hero-kicker {
  margin: 0 0 10px;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.84;
}

.hero-main h1 {
  margin: 0;
  font-size: 34px;
}

.hero-description {
  margin: 14px 0 0;
  max-width: 860px;
  line-height: 1.85;
  opacity: 0.95;
}

.hero-actions {
  margin-top: 18px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.hero-stat-card {
  border-radius: 18px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.16);
  backdrop-filter: blur(8px);
}

.hero-stat-card span {
  display: block;
  font-size: 12px;
  opacity: 0.82;
}

.hero-stat-card strong {
  display: block;
  margin-top: 10px;
  font-size: 28px;
  line-height: 1;
}

.panel {
  border-radius: 20px;
  border: 1px solid rgba(216, 226, 238, 0.92);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.05);
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
  color: #143a5f;
  font-size: 18px;
}

.panel-header span {
  color: #70859d;
  font-size: 12px;
}

.filter-panel {
  display: grid;
  gap: 12px;
}

.filter-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 10px;
}

.category-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.category-chip,
.tag-chip {
  border-radius: 999px;
  border: 1px solid #dbe6f2;
  background: #f8fbff;
  color: #22466d;
}

.category-chip {
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
}

.category-chip span {
  margin-left: 5px;
  color: #0f7d9b;
}

.category-chip.active {
  border-color: #9dcfe2;
  background: #edf9fd;
  color: #0f6f8d;
}

.community-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 16px;
  align-items: start;
}

.side-column,
.post-list {
  display: grid;
  gap: 14px;
}

.post-card {
  border: 1px solid #dfe9f3;
  border-radius: 20px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  padding: 18px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 180px;
  gap: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.post-card:hover {
  transform: translateY(-2px);
  border-color: #b5d3e8;
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.08);
}

.post-main {
  display: grid;
  gap: 12px;
  min-width: 0;
}

.post-top,
.post-footer {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.post-title-row {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.post-title-row h4 {
  margin: 0;
  min-width: 0;
  color: #12365a;
  font-size: 20px;
  line-height: 1.5;
}

.post-time,
.meta-line,
.author-line span {
  color: #6f839d;
  font-size: 12px;
}

.post-summary {
  margin: 0;
  color: #5f748e;
  line-height: 1.85;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag-chip {
  padding: 4px 10px;
  font-size: 12px;
}

.bounty-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.bounty-stat {
  border-radius: 14px;
  padding: 10px 12px;
  background: #fff9f1;
  border: 1px solid #f2dfc8;
}

.bounty-stat span {
  display: block;
  color: #a35f19;
  font-size: 12px;
}

.bounty-stat strong {
  display: block;
  margin-top: 7px;
  color: #7f4610;
  font-size: 15px;
}

.author-line {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.meta-line {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.meta-line span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.post-cover {
  border-radius: 16px;
  overflow: hidden;
  background: #eef3f8;
  border: 1px solid #e2ebf4;
}

.post-cover img {
  width: 100%;
  height: 100%;
  min-height: 160px;
  object-fit: cover;
  display: block;
}

.status-list,
.side-post-list {
  display: grid;
  gap: 10px;
}

.status-item,
.side-post-item {
  border-radius: 14px;
  border: 1px solid #e2ebf4;
  background: #f8fbff;
}

.status-item {
  padding: 12px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-item span {
  color: #60758f;
  font-size: 13px;
}

.status-item strong {
  color: #14395d;
  font-size: 18px;
}

.tip-list {
  display: grid;
  gap: 10px;
}

.tip-list p {
  margin: 0;
  color: #516983;
  font-size: 13px;
  line-height: 1.8;
}

.side-post-item {
  text-align: left;
  padding: 12px 14px;
  cursor: pointer;
}

.side-post-item strong {
  display: block;
  color: #15395d;
  line-height: 1.6;
}

.side-post-item span {
  display: block;
  margin-top: 6px;
  color: #6c829d;
  font-size: 12px;
}

.create-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 12px;
}

.full-line {
  grid-column: 1 / -1;
}

.pager {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

@media (max-width: 1180px) {
  .hero,
  .community-layout,
  .post-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .filter-row,
  .create-grid,
  .bounty-strip {
    grid-template-columns: 1fr;
  }

  .post-top,
  .post-footer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
