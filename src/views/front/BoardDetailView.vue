<template>
  <div class="board-detail-page" v-loading="pageLoading">
    <template v-if="board">
      <section class="board-hero">
        <div class="board-hero-main">
          <p class="board-kicker">Forum Board</p>
          <h1>{{ board.name }}</h1>
          <p class="board-description">{{ board.description || '这里是板块公告位，适合沉淀该板块的主题范围、发帖规范和推荐方向。' }}</p>

          <div class="board-tags">
            <el-tag effect="dark" round>#{{
              board.slug || board.id
            }}</el-tag>
            <el-tag type="success" effect="plain" round>主题 {{ total }}</el-tag>
            <el-tag type="info" effect="plain" round>版主 {{ moderators.length }}</el-tag>
            <el-tag type="warning" effect="plain" round>副版主 {{ deputyModerators.length }}</el-tag>
          </div>

          <div class="board-actions">
            <el-button type="primary" @click="goPublish">
              <el-icon><EditPen /></el-icon>
              发布主题
            </el-button>
            <el-button @click="router.push('/')">返回首页</el-button>
          </div>
        </div>

        <div class="board-hero-side">
          <article class="hero-stat-card">
            <span>主题总数</span>
            <strong>{{ total }}</strong>
          </article>
          <article class="hero-stat-card">
            <span>精选推荐</span>
            <strong>{{ featuredArticles.length }}</strong>
          </article>
          <article class="hero-stat-card">
            <span>热词数量</span>
            <strong>{{ hotTags.length }}</strong>
          </article>
          <article class="hero-stat-card">
            <span>板块排序</span>
            <strong>{{ Number(board.sort || 0) }}</strong>
          </article>
        </div>
      </section>

      <section class="panel board-toolbar">
        <el-input
          v-model="searchKey"
          placeholder="搜索本板块的主题、标签、正文关键词"
          clearable
          @keyup.enter="loadArticles(1)"
          @clear="loadArticles(1)"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>

        <el-select v-model="sort" style="width: 180px" @change="handleSortChange">
          <el-option label="最新发布" value="created_at desc" />
          <el-option label="评论最多" value="comment_count desc" />
          <el-option label="点赞最多" value="digg_count desc" />
          <el-option label="浏览最多" value="look_count desc" />
        </el-select>

        <el-button @click="refreshBoard">
          <el-icon><RefreshRight /></el-icon>
          刷新
        </el-button>
      </section>

      <div class="board-layout">
        <div class="board-main">
          <section class="panel" v-if="announcements.length">
            <div class="panel-header">
              <h3>运营公告</h3>
              <span>全站公告与本板块公告合并展示</span>
            </div>
            <div class="board-announcement-list">
              <button
                v-for="item in announcements"
                :key="`announcement-${item.id}`"
                type="button"
                class="board-announcement-item"
                @click="openAnnouncement(item)"
              >
                <div class="board-announcement-title">
                  <el-tag size="small" effect="plain" :type="announcementTagType(item.level)">
                    {{ announcementLevelText(item.level) }}
                  </el-tag>
                  <strong>{{ item.title }}</strong>
                </div>
                <p>{{ item.content }}</p>
                <footer>
                  <span>{{ item.board_name || '全站公告' }}</span>
                  <span>{{ item.ends_at ? `截止 ${item.ends_at}` : '长期有效' }}</span>
                </footer>
              </button>
            </div>
          </section>

          <section class="panel board-notice-panel" v-if="board.notice">
            <div class="panel-header">
              <h3>板块公告</h3>
              <span>来自运营后台的公告位</span>
            </div>
            <p class="board-notice-copy">{{ board.notice }}</p>
          </section>

          <section v-if="pinnedArticles.length" class="panel">
            <div class="panel-header">
              <h3>置顶帖子</h3>
              <span>优先展示需要沉淀的重点主题</span>
            </div>
            <div class="pinned-list">
              <button
                v-for="item in pinnedArticles"
                :key="`pin-${item.id}`"
                type="button"
                class="pinned-item"
                @click="goDetail(item.id)"
              >
                <div class="pinned-main">
                  <strong>{{ item.title }}</strong>
                  <span>{{ item.abstract || '点击查看板块置顶主题的完整内容。' }}</span>
                </div>
                <div class="pinned-meta">
                  <span><el-icon><View /></el-icon>{{ item.look_count || 0 }}</span>
                  <span><el-icon><ChatDotRound /></el-icon>{{ item.comment_count || 0 }}</span>
                </div>
              </button>
            </div>
          </section>

          <section v-if="featuredArticles.length" class="panel">
            <div class="panel-header">
              <h3>板块精选</h3>
              <span>优先展示高互动主题</span>
            </div>
            <div class="featured-grid">
              <article
                v-for="item in featuredArticles"
                :key="`featured-${item.id}`"
                class="featured-card"
                @click="goDetail(item.id)"
              >
                <div v-if="resolveBanner(item)" class="featured-cover">
                  <img :src="$resolveImg(resolveBanner(item))" :alt="item.title" />
                </div>
                <div v-else class="featured-cover empty">暂无封面</div>

                <div class="featured-body">
                  <h4>{{ item.title }}</h4>
                  <p>{{ item.abstract || '点击进入查看本板块的完整讨论内容。' }}</p>
                  <footer>
                    <span><el-icon><View /></el-icon>{{ item.look_count || 0 }}</span>
                    <span><el-icon><ChatDotRound /></el-icon>{{ item.comment_count || 0 }}</span>
                    <span><el-icon><Star /></el-icon>{{ item.digg_count || 0 }}</span>
                  </footer>
                </div>
              </article>
            </div>
          </section>

          <section class="panel">
            <div class="panel-header">
              <h3>全部帖子</h3>
              <span>{{ total }} 条主题</span>
            </div>

            <div class="thread-list" v-loading="loadingArticles">
              <article
                v-for="item in articles"
                :key="item.id"
                class="thread-card"
                @click="goDetail(item.id)"
              >
                <div class="thread-main">
                  <div class="thread-head">
                    <h4>{{ item.title }}</h4>
                    <span class="thread-time">{{ formatDateTime(item.created_at) }}</span>
                  </div>
                  <p class="thread-abstract">{{ item.abstract || '这个主题还没有摘要，点击进入查看全文。' }}</p>

                  <div class="thread-tags">
                    <span
                      v-for="tag in resolveTags(item).slice(0, 4)"
                      :key="`${item.id}-${tag}`"
                      class="tag-chip"
                    >
                      #{{ tag }}
                    </span>
                  </div>

                  <footer class="thread-footer">
                    <span>{{ resolveAuthor(item) }}</span>
                    <span><el-icon><View /></el-icon>{{ item.look_count || 0 }}</span>
                    <span><el-icon><ChatDotRound /></el-icon>{{ item.comment_count || 0 }}</span>
                    <span><el-icon><Star /></el-icon>{{ item.digg_count || 0 }}</span>
                  </footer>
                </div>

                <div v-if="resolveBanner(item)" class="thread-cover">
                  <img :src="$resolveImg(resolveBanner(item))" :alt="item.title" />
                </div>
              </article>

              <el-empty
                v-if="!loadingArticles && !articles.length"
                description="当前板块还没有匹配的帖子"
              />
            </div>

            <el-pagination
              v-if="total > pageSize"
              background
              layout="total, prev, pager, next"
              :current-page="page"
              :page-size="pageSize"
              :total="total"
              class="pagination"
              @current-change="loadArticles"
            />
          </section>
        </div>

        <aside class="board-side">
          <section class="panel">
            <div class="panel-header">
              <h3>吧务信息</h3>
              <span>{{ board.is_enabled ? '开放中' : '暂未开放' }}</span>
            </div>

            <div class="manager-group">
              <div class="manager-title">版主</div>
              <div v-if="moderators.length" class="manager-list">
                <button
                  v-for="item in moderators"
                  :key="`m-${item.id}`"
                  type="button"
                  class="manager-item"
                  @click="goUserSpace(item.id)"
                >
                  <el-avatar :size="38" :src="item.avatar ? $resolveImg(item.avatar) : ''">
                    {{ avatarText(item.nick_name || item.user_name) }}
                  </el-avatar>
                  <div>
                    <strong>{{ item.nick_name || item.user_name || `用户${item.id}` }}</strong>
                    <span>查看空间</span>
                  </div>
                </button>
              </div>
              <el-empty v-else :image-size="58" description="暂无版主资料" />
            </div>

            <div class="manager-group">
              <div class="manager-title">副版主</div>
              <div v-if="deputyModerators.length" class="manager-list">
                <button
                  v-for="item in deputyModerators"
                  :key="`d-${item.id}`"
                  type="button"
                  class="manager-item"
                  @click="goUserSpace(item.id)"
                >
                  <el-avatar :size="38" :src="item.avatar ? $resolveImg(item.avatar) : ''">
                    {{ avatarText(item.nick_name || item.user_name) }}
                  </el-avatar>
                  <div>
                    <strong>{{ item.nick_name || item.user_name || `用户${item.id}` }}</strong>
                    <span>查看空间</span>
                  </div>
                </button>
              </div>
              <el-empty v-else :image-size="58" description="暂无副版主资料" />
            </div>
          </section>

          <section class="panel" v-if="hotTags.length">
            <div class="panel-header">
              <h3>板块热词</h3>
              <span>根据当前帖子聚合</span>
            </div>
            <div class="hot-tag-list">
              <button
                v-for="item in hotTags"
                :key="item.name"
                type="button"
                class="hot-tag"
                @click="useTagSearch(item.name)"
              >
                #{{ item.name }}
                <span>{{ item.count }}</span>
              </button>
            </div>
          </section>

          <section class="panel">
            <div class="panel-header">
              <h3>板块规则</h3>
            </div>
            <div class="board-notes">
              <p v-if="board.rules">{{ board.rules }}</p>
              <template v-else>
                <p>进入板块后就是独立流式页面，方便做运营、公告、举报和后续闭环管理。</p>
                <p>当前板块标识：{{ board.slug || board.id }}</p>
                <p>建议把公告、置顶、精华帖和举报处理都收口到这个板块闭环里。</p>
              </template>
            </div>
          </section>

          <section class="panel">
            <div class="panel-header">
              <h3>违规处理</h3>
            </div>
            <div class="board-notes">
              <p>发现违规内容时，请进入帖子详情页使用“举报文章”入口。</p>
              <p>版主和管理员会在后台的“文章举报”列表中处理，并可一键转入复审。</p>
            </div>
          </section>
        </aside>
      </div>
    </template>

    <div v-else class="empty-wrap">
      <el-empty description="板块不存在或已被删除">
        <el-button type="primary" @click="router.push('/')">返回首页</el-button>
      </el-empty>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiGetArticleList } from '@/api/article'
