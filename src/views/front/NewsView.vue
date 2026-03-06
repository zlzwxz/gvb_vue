<template>
  <div class="news-page">
    <section class="news-header">
      <div>
        <h2>国内热点资讯</h2>
        <p class="news-subtitle">
          支持后台动态控制资讯来源，点击来源即可切换榜单。
        </p>
      </div>
      <el-button :loading="loading" @click="refreshNews">
        <el-icon><RefreshRight /></el-icon>
        刷新资讯
      </el-button>
    </section>

    <section class="summary-grid">
      <div class="summary-card">
        <span>当前来源</span>
        <strong>{{ currentSource?.display_name || '默认热榜' }}</strong>
      </div>
      <div class="summary-card">
        <span>资讯条数</span>
        <strong>{{ list.length }}</strong>
      </div>
      <div class="summary-card">
        <span>更新时间</span>
        <strong>{{ lastUpdatedAt || '刚刚' }}</strong>
      </div>
    </section>

    <section v-if="sourceCards.length" class="source-panel">
      <div class="panel-title-row">
        <div>
          <h3>国内公开热榜来源</h3>
          <p>已启用 {{ sourceCards.length }} / {{ sources.length }} 个来源。先请求 `/api/news/sources` 拿来源，再把选中的 ID 传给 `/api/news` 拉取榜单。</p>
        </div>
      </div>

      <div class="source-grid">
        <button
          v-for="source in sourceCards"
          :key="source.id"
          type="button"
          class="source-card"
          :class="{ active: activeSourceId === source.id }"
          @click="switchSource(source, true)"
        >
          <strong>{{ source.display_name }}</strong>
          <span>{{ source.description }}</span>
          <em>{{ source.name }}</em>
        </button>
      </div>
    </section>
    <section v-else class="source-panel">
      <el-empty description="后台暂未启用任何资讯榜单，请先到系统配置里勾选来源" :image-size="70" />
    </section>

    <div v-if="loading" class="news-loading">
      <el-icon class="is-loading" :size="30"><Loading /></el-icon>
    </div>

    <template v-else>
      <div class="news-layout">
        <section ref="rankingSectionRef" class="news-main">
          <div v-if="list.length > 0" class="news-grid">
            <el-card v-for="(news, i) in list" :key="news.index || i" shadow="hover" class="news-card">
              <a :href="news.link" target="_blank" class="news-link">
                <div class="news-rank" :class="{ 'top-3': i < 3 }">{{ i + 1 }}</div>
                <div class="news-content">
                  <div>
                    <button
                      type="button"
                      class="source-pill source-pill-btn"
                      @click.stop.prevent="jumpToSourceRanking(currentSource)"
                    >
                      {{ currentSource?.display_name || '默认热榜' }}
                    </button>
                    <h3 class="news-title">{{ news.title }}</h3>
                  </div>
                  <div class="news-meta">
                    <span class="news-hot"><el-icon><Top /></el-icon> {{ news.hotValue || '1w+' }}</span>
                    <span class="news-open">点击查看原文</span>
                  </div>
                </div>
              </a>
            </el-card>
          </div>
          <el-empty v-else description="当前来源暂时没有返回资讯" />
        </section>

        <aside class="news-sidebar">
          <div class="sidebar-card">
            <div class="sidebar-title">阅读建议</div>
            <ul class="tips-list">
              <li>先看前 3 条，判断今天的主线事件。</li>
              <li>再切换不同来源，对比同一事件在不同平台的热度差异。</li>
              <li>点击原文前，优先确认链接域名和发布时间。</li>
            </ul>
          </div>

          <div v-if="list.length" class="sidebar-card">
            <div class="sidebar-title">快速预览</div>
            <div class="mini-news-list">
              <a
                v-for="(news, i) in list.slice(0, 8)"
                :key="`${news.index || i}-mini`"
                :href="news.link"
                target="_blank"
                class="mini-news-item"
              >
                <span>{{ i + 1 }}</span>
                <strong>{{ news.title }}</strong>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiGetNewsList, apiGetNewsSourceList } from '@/api/system'
