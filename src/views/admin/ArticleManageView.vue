<template>
  <div class="article-manage">
    <div class="manage-header">
      <el-button type="primary" @click="goCreate" icon="Plus">新建文章</el-button>
      <el-input placeholder="搜索文章标题..." v-model="search" clearable @clear="fetchList" @keyup.enter="fetchList" class="search-input">
        <template #append>
          <el-button @click="fetchList" icon="Search" />
        </template>
      </el-input>
    </div>

    <div class="article-list">
      <div v-for="item in list" :key="item.id" class="article-item">
        <div class="item-cover" v-if="item.banner_url">
          <el-image :src="$resolveImg(item.banner_url)" fit="cover" style="width:100%;height:100%;" />
        </div>
        <div class="item-cover placeholder" v-else>
          <el-icon :size="30"><Document /></el-icon>
        </div>
        <div class="item-body">
          <div class="item-title" @click="goEdit(item.id)">{{ item.title }}</div>
          <div class="item-abstract">{{ item.abstract || '暂无摘要' }}</div>
          <div class="item-meta">
            <span class="meta-author"><el-icon><User /></el-icon> {{ item.user_name || item.author || '未知' }}</span>
            <span class="meta-date"><el-icon><Clock /></el-icon> {{ formatDate(item.created_at) }}</span>
            <span class="meta-stat"><el-icon><View /></el-icon> {{ item.look_count || 0 }}</span>
            <span class="meta-stat"><el-icon><Star /></el-icon> {{ item.digg_count || 0 }}</span>
            <span class="meta-stat"><el-icon><ChatDotRound /></el-icon> {{ item.comment_count || 0 }}</span>
            <el-tag v-for="tag in (item.tags || [])" :key="tag" size="small" type="info" effect="plain" round style="margin-left:4px;">{{ tag }}</el-tag>
          </div>
        </div>
        <div class="item-actions">
          <el-button type="primary" text @click="goEdit(item.id)">编辑</el-button>
          <el-button type="danger" text @click="handleDelete(item.id)">删除</el-button>
        </div>
      </div>

      <el-empty v-if="!list.length" description="暂无文章" />
    </div>

    <el-pagination
      v-if="total > 0"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="fetchList"
      style="margin-top:20px; display:flex; justify-content:center;"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiGetArticleList, apiDeleteArticle } from '@/api/article'
import { ElMessage, ElMessageBox } from 'element-plus'
import { User, Clock, View, Star, ChatDotRound, Document, Plus, Search } from '@element-plus/icons-vue'

const router = useRouter()
const list = ref([])
const total = ref(0)
const pageSize = 10
const search = ref('')

function goCreate() { router.push({ name: 'ArticleEdit' }) }
function goEdit(id) { router.push({ name: 'ArticleEdit', query: { id } }) }

function formatDate(dateStr) {
  if (!dateStr) return '未知'
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

async function fetchList(page = 1) {
  const params = { page, size: pageSize }
  if (search.value) params.title = search.value
  const res = await apiGetArticleList(params)
  list.value = res.data?.list || res.data || []
  total.value = res.data?.total || 0
}

async function handleDelete(id) {
  try {
    await ElMessageBox.confirm('确定删除该文章吗？', '警告', { type: 'warning' })
    await apiDeleteArticle({ id_list: [String(id)] })
    ElMessage.success('删除成功')
    fetchList()
  } catch (e) { /* cancelled */ }
}

onMounted(() => fetchList())
</script>

<style scoped>
.article-manage { padding: 20px; }
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.search-input { width: 280px; }

.article-list { display: flex; flex-direction: column; gap: 16px; }
.article-item {
  display: flex;
  align-items: stretch;
  background: var(--bg-card, #fff);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
  transition: box-shadow 0.3s, transform 0.2s;
}
.article-item:hover { box-shadow: 0 6px 20px rgba(0,0,0,0.1); transform: translateY(-2px); }

.item-cover {
  width: 200px;
  min-height: 140px;
  flex-shrink: 0;
  overflow: hidden;
  background: #f5f5f5;
}
.item-cover.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ddd;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: rgba(255,255,255,0.5);
}

.item-body {
  flex: 1;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}
.item-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  cursor: pointer;
  transition: color 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-title:hover { color: var(--primary-color); }
.item-abstract {
  font-size: 13px;
  color: var(--text-secondary, #999);
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.item-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--text-muted, #bbb);
}
.item-meta span { display: flex; align-items: center; gap: 3px; }

.item-actions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 10px 16px;
  border-left: 1px solid #f0f0f0;
}
</style>