import { apiGetAnnouncementList } from '@/api/announcement'
import { apiGetBoardList } from '@/api/board'
import { apiGetUserPublicProfile } from '@/api/user'
import { useUserStore } from '@/stores/user'
import {
  ChatDotRound,
  EditPen,
  RefreshRight,
  Search,
  Star,
  View
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const board = ref(null)
const pageLoading = ref(false)
const loadingArticles = ref(false)
const page = ref(1)
const pageSize = 10
const total = ref(0)
const sort = ref('created_at desc')
const searchKey = ref('')
const announcements = ref([])
const articles = ref([])
const featuredArticles = ref([])
const pinnedArticles = ref([])
const moderators = ref([])
const deputyModerators = ref([])

const boardKey = computed(() => String(route.params.key || '').trim())
const hotTags = computed(() => {
  const tagMap = new Map()
  const merged = [...featuredArticles.value, ...articles.value]
  for (const item of merged) {
    for (const tag of resolveTags(item)) {
      tagMap.set(tag, Number(tagMap.get(tag) || 0) + 1)
    }
  }
  return Array.from(tagMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)
})

function avatarText(value) {
  return String(value || '板').trim().charAt(0) || '板'
}

function resolveBoardKey(boardItem) {
  return String(boardItem?.slug || boardItem?.id || '').trim()
}

function matchBoard(boardItem, key) {
  const normalizedKey = String(key || '').trim().toLowerCase()
  if (!normalizedKey) return false
  return [
    String(boardItem?.slug || '').trim().toLowerCase(),
    String(boardItem?.id || '').trim().toLowerCase(),
    String(boardItem?.name || '').trim().toLowerCase()
  ].includes(normalizedKey)
}

function formatDateTime(value) {
  if (!value) return '刚刚'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)

  const now = Date.now()
  const diff = now - date.getTime()
  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diff < hour) return `${Math.max(1, Math.floor(diff / minute))} 分钟前`
  if (diff < day) return `${Math.floor(diff / hour)} 小时前`
  if (diff < day * 7) return `${Math.floor(diff / day)} 天前`

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function resolveAuthor(item) {
  return item?.user_nick_name || item?.nick_name || item?.user_name || `用户 ${item?.user_id || ''}`.trim()
}

