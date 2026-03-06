<template>
  <div class="forum-home">
    <section class="forum-toolbar">
      <div class="feed-tabs">
        <button
          v-for="item in feedTabs"
          :key="item.key"
          type="button"
          class="feed-tab"
          :class="{ active: feedMode === item.key }"
          @click="switchFeed(item.key)"
        >
          <strong>{{ item.label }}</strong>
          <span>{{ item.desc }}</span>
        </button>
      </div>

      <div class="channel-pills">
        <button
          v-for="channel in channelOptions"
          :key="channel"
          type="button"
          class="channel-pill"
          :class="{ active: currentChannel === channel }"
          @click="setChannel(channel)"
        >
          {{ channel }}
        </button>
      </div>

      <div class="search-row">
        <el-input
          v-model="searchKey"
          placeholder="搜索主题、标签、正文关键词"
          clearable
          @keyup.enter="fetchArticles(1)"
          @clear="fetchArticles(1)"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        <el-select
          v-if="feedMode === 'recommend'"
          v-model="recommendSort"
          style="width: 150px"
          @change="fetchArticles(1)"
        >
          <el-option label="推荐优先" value="digg_count desc" />
          <el-option label="讨论优先" value="comment_count desc" />
          <el-option label="收藏优先" value="collects_count desc" />
          <el-option label="浏览优先" value="look_count desc" />
        </el-select>
        <el-button @click="refreshAll">
          <el-icon><RefreshRight /></el-icon>
          刷新
        </el-button>
      </div>
    </section>

    <section class="topic-strip" v-if="insights.hot_tags.length">
      <div class="topic-title">热议话题</div>
      <div class="topic-list">
        <button
          v-for="item in insights.hot_tags"
          :key="item.tag"
          type="button"
          class="topic-chip"
          :class="{ active: currentTag === item.tag }"
          @click="filterByTag(item.tag)"
        >
          #{{ item.tag }}
          <span>{{ item.count }}</span>
        </button>
      </div>
    </section>

    <el-row :gutter="20" class="forum-grid">
      <el-col :xs="24" :lg="16">
        <section class="panel thread-panel">
          <div class="panel-header">
            <h3>{{ feedTitle }}</h3>
            <span>{{ total }} 条主题</span>
          </div>

          <div class="thread-list" v-loading="loadingArticles">
            <article
              v-for="item in articles"
              :key="item.id"
              class="thread-card"
              @click="goDetail(item.id)"
            >
              <header class="thread-header">
                <div class="thread-author">
                  <el-avatar :size="36" :src="$resolveImg(resolveAvatar(item))" />
                  <div class="author-meta">
                    <strong>{{ resolveAuthor(item) }}</strong>
                    <span>{{ formatDateTime(item.created_at) }}</span>
                  </div>
                </div>
                <div class="thread-flags">
                  <span v-if="isHot(item)" class="flag hot">热帖</span>
                  <span class="flag category">{{ resolveCategory(item) }}</span>
                </div>
              </header>

              <h4 class="thread-title">{{ item.title }}</h4>
              <p class="thread-abstract">{{ item.abstract || '这个主题还没有摘要，点击进入查看完整内容。' }}</p>

              <footer class="thread-footer">
                <div class="thread-stats">
                  <span><el-icon><View /></el-icon>{{ item.look_count || 0 }}</span>
                  <span><el-icon><ChatDotRound /></el-icon>{{ item.comment_count || 0 }}</span>
                  <span><el-icon><Star /></el-icon>{{ item.digg_count || 0 }}</span>
                </div>
                <div class="thread-tags">
                  <span v-for="tag in resolveTags(item).slice(0, 3)" :key="`${item.id}-${tag}`" class="mini-tag">
                    #{{ tag }}
                  </span>
                </div>
                <el-button type="primary" link @click.stop="goDetail(item.id)">
                  参与讨论
                  <el-icon><ArrowRightBold /></el-icon>
                </el-button>
              </footer>
            </article>
            <el-empty v-if="!loadingArticles && !articles.length" description="当前筛选暂无主题" />
          </div>

          <el-pagination
            v-if="total > 0"
            background
            layout="total, prev, pager, next"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            @current-change="fetchArticles"
            class="pagination"
          />
        </section>
      </el-col>

      <el-col :xs="24" :lg="8">
        <section class="panel quick-panel">
          <div class="panel-header">
            <h3>社区操作</h3>
          </div>
          <div class="quick-actions">
            <button type="button" class="quick-btn" @click="goPublish">
              <el-icon><Plus /></el-icon>
              <span>发布新主题</span>
            </button>
            <button type="button" class="quick-btn" @click="goChatRoom">
              <el-icon><ChatLineRound /></el-icon>
              <span>加入实时聊天</span>
            </button>
            <button type="button" class="quick-btn" @click="goCollect">
              <el-icon><CollectionTag /></el-icon>
              <span>查看我的收藏</span>
            </button>
            <button type="button" class="quick-btn" @click="goGames">
              <el-icon><TrophyBase /></el-icon>
              <span>游客小游戏</span>
            </button>
          </div>
        </section>

        <section class="panel rank-panel" v-if="hotRanking.length">
          <div class="panel-header">
            <h3>今日热榜</h3>
          </div>
          <div class="rank-list">
            <button
              v-for="(item, index) in hotRanking"
              :key="`hot-${item.id}`"
              type="button"
              class="rank-item"
              @click="goDetail(item.id)"
            >
              <span class="rank-no">{{ String(index + 1).padStart(2, '0') }}</span>
              <div class="rank-copy">
                <strong>{{ item.title }}</strong>
                <span>{{ item.look_count || 0 }} 浏览 · {{ item.comment_count || 0 }} 评论</span>
              </div>
            </button>
          </div>
        </section>

        <section class="panel creator-panel" v-if="activeCreators.length">
          <div class="panel-header">
            <h3>活跃创作者</h3>
          </div>
          <div class="creator-list">
            <article v-for="creator in activeCreators" :key="creator.name" class="creator-item">
              <el-avatar :size="34" :src="$resolveImg(creator.avatar)" />
              <div class="creator-copy">
                <strong>{{ creator.name }}</strong>
                <span>{{ creator.posts }} 篇主题 · {{ creator.score }} 热度</span>
              </div>
            </article>
          </div>
        </section>

        <section class="panel level-panel" v-if="levelRanking.length">
          <div class="panel-header">
            <h3>用户等级榜</h3>
            <span>按等级/经验排序</span>
          </div>
          <div class="level-list">
            <article
              v-for="(item, index) in levelRanking"
              :key="`level-${item.id || index}`"
              class="level-item"
              :class="{ self: Number(item.id) === Number(userStore.currentUserId) }"
            >
              <span class="level-no">{{ index + 1 }}</span>
              <el-avatar :size="30" :src="$resolveImg(item.avatar)" />
              <div class="level-copy">
                <strong>{{ item.nick_name || item.user_name || `用户${item.id || ''}` }}</strong>
                <span>Lv.{{ item.level || 1 }} · 经验 {{ item.experience || 0 }} · 积分 {{ item.points || 0 }}</span>
              </div>
            </article>
          </div>
        </section>

        <section class="panel" v-if="tags.length">
          <div class="panel-header">
            <h3>标签导航</h3>
          </div>
          <div class="tag-cloud">
            <button
              v-for="tag in tags"
              :key="tag.title || tag.id"
              type="button"
              class="cloud-tag"
              :class="{ active: currentTag === (tag.title || '') }"
              @click="filterByTag(tag.title || '')"
            >
              {{ tag.title }}
            </button>
          </div>
        </section>

        <section class="panel" v-if="adverts.length">
          <div class="panel-header">
            <h3>社区推荐</h3>
          </div>
          <div class="advert-list">
            <a
              v-for="item in adverts.slice(0, 4)"
              :key="item.id"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="advert-item"
            >
              <img :src="$resolveImg(item.images)" :alt="item.title" />
              <span>{{ item.title }}</span>
            </a>
          </div>
        </section>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { apiGetArticleList, apiGetArticleInsights } from '@/api/article'
