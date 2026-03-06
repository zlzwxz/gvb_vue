<template>
  <div class="collect-manage-page">
    <el-card shadow="never">
      <div class="header-action">
        <h3>收藏管理</h3>
        <div class="filters">
          <el-select
            v-if="userStore.isAdmin"
            v-model="scope"
            style="width: 120px"
            @change="fetchList(1)"
          >
            <el-option label="全站收藏" value="all" />
            <el-option label="我的收藏" value="me" />
          </el-select>
          <el-input
            v-if="userStore.isAdmin && scope === 'all'"
            v-model="userID"
            clearable
            placeholder="用户ID"
            style="width: 140px"
            @clear="fetchList(1)"
            @keyup.enter="fetchList(1)"
          />
          <el-input
            v-model="articleID"
            clearable
            placeholder="文章ID"
            style="width: 260px"
            @clear="fetchList(1)"
            @keyup.enter="fetchList(1)"
          />
          <el-button type="primary" @click="fetchList(1)">查询</el-button>
          <el-button @click="resetFilters">重置</el-button>
        </div>
      </div>

      <div class="table-toolbar">
        <div class="toolbar-left">
          <el-tag type="info">共 {{ total }} 条</el-tag>
          <el-tag type="warning">已选 {{ selectedRows.length }} 条</el-tag>
        </div>
        <div class="toolbar-right">
          <el-button type="danger" :disabled="!selectedRows.length" @click="removeSelected">批量取消收藏</el-button>
          <el-button @click="fetchList(currentPage)">刷新</el-button>
        </div>
      </div>

      <el-table
        v-loading="loading"
        :data="list"
        style="width: 100%"
        stripe
        @selection-change="onSelectionChange"
        :row-key="rowKey"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column v-if="userStore.isAdmin && scope === 'all'" prop="user_id" label="用户ID" width="90" />
        <el-table-column v-if="userStore.isAdmin && scope === 'all'" prop="user_name" label="用户名" width="140" show-overflow-tooltip />
        <el-table-column prop="article_id" label="文章ID" min-width="220" show-overflow-tooltip />
        <el-table-column prop="article_title" label="文章标题" min-width="260" show-overflow-tooltip>
          <template #default="{ row }">
            <el-button type="primary" link @click="goArticle(row.article_id)">{{ row.article_title || '(文章已删除)' }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="收藏时间" width="180" />
        <el-table-column label="操作" width="120" fixed="right" align="center">
          <template #default="{ row }">
            <el-button type="danger" link @click="removeOne(row)">取消收藏</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-if="total > 0"
        style="margin-top: 20px; display:flex; justify-content:center;"
        background
        layout="total, prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="fetchList"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { apiGetCollectManageList, apiRemoveCollectManageBatch } from '@/api/article'

const router = useRouter()
const userStore = useUserStore()

const list = ref([])
const total = ref(0)
const loading = ref(false)
const currentPage = ref(1)
const pageSize = 20

const scope = ref(userStore.isAdmin ? 'all' : 'me')
const userID = ref('')
const articleID = ref('')
const selectedRows = ref([])

const rowKey = (row) => `${row.user_id}-${row.article_id}`

function onSelectionChange(rows) {
  selectedRows.value = rows
}

function buildParams(page = 1) {
  const params = {
    page,
    limit: pageSize,
    scope: userStore.isAdmin ? scope.value : 'me'
  }

  if (userStore.isAdmin && scope.value === 'all' && userID.value.trim()) {
    params.user_id = Number(userID.value.trim()) || undefined
  }

  if (articleID.value.trim()) {
    params.article_id = articleID.value.trim()
  }

  return params
}

async function fetchList(page = 1) {
  currentPage.value = page
  loading.value = true
  try {
    const res = await apiGetCollectManageList(buildParams(page))
    list.value = res.data?.list || []
    total.value = res.data?.count || 0
  } catch (e) {
    ElMessage.error('获取收藏列表失败')
  } finally {
    loading.value = false
  }
}

function resetFilters() {
  scope.value = userStore.isAdmin ? 'all' : 'me'
  userID.value = ''
  articleID.value = ''
  fetchList(1)
}

function goArticle(id) {
  if (!id) return
  router.push({ name: 'ArticleDetail', params: { id } })
}

async function removeRows(rows) {
  if (!rows.length) {
    ElMessage.warning('请先选择要取消收藏的记录')
    return
  }

  await apiRemoveCollectManageBatch({
    items: rows.map((row) => ({
      user_id: row.user_id,
      article_id: row.article_id
    }))
  })

  ElMessage.success(`已取消 ${rows.length} 条收藏`)
  selectedRows.value = []
  await fetchList(currentPage.value)
}

function removeOne(row) {
  ElMessageBox.confirm('确认取消这条收藏记录吗？', '提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  }).then(() => removeRows([row])).catch(() => {})
}

function removeSelected() {
  ElMessageBox.confirm(`确认批量取消 ${selectedRows.value.length} 条收藏记录吗？`, '提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  }).then(() => removeRows(selectedRows.value)).catch(() => {})
}

onMounted(() => {
  fetchList(1)
})
</script>

<style scoped>
.collect-manage-page {
  padding: 20px;
}

.header-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 14px;
}

.header-action h3 {
  margin: 0;
  font-size: 18px;
  color: var(--text-primary);
}

.filters {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.table-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0 14px;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 992px) {
  .header-action {
    flex-direction: column;
    align-items: flex-start;
  }

  .table-toolbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>
