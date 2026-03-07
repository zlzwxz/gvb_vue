<template>
  <div class="log-manage">
    <el-card shadow="never">
      <div class="toolbar">
        <h3>日志管理</h3>
        <div class="toolbar-right">
          <el-select v-model="filters.level" style="width: 120px" @change="fetchList(1)">
            <el-option label="全部等级" :value="0" />
            <el-option label="Debug" :value="1" />
            <el-option label="Info" :value="2" />
            <el-option label="Warn" :value="3" />
            <el-option label="Error" :value="4" />
          </el-select>
          <el-select v-model="filters.method" style="width: 110px" clearable @change="fetchList(1)">
            <el-option label="GET" value="GET" />
            <el-option label="POST" value="POST" />
            <el-option label="PUT" value="PUT" />
            <el-option label="DELETE" value="DELETE" />
          </el-select>
          <el-input v-model="filters.path" placeholder="接口地址" clearable style="width: 180px" @keyup.enter="fetchList(1)" />
          <el-input v-model="filters.ip" placeholder="调用IP" clearable style="width: 140px" @keyup.enter="fetchList(1)" />
          <el-input v-model="filters.key" placeholder="消息关键字" clearable style="width: 200px" @keyup.enter="fetchList(1)" />
          <el-date-picker
            v-model="filters.dateRange"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            style="width: 330px"
            @change="fetchList(1)"
          />
          <el-button @click="fetchList(1)">刷新</el-button>
        </div>
      </div>

      <el-table :data="list" stripe v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="level" label="级别" width="96">
          <template #default="{ row }">
            <el-tag :type="levelTagType(row.level)" size="small">
              {{ levelLabel(row.level) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="method" label="方法" width="90" />
        <el-table-column prop="path" label="接口地址" min-width="220" show-overflow-tooltip />
        <el-table-column prop="ip" label="调用IP" width="140" />
        <el-table-column prop="status_code" label="HTTP" width="80" />
        <el-table-column prop="resp_code" label="业务码" width="90" />
        <el-table-column prop="content" label="概要" min-width="220" show-overflow-tooltip />
        <el-table-column prop="request_body" label="发送消息" min-width="260" show-overflow-tooltip />
        <el-table-column prop="response_body" label="接收消息" min-width="260" show-overflow-tooltip />
        <el-table-column prop="created_at" label="时间" width="180" />
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="openDetail(row)">详情</el-button>
            <el-button type="danger" link @click="deleteLog(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-empty v-if="!loading && !list.length" description="暂无日志" />

      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="fetchList"
      />
    </el-card>

    <el-dialog v-model="detailVisible" title="日志详情" width="860px">
      <template v-if="activeLog">
        <div class="detail-grid">
          <div><strong>级别：</strong>{{ levelLabel(activeLog.level) }}</div>
          <div><strong>方法：</strong>{{ activeLog.method || '-' }}</div>
          <div><strong>接口：</strong>{{ activeLog.path || '-' }}</div>
          <div><strong>HTTP：</strong>{{ activeLog.status_code ?? '-' }}</div>
          <div><strong>业务码：</strong>{{ activeLog.resp_code ?? '-' }}</div>
          <div><strong>时间：</strong>{{ activeLog.created_at || '-' }}</div>
        </div>
        <div class="detail-block">
          <strong>概要</strong>
          <pre>{{ activeLog.content || '-' }}</pre>
        </div>
        <div class="detail-block">
          <strong>发送消息</strong>
          <pre>{{ prettyPayload(activeLog.request_body) }}</pre>
        </div>
        <div class="detail-block">
          <strong>接收消息</strong>
          <pre>{{ prettyPayload(activeLog.response_body) }}</pre>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { apiDeleteLog, apiGetLogList } from '@/api/system'
import { ElMessage, ElMessageBox } from 'element-plus'

const list = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = 15
const loading = ref(false)
const detailVisible = ref(false)
const activeLog = ref(null)

const filters = reactive({
  level: 0,
  method: '',
  path: '',
  ip: '',
  key: '',
  dateRange: []
})

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
    const params = {
      page,
      limit: pageSize,
      sort: 'created_at desc'
    }
    if (Number(filters.level) > 0) params.level = Number(filters.level)
    if (filters.method) params.method = filters.method
    if (filters.path.trim()) params.path = filters.path.trim()
    if (filters.ip.trim()) params.ip = filters.ip.trim()
    if (filters.key.trim()) params.key = filters.key.trim()
    if (Array.isArray(filters.dateRange) && filters.dateRange.length === 2) {
      params.date_from = filters.dateRange[0]
      params.date_to = filters.dateRange[1]
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

function openDetail(row) {
  activeLog.value = row
  detailVisible.value = true
}

function prettyPayload(value) {
  const text = String(value || '').trim()
  if (!text) return '-'
  try {
    return JSON.stringify(JSON.parse(text), null, 2)
  } catch {
    return text
  }
}

fetchList()
</script>

<style scoped>
.toolbar {
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.toolbar h3 {
  margin: 0;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 18px;
  margin-bottom: 16px;
  color: #475569;
}

.detail-block + .detail-block {
  margin-top: 14px;
}

.detail-block strong {
  display: block;
  margin-bottom: 8px;
}

.detail-block pre {
  margin: 0;
  padding: 14px;
  border-radius: 12px;
  background: #0f172a;
  color: #e2e8f0;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