import { apiGetTagList } from '@/api/tag'
import { apiGetAdvertList } from '@/api/advert'
import { apiGetMenuList } from '@/api/menu'
import { apiGetUserLevelRank } from '@/api/user'
import {
  ArrowRightBold,
  ChatDotRound,
  ChatLineRound,
  CollectionTag,
  Plus,
  RefreshRight,
  Search,
  Star,
  TrophyBase,
  View
} from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const pageSize = 12

const articles = ref([])
const total = ref(0)
const currentPage = ref(1)
const loadingArticles = ref(false)

const feedMode = ref('recommend')
const recommendSort = ref('digg_count desc')
const currentTag = ref('')
const currentChannel = ref('全部版块')
const searchKey = ref('')

const menus = ref([])
const tags = ref([])
const adverts = ref([])
const levelRanking = ref([])

const insights = ref({
  stats: {
    article_count: 0,
    look_total: 0,
    comment_total: 0,
    digg_total: 0,
    collect_total: 0
  },
  hot_articles: [],
  latest_articles: [],
  hot_tags: []
})

const feedTabs = [
  { key: 'recommend', label: '推荐', desc: '高质量讨论' },
  { key: 'latest', label: '最新', desc: '刚刚发布' },
  { key: 'hot', label: '热议', desc: '评论最多' }
]

