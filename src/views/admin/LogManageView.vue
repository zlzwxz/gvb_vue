<template>
  <div class="log-manage">
    <el-row justify="space-between" style="margin-bottom:20px;">
      <el-col>
        <h2>日志管理</h2>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="level" label="级别" width="100">
        <template #default="{ row }">
          <el-tag :type="row.level === 'error' ? 'danger' : (row.level === 'warn' ? 'warning' : 'info')">
            {{ row.level }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="ip" label="IP地址" width="150" />
      <el-table-column prop="created_at" label="时间" width="180" />
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button type="text" @click="deleteLog(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="fetchList"
      style="margin-top:20px; text-align:center;"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiGetLogList, apiDeleteLog } from '@/api/system'
import { ElMessage, ElMessageBox } from 'element-plus'

const list = ref([])
const total = ref(0)
const pageSize = 15

async function fetchList(page = 1) {
  const res = await apiGetLogList({ page, size: pageSize })
  list.value = res.data.list || []
  total.value = res.data.total || 0
}

function deleteLog(id) {
  ElMessageBox.confirm('确定删除该日志吗？', '警告', { type: 'warning' }).then(async () => {
    await apiDeleteLog({ id_list: [id] })
    ElMessage.success('删除成功')
    fetchList()
  }).catch(() => {})
}

onMounted(() => fetchList())
</script>

<style scoped>
.log-manage { padding: 20px; }
</style>