import { Top, Loading, RefreshRight } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const list = ref([])
const loading = ref(false)
const lastUpdatedAt = ref('')
const activeSourceId = ref('')
const sources = ref([])
const rankingSectionRef = ref(null)

const sourceDescriptionMap = [
  { keyword: '微博', description: '社会热点和即时舆情更新快，适合快速扫当天公共话题。' },
  { keyword: '知乎', description: '观点讨论密度高，适合跟进争议事件和解释型内容。' },
  { keyword: '百度', description: '大众覆盖更广，适合观察全国范围的综合关注点。' },
  { keyword: '36氪', description: '偏科技、商业和创业动态，适合补充行业资讯。' },
  { keyword: '虎扑', description: '体育与社区讨论热度集中，适合看圈层热点。' },
  { keyword: '哔哩哔哩', description: '视频社区传播快，适合观察年轻用户兴趣趋势。' },
  { keyword: '抖音', description: '短视频传播速度快，适合捕捉大众流行话题。' },
  { keyword: '少数派', description: '偏工具效率和数字生活，内容结构化程度较高。' },
  { keyword: 'IT之家', description: '科技和数码资讯更新稳定，适合补充垂直信息。' }
]

function resolveSourceDescription(name) {
  const matched = sourceDescriptionMap.find((item) => name?.includes(item.keyword))
  if (matched) return matched.description
  return '该来源已接入热榜聚合接口，可直接切换并实时查看最新榜单。'
}

const sourceCards = computed(() => {
  return (sources.value || [])
    .filter((item) => item.enabled !== false)
    .map((item) => ({
      ...item,
      display_name: item.name || '未命名来源',
      description: resolveSourceDescription(item.name)
    }))
})

const currentSource = computed(() => {
  return sourceCards.value.find((item) => item.id === activeSourceId.value) || null
})

function normalizeSourceId(sourceId) {
  return String(sourceId || '').trim()
}

function ensureActiveSource() {
  if (!sourceCards.value.length) {
    activeSourceId.value = ''
    return
  }

  const matched = sourceCards.value.find((item) => item.id === activeSourceId.value)
  if (!matched) {
    activeSourceId.value = sourceCards.value[0].id
  }
}

function syncSourceQuery(sourceId) {
  const normalized = normalizeSourceId(sourceId)
  if (normalizeSourceId(route.query.source) === normalized) return

  const nextQuery = { ...route.query }
  if (normalized) {
    nextQuery.source = normalized
  } else {
    delete nextQuery.source
  }
  router.replace({ name: 'News', query: nextQuery }).catch(() => {})
}

