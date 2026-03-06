<template>
  <div class="collect-page">
    <section class="collect-hero">
      <div>
        <p class="hero-kicker">Collection Center</p>
        <h2>我的收藏</h2>
        <p>集中查看你收藏过的文章，可快速跳转详情或进入后台做批量管理。</p>
      </div>
      <div class="hero-actions">
        <el-button type="primary" @click="goManage">后台批量管理</el-button>
        <el-button @click="fetchList(currentPage)" :loading="loading">刷新</el-button>
      </div>
    </section>

    <section class="collect-panel" v-loading="loading">
      <div v-if="list.length" class="collect-grid">
        <article v-for="item in list" :key="`${item.id}-${item.created_at}`" class="collect-card">
          <div class="card-main" @click="goDetail(item.id)">
            <h3>{{ item.title }}</h3>
            <p>{{ item.abstract || '暂无摘要' }}</p>
            <div class="meta">收藏于 {{ formatDate(item.created_at) }}</div>
          </div>
          <div class="card-actions">
            <el-button type="primary" link @click="goDetail(item.id)">查看</el-button>
          </div>
        </article>
      </div>
      <el-empty v-else-if="!loading" description="暂无收藏内容" />
    </section>

    <el-pagination
      v-if="total > 0"
      background
      layout="total, prev, pager, next"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="total"
      @current-change="fetchList"
      class="pager"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiGetCollectList } from '@/api/article'
import { ElMessage } from 'element-plus'

const router = useRouter()
const list = ref([])
const total = ref(0)
const loading = ref(false)
const currentPage = ref(1)
const pageSize = 12

function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

async function fetchList(page = 1) {
  currentPage.value = page
  loading.value = true
  try {
    const res = await apiGetCollectList({ page, size: pageSize, limit: pageSize })
    const data = res.data || {}
    list.value = data.list || []
    total.value = Number(data.total || data.count || 0)
  } catch {
    ElMessage.error('获取收藏列表失败')
  } finally {
    loading.value = false
  }
}

function goDetail(id) {
  router.push({ name: 'ArticleDetail', params: { id } })
}

function goManage() {
  router.push('/admin/collects')
}

onMounted(() => {
  fetchList(1)
})
</script>

<style scoped>
.collect-page {
  display: grid;
  gap: 14px;
}

.collect-hero {
  border-radius: 16px;
  padding: 18px;
  background: linear-gradient(140deg, #123b61 0%, #0f7698 100%);
  color: #f1fbff;
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.hero-kicker {
  margin: 0 0 6px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.collect-hero h2 {
  margin: 0;
  font-size: 28px;
}

.collect-hero p {
  margin: 8px 0 0;
  line-height: 1.8;
  opacity: 0.92;
}

.hero-actions {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.collect-panel {
  border-radius: 14px;
  background: #fff;
  border: 1px solid #dbe7f2;
  padding: 14px;
}

.collect-grid {
  display: grid;
  gap: 10px;
}

.collect-card {
  border: 1px solid #dce7f2;
  border-radius: 12px;
  padding: 12px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
}

.card-main {
  cursor: pointer;
}

.card-main h3 {
  margin: 0;
  font-size: 16px;
  color: #173a5f;
}

.card-main p {
  margin: 8px 0 0;
  color: #5c738d;
  font-size: 13px;
  line-height: 1.7;
}

.meta {
  margin-top: 8px;
  font-size: 12px;
  color: #6d849d;
}

.pager {
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .collect-hero {
    flex-direction: column;
  }
}
</style>
