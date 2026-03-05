<template>
  <div class="article-edit">
    <el-card class="edit-card" shadow="hover">
      <h2 class="title">{{ isEdit ? '编辑文章' : '新建文章' }}</h2>
      <el-form :model="form" ref="articleForm" label-width="80px" :rules="rules" @submit.native.prevent="handleSubmit">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类" filterable allow-create>
            <el-option v-for="c in categories" :key="c" :label="c" :value="c" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-select v-model="form.tags" multiple placeholder="请选择标签" filterable allow-create>
            <el-option v-for="t in tagOptions" :key="t" :label="t" :value="t" />
          </el-select>
        </el-form-item>
        <el-form-item label="封面" prop="banner_id">
          <div class="image-picker">
            <div
              v-for="b in banners"
              :key="b.id"
              class="image-picker-item"
              :class="{ 'is-selected': form.banner_id === b.id }"
              @click="form.banner_id = (form.banner_id === b.id ? null : b.id)"
            >
              <el-image :src="$resolveImg(b.path)" fit="cover" style="width:80px;height:60px;border-radius:4px;" />
              <div class="image-picker-name">{{ b.name }}</div>
              <div v-if="form.banner_id === b.id" class="selected-mark">✓</div>
            </div>
            <el-empty v-if="banners.length === 0" description="暂无图片" :image-size="40" />
          </div>
        </el-form-item>
        <el-form-item label="摘要" prop="abstract">
          <el-input v-model="form.abstract" type="textarea" rows="3" placeholder="文章摘要" />
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <mavon-editor 
            ref="mdRef" 
            v-model="form.content" 
            style="height: 500px; width: 100%; z-index: 10;" 
            @imgAdd="handleEditorImgAdd"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit" :loading="loading">{{ isEdit ? '更新' : '创建' }}</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { apiCreateArticle, apiUpdateArticle, apiGetArticleDetail, apiGetArticleCategoryList } from '@/api/article'
import { apiGetTagList } from '@/api/tag'
import { apiUploadImage, apiGetImageList } from '@/api/image'
import { ElMessage } from 'element-plus'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const mdRef = ref(null)
const isEdit = computed(() => !!route.query.id)
const loading = ref(false)

const form = ref({
  title: '',
  category: '',
  tags: [],
  banner_id: null,
  abstract: '',
  content: ''
})

const rules = {
  title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
  content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
}

const categories = ref([])
const tagOptions = ref([])
const banners = ref([])

async function loadMeta() {
  try {
    const [catRes, tagRes, bannerRes] = await Promise.all([
      apiGetArticleCategoryList(),
      apiGetTagList({ limit: 50 }),
      apiGetImageList({ limit: 50 })
    ])
    // Categories API returns: { data: { list: [ { label: "c++", count: 5 } ] } }
    // or { data: [ "c++", "go" ] } — handle both
    const catData = catRes?.data?.list || catRes?.data || []
    categories.value = catData.map(c => typeof c === 'string' ? c : (c.label || c.name || c.title || c.category || '')).filter(c => c)

    // apiGetTagList returns standard page structure: { data: { list: [ { title: 'tag1' } ] } }
    const tagData = tagRes?.data?.list || tagRes?.data || []
    tagOptions.value = tagData.map(t => typeof t === 'string' ? t : (t.title || t.name || t.tag || '')).filter(t => t)

    banners.value = bannerRes?.data?.list || bannerRes?.data || []
  } catch (e) { console.error('加载元数据失败', e) }
}

async function loadArticle(id) {
  const res = await apiGetArticleDetail(id)
  const data = res.data
  form.value.title = data.title
  form.value.category = data.category || ''
  form.value.tags = data.tags || []
  form.value.banner_id = data.banner_id || null
  form.value.abstract = data.abstract || ''
  form.value.content = data.content || ''
}

onMounted(async () => {
  await loadMeta()
  if (isEdit.value) {
    await loadArticle(route.query.id)
  }
})

async function handleEditorImgAdd(pos, file) {
  const formData = new FormData()
  formData.append('image', file)
  try {
    const res = await apiUploadImage(formData)
    const url = res.data
    mdRef.value.$img2Url(pos, url)
  } catch (e) { ElMessage.error('图片上传失败') }
}

async function handleSubmit() {
  loading.value = true
  try {
    if (isEdit.value) {
      await apiUpdateArticle({ ...form.value, id: String(route.query.id) })
      ElMessage.success('文章更新成功')
    } else {
      await apiCreateArticle(form.value)
      ElMessage.success('文章创建成功')
    }
    router.push({ name: 'ArticleManage' })
  } catch (e) {
    ElMessage.error(e.response?.data?.msg || '操作失败')
  } finally { loading.value = false }
}

function goBack() { router.back() }
</script>

<style scoped>
.article-edit { padding: 20px; }
.edit-card { max-width: 1200px; margin: 0 auto; }
.title { text-align: center; margin-bottom: 20px; }
.image-picker {
  display: flex; flex-wrap: wrap; gap: 10px; max-height: 250px;
  overflow-y: auto; padding: 8px; border: 1px solid #ebeef5; border-radius: 4px; background: #fafafa;
}
.image-picker-item {
  position: relative; cursor: pointer; border: 2px solid transparent;
  border-radius: 6px; padding: 4px; text-align: center; transition: all 0.2s; width: 90px;
}
.image-picker-item:hover { border-color: #409eff; }
.image-picker-item.is-selected { border-color: #67c23a; background: #f0f9eb; }
.image-picker-name { font-size: 11px; color: #606266; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 4px; }
.selected-mark {
  position: absolute; top: 2px; right: 2px; background: #67c23a; color: #fff;
  width: 20px; height: 20px; border-radius: 50%; font-size: 12px; line-height: 20px; text-align: center;
}
</style>
