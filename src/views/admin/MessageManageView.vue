<template>
  <div class="message-manage">
    <el-row justify="space-between" style="margin-bottom:20px;">
      <el-col>
        <el-button type="primary" @click="showCreate = true">新建消息</el-button>
      </el-col>
      <el-col>
        <el-input placeholder="搜索内容" v-model="search" clearable @clear="fetchList" @keyup.enter="fetchList" style="width:200px;" />
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="user_id" label="用户ID" width="100" />
      <el-table-column prop="created_at" label="创建时间" width="180" />
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
import { apiGetMessageList, apiCreateMessage } from '@/api/message'
import { ElMessage } from 'element-plus'

const list = ref([])
const total = ref(0)
const pageSize = 10
const search = ref('')
const showCreate = ref(false)

async function fetchList(page = 1) {
  const params = { page, size: pageSize }
  if (search.value) params.content = search.value
  const res = await apiGetMessageList(params)
  list.value = res.data.list || []
  total.value = res.data.total || 0
}

onMounted(() => fetchList())
</script>

<style scoped>
.message-manage { padding: 20px; }
</style>
