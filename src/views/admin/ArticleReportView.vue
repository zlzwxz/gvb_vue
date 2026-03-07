<template>
  <div class="article-report-page">
    <el-card shadow="never">
      <div class="toolbar">
        <el-input
          v-model="search"
          placeholder="搜索文章标题、举报人、原因"
          clearable
          style="width: 280px"
          @clear="fetchList(1)"
          @keyup.enter="fetchList(1)"
        />
        <el-select v-model="status" style="width: 160px" @change="fetchList(1)">
          <el-option label="待处理" :value="1" />
          <el-option label="已转复审" :value="2" />
          <el-option label="已忽略" :value="3" />
          <el-option label="全部状态" :value="0" />
        </el-select>
        <el-button @click="fetchList(1)" :loading="loading">刷新</el-button>
      </div>

      <el-table :data="list" stripe v-loading="loading">
        <el-table-column prop="article_title" label="文章标题" min-width="280" show-overflow-tooltip />
        <el-table-column prop="board_name" label="板块" width="120" />
        <el-table-column prop="reporter_nick_name" label="举报人" width="120" />
        <el-table-column prop="reason" label="举报原因" width="140" show-overflow-tooltip />
        <el-table-column prop="content" label="补充说明" min-width="220" show-overflow-tooltip />
        <el-table-column label="状态" width="110">
          <template #default="{ row }">
            <el-tag :type="statusTagType(row.status)" effect="plain" size="small">
              {{ statusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="handle_note" label="处理备注" min-width="180" show-overflow-tooltip />
        <el-table-column prop="created_at" label="举报时间" width="170" />
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="openArticle(row.article_id)">查看文章</el-button>
            <el-button
              type="warning"
              link
              :disabled="Number(row.status) === 2"
              @click="handleReport(row, 2)"
            >
              转复审
            </el-button>
            <el-button
              type="info"
              link
              :disabled="Number(row.status) === 3"
              @click="handleReport(row, 3)"
            >
              忽略
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-empty v-if="!loading && !list.length" description="暂无举报数据" />

      <el-pagination
        v-if="total > 0"
        background
        layout="total, prev, pager, next"
        :current-page="page"
        :page-size="pageSize"
        :total="total"
        class="pager"
        @current-change="fetchList"
      />
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { apiGetArticleReportList, apiHandleArticleReport } from '@/api/article'

const router = useRouter()

const list = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = 12
const loading = ref(false)
const search = ref('')
const status = ref(1)

function statusText(value) {
  const num = Number(value)
  if (num === 2) return '已转复审'
  if (num === 3) return '已忽略'
  return '待处理'
}

function statusTagType(value) {
  const num = Number(value)
  if (num === 2) return 'warning'
  if (num === 3) return 'info'
  return 'danger'
}

function openArticle(id) {
  router.push({ name: 'ArticleEdit', query: { id: String(id) } })
}

async function handleReport(row, nextStatus) {
  const title = nextStatus === 2 ? '转入复审' : '忽略举报'
  const placeholder = nextStatus === 2 ? '例如：举报后进入复审，等待版主处理' : '例如：证据不足，暂不处理'
  try {
    const { value } = await ElMessageBox.prompt('请输入处理备注', title, {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      inputPlaceholder: placeholder,
      inputValue: row.handle_note || ''
    })
    await apiHandleArticleReport({
      id: Number(row.id),
      status: Number(nextStatus),
      handle_note: value || ''
    })
    ElMessage.success(nextStatus === 2 ? '已转入复审' : '已忽略该举报')
    fetchList(page.value)
  } catch {
    // ignore
  }
}

async function fetchList(nextPage = 1) {
  page.value = nextPage
  loading.value = true
  try {
    const params = {
      page: nextPage,
      limit: pageSize
    }
    if (status.value !== 0) {
      params.status = status.value
    }
    if (search.value.trim()) {
      params.key = search.value.trim()
    }
    const res = await apiGetArticleReportList(params)
    list.value = res.data?.list || []
    total.value = Number(res.data?.count || 0)
  } catch {
    ElMessage.error('获取举报列表失败')
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

.pager {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
</style>