function resolveBanner(item) {
  return String(item?.banner_url || '').trim()
}

function resolveTags(item) {
  if (Array.isArray(item?.tags)) return item.tags.filter(Boolean)
  if (typeof item?.tags === 'string') return item.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
  return []
}

function announcementLevelText(level) {
  if (level === 'success') return '活动'
  if (level === 'warning') return '提醒'
  if (level === 'danger') return '紧急'
  return '公告'
}

function announcementTagType(level) {
  if (level === 'success') return 'success'
  if (level === 'warning') return 'warning'
  if (level === 'danger') return 'danger'
  return 'info'
}

function goUserSpace(id) {
  if (!id) return
  router.push({ name: 'UserSpace', params: { id: String(id) } })
}

function goDetail(id) {
  router.push({ name: 'ArticleDetail', params: { id } })
}

function openAnnouncement(item) {
  const link = String(item?.jump_link || '').trim()
  if (link) {
    if (link.startsWith('http://') || link.startsWith('https://')) {
      window.open(link, '_blank', 'noopener,noreferrer')
      return
    }
    router.push(link)
    return
  }

  const nextBoardKey = String(item?.board_slug || item?.board_id || '').trim()
  if (!nextBoardKey || nextBoardKey === boardKey.value) return
  router.push({ name: 'BoardDetail', params: { key: nextBoardKey } })
}

