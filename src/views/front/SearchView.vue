<template>
  <div class="search-page">
    <section class="search-head">
      <h2>全站搜索</h2>
      <div class="search-box">
        <el-input
          v-model="keyword"
          placeholder="输入关键词并回车"
          clearable
          @keyup.enter="doSearch(1)"
          @clear="doSearch(1)"
        >
          <template #prefix><el-icon><Search /></el-icon></template>
        </el-input>
        <el-button type="primary" @click="doSearch(1)">搜索</el-button>
      </div>
    </section>

    <section class="filter-panel">
      <div class="sort-row">
        <button
          v-for="item in sortOptions"
          :key="item.value"
          type="button"
          class="sort-btn"
          :class="{ active: currentSort === item.value }"
          @click="sortBy(item.value)"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="tag-row">
        <button
          type="button"
          class="tag-btn"
          :class="{ active: !currentTag }"
          @click="setTag('')"
        >
          全部标签
        </button>
        <button
          v-for="tag in tags"
          :key="tag.id || tag.title"
          type="button"
          class="tag-btn"
          :class="{ active: currentTag === tag.title }"
          @click="setTag(tag.title)"
        >
          {{ tag.title }}
        </button>
      </div>
    </section>

    <section class="result-panel" v-loading="loading">
      <div class="result-head">
        <strong>搜索结果</strong>
        <span>共 {{ total }} 条</span>
      </div>

      <div v-if="results.length" class="result-list">
        <article v-for="item in results" :key="item.id" class="result-item" @click="goDetail(item.id)">
          <div class="result-body">
            <h3>{{ item.title }}</h3>
            <p>{{ item.abstract || '暂无摘要' }}</p>
            <div class="meta">
              <span><el-icon><View /></el-icon>{{ item.look_count || 0 }}</span>
              <span><el-icon><Clock /></el-icon>{{ formatDate(item.created_at) }}</span>
            </div>
          </div>
          <img v-if="item.banner_url" class="result-thumb" :src="$resolveImg(item.banner_url)" alt="cover" />
        </article>
      </div>
      <el-empty v-else-if="!loading" description="暂无搜索结果" />
    </section>

    <el-pagination
      v-if="total > 0"
      background
      layout="total, prev, pager, next"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      @current-change="doSearch"
      class="pager"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { apiGetArticleList } from '@/api/article'
import { apiGetTagList } from '@/api/tag'
import { Clock, Search, View } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const keyword = ref(String(route.query.key || ''))
const currentTag = ref('')
const currentSort = ref('created_at desc')
const currentPage = ref(1)
const results = ref([])
const total = ref(0)
const loading = ref(false)
const pageSize = 12
const tags = ref([])

const sortOptions = [
  { label: '最新发布', value: 'created_at desc' },
  { label: '最多浏览', value: 'look_count desc' },
  { label: '最多点赞', value: 'digg_count desc' },
  { label: '最多评论', value: 'comment_count desc' },
  { label: '最多收藏', value: 'collects_count desc' }
]

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function goDetail(id) {
  router.push({ name: 'ArticleDetail', params: { id } })
}

function sortBy(value) {
  currentSort.value = value
  doSearch(1)
}

function setTag(value) {
  currentTag.value = value
  doSearch(1)
}

async function doSearch(page = 1) {
  currentPage.value = page
  loading.value = true
  try {
    const params = {
      page,
      size: pageSize,
      limit: pageSize,
      sort: currentSort.value
    }
    if (keyword.value.trim()) params.key = keyword.value.trim()
    if (currentTag.value) params.tag = currentTag.value

    const res = await apiGetArticleList(params)
    const data = res.data || {}
    results.value = data.list || (Array.isArray(data) ? data : [])
    total.value = Number(data.total || data.count || 0)
  } finally {
    loading.value = false
  }
}

async function loadTags() {
  const res = await apiGetTagList({ size: 100, limit: 100 })
  const data = res.data || {}
  tags.value = data.list || (Array.isArray(data) ? data : [])
}

onMounted(async () => {
  await Promise.all([loadTags(), doSearch(1)])
})
</script>

<style scoped>
.search-page {
  display: grid;
  gap: 14px;
}

.search-head {
  border: 1px solid #dbe7f2;
  border-radius: 14px;
  background: #fff;
  padding: 14px;
}

.search-head h2 {
  margin: 0;
  font-size: 20px;
  color: #173e64;
}

.search-box {
  margin-top: 10px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 10px;
}

.filter-panel,
.result-panel {
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dbe7f2;
  padding: 14px;
}

.sort-row,
.tag-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tag-row {
  margin-top: 10px;
}

.sort-btn,
.tag-btn {
  border: 1px solid #dce8f4;
  border-radius: 999px;
  background: #f7fbff;
  color: #2c5279;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
}

.sort-btn.active,
.tag-btn.active,
.sort-btn:hover,
.tag-btn:hover {
  background: #e9f6ff;
  border-color: #a8d4ec;
  color: #0f6f8f;
}

.result-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: #496682;
}

.result-list {
  display: grid;
  gap: 10px;
}

.result-item {
  border: 1px solid #dce8f4;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.result-item:hover {
  box-shadow: 0 10px 20px rgba(17, 56, 92, 0.1);
}

.result-body {
  min-width: 0;
}

.result-body h3 {
  margin: 0;
  font-size: 15px;
  color: #163a5f;
  line-height: 1.5;
}

.result-body p {
  margin: 8px 0;
  min-height: 20px;
  font-size: 12px;
  color: #607791;
  line-height: 1.7;
}

.result-thumb {
  width: 120px;
  height: 78px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #dfe9f3;
  flex-shrink: 0;
}

.meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6e849c;
}

.meta span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.pager {
  display: flex;
  justify-content: center;
}

@media (max-width: 992px) {
  .result-item {
    flex-direction: column;
  }

  .result-thumb {
    width: 100%;
    height: 160px;
  }
}

@media (max-width: 768px) {
  .search-box {
    grid-template-columns: 1fr;
  }
}
</style>
