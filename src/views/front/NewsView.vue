<template>
  <div class="news-page">
    <div class="news-header">
      <h2>🔥 全网最新热点资讯</h2>
      <p>汇聚当日互联网焦点，每小时更新</p>
    </div>
    
    <div v-if="loading" style="text-align:center; padding: 40px;"><el-icon class="is-loading" :size="30"><Loading /></el-icon></div>
    
    <template v-else>
      <div v-if="list.length > 0" class="news-grid">
        <el-card v-for="(news, i) in list" :key="news.index || i" shadow="hover" class="news-card">
          <a :href="news.link" target="_blank" class="news-link">
            <div class="news-rank" :class="{'top-3': i < 3}">{{ i + 1 }}</div>
            <div class="news-content">
              <h3 class="news-title">{{ news.title }}</h3>
              <div class="news-meta">
                <span class="news-hot"><el-icon><Top /></el-icon> {{ news.hotValue || '1w+' }}</span>
              </div>
            </div>
          </a>
        </el-card>
      </div>
      <el-empty v-else description="今日暂无资讯更新" />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiGetNewsList } from '@/api/system'
import { Top, Loading } from '@element-plus/icons-vue'

const list = ref([])
const loading = ref(false)

async function fetchNews() {
  loading.value = true
  try {
    const res = await apiGetNewsList({ size: 30 })
    list.value = res.data?.list || res.data || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchNews())
</script>

<style scoped>
.news-page { padding: 40px 20px; max-width: 900px; margin: 0 auto; min-height: 60vh; }
.news-header { text-align: center; margin-bottom: 40px; }
.news-header h2 { font-size: 24px; color: var(--text-primary); margin: 0 0 10px 0; }
.news-header p { font-size: 14px; color: var(--text-secondary); margin: 0; }

.news-grid { display: flex; flex-direction: column; gap: 15px; }

.news-card { border-radius: 8px; border: 1px solid var(--border-color); }
.news-card :deep(.el-card__body) { padding: 15px 20px; }

.news-link { text-decoration: none; color: inherit; display: flex; align-items: center; gap: 20px; }
.news-link:hover .news-title { color: var(--primary-color); }

.news-rank { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background-color: #f2f3f5; color: var(--text-secondary); font-weight: bold; font-size: 14px; border-radius: 6px; flex-shrink: 0; }
.news-rank.top-3 { background-color: #f53f3f; color: white; }

.news-content { flex: 1; display: flex; justify-content: space-between; align-items: center; gap: 20px; }
.news-title { margin: 0; font-size: 16px; font-weight: 500; transition: color 0.3s; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 1; line-clamp: 1; overflow: hidden; }

.news-meta { flex-shrink: 0; }
.news-hot { color: #f53f3f; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 4px; }
</style>