function goPublish() {
  if (!userStore.isLoggedIn) {
    router.push({ path: '/login', query: { redirect: `/admin/article/edit?board_id=${board.value?.id || ''}` } })
    return
  }
  router.push({ path: '/admin/article/edit', query: { board_id: String(board.value?.id || '') } })
}

function useTagSearch(tagName) {
  searchKey.value = tagName
  loadArticles(1)
}

async function loadProfileCards(idList) {
  const ids = Array.isArray(idList) ? [...new Set(idList.map((item) => Number(item)).filter((item) => item > 0))] : []
  if (!ids.length) return []

  const result = await Promise.all(ids.map(async (id) => {
    try {
      const res = await apiGetUserPublicProfile(id)
      return res.data || null
    } catch {
      return null
    }
  }))

  return result.filter(Boolean)
}

async function loadModerators() {
  moderators.value = await loadProfileCards(board.value?.moderator_user_ids || [])
  deputyModerators.value = await loadProfileCards(board.value?.deputy_moderator_user_ids || [])
}

async function loadFeaturedArticles() {
  if (!board.value?.id) {
    featuredArticles.value = []
    return
  }
  try {
    const res = await apiGetArticleList({
      page: 1,
      limit: 3,
      board_id: Number(board.value.id),
      sort: 'digg_count desc'
    })
    featuredArticles.value = res.data?.list || []
  } catch {
    featuredArticles.value = []
  }
}

async function loadAnnouncements() {
  if (!board.value?.id) {
    announcements.value = []
    return
  }
  try {
    const res = await apiGetAnnouncementList({
      page: 1,
      limit: 6,
      board_id: Number(board.value.id)
    })
    announcements.value = res.data?.list || []
  } catch {
    announcements.value = []
  }
}

async function loadPinnedArticles() {
  const ids = Array.isArray(board.value?.pinned_article_ids) ? board.value.pinned_article_ids.filter(Boolean) : []
  if (!board.value?.id || !ids.length) {
    pinnedArticles.value = []
    return
  }

  try {
    const res = await apiGetArticleList({
      page: 1,
      limit: ids.length,
      ids: ids.join(','),
      board_id: Number(board.value.id)
    })
    const list = res.data?.list || []
    const articleMap = new Map(list.map((item) => [String(item.id), item]))
    pinnedArticles.value = ids.map((id) => articleMap.get(String(id))).filter(Boolean)
  } catch {
    pinnedArticles.value = []
  }
}

