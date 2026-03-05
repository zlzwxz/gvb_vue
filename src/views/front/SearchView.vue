<template>
  <div class="search-page container">
    <!-- 搜索栏 -->
    <div class="search-header">
      <span class="search-brand">GVB博客|搜索</span>
      <el-input v-model="keyword" placeholder="搜索文章标题" class="search-input" @keyup.enter="() => doSearch(1)" clearable />
      <el-button type="primary" @click="() => doSearch(1)">搜索</el-button>
    </div>

    <!-- 排序筛选 -->
    <div class="filter-row">
      <span class="filter-label active">综合排序</span>
      <span class="filter-label" @click="sortBy('look_count')">最多浏览</span>
      <span class="filter-label" @click="sortBy('created_at')">最新发布</span>
      <span class="filter-label" @click="sortBy('digg_count')">最多点赞</span>
      <span class="filter-label" @click="sortBy('comment_count')">最多评论</span>
      <span class="filter-label" @click="sortBy('collects_count')">最多收藏</span>
    </div>

    <!-- 标签筛选 -->
    <div class="filter-row">
      <span class="filter-tag" :class="{ active: !currentTag }" @click="currentTag = ''; doSearch()">全部标签</span>
      <span
        v-for="tag in tags"
        :key="tag.id"
        class="filter-tag"
        :class="{ active: currentTag === tag.title }"
        @click="currentTag = tag.title; doSearch()"
      >{{ tag.title }}</span>
    </div>

    <!-- 搜索结果 - 4列网格 -->
    <div v-if="loading" style="text-align:center;padding:40px;"><el-skeleton :rows="4" animated /></div>
    <div v-else-if="results.length" class="result-grid">
      <div v-for="item in results" :key="item.id" class="result-card" @click="goDetail(item.id)">
        <div class="result-cover">
          <el-image v-if="item.banner_url" :src="$resolveImg(item.banner_url)" fit="scale-down" style="width:100%;height:100%;" />
          <div v-else class="cover-fallback">
            <span>{{ item.title?.charAt(0) || '文' }}</span>
          </div>
        </div>
        <div class="result-body">
          <h3 class="result-title">{{ item.title }}</h3>
          <p class="result-abstract">{{ item.abstract || '暂无摘要...' }}</p>
          <div class="result-meta">
            <span><el-icon><View /></el-icon> {{ item.look_count || 0 }}</span>
            <span><el-icon><Clock /></el-icon> {{ formatDate(item.created_at) }}</span>
          </div>
        </div>
      </div>
    </div>
    <el-empty v-else description="暂无搜索结果" />

    <el-pagination
      v-if="total > 0"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="doSearch"
      style="margin-top:24px; display:flex; justify-content:center;"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiGetArticleList } from '@/api/article'
import { apiGetTagList } from '@/api/tag'
import { View, Clock } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const keyword = ref(route.query.key || '')
const currentTag = ref('')
const results = ref([])
const total = ref(0)
const loading = ref(false)
const pageSize = 12
const tags = ref([])
let currentSort = ''

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function goDetail(id) { router.push({ name: 'ArticleDetail', params: { id } }) }

function sortBy(field) { currentSort = field; doSearch() }

async function doSearch(page = 1) {
  loading.value = true
  const params = { page, size: pageSize }
  if (keyword.value) params.key = keyword.value
  if (currentTag.value) params.tag = currentTag.value
  if (currentSort) params.sort = currentSort

  try {
    const res = await apiGetArticleList(params)
    results.value = res.data?.list || res.data || []
    total.value = res.data?.total || 0
  } catch (e) { console.error(e) }
  finally { loading.value = false }
}

async function loadTags() {
  try {
    const res = await apiGetTagList({ size: 50 })
    tags.value = res.data?.list || res.data || []
  } catch (e) { tags.value = [] }
}

onMounted(() => { loadTags(); doSearch() })
</script>

<style scoped>
.search-page { padding: 30px 0; min-height: 60vh; }

/* 搜索头部 */
.search-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px 30px;
  background: var(--bg-card, #fff);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.search-brand { font-size: 16px; font-weight: 700; color: var(--text-primary); white-space: nowrap; }
.search-input { flex: 1; }

/* 筛选行 */
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
  padding: 14px 20px;
  background: var(--bg-card, #fff);
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.filter-label, .filter-tag {
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 4px;
  transition: all 0.2s;
}
.filter-label:hover, .filter-tag:hover { color: var(--primary-color); }
.filter-label.active, .filter-tag.active {
  background: var(--primary-color, #409eff);
  color: #fff;
  border-radius: 4px;
}

/* 4列网格 */
.result-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 20px;
}
.result-card {
  background: var(--bg-card, #fff);
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.result-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.12);
}
.result-cover { width: 100%; height: 160px; overflow: hidden; }
.cover-fallback {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex; align-items: center; justify-content: center;
  font-size: 28px; font-weight: 700; color: rgba(255,255,255,0.5);
}
.result-body { padding: 14px 16px; }
.result-title {
  font-size: 15px; font-weight: 600; margin: 0 0 6px; color: var(--text-primary);
  display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;
}
.result-abstract {
  font-size: 12px; color: var(--text-secondary); margin: 0 0 10px; line-height: 1.5;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}
.result-meta {
  display: flex; justify-content: space-between;
  font-size: 12px; color: var(--text-muted, #bbb);
}
.result-meta span { display: flex; align-items: center; gap: 3px; }

@media (max-width: 1024px) { .result-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .result-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .result-grid { grid-template-columns: 1fr; } }
</style>
