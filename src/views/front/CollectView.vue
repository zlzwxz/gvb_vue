<template>
  <div class="collect-page">
    <h2>我的收藏</h2>
    <el-row :gutter="20" v-if="list.length > 0">
      <el-col :span="8" v-for="item in list" :key="item.id">
        <el-card shadow="hover" class="collect-card" @click="goDetail(item.article_id)">
          <h4>{{ item.title }}</h4>
          <p class="date">收藏于：{{ item.created_at }}</p>
          <div class="actions" @click.stop>
            <el-button type="danger" size="small" @click="cancelCollect(item.article_id)">取消收藏</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-empty v-else description="暂无收藏" />
    <el-pagination
      v-if="total > 0"
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="fetchList"
      style="text-align:center; margin-top:20px;"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiGetCollectList, apiCollectArticle } from '@/api/article'
import { ElMessage } from 'element-plus'

const router = useRouter()
const list = ref([])
const total = ref(0)
const pageSize = 12

async function fetchList(page = 1) {
  try {
    const res = await apiGetCollectList({ page, size: pageSize })
    list.value = res.data.list || []
    total.value = res.data.total || 0
  } catch (e) {
    console.error(e)
  }
}

function goDetail(id) {
  router.push({ name: 'ArticleDetail', params: { id } })
}

async function cancelCollect(article_id) {
  try {
    await apiCollectArticle({ article_id }) // collect endpoint toggles state
    ElMessage.success('已取消收藏')
    fetchList()
  } catch (e) {
    ElMessage.error('取消失败')
  }
}

onMounted(() => fetchList())
</script>

<style scoped>
.collect-page { padding: 20px; max-width: 1200px; margin: 0 auto; }
.collect-card { margin-bottom: 20px; cursor: pointer; }
.date { font-size: 12px; color: #999; }
.actions { margin-top: 10px; text-align: right; }
</style>