async function loadArticles(nextPage = 1) {
  if (!board.value?.id) {
    articles.value = []
    total.value = 0
    return
  }
  page.value = nextPage
  loadingArticles.value = true
  try {
    const params = {
      page: nextPage,
      limit: pageSize,
      board_id: Number(board.value.id),
      sort: sort.value
    }
    if (searchKey.value.trim()) {
      params.key = searchKey.value.trim()
    }
    const res = await apiGetArticleList(params)
    articles.value = res.data?.list || []
    total.value = Number(res.data?.count || res.data?.total || 0)
  } finally {
    loadingArticles.value = false
  }
}

async function loadBoard() {
  pageLoading.value = true
  board.value = null
  articles.value = []
  featuredArticles.value = []
  pinnedArticles.value = []
  announcements.value = []
  moderators.value = []
  deputyModerators.value = []
  total.value = 0

  try {
    const res = await apiGetBoardList({ page: 1, limit: 300, scope: 'all' })
    const list = res.data?.list || res.data || []
    const matched = list.find((item) => matchBoard(item, boardKey.value))
    board.value = matched || null
    if (!board.value) return

    document.title = `${board.value.name} - GVB社区`
    await Promise.all([
      loadAnnouncements(),
      loadModerators(),
      loadPinnedArticles(),
      loadFeaturedArticles(),
      loadArticles(1)
    ])
  } finally {
    pageLoading.value = false
  }
}

function handleSortChange() {
  loadFeaturedArticles()
  loadArticles(1)
}

function refreshBoard() {
  Promise.all([
    loadAnnouncements(),
    loadModerators(),
    loadPinnedArticles(),
    loadFeaturedArticles(),
    loadArticles(page.value)
  ]).catch(() => {})
}

watch(
  () => route.params.key,
  () => {
    searchKey.value = ''
    sort.value = 'created_at desc'
    loadBoard()
  },
  { immediate: true }
)
</script>

<style scoped>
.board-detail-page {
  display: grid;
  gap: 16px;
}

