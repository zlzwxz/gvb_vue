<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6" v-for="stat in statItems" :key="stat.key">
        <el-card shadow="hover" class="stat-card" style="margin-bottom: 20px;">
          <div class="stat-title">{{ stat.label }}</div>
          <div class="stat-value">{{ sumData[stat.key] || 0 }}</div>
        </el-card>
      </el-col>
    </el-row>

    <el-card shadow="never" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>7天登录趋势统计</span>
        </div>
      </template>
      <div ref="chartRef" style="width: 100%; height: 400px;"></div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { apiGetDataSum, apiGetSevenLoginData } from '@/api/system'
import * as echarts from 'echarts'

const sumData = ref({})
const chartRef = ref(null)
let chartInstance = null

const statItems = [
  { key: 'article_count', label: '文章总数' },
  { key: 'user_count', label: '用户总数' },
  { key: 'message_count', label: '留言总数' },
  { key: 'chat_group_count', label: '群聊消息数' },
  { key: 'now_sign_count', label: '今日登录数' }
]

async function fetchDataSum() {
  try {
    const res = await apiGetDataSum()
    sumData.value = res.data || {}
  } catch (e) {
    console.error('获取统计数据失败', e)
  }
}

async function renderChart() {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  
  try {
    const res = await apiGetSevenLoginData()
    const data = res.data || {}
    const dates = data.date_list || []
    const loginCounts = data.login_data || []

    const option = {
      tooltip: { trigger: 'axis' },
      grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: dates
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '登录活跃用户',
          type: 'line',
          smooth: true,
          areaStyle: {
            opacity: 0.1,
            color: '#409EFF'
          },
          itemStyle: { color: '#409EFF' },
          data: loginCounts
        }
      ]
    }
    chartInstance.setOption(option)
  } catch(e) {
    console.error('加载折线图失败', e)
  }
}

function handleResize() {
  if (chartInstance) chartInstance.resize()
}

onMounted(() => {
  fetchDataSum()
  renderChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (chartInstance) chartInstance.dispose()
})
</script>

<style scoped>
.dashboard { padding: 20px; }
.stat-card { text-align: center; }
.stat-title { font-size: 14px; color: #909399; margin-bottom: 10px; }
.stat-value { font-size: 28px; font-weight: bold; color: #303133; }
</style>
