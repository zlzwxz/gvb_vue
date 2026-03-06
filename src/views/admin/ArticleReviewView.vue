<template>
  <div class="article-review-page">
    <el-card shadow="never">
      <div class="toolbar">
        <el-input
          v-model="search"
          placeholder="搜索标题"
          clearable
          style="width: 240px"
          @clear="fetchList(1)"
          @keyup.enter="fetchList(1)"
        />
        <el-select v-model="reviewStatus" style="width: 140px" @change="fetchList(1)">
          <el-option label="待审核" :value="1" />
          <el-option label="已通过" :value="2" />
          <el-option label="已驳回" :value="3" />
          <el-option label="全部状态" :value="0" />
        </el-select>
        <el-button @click="fetchList(1)" :loading="loading">刷新</el-button>
      </div>

      <el-table :data="list" stripe v-loading="loading">
        <el-table-column prop="title" label="标题" min-width="320" show-overflow-tooltip />
        <el-table-column prop="user_nick_name" label="作者" width="130" />
        <el-table-column prop="created_at" label="发布时间" width="180" />
        <el-table-column label="状态" width="110">
          <template #default="{ row }">
            <el-tag :type="statusTagType(row.review_status)" size="small" effect="plain">{{ statusText(row.review_status) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="review_reason" label="驳回原因" min-width="200" show-overflow-tooltip />
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="openArticle(row.id)">查看</el-button>
            <el-button type="success" link @click="approve(row.id)">通过</el-button>
            <el-button type="danger" link @click="reject(row.id)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-empty v-if="!loading && list.length === 0" description="暂无审核数据" />

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
import { ElMessage, ElMessageBox } from 'element-plus'
import { apiGetArticleList, apiReviewArticle } from '@/api/article'

const router = useRouter()
const list = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = 12
const loading = ref(false)
const search = ref('')
const reviewStatus = ref(1)

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

function openArticle(id) {
  router.push({ name: 'ArticleEdit', query: { id } })
}

async function approve(id) {
  try {
    await apiReviewArticle({ id: String(id), review_status: 2, review_reason: '' })
    ElMessage.success('审核通过')
    fetchList(currentPage.value)
  } catch {
    ElMessage.error('审核失败')
  }
}

async function reject(id) {
  try {
    const { value } = await ElMessageBox.prompt('请输入驳回原因', '驳回文章', {
      confirmButtonText: '确认驳回',
      cancelButtonText: '取消',
      inputPattern: /.+/,
      inputErrorMessage: '驳回原因不能为空'
    })
    await apiReviewArticle({ id: String(id), review_status: 3, review_reason: value })
    ElMessage.success('已驳回')
    fetchList(currentPage.value)
  } catch {
    // cancel or failed
  }
}

async function fetchList(page = 1) {
  currentPage.value = page
  loading.value = true
  try {
    const params = {
      page,
      limit: pageSize,
      review_scope: 'all'
    }
    if (reviewStatus.value !== 0) {
      params.review_status = reviewStatus.value
    }
    if (search.value.trim()) {
      params.key = search.value.trim()
    }
    const res = await apiGetArticleList(params)
    list.value = res.data?.list || []
    total.value = Number(res.data?.count || res.data?.total || 0)
  } catch {
    ElMessage.error('获取审核列表失败')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchList(1)
})
</script>

<style scoped>
.toolbar {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
</style>
