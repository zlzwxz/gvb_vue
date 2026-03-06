<template>
  <div class="log-manage">
    <el-card shadow="never">
      <div class="toolbar">
        <h3>日志管理</h3>
        <div class="toolbar-right">
          <el-select v-model="levelFilter" style="width: 160px" @change="fetchList(1)">
            <el-option label="全部等级" :value="0" />
            <el-option label="Debug" :value="1" />
            <el-option label="Info" :value="2" />
            <el-option label="Warn" :value="3" />
            <el-option label="Error" :value="4" />
          </el-select>
          <el-button @click="fetchList(1)">刷新</el-button>
        </div>
      </div>

      <el-table :data="list" stripe v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="level" label="级别" width="100">
          <template #default="{ row }">
            <el-tag :type="levelTagType(row.level)">
              {{ levelLabel(row.level) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" show-overflow-tooltip />
        <el-table-column prop="ip" label="IP地址" width="150" />
        <el-table-column prop="created_at" label="时间" width="180" />
        <el-table-column label="操作" width="100">
          <template #default="{ row }">
            <el-button type="danger" link @click="deleteLog(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-empty v-if="!list.length" description="暂无日志" />

      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="fetchList"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiGetLogList, apiDeleteLog } from '@/api/system'
import { ElMessage, ElMessageBox } from 'element-plus'

const list = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = 15
const loading = ref(false)
const levelFilter = ref(0)

function levelLabel(level) {
  const val = Number(level)
  if (val === 1) return 'DEBUG'
  if (val === 2) return 'INFO'
  if (val === 3) return 'WARN'
  if (val === 4) return 'ERROR'
  return String(level ?? '-')
}

function levelTagType(level) {
  const val = Number(level)
  if (val === 4) return 'danger'
  if (val === 3) return 'warning'
  if (val === 2) return 'success'
  return 'info'
}

async function fetchList(page = 1) {
  currentPage.value = page
  loading.value = true
  try {
    const params = { page, size: pageSize, limit: pageSize }
    if (levelFilter.value !== 0) {
      params.level = levelFilter.value
    }
    const res = await apiGetLogList(params)
    const data = res.data || {}
    list.value = data.list || []
    total.value = data.total || data.count || 0
  } finally {
    loading.value = false
  }
}

function deleteLog(id) {
  ElMessageBox.confirm('确定删除该日志吗？', '警告', { type: 'warning' }).then(async () => {
    await apiDeleteLog({ id_list: [id] })
    ElMessage.success('删除成功')
    fetchList(currentPage.value)
  }).catch(() => {})
}

onMounted(() => fetchList())
</script>

<style scoped>
.toolbar {
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.toolbar h3 {
  margin: 0;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