const feedTitle = computed(() => {
  if (feedMode.value === 'latest') return '最新主题'
  if (feedMode.value === 'hot') return '热议主题'
  return '推荐主题'
})

const activeSort = computed(() => {
  if (feedMode.value === 'latest') return 'created_at desc'
  if (feedMode.value === 'hot') return 'comment_count desc'
  return recommendSort.value
})

const channelOptions = computed(() => {
  const channelSet = new Set(['全部版块'])
  for (const menu of menus.value) {
    const title = String(menu?.title || '').trim()
    if (title) channelSet.add(title)
  }
  return Array.from(channelSet).slice(0, 10)
})

const hotIdSet = computed(() => new Set((insights.value.hot_articles || []).map((item) => String(item.id))))
const hotRanking = computed(() => (insights.value.hot_articles || []).slice(0, 8))

const activeCreators = computed(() => {
  const list = [
    ...(insights.value.hot_articles || []),
    ...(insights.value.latest_articles || []),
    ...articles.value
  ]

  const map = new Map()
  for (const item of list) {
    const name = resolveAuthor(item)
    if (!name) continue
    const current = map.get(name) || { name, avatar: resolveAvatar(item), posts: 0, score: 0 }
    current.posts += 1
    current.score += Math.round((item.comment_count || 0) * 1.6 + (item.digg_count || 0) * 1.2 + (item.look_count || 0) * 0.1)
    if (!current.avatar) current.avatar = resolveAvatar(item)
    map.set(name, current)
  }
  return Array.from(map.values()).sort((a, b) => b.score - a.score).slice(0, 6)
})

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

function resolveAvatar(item) {
  return item?.user_avatar || item?.avatar || ''
}

function resolveCategory(item) {
  const category = String(item?.category || '').trim()
  if (category) return category
  return '综合讨论'
}

function resolveTags(item) {
  if (Array.isArray(item?.tags)) return item.tags.filter(Boolean)
  if (typeof item?.tags === 'string') return item.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
  return []
}

function isHot(item) {
  return hotIdSet.value.has(String(item.id))
}

function goDetail(id) {
  router.push({ name: 'ArticleDetail', params: { id } })
}

function goPublish() {
  if (!userStore.isLoggedIn) {
    router.push({ path: '/login', query: { redirect: '/admin/article/edit' } })
    return
  }
  router.push('/admin/article/edit')
}

function goChatRoom() {
  router.push({ name: 'ChatRoom' })
}

function goCollect() {
  if (!userStore.isLoggedIn) {
    router.push({ path: '/login', query: { redirect: '/collect' } })
    return
  }
  router.push({ name: 'Collect' })
}

function goGames() {
  router.push({ name: 'Games' })
}

function switchFeed(mode) {
  if (feedMode.value === mode) return
  feedMode.value = mode
  fetchArticles(1)
}

function setChannel(channel) {
  if (currentChannel.value === channel) return
  currentChannel.value = channel
  fetchArticles(1)
}

function filterByTag(name) {
  currentTag.value = currentTag.value === name ? '' : name
  fetchArticles(1)
}

async function fetchArticles(page = 1) {
  currentPage.value = page
  loadingArticles.value = true
  try {
    const params = {
      page,
      limit: pageSize,
      sort: activeSort.value
    }

    if (searchKey.value.trim()) params.key = searchKey.value.trim()
    if (currentTag.value) params.tag = currentTag.value
    if (currentChannel.value !== '全部版块') params.category = currentChannel.value

    const res = await apiGetArticleList(params)
    articles.value = res.data?.list || []
    total.value = Number(res.data?.count || res.data?.total || 0)
  } finally {
    loadingArticles.value = false
  }
}

