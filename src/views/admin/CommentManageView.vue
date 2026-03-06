<template>
  <div class="comment-manage">
    <!-- 1. 文章列表视图 -->
    <el-card shadow="never" v-if="!showCommentDrawer">
      <div class="header-action">
        <h3>文章列表 (评论管理)</h3>
        <el-input 
          v-model="searchKey" 
          placeholder="搜索文章标题..." 
          clearable 
          @clear="fetchArticles" 
          @keyup.enter="fetchArticles"
          style="width: 280px;"
        >
          <template #append><el-button @click="fetchArticles" icon="Search" /></template>
        </el-input>
      </div>
      
      <el-table 
        v-loading="loading" 
        :data="articles" 
        style="width: 100%" 
        stripe
      >
        <el-table-column prop="title" label="文章标题" min-width="250" show-overflow-tooltip />
        <el-table-column prop="category" label="分类" width="100" />
        <el-table-column prop="comment_count" label="评论总数" width="100" align="center" />
        <el-table-column label="发布时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right" align="center">
          <template #default="{ row }">
            <el-button type="primary" link @click="openComments(row)">管理评论</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        v-if="total > 0"
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="handlePageChange"
        style="margin-top: 20px; display: flex; justify-content: center;"
      />
    </el-card>

    <!-- 2. 具体文章的评论管理抽屉/页面 -->
    <el-card shadow="never" v-else>
      <div class="header-action">
        <div style="display:flex;align-items:center;gap:12px;">
          <el-button icon="Back" circle @click="showCommentDrawer = false" />
          <h3>《{{ currentArticle?.title }}》 的评论</h3>
        </div>
        <el-button type="primary" @click="fetchComments">刷新评论</el-button>
      </div>

      <el-empty v-if="comments.length === 0 && !commentLoading" description="该文章暂无评论" />
      
      <el-table 
        v-else 
        v-loading="commentLoading" 
        :data="comments" 
        style="width: 100%; margin-top:20px;" 
        stripe
        row-key="id" 
        :tree-props="{ children: 'sub_comments' }"
        default-expand-all
      >
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="评论人" width="180">
          <template #default="{ row }">
            <div style="display:flex; align-items:center; gap:8px;">
              <el-avatar :size="30" :src="row.user?.avatar ? $resolveImg(row.user.avatar) : defaultAvatar" />
              <span>{{ getCommentDisplayName(row) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="评论内容" />
        <el-table-column prop="digg_count" label="点赞" width="70" align="center" />
        <el-table-column label="评论时间" width="160">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" fixed="right" align="center">
          <template #default="{ row }">
            <el-button type="danger" link @click="deleteComment(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiGetArticleList } from '@/api/article'
import { apiGetCommentList, apiDeleteComment } from '@/api/comment'
import { ElMessage, ElMessageBox } from 'element-plus'

// --- 状态定义 ---
const articles = ref([])
const total = ref(0)
const pageSize = 10
const currentPage = ref(1)
const searchKey = ref('')
const loading = ref(false)

const showCommentDrawer = ref(false)
const currentArticle = ref(null)
const comments = ref([])
const commentLoading = ref(false)

const defaultAvatar = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'

// --- 工具函数 ---
function formatDate(dateStr) {
  if (!dateStr) return '-'
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function getCommentDisplayName(comment) {
  const nickName = String(comment?.user?.nick_name || comment?.user_nick_name || '').trim()
  if (nickName) return nickName

  const userName = String(comment?.user?.user_name || comment?.user_name || '').trim()
  if (userName) return userName

  return comment?.user_id ? `用户${comment.user_id}` : '匿名'
}

// --- 文章管理逻辑 ---
async function fetchArticles(page = 1) {
  currentPage.value = page
  loading.value = true
  try {
    const params = { page: currentPage.value, size: pageSize, limit: pageSize }
    if (searchKey.value) Object.assign(params, { key: searchKey.value })

    const res = await apiGetArticleList(params)
    articles.value = res.data?.list || res.data || []
    total.value = res.data?.total || res.data?.count || 0
  } catch (e) {
    ElMessage.error('获取文章列表失败')
  } finally {
    loading.value = false
  }
}

function handlePageChange(page) {
  fetchArticles(page)
}

// --- 评论管理逻辑 ---
function openComments(article) {
  currentArticle.value = article
  showCommentDrawer.value = true
  fetchComments()
}

async function fetchComments() {
  if (!currentArticle.value?.id) return
  commentLoading.value = true
  try {
    const res = await apiGetCommentList({ article_id: currentArticle.value.id })
    let data = res.data?.list || res.data || []
    if (!Array.isArray(data)) data = []
    comments.value = data
  } catch (e) {
    ElMessage.error('获取评论列表失败')
  } finally {
    commentLoading.value = false
  }
}

function deleteComment(id) {
  ElMessageBox.confirm(
    '确定删除这条评论吗？如果是上级评论，其关联的所有子评论也将被强制删除！',
    '危险操作',
    {
      confirmButtonText: '确定删除',
      cancelButtonText: '取消',
      type: 'error'
    }
  ).then(async () => {
    try {
      await apiDeleteComment(id)
      ElMessage.success('删除成功')
      fetchComments()
      // Optional: Since comment count changed, we might want to refresh articles quietly or just decrement.
    } catch (e) {
      ElMessage.error('删除失败')
    }
  }).catch(() => {})
}

onMounted(() => {
  fetchArticles()
})
</script>

<style scoped>
.comment-manage {
  padding: 20px;
}
.header-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.header-action h3 {
  margin: 0;
  font-size: 18px;
  color: var(--text-primary);
}
</style>