function scrollToRankingSection() {
  nextTick(() => {
    rankingSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

async function fetchSources() {
  try {
    const res = await apiGetNewsSourceList()
    sources.value = res.data || []
    const querySource = normalizeSourceId(route.query.source)
    if (querySource) {
      activeSourceId.value = querySource
    }
    ensureActiveSource()
    syncSourceQuery(activeSourceId.value)
  } catch (e) {
    console.error(e)
  }
}

async function fetchNews(sourceId = activeSourceId.value) {
  if (!sourceId && sourceCards.value.length) {
    sourceId = sourceCards.value[0].id
    activeSourceId.value = sourceId
  }
  if (!sourceId) {
    list.value = []
    return
  }

  loading.value = true
  try {
    const params = {
      size: 24
    }

    if (sourceId) {
      params.id = sourceId
    }

    const res = await apiGetNewsList(params)
    list.value = res.data?.list || res.data || []
    lastUpdatedAt.value = formatUpdateTime()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function switchSource(source, jumpToRanking = false) {
  const sourceId = normalizeSourceId(source?.id)
  if (!sourceId) return

  activeSourceId.value = sourceId
  syncSourceQuery(sourceId)
  await fetchNews(sourceId)
  if (jumpToRanking) {
    scrollToRankingSection()
  }
}

function jumpToSourceRanking(source) {
  if (!source?.id) {
    scrollToRankingSection()
    return
  }
  switchSource(source, true)
}

function refreshNews() {
  fetchNews(activeSourceId.value)
}

function formatUpdateTime() {
  const now = new Date()
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
}

onMounted(async () => {
  await fetchSources()
  await fetchNews(activeSourceId.value)
})
</script>

<style scoped>
.news-page {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 60vh;
}

.news-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
  padding: 18px;
  border-radius: 14px;
  border: 1px solid #dde8f4;
  background: #fff;
}

.news-header h2 {
  margin: 0;
  font-size: 24px;
  color: #173a61;
}

.news-subtitle {
  margin: 8px 0 0;
  max-width: 680px;
  font-size: 13px;
  line-height: 1.7;
  color: #67819c;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.summary-card,
.source-panel,
.sidebar-card {
  background: var(--bg-card);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
}

.summary-card {
  padding: 16px;
  border: 1px solid #e8eef8;
}

.summary-card span {
  display: block;
  font-size: 12px;
  color: var(--text-secondary);
}

.summary-card strong {
  display: block;
  margin-top: 10px;
  font-size: 22px;
  color: #165dff;
}

.source-panel {
  padding: 18px;
}

.panel-title-row h3 {
  margin: 0;
  font-size: 18px;
}

.panel-title-row p {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--text-secondary);
}

.source-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.source-card {
  border: 1px solid #e5ebf5;
  background: #fbfcff;
  border-radius: 14px;
  padding: 14px;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.source-card:hover,
.source-card.active {
  border-color: #bcd0ff;
  box-shadow: 0 10px 20px rgba(22, 93, 255, 0.08);
  transform: translateY(-2px);
}

.source-card strong,
.source-card span,
.source-card em {
  display: block;
}

.source-card strong {
  color: var(--text-primary);
  font-size: 15px;
}

.source-card span {
  margin-top: 8px;
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.7;
}

.source-card em {
  margin-top: 10px;
  color: #165dff;
  font-size: 12px;
  font-style: normal;
}

.news-loading {
  text-align: center;
  padding: 40px;
}

.news-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 18px;
  align-items: start;
}

.news-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.news-card {
  border-radius: 14px;
  border: 1px solid var(--border-color);
}

.news-card :deep(.el-card__body) {
  padding: 15px 20px;
}

.news-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: center;
  gap: 20px;
}

.news-link:hover .news-title {
  color: var(--primary-color);
}

.news-rank {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f3f5;
  color: var(--text-secondary);
  font-weight: bold;
  font-size: 14px;
  border-radius: 8px;
  flex-shrink: 0;
}

.news-rank.top-3 {
  background-color: #f53f3f;
  color: white;
}

.news-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.source-pill {
  display: inline-flex;
  margin-bottom: 8px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #edf3ff;
  color: #165dff;
  font-size: 12px;
  font-weight: 600;
}

.source-pill-btn {
  border: none;
  cursor: pointer;
}

.source-pill-btn:hover {
  background: #e0ecff;
}

.news-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.news-meta {
  flex-shrink: 0;
  display: grid;
  justify-items: end;
  gap: 8px;
}

.news-hot {
  color: #f53f3f;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}

.news-open {
  font-size: 12px;
  color: var(--text-muted);
}

.news-sidebar {
  display: grid;
  gap: 16px;
}

.news-main {
  scroll-margin-top: 90px;
}

.sidebar-card {
  padding: 18px;
  border: 1px solid #eef2f7;
}

.sidebar-title {
  margin-bottom: 12px;
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
}

.tips-list {
  margin: 0;
  padding-left: 18px;
  color: var(--text-secondary);
  display: grid;
  gap: 10px;
  line-height: 1.8;
}

.mini-news-list {
  display: grid;
  gap: 10px;
}

.mini-news-item {
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 10px;
  text-decoration: none;
  color: inherit;
  padding: 10px 0;
  border-bottom: 1px dashed #e9eef6;
}

.mini-news-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.mini-news-item span {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #edf3ff;
  color: #165dff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
}

.mini-news-item strong {
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-primary);
}

@media (max-width: 992px) {
  .news-header,
  .news-layout {
    grid-template-columns: 1fr;
  }

  .news-header {
    flex-direction: column;
  }

  .summary-grid,
  .source-grid {
    grid-template-columns: 1fr;
  }

  .news-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .news-meta {
    justify-items: start;
  }
}
</style>