async function fetchInsights() {
  const res = await apiGetArticleInsights({ hot_size: 10, latest_size: 10 })
  insights.value = res.data || insights.value
}

async function fetchSideData() {
  const [tagRes, advRes, menuRes] = await Promise.all([
    apiGetTagList({ limit: 50 }),
    apiGetAdvertList({ limit: 10 }),
    apiGetMenuList({ size: 30 })
  ])

  tags.value = tagRes.data?.list || tagRes.data || []
  adverts.value = (advRes.data?.list || advRes.data || []).filter((item) => item.is_show)
  menus.value = (menuRes.data?.list || menuRes.data || []).sort((a, b) => Number(a.sort || 0) - Number(b.sort || 0))
}

async function fetchUserLevelRanking() {
  try {
    const res = await apiGetUserLevelRank({ limit: 10 })
    levelRanking.value = Array.isArray(res.data) ? res.data : []
  } catch {
    levelRanking.value = []
  }
}

function refreshAll() {
  Promise.all([
    fetchInsights(),
    fetchArticles(currentPage.value),
    fetchSideData(),
    fetchUserLevelRanking()
  ]).catch(() => {})
}

onMounted(() => {
  Promise.all([
    fetchInsights(),
    fetchArticles(1),
    fetchSideData(),
    fetchUserLevelRanking()
  ]).catch(() => {})
})
</script>

<style scoped>
.forum-home {
  display: grid;
  gap: 18px;
}

.forum-toolbar {
  border-radius: 16px;
  background: var(--bg-card);
  border: 1px solid rgba(220, 227, 238, 0.9);
  box-shadow: 0 8px 20px rgba(20, 40, 70, 0.06);
  padding: 14px;
  display: grid;
  gap: 12px;
}

.feed-tabs {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 2px;
}

.feed-tab {
  min-width: 140px;
  border: 1px solid #dde6f3;
  border-radius: 12px;
  background: #f8fbff;
  cursor: pointer;
  padding: 10px 12px;
  text-align: left;
  transition: all 0.2s ease;
}

.feed-tab strong {
  display: block;
  color: #123458;
  font-size: 14px;
}

.feed-tab span {
  display: block;
  margin-top: 3px;
  font-size: 12px;
  color: #60738f;
}

