<template>
  <div class="dashboard-page">
    <section class="dashboard-hero">
      <div>
        <p class="hero-kicker">Data Overview</p>
        <h2>运营总览面板</h2>
        <p>将核心业务指标、活跃趋势和快捷操作集中到一个入口，减少多页面跳转。</p>
      </div>
      <div class="hero-actions">
        <el-button type="primary" @click="router.push('/admin/article/edit')">发布新文章</el-button>
        <el-button @click="refreshAll" :loading="loading">刷新数据</el-button>
      </div>
    </section>

    <section class="metric-grid">
      <article v-for="item in statItems" :key="item.key" class="metric-card">
        <span>{{ item.label }}</span>
        <strong>{{ sumData[item.key] || 0 }}</strong>
      </article>
    </section>

    <section class="content-grid">
      <el-card class="chart-card" shadow="never">
        <template #header>
          <div class="card-header">
            <strong>7 天登录趋势</strong>
            <span>按日统计活跃登录用户</span>
          </div>
        </template>
        <div ref="chartRef" class="chart-box"></div>
      </el-card>

      <el-card class="quick-card" shadow="never">
        <template #header>
          <div class="card-header">
            <strong>快捷入口</strong>
            <span>常用运营动作</span>
          </div>
        </template>
        <div class="quick-list">
          <button type="button" class="quick-item" @click="router.push('/admin/articles')">文章管理</button>
          <button type="button" class="quick-item" @click="router.push('/admin/comments')">评论管理</button>
          <button type="button" class="quick-item" @click="router.push('/admin/messages')">私信管理</button>
          <button type="button" class="quick-item" @click="router.push('/admin/settings')">系统设置</button>
        </div>
      </el-card>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiGetDataSum, apiGetSevenLoginData } from '@/api/system'
import * as echarts from 'echarts'

const router = useRouter()
const sumData = ref({})
const chartRef = ref(null)
const loading = ref(false)
let chartInstance = null

const statItems = [
  { key: 'article_count', label: '文章总数' },
  { key: 'user_count', label: '用户总数' },
  { key: 'message_count', label: '私信总数' },
  { key: 'comment_count', label: '评论总数' },
  { key: 'now_sign_count', label: '今日登录' },
  { key: 'look_total', label: '总阅读量' }
]

async function fetchDataSum() {
  const res = await apiGetDataSum()
  sumData.value = res.data || {}
}

async function renderChart() {
  if (!chartRef.value) return
  if (!chartInstance) {
    chartInstance = echarts.init(chartRef.value)
  }

  const res = await apiGetSevenLoginData()
  const data = res.data || {}
  const dates = data.date_list || []
  const loginCounts = data.login_data || []

  chartInstance.setOption({
    color: ['#0f7ea5'],
    tooltip: { trigger: 'axis' },
    grid: { left: 20, right: 20, bottom: 20, top: 20, containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: { lineStyle: { color: '#bdd2e8' } },
      data: dates
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#e8eef5' } }
    },
    series: [
      {
        name: '登录用户',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        areaStyle: {
          color: 'rgba(15, 126, 165, 0.15)'
        },
        lineStyle: { width: 3 },
        data: loginCounts
      }
    ]
  })
}

function handleResize() {
  chartInstance?.resize()
}

async function refreshAll() {
  loading.value = true
  try {
    await Promise.all([fetchDataSum(), renderChart()])
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await refreshAll()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
  chartInstance = null
})
</script>

<style scoped>
.dashboard-page {
  display: grid;
  gap: 14px;
  min-width: 0;
}

.dashboard-hero {
  border-radius: 14px;
  padding: 18px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  background: linear-gradient(145deg, #11385f 0%, #0f6a88 100%);
  color: #eef8ff;
}

.hero-kicker {
  margin: 0 0 6px;
  font-size: 12px;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.dashboard-hero h2 {
  margin: 0;
  font-size: 26px;
}

.dashboard-hero p {
  margin: 8px 0 0;
  max-width: 700px;
  line-height: 1.7;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.metric-card {
  border-radius: 12px;
  padding: 14px;
  background: #fff;
  border: 1px solid #dbe7f2;
}

.metric-card span {
  display: block;
  font-size: 12px;
  color: #617892;
}

.metric-card strong {
  display: block;
  margin-top: 8px;
  color: #1a3f65;
  font-size: 24px;
}

.content-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 320px);
  gap: 12px;
  min-width: 0;
}

.chart-card,
.quick-card {
  min-width: 0;
}

.card-header strong {
  display: block;
  color: #1b3f63;
  font-size: 16px;
}

.card-header span {
  display: block;
  margin-top: 4px;
  font-size: 12px;
  color: #6f849e;
}

.chart-box {
  width: 100%;
  height: 340px;
}

.quick-list {
  display: grid;
  gap: 10px;
}

.quick-item {
  width: 100%;
  text-align: left;
  border: 1px solid #dbe8f3;
  border-radius: 10px;
  background: #f8fbff;
  color: #1f466d;
  padding: 10px;
  cursor: pointer;
}

.quick-item:hover {
  background: #edf7ff;
  border-color: #bcd8ea;
}

@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 992px) {
  .dashboard-hero {
    flex-direction: column;
  }
}

@media (max-width: 768px) {
  .metric-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
