<template>
  <div class="forum-home">
    <section class="panel top-view-panel" v-if="topViewedArticles.length">
      <div class="panel-header">
        <h3>推荐轮播</h3>
        <span>精选主题</span>
      </div>
      <el-carousel height="230px" trigger="click" indicator-position="outside" :interval="4200">
        <el-carousel-item v-for="item in topViewedArticles" :key="`top-${item.id}`">
          <button type="button" class="top-slide" @click="goDetail(item.id)">
            <img
              v-if="resolveBanner(item)"
              :src="$resolveImg(resolveBanner(item))"
              :alt="item.title"
              class="top-slide-image"
            />
            <div v-else class="top-slide-fallback">暂无封面</div>
            <div class="top-slide-mask">
              <h3>{{ item.title }}</h3>
              <p>{{ item.abstract || '点击查看完整内容' }}</p>
              <span>{{ item.look_count || 0 }} 浏览 · {{ item.comment_count || 0 }} 评论</span>
            </div>
          </button>
        </el-carousel-item>
      </el-carousel>
    </section>

    <section class="panel announcement-panel" v-if="announcements.length">
      <div class="panel-header">
        <h3>站内公告</h3>
        <span>活动、通知和运营提醒</span>
      </div>
      <div class="announcement-list">
        <button
          v-for="item in announcements"
          :key="`announcement-${item.id}`"
          type="button"
          class="announcement-item"
          @click="openAnnouncement(item)"
        >
          <div class="announcement-copy">
            <div class="announcement-title">
              <el-tag size="small" effect="plain" :type="announcementTagType(item.level)">
                {{ announcementLevelText(item.level) }}
              </el-tag>
              <strong>{{ item.title }}</strong>
            </div>
            <p>{{ item.content }}</p>
          </div>
          <div class="announcement-meta">
            <span>{{ item.board_name || '全站公告' }}</span>
            <span>{{ item.ends_at ? `截止 ${item.ends_at}` : '长期有效' }}</span>
          </div>
        </button>
      </div>
    </section>

    <section class="panel board-entry-panel" v-if="boardsVisible.length">
      <div class="panel-header">
        <h3>热门板块</h3>
        <span>先进板块，再像贴吧一样进入帖子流</span>
      </div>
      <div class="board-entry-grid">
        <button
          v-for="board in boardsVisible"
          :key="board.id"
          type="button"
          class="board-entry-card"
          @click="goBoard(board)"
        >
          <div class="board-entry-head">
            <strong>{{ board.name }}</strong>
            <el-tag size="small" :type="board.is_enabled ? 'success' : 'warning'" effect="plain">
              {{ board.is_enabled ? '开放中' : '维护中' }}
            </el-tag>
          </div>
          <p>{{ board.description || '进入板块查看该主题方向下的帖子与讨论。' }}</p>
          <div class="board-entry-meta">
            <span>#{{ board.slug || board.id }}</span>
            <span>版主 {{ countBoardManagers(board, 'moderator_user_ids') }}</span>
            <span>副版主 {{ countBoardManagers(board, 'deputy_moderator_user_ids') }}</span>
          </div>
          <div class="board-entry-footer">
            进入板块
            <el-icon><ArrowRightBold /></el-icon>
          </div>
        </button>
      </div>
    </section>

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
        <el-button @click="settingVisible = true">
          <el-icon><Setting /></el-icon>
          布局设置
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
      <el-col :xs="24" :lg="6" :xl="5">
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

        <section class="panel" v-if="advertsVisible.length">
          <div class="panel-header">
            <h3>社区推荐</h3>
          </div>
          <div class="advert-list">
            <a
              v-for="item in advertsVisible"
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

        <section class="panel" v-if="tags.length">
          <div class="panel-header">
            <h3>标签导航</h3>
            <button
              v-if="tags.length > 16"
              type="button"
              class="tag-toggle"
              @click="expandTags = !expandTags"
            >
              {{ expandTags ? '收起' : `展开全部 ${tags.length}` }}
            </button>
          </div>
          <div class="tag-cloud">
            <button
              v-for="tag in visibleTags"
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

        <section class="panel creator-panel" v-if="topLevelContributors.length">
          <div class="panel-header">
            <h3>用户贡献榜</h3>
          </div>
          <div class="creator-list">
            <article v-for="creator in topLevelContributors" :key="creator.id || creator.user_name" class="creator-item">
              <el-avatar :size="34" :src="$resolveImg(creator.avatar)" />
              <div class="creator-copy">
                <strong>{{ creator.nick_name || creator.user_name || `用户${creator.id || ''}` }}</strong>
                <span>Lv.{{ creator.level || 1 }} · 经验 {{ creator.experience || 0 }}</span>
              </div>
            </article>
          </div>
        </section>
      </el-col>

      <el-col :xs="24" :lg="12" :xl="14">
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

              <div v-if="resolveBanner(item)" class="thread-cover">
                <img :src="$resolveImg(resolveBanner(item))" :alt="item.title" />
              </div>

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
            :page-size="homeLayout.pageSize"
            :total="total"
            @current-change="fetchArticles"
            class="pagination"
          />
        </section>
      </el-col>

      <el-col :xs="24" :lg="6" :xl="5">
        <section class="panel rank-panel" v-if="hotRankingVisible.length" :style="{ order: homeLayout.orders.hot }">
          <div class="panel-header">
            <h3>今日热榜</h3>
          </div>
          <div class="rank-list">
            <button
              v-for="(item, index) in hotRankingVisible"
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

        <section class="panel level-panel" v-if="levelRankingVisible.length" :style="{ order: homeLayout.orders.level }">
          <div class="panel-header">
            <h3>用户等级榜</h3>
            <span>按等级/经验排序</span>
          </div>
          <div class="level-list">
            <article
              v-for="(item, index) in levelRankingVisible"
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

        <section class="panel profile-panel" v-if="(siteInfo.profile || siteInfo.contact || siteInfo.qq_image || siteInfo.wechat_image)" :style="{ order: homeLayout.orders.profile }">
          <div class="panel-header">
            <h3>个人介绍</h3>
          </div>
          <p v-if="siteInfo.profile" class="profile-copy">{{ siteInfo.profile }}</p>
          <p v-if="siteInfo.contact" class="profile-contact">{{ siteInfo.contact }}</p>
          <div class="profile-qrs">
            <img v-if="normalizeQr(siteInfo.qq_image)" :src="$resolveImg(normalizeQr(siteInfo.qq_image))" alt="qq qrcode" />
            <img v-if="normalizeQr(siteInfo.wechat_image)" :src="$resolveImg(normalizeQr(siteInfo.wechat_image))" alt="wechat qrcode" />
          </div>
          <el-button
            v-if="siteInfo.service_url"
            type="primary"
            plain
            size="small"
            @click="openService"
          >
            联系客服
          </el-button>
        </section>
      </el-col>
    </el-row>

    <el-dialog v-model="settingVisible" title="首页布局设置" width="540px">
      <el-form label-width="140px">
        <el-form-item label="每页文章数量">
          <el-input-number v-model="homeLayout.pageSize" :min="4" :max="12" />
        </el-form-item>
        <el-form-item label="热榜显示数量">
          <el-input-number v-model="homeLayout.hotCount" :min="1" :max="10" />
        </el-form-item>
        <el-form-item label="等级榜显示数量">
          <el-input-number v-model="homeLayout.levelCount" :min="1" :max="10" />
        </el-form-item>
        <el-form-item label="推荐栏显示数量">
          <el-input-number v-model="homeLayout.advertCount" :min="1" :max="8" />
        </el-form-item>
        <el-form-item label="热榜排序">
          <el-select v-model="homeLayout.orders.hot" style="width: 120px">
            <el-option v-for="n in 3" :key="`hot-${n}`" :label="`第 ${n} 位`" :value="n" />
          </el-select>
        </el-form-item>
        <el-form-item label="等级榜排序">
          <el-select v-model="homeLayout.orders.level" style="width: 120px">
            <el-option v-for="n in 3" :key="`level-${n}`" :label="`第 ${n} 位`" :value="n" />
          </el-select>
        </el-form-item>
        <el-form-item label="个人介绍排序">
          <el-select v-model="homeLayout.orders.profile" style="width: 120px">
            <el-option v-for="n in 3" :key="`profile-${n}`" :label="`第 ${n} 位`" :value="n" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="resetHomeLayout">恢复默认</el-button>
        <el-button type="primary" @click="applyHomeLayout">应用</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { apiGetArticleList, apiGetArticleInsights } from '@/api/article'