.feed-tab.active {
  border-color: #1483c2;
  background: linear-gradient(155deg, #f2fbff, #e9f5ff);
  box-shadow: 0 5px 14px rgba(20, 131, 194, 0.16);
}

.channel-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.channel-pill {
  border: 1px solid #d8e5f2;
  background: #fff;
  color: #23476f;
  border-radius: 999px;
  font-size: 12px;
  padding: 6px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.channel-pill:hover,
.channel-pill.active {
  color: #0f7894;
  border-color: #9fd9e4;
  background: #eefbff;
}

.search-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto auto;
  gap: 10px;
}

.search-row :deep(.el-input__wrapper) {
  border-radius: 10px;
}

.topic-strip {
  border-radius: 14px;
  padding: 12px 14px;
  background: #fff9f1;
  border: 1px solid #f4dec5;
  display: flex;
  gap: 12px;
}

.topic-title {
  font-size: 13px;
  font-weight: 700;
  color: #9c5b1a;
  white-space: nowrap;
}

.topic-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.topic-chip {
  border: 1px solid #f3cca2;
  border-radius: 999px;
  background: #fff;
  color: #b05f16;
  padding: 5px 11px;
  font-size: 12px;
  cursor: pointer;
}

.topic-chip span {
  margin-left: 4px;
  color: #db7d27;
}

.topic-chip.active,
.topic-chip:hover {
  background: #ffedd8;
}

.panel {
  background: var(--bg-card);
  border-radius: 16px;
  border: 1px solid rgba(220, 227, 238, 0.9);
  box-shadow: 0 8px 20px rgba(20, 40, 70, 0.06);
  padding: 16px;
}

.panel + .panel {
  margin-top: 16px;
}

.panel-header {
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.panel-header h3 {
  margin: 0;
  font-size: 16px;
  color: #143456;
}

.panel-header span {
  font-size: 12px;
  color: #70839f;
}

.thread-list {
  display: grid;
  gap: 12px;
}

.thread-card {
  border: 1px solid #e4ebf5;
  border-radius: 14px;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  padding: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.thread-card:hover {
  border-color: #b4d2e8;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(24, 72, 108, 0.08);
}

.thread-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.thread-author {
  display: flex;
  align-items: center;
  gap: 10px;
}

.author-meta strong {
  display: block;
  font-size: 14px;
  color: #173a60;
}

.author-meta span {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  color: #71849f;
}

.thread-flags {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.flag {
  font-size: 11px;
  border-radius: 999px;
  padding: 3px 8px;
}

.flag.hot {
  color: #c74f17;
  background: #ffe7d4;
}

.flag.category {
  color: #156c89;
  background: #e6f5fb;
}

.thread-title {
  margin: 10px 0 7px;
  font-size: 18px;
  line-height: 1.45;
  color: #102a46;
}

.thread-abstract {
  margin: 0;
  color: #5f728d;
  font-size: 13px;
  line-height: 1.8;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.thread-footer {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.thread-stats {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #6d819a;
  font-size: 12px;
}

.thread-stats span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.thread-tags {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.mini-tag {
  font-size: 11px;
  color: #0f6b8a;
  border-radius: 999px;
  background: #ecf8fc;
  padding: 4px 8px;
}

.pagination {
  margin-top: 14px;
  display: flex;
  justify-content: center;
}

.quick-actions {
  display: grid;
  gap: 10px;
}

.quick-btn {
  border: 1px solid #dce7f1;
  background: #f8fbff;
  border-radius: 10px;
  padding: 10px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1f456d;
  font-size: 13px;
}

.quick-btn:hover {
  border-color: #9fcfe5;
  background: #eef8fd;
}

.rank-list {
  display: grid;
  gap: 8px;
}

.rank-item {
  border: 1px solid #e4ebf5;
  border-radius: 10px;
  background: #fff;
  padding: 10px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  cursor: pointer;
  text-align: left;
}

.rank-no {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: #0f6f8f;
  background: #e7f5fa;
}

.rank-copy strong {
  display: block;
  font-size: 13px;
  color: #123456;
  line-height: 1.5;
}

.rank-copy span {
  display: block;
  margin-top: 4px;
  color: #7588a3;
  font-size: 12px;
}

.creator-list {
  display: grid;
  gap: 8px;
}

.creator-item {
  border: 1px solid #e4ebf5;
  border-radius: 10px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 9px;
}

.creator-copy strong {
  display: block;
  color: #14365a;
  font-size: 13px;
}

.creator-copy span {
  display: block;
  margin-top: 3px;
  font-size: 12px;
  color: #6f839e;
}

.level-list {
  display: grid;
  gap: 8px;
}

.level-item {
  border: 1px solid #e4ebf5;
  border-radius: 10px;
  padding: 8px 10px;
  display: grid;
  grid-template-columns: 24px auto 1fr;
  align-items: center;
  gap: 8px;
}

.level-item.self {
  border-color: #92cde4;
  background: #eef8fd;
}

.level-no {
  width: 24px;
  height: 24px;
  border-radius: 7px;
  background: #e6f4fb;
  color: #116f8c;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.level-copy strong {
  display: block;
  color: #14365a;
  font-size: 13px;
}

.level-copy span {
  display: block;
  margin-top: 2px;
  color: #6f839e;
  font-size: 12px;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cloud-tag {
  border: 1px solid #e0e8f2;
  background: #f8fbff;
  color: #27557d;
  border-radius: 999px;
  padding: 5px 11px;
  font-size: 12px;
  cursor: pointer;
}

.cloud-tag.active,
.cloud-tag:hover {
  border-color: #9ecfe3;
  background: #eaf7fc;
  color: #126e8c;
}

.advert-list {
  display: grid;
  gap: 10px;
}

.advert-item {
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  display: block;
  border: 1px solid #e4ebf5;
}

.advert-item img {
  width: 100%;
  height: 92px;
  object-fit: cover;
  filter: brightness(0.85);
}

.advert-item span {
  position: absolute;
  inset: auto 10px 10px;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(8, 15, 36, 0.45);
}

@media (max-width: 992px) {
  .search-row {
    grid-template-columns: 1fr;
  }

  .topic-strip {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .thread-title {
    font-size: 16px;
  }
}
</style>
