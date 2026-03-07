<template>
  <div class="article-manage-page">
    <el-card shadow="never">
      <div class="toolbar">
        <div class="toolbar-left">
          <el-button type="primary" @click="goCreate">
            <el-icon><Plus /></el-icon>
            新建文章
          </el-button>
          <el-button @click="fetchList(currentPage)" :loading="loading">刷新</el-button>
        </div>
        <div class="toolbar-right">
          <el-input
            v-model="search"
            placeholder="搜索文章标题"
            clearable
            style="width: 240px"
            @clear="fetchList(1)"
            @keyup.enter="fetchList(1)"
          >
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
          <el-select v-model="sort" style="width: 160px" @change="fetchList(1)">
            <el-option label="最新发布" value="created_at desc" />
            <el-option label="最多浏览" value="look_count desc" />
            <el-option label="最多点赞" value="digg_count desc" />
            <el-option label="最多评论" value="comment_count desc" />
          </el-select>
          <el-select v-model="reviewStatus" style="width: 140px" @change="fetchList(1)">
            <el-option label="全部状态" :value="0" />
            <el-option label="待审核" :value="1" />
            <el-option label="已通过" :value="2" />
            <el-option label="已驳回" :value="3" />
          </el-select>
          <el-select v-model="boardFilter" style="width: 160px" clearable placeholder="全部板块" @change="fetchList(1)">
            <el-option label="全部板块" :value="0" />
            <el-option v-for="board in boardOptions" :key="board.id" :label="board.name" :value="board.id" />
          </el-select>
        </div>
      </div>

      <el-table :data="list" stripe v-loading="loading">
        <el-table-column label="作者" width="220">
          <template #default="{ row }">
            <div class="author-cell">
              <el-avatar :size="28" :src="$resolveImg(row.user_avatar)" />
              <div class="author-name-wrap">
                <div class="author-name">{{ row.user_nick_name || `用户${row.user_id || ''}` }}</div>
                <div class="author-id">UID: {{ row.user_id || '-' }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题" min-width="280" show-overflow-tooltip>
          <template #default="{ row }">
            <el-button type="primary" link @click="goEdit(row.id)">{{ row.title }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="board_name" label="板块" width="140">
          <template #default="{ row }">
            <el-tag size="small" effect="plain">{{ row.board_name || row.category || '未分类' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="duplicate_rate" label="重复率" width="100">
          <template #default="{ row }">
            <el-tag :type="duplicateTagType(row.duplicate_rate)" effect="plain" size="small">
              {{ formatDuplicateRate(row.duplicate_rate) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="look_count" label="浏览" width="90" />
        <el-table-column prop="digg_count" label="点赞" width="90" />
        <el-table-column prop="comment_count" label="评论" width="90" />
        <el-table-column prop="collects_count" label="收藏" width="90" />
        <el-table-column prop="review_status" label="审核状态" width="130">
          <template #default="{ row }">
            <el-tag :type="statusTagType(row.review_status)" effect="plain" size="small">
              {{ statusText(row.review_status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_private" label="可见性" width="110">
          <template #default="{ row }">
            <el-tag :type="row.is_private ? 'warning' : 'success'" effect="plain" size="small">
              {{ row.is_private ? '私密' : '公开' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="发布时间" width="180">
          <template #default="{ row }">{{ formatDate(row.created_at) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="goEdit(row.id)">编辑</el-button>
            <el-button
              v-if="userStore.isAdmin && Number(row.review_status) === 1"
              type="warning"
              link
              @click="goReview"
            >
              审核
            </el-button>
            <el-button type="danger" link @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-empty v-if="!loading && list.length === 0" description="暂无文章数据" />

      <el-pagination
        v-if="total > 0"
        background
        layout="total, prev, pager, next"
        :page-size="pageSize"
        :current-page="currentPage"
        :total="total"
        @current-change="fetchList"
      />
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiDeleteArticle, apiGetArticleList } from '@/api/article'
import { apiGetBoardList } from '@/api/board'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const list = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = 12
const loading = ref(false)
const search = ref('')
const sort = ref('created_at desc')
const reviewStatus = ref(0)
const boardFilter = ref(0)
const boardOptions = ref([])

function goCreate() {
  router.push({ name: 'ArticleEdit' })
}

function goEdit(id) {
  router.push({ name: 'ArticleEdit', query: { id } })
}

function goReview() {
  router.push({ name: 'ArticleReview' })
}

function statusText(status) {
  const value = Number(status)
  if (value === 1) return '待审核'
  if (value === 2 || value === 0) return '已通过'
  if (value === 3) return '已驳回'
  return '未知'
}

function statusTagType(status) {
  const value = Number(status)
  if (value === 1) return 'warning'
  if (value === 3) return 'danger'
  return 'success'
}

function formatDuplicateRate(value) {
  return `${Number(value || 0).toFixed(1)}%`
}

function duplicateTagType(value) {
  const num = Number(value || 0)
  if (num >= 70) return 'danger'
  if (num >= 40) return 'warning'
  return 'success'
}

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
    const params = {
      page,
      size: pageSize,
      limit: pageSize,
      sort: sort.value,
      review_status: reviewStatus.value
    }
    if (search.value.trim()) {
      params.key = search.value.trim()
      params.title = search.value.trim()
    }
    if (Number(boardFilter.value) > 0) {
      params.board_id = Number(boardFilter.value)
    }
    if (!userStore.isAdmin) {
      params.is_user = true
    } else {
      params.review_scope = 'all'
    }

    const res = await apiGetArticleList(params)
    const data = res.data || {}
    const rawList = data.list || (Array.isArray(data) ? data : [])
    if (userStore.isAdmin) {
      list.value = rawList
      total.value = Number(data.total || data.count || list.value.length)
      return
    }

    const selfId = Number(userStore.currentUserId)
    list.value = rawList.filter((item) => Number(item.user_id) === selfId)
    const allOwned = rawList.every((item) => Number(item.user_id) === selfId)
    total.value = allOwned
      ? Number(data.total || data.count || list.value.length)
      : Number(list.value.length)
  } catch (e) {
    ElMessage.error('获取文章列表失败')
  } finally {
    loading.value = false
  }
}

async function handleDelete(id) {
  try {
    await ElMessageBox.confirm('确定删除这篇文章吗？此操作不可恢复。', '删除确认', { type: 'warning' })
    await apiDeleteArticle({ id_list: [String(id)] })
    ElMessage.success('删除成功')
    await fetchList(currentPage.value)
  } catch {
    // 用户取消或删除失败时无需额外处理
  }
}

onMounted(() => {
  apiGetBoardList({ page: 1, limit: 120 }).then((res) => {
    boardOptions.value = res.data?.list || []
  }).catch(() => {
    boardOptions.value = []
  })
  fetchList(1)
})
</script>

<style scoped>
.toolbar {
  margin-bottom: 14px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-name-wrap {
  min-width: 0;
}

.author-name {
  font-size: 13px;
  color: #303133;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.author-id {
  font-size: 12px;
  color: #909399;
}

@media (max-width: 768px) {
  .toolbar-right {
    width: 100%;
  }
}
</style>