import { apiGetAnnouncementList } from '@/api/announcement'
import { apiGetTagList } from '@/api/tag'
import { apiGetAdvertList } from '@/api/advert'
import { apiGetBoardList } from '@/api/board'
import { apiGetPublicSiteInfo } from '@/api/system'
import { apiGetUserLevelRank } from '@/api/user'
import {
  ArrowRightBold,
  ChatDotRound,
  ChatLineRound,
  CollectionTag,
  Plus,
  RefreshRight,
  Search,
  Setting,
  Star,
  TrophyBase,
  View
} from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const HOME_LAYOUT_STORAGE_KEY = 'gvb_home_layout_v2'
const defaultHomeLayout = Object.freeze({
  pageSize: 6,
  hotCount: 5,
  levelCount: 5,
  advertCount: 2,
  orders: {
    hot: 1,
    level: 2,
    profile: 3
  }
})

function buildDefaultLayout() {
  return {
    pageSize: defaultHomeLayout.pageSize,
    hotCount: defaultHomeLayout.hotCount,
    levelCount: defaultHomeLayout.levelCount,
    advertCount: defaultHomeLayout.advertCount,
    orders: { ...defaultHomeLayout.orders }
  }
}

function toNumber(value, fallback, min, max) {
  const num = Number(value)
  if (!Number.isFinite(num)) return fallback
  return Math.min(Math.max(Math.round(num), min), max)
}