.board-hero {
  border-radius: 26px;
  padding: 24px;
  background:
    radial-gradient(circle at top right, rgba(14, 165, 233, 0.22), transparent 35%),
    linear-gradient(135deg, #123153 0%, #155f82 100%);
  color: #eefbff;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 18px;
}

.board-kicker {
  margin: 0 0 10px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  opacity: 0.82;
}

.board-hero-main h1 {
  margin: 0;
  font-size: 34px;
}

.board-description {
  margin: 14px 0 0;
  line-height: 1.85;
  opacity: 0.94;
  max-width: 820px;
}

.board-tags,
.board-actions {
  margin-top: 16px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.board-hero-side {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  align-self: stretch;
}

.hero-stat-card {
  border-radius: 18px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(10px);
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
  gap: 12px;
}

.panel-header h3 {
  margin: 0;
  color: #12385c;
  font-size: 18px;
}

.panel-header span {
  color: #6e849f;
  font-size: 12px;
}

.board-toolbar {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 10px;
}

.board-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 16px;
  align-items: start;
}

.board-main,
.board-side {
  display: grid;
  gap: 16px;
}

.board-notice-copy {
  margin: 0;
  color: #395571;
  line-height: 1.85;
  white-space: pre-wrap;
}

.board-announcement-list {
  display: grid;
  gap: 10px;
}

.board-announcement-item {
  border: 1px solid #e4ebf4;
  border-radius: 16px;
  background: linear-gradient(180deg, #fffef8 0%, #ffffff 100%);
  padding: 14px 16px;
  cursor: pointer;
  text-align: left;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.board-announcement-item:hover {
  transform: translateY(-2px);
  border-color: #b8d4e5;
  box-shadow: 0 14px 24px rgba(15, 23, 42, 0.07);
}

.board-announcement-title {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.board-announcement-title strong {
  color: #14395e;
  font-size: 15px;
  line-height: 1.5;
}

.board-announcement-item p {
  margin: 9px 0 0;
  color: #61758f;
  line-height: 1.75;
}

.board-announcement-item footer {
  margin-top: 10px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  color: #6e839f;
  font-size: 12px;
}

.pinned-list {
  display: grid;
  gap: 10px;
}

.pinned-item {
  border: 1px solid #dfebf4;
  border-radius: 16px;
  background: linear-gradient(180deg, #fffef8 0%, #fffaf0 100%);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  cursor: pointer;
  text-align: left;
}

.pinned-main strong {
  display: block;
  color: #14395e;
  font-size: 16px;
  line-height: 1.5;
}

.pinned-main span {
  display: block;
  margin-top: 6px;
  color: #6a7f99;
  font-size: 13px;
  line-height: 1.7;
}

.pinned-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  color: #8f5e08;
  font-size: 12px;
  flex-shrink: 0;
}

.pinned-meta span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.featured-card {
  border: 1px solid #e3ebf4;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.featured-card:hover,
.thread-card:hover {
  transform: translateY(-2px);
  border-color: #b4d2e8;
  box-shadow: 0 16px 28px rgba(15, 23, 42, 0.08);
}

.featured-cover {
  height: 150px;
  background: #edf3f8;
}

.featured-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-cover.empty {
  display: grid;
  place-items: center;
  color: #7c90a8;
  font-size: 13px;
}

.featured-body {
  padding: 14px;
}

.featured-body h4 {
  margin: 0;
  font-size: 17px;
  color: #13395f;
  line-height: 1.5;
}

.featured-body p {
  margin: 10px 0 0;
  color: #667c95;
  font-size: 13px;
  line-height: 1.75;
  min-height: 46px;
}

.featured-body footer,
.thread-footer {
  margin-top: 12px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  color: #6e839f;
  font-size: 12px;
}

.featured-body footer span,
.thread-footer span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.thread-list {
  display: grid;
  gap: 12px;
}

.thread-card {
  border: 1px solid #e4ecf4;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  padding: 16px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 170px;
  gap: 14px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.thread-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.thread-head h4 {
  margin: 0;
  font-size: 19px;
  color: #14395e;
  line-height: 1.55;
}

.thread-time {
  flex-shrink: 0;
  color: #7a90a9;
  font-size: 12px;
  white-space: nowrap;
}

.thread-abstract {
  margin: 10px 0 0;
  color: #60748f;
  line-height: 1.75;
}

.thread-tags {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag-chip {
  border-radius: 999px;
  background: #eef8fd;
  color: #126d8b;
  padding: 4px 10px;
  font-size: 12px;
}

.thread-cover {
  border-radius: 14px;
  overflow: hidden;
  background: #edf2f8;
  border: 1px solid #e4ebf5;
}

.thread-cover img {
  width: 100%;
  height: 100%;
  min-height: 126px;
  object-fit: cover;
}

.pagination {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

.manager-group + .manager-group {
  margin-top: 18px;
}

.manager-title {
  font-size: 13px;
  color: #6b819a;
  margin-bottom: 10px;
}

.manager-list {
  display: grid;
  gap: 10px;
}

.manager-item {
  width: 100%;
  border: 1px solid #e4ebf5;
  border-radius: 14px;
  background: #f9fcff;
  padding: 10px 12px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  cursor: pointer;
  text-align: left;
}

.manager-item strong {
  display: block;
  color: #14385d;
  font-size: 14px;
}

.manager-item span {
  display: block;
  margin-top: 3px;
  color: #7187a1;
  font-size: 12px;
}

.hot-tag-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.hot-tag {
  border: 1px solid #d7e5f1;
  background: #f8fbff;
  color: #1d4a72;
  border-radius: 999px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
}

.hot-tag span {
  margin-left: 4px;
  color: #0f7898;
}

.board-notes {
  display: grid;
  gap: 10px;
  color: #506781;
  font-size: 13px;
  line-height: 1.8;
  white-space: pre-wrap;
}

.board-notes p {
  margin: 0;
}

.empty-wrap {
  padding: 40px 0;
}

@media (max-width: 1180px) {
  .board-hero,
  .board-layout,
  .featured-grid,
  .thread-card {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .board-hero-main h1 {
    font-size: 28px;
  }

  .board-toolbar {
    grid-template-columns: 1fr;
  }

  .board-hero-side {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