function loadHomeLayoutFromStorage() {
  const layout = buildDefaultLayout()
  try {
    const raw = localStorage.getItem(HOME_LAYOUT_STORAGE_KEY)
    if (!raw) return layout
    const parsed = JSON.parse(raw)
    layout.pageSize = toNumber(parsed?.pageSize, layout.pageSize, 4, 12)
    layout.hotCount = toNumber(parsed?.hotCount, layout.hotCount, 1, 10)
    layout.levelCount = toNumber(parsed?.levelCount, layout.levelCount, 1, 10)
    layout.advertCount = toNumber(parsed?.advertCount, layout.advertCount, 1, 8)
    layout.orders.hot = toNumber(parsed?.orders?.hot, layout.orders.hot, 1, 3)
    layout.orders.level = toNumber(parsed?.orders?.level, layout.orders.level, 1, 3)
    layout.orders.profile = toNumber(parsed?.orders?.profile, layout.orders.profile, 1, 3)
  } catch {}
  return layout
}

const articles = ref([])
const total = ref(0)
const currentPage = ref(1)
const loadingArticles = ref(false)
const expandTags = ref(false)
const settingVisible = ref(false)
const topViewedArticles = ref([])
const announcements = ref([])
const homeLayout = reactive(loadHomeLayoutFromStorage())

const feedMode = ref('recommend')
const recommendSort = ref('digg_count desc')
const currentTag = ref('')
const currentChannel = ref('全部版块')
const searchKey = ref('')

const boards = ref([])
const tags = ref([])
const adverts = ref([])
const levelRanking = ref([])
const siteInfo = ref({})

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
  for (const board of boards.value) {
    const title = String(board?.name || '').trim()
    if (title) channelSet.add(title)
  }
  return Array.from(channelSet).slice(0, 10)
})

const hotIdSet = computed(() => new Set((insights.value.hot_articles || []).map((item) => String(item.id))))
const hotRanking = computed(() => (insights.value.hot_articles || []).slice(0, 8))
const hotRankingVisible = computed(() => hotRanking.value.slice(0, homeLayout.hotCount))
const boardsVisible = computed(() => (boards.value || []).slice(0, 8))

const topLevelContributors = computed(() => (levelRanking.value || []).slice(0, 3))
const levelRankingVisible = computed(() => (levelRanking.value || []).slice(0, homeLayout.levelCount))
const advertsVisible = computed(() => (adverts.value || []).slice(0, homeLayout.advertCount))
const visibleTags = computed(() => {
  if (expandTags.value) return tags.value
  return (tags.value || []).slice(0, 16)
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

function resolveBoardRouteKey(board) {
  return String(board?.slug || board?.id || '').trim()
}

function resolveBanner(item) {
  return String(item?.banner_url || '').trim()
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

function goBoard(board) {
  const key = resolveBoardRouteKey(board)
  if (!key) return
  router.push({ name: 'BoardDetail', params: { key } })
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

  const boardKey = String(item?.board_slug || item?.board_id || '').trim()
  if (!boardKey) return
  router.push({ name: 'BoardDetail', params: { key: boardKey } })
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

function countBoardManagers(board, field) {
  const list = Array.isArray(board?.[field]) ? board[field] : []
  return list.filter((item) => Number(item) > 0).length
}

async function fetchArticles(page = 1) {
  currentPage.value = page
  loadingArticles.value = true
  try {
    const params = {
      page,
      limit: homeLayout.pageSize,
      sort: activeSort.value
    }

    if (searchKey.value.trim()) params.key = searchKey.value.trim()
    if (currentTag.value) params.tag = currentTag.value
    if (currentChannel.value !== '全部版块') {
      const board = boards.value.find((item) => item.name === currentChannel.value)
      if (board?.id) {
        params.board_id = Number(board.id)
      } else {
        params.board_name = currentChannel.value
      }
    }

    const res = await apiGetArticleList(params)
    articles.value = res.data?.list || []
    total.value = Number(res.data?.count || res.data?.total || 0)
  } finally {
    loadingArticles.value = false
  }
}

async function fetchInsights() {
  const hotSize = Math.max(10, homeLayout.hotCount)
  const res = await apiGetArticleInsights({ hot_size: hotSize, latest_size: 10 })
  insights.value = res.data || insights.value
}

async function fetchTopViewedArticles() {
  try {
    const res = await apiGetArticleList({
      page: 1,
      limit: 5,
      sort: recommendSort.value
    })
    topViewedArticles.value = res.data?.list || []
  } catch {
    topViewedArticles.value = []
  }
}

async function fetchAnnouncements() {
  try {
    const res = await apiGetAnnouncementList({ page: 1, limit: 6 })
    announcements.value = res.data?.list || []
  } catch {
    announcements.value = []
  }
}

async function fetchSideData() {
  // 首页侧边栏数据一次并发拉取，避免多次请求导致布局抖动。
  const [tagRes, advRes, boardRes, siteRes] = await Promise.all([
    apiGetTagList({ limit: 50 }),
    apiGetAdvertList({ limit: 10 }),
    apiGetBoardList({ page: 1, limit: 60 }),
    apiGetPublicSiteInfo()
  ])

  tags.value = tagRes.data?.list || tagRes.data || []
  expandTags.value = false
  adverts.value = (advRes.data?.list || advRes.data || []).filter((item) => item.is_show)
  boards.value = (boardRes.data?.list || boardRes.data || []).sort((a, b) => Number(a.sort || 0) - Number(b.sort || 0))
  siteInfo.value = siteRes.data || {}
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
  expandTags.value = false
  Promise.all([
    fetchAnnouncements(),
    fetchInsights(),
    fetchTopViewedArticles(),
    fetchArticles(currentPage.value),
    fetchSideData(),
    fetchUserLevelRanking()
  ]).catch(() => {})
}

function saveHomeLayout() {
  const payload = {
    pageSize: toNumber(homeLayout.pageSize, defaultHomeLayout.pageSize, 4, 12),
    hotCount: toNumber(homeLayout.hotCount, defaultHomeLayout.hotCount, 1, 10),
    levelCount: toNumber(homeLayout.levelCount, defaultHomeLayout.levelCount, 1, 10),
    advertCount: toNumber(homeLayout.advertCount, defaultHomeLayout.advertCount, 1, 8),
    orders: {
      hot: toNumber(homeLayout.orders.hot, defaultHomeLayout.orders.hot, 1, 3),
      level: toNumber(homeLayout.orders.level, defaultHomeLayout.orders.level, 1, 3),
      profile: toNumber(homeLayout.orders.profile, defaultHomeLayout.orders.profile, 1, 3)
    }
  }
  homeLayout.pageSize = payload.pageSize
  homeLayout.hotCount = payload.hotCount
  homeLayout.levelCount = payload.levelCount
  homeLayout.advertCount = payload.advertCount
  homeLayout.orders.hot = payload.orders.hot
  homeLayout.orders.level = payload.orders.level
  homeLayout.orders.profile = payload.orders.profile
  localStorage.setItem(HOME_LAYOUT_STORAGE_KEY, JSON.stringify(payload))
}

function applyHomeLayout() {
  saveHomeLayout()
  settingVisible.value = false
  fetchArticles(1)
  fetchInsights()
}

function resetHomeLayout() {
  const defaults = buildDefaultLayout()
  homeLayout.pageSize = defaults.pageSize
  homeLayout.hotCount = defaults.hotCount
  homeLayout.levelCount = defaults.levelCount
  homeLayout.advertCount = defaults.advertCount
  homeLayout.orders.hot = defaults.orders.hot
  homeLayout.orders.level = defaults.orders.level
  homeLayout.orders.profile = defaults.orders.profile
}

function normalizeQr(value) {
  // 兼容历史配置：可能是 `qq_image:http://...` 这类前缀格式。
  const text = String(value || '').trim()
  if (!text) return ''
  const idx = text.indexOf('http')
  return idx >= 0 ? text.slice(idx).trim() : text
}

function openService() {
  const url = String(siteInfo.value.service_url || '').trim()
  if (!url) return
  window.open(url, '_blank', 'noopener,noreferrer')
}

onMounted(() => {
  expandTags.value = false
  Promise.all([
    fetchAnnouncements(),
    fetchInsights(),
    fetchTopViewedArticles(),
    fetchArticles(1),
    fetchSideData(),
    fetchUserLevelRanking()
  ]).catch(() => {})
})

watch(recommendSort, () => {
  fetchTopViewedArticles()
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
  grid-template-columns: minmax(0, 1fr) auto auto auto;
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

.board-entry-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.announcement-list {
  display: grid;
  gap: 10px;
}

.announcement-item {
  border: 1px solid #e6edf5;
  border-radius: 14px;
  background: linear-gradient(180deg, #fffef8 0%, #ffffff 100%);
  padding: 14px 16px;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  text-align: left;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.announcement-item:hover {
  transform: translateY(-2px);
  border-color: #c2d9ea;
  box-shadow: 0 12px 22px rgba(20, 40, 70, 0.08);
}

.announcement-copy {
  min-width: 0;
}

.announcement-title {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.announcement-title strong {
  color: #15395d;
  font-size: 15px;
  line-height: 1.5;
}

.announcement-copy p {
  margin: 8px 0 0;
  color: #61758f;
  font-size: 13px;
  line-height: 1.75;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.announcement-meta {
  flex-shrink: 0;
  display: grid;
  gap: 6px;
  justify-items: end;
  color: #6f839d;
  font-size: 12px;
}

.board-entry-card {
  border: 1px solid #deebf5;
  border-radius: 16px;
  background:
    radial-gradient(circle at top right, rgba(20, 131, 194, 0.09), transparent 34%),
    linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  padding: 15px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
}

.board-entry-card:hover {
  transform: translateY(-2px);
  border-color: #a8d1e4;
  box-shadow: 0 14px 24px rgba(20, 58, 86, 0.08);
}

.board-entry-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.board-entry-head strong {
  color: #14385d;
  font-size: 16px;
  line-height: 1.45;
}

.board-entry-card p {
  margin: 12px 0 0;
  color: #61758f;
  font-size: 13px;
  line-height: 1.75;
  min-height: 46px;
}

.board-entry-meta {
  margin-top: 12px;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.board-entry-meta span {
  font-size: 12px;
  color: #0f6c8b;
  background: #ebf8fd;
  border-radius: 999px;
  padding: 4px 9px;
}

.board-entry-footer {
  margin-top: 14px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #0f7f9f;
  font-size: 13px;
  font-weight: 700;
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

.top-view-panel {
  padding-bottom: 12px;
}

.top-slide {
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  padding: 0;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  text-align: left;
  background: #152338;
}

.top-slide-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #152338;
  display: block;
}

.top-slide-fallback {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #c7d9f0;
  font-size: 14px;
}

.top-slide-mask {
  position: absolute;
  inset: auto 0 0 0;
  padding: 14px 16px;
  background: linear-gradient(180deg, rgba(8, 17, 31, 0.05), rgba(8, 17, 31, 0.82));
  color: #fff;
}

.top-slide-mask h3 {
  margin: 0;
  font-size: 18px;
  line-height: 1.35;
}

.top-slide-mask p {
  margin: 6px 0;
  font-size: 13px;
  line-height: 1.6;
  opacity: 0.92;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.top-slide-mask span {
  font-size: 12px;
  opacity: 0.9;
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

.tag-toggle {
  border: none;
  background: transparent;
  color: #1381a0;
  font-size: 12px;
  cursor: pointer;
  padding: 0;
}

.thread-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
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

.thread-cover {
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid #e4ebf5;
  background: #f5f8fc;
}

.thread-cover img {
  width: 100%;
  height: 180px;
  object-fit: contain;
  background: #edf2f8;
  display: block;
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
  max-height: 430px;
  overflow-y: auto;
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
  max-height: 430px;
  overflow-y: auto;
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

.profile-copy {
  margin: 0;
  color: #3d5774;
  font-size: 13px;
  line-height: 1.75;
}

.profile-contact {
  margin: 8px 0 10px;
  color: #0f6f8f;
  font-size: 12px;
}

.profile-qrs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 10px;
}

.profile-qrs img {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 10px;
  border: 1px solid #e2ecf6;
  object-fit: cover;
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
  .board-entry-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .announcement-item {
    flex-direction: column;
  }

  .announcement-meta {
    justify-items: start;
  }

  .search-row {
    grid-template-columns: 1fr;
  }

  .topic-strip {
    flex-direction: column;
  }
}

@media (max-width: 1500px) {
  .thread-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .board-entry-grid {
    grid-template-columns: 1fr;
  }

  .thread-title {
    font-size: 16px;
  }
}
</style>
