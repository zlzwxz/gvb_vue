<template>
  <div class="image-manage-page">
    <section class="summary-grid">
      <article class="summary-card">
        <span>可访问图片</span>
        <strong>{{ meta.accessible_count || 0 }}</strong>
      </article>
      <article class="summary-card">
        <span>我上传的</span>
        <strong>{{ meta.mine_count || 0 }}</strong>
      </article>
      <article class="summary-card">
        <span>公开图片</span>
        <strong>{{ meta.public_count || 0 }}</strong>
      </article>
      <article class="summary-card">
        <span>私有图片</span>
        <strong>{{ meta.private_count || 0 }}</strong>
      </article>
    </section>

    <el-card shadow="never">
      <div class="upload-panel">
        <div class="upload-copy">
          <strong>图片上传</strong>
          <p>上传时直接设置公开/私有和分类，后面在帖子、赏金和首页模块里可以直接复用。</p>
        </div>
        <div class="upload-actions">
          <el-select v-model="uploadForm.visibility" style="width: 140px">
            <el-option label="公开图片" value="public" />
            <el-option label="私有图片" value="private" />
          </el-select>
          <el-input v-model="uploadForm.image_category" placeholder="图片分类，例如：帖子封面" style="width: 220px" />
          <el-upload
            :show-file-list="false"
            accept="image/*"
            :http-request="handleUpload"
            :before-upload="beforeUpload"
          >
            <el-button type="primary">
              <el-icon><Plus /></el-icon>
              上传图片
            </el-button>
          </el-upload>
        </div>
      </div>

      <div class="toolbar">
        <div class="toolbar-left">
          <el-input
            v-model="filters.key"
            clearable
            placeholder="搜索名称、分类或路径"
            style="width: 260px"
            @clear="fetchList(1)"
            @keyup.enter="fetchList(1)"
          />
          <el-select v-model="filters.visibility" clearable style="width: 150px" @change="fetchList(1)">
            <el-option label="全部权限" value="" />
            <el-option label="公开图片" value="public" />
            <el-option label="私有图片" value="private" />
          </el-select>
          <el-select v-model="filters.category" clearable style="width: 170px" @change="fetchList(1)">
            <el-option label="全部分类" value="" />
            <el-option
              v-for="item in categoryOptions"
              :key="item.category"
              :label="`${item.category} (${item.count})`"
              :value="item.category"
            />
          </el-select>
          <el-switch
            v-model="filters.mine"
            inline-prompt
            active-text="我的"
            inactive-text="全部"
            @change="fetchList(1)"
          />
        </div>
        <el-button @click="refreshAll" :loading="loading">
          <el-icon><RefreshRight /></el-icon>
          刷新
        </el-button>
      </div>

      <div v-loading="loading" class="image-grid">
        <article v-for="item in list" :key="item.id" class="image-card">
          <div class="image-preview">
            <el-image :src="$resolveImg(item.path)" fit="cover" preview-teleported />
          </div>
          <div class="image-body">
            <div class="image-title-row">
              <strong>{{ item.name || `图片${item.id}` }}</strong>
              <el-tag :type="item.visibility === 'private' ? 'warning' : 'success'" effect="plain" size="small">
                {{ item.visibility === 'private' ? '私有' : '公开' }}
              </el-tag>
            </div>
            <div class="image-meta">
              <span>{{ item.image_category || '未分类' }}</span>
              <span>ID {{ item.id }}</span>
            </div>
            <div class="image-path">{{ item.path }}</div>
            <div class="card-actions">
              <el-button link type="primary" @click="handleEdit(item)">编辑</el-button>
              <el-button link type="danger" @click="handleDelete(item)">删除</el-button>
            </div>
          </div>
        </article>

        <el-empty v-if="!loading && !list.length" description="当前筛选下没有图片" />
      </div>

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

    <el-dialog v-model="editVisible" title="编辑图片信息" width="480px">
      <el-form label-width="84px">
        <el-form-item label="名称">
          <el-input v-model="editForm.name" maxlength="120" />
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="editForm.visibility" style="width: 100%">
            <el-option label="公开图片" value="public" />
            <el-option label="私有图片" value="private" />
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-input v-model="editForm.image_category" maxlength="32" placeholder="例如：帖子封面、聊天插图" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editVisible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="submitEdit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  apiDeleteImage,
  apiGetImageList,
  apiGetImageMeta,
  apiUpdateImage,
  apiUploadImage
} from '@/api/image'
import { Plus, RefreshRight } from '@element-plus/icons-vue'

const pageSize = 12
const loading = ref(false)
const saving = ref(false)
const editVisible = ref(false)
const page = ref(1)
const total = ref(0)
const list = ref([])
const meta = ref({
  categories: [],
  public_count: 0,
  private_count: 0,
  mine_count: 0,
  accessible_count: 0
})
const filters = reactive({
  key: '',
  visibility: '',
  category: '',
  mine: true
})
const uploadForm = reactive({
  visibility: 'public',
  image_category: ''
})
const editForm = reactive({
  id: 0,
  name: '',
  visibility: 'public',
  image_category: ''
})

const categoryOptions = computed(() => Array.isArray(meta.value.categories) ? meta.value.categories : [])

function beforeUpload(file) {
  const isImage = String(file?.type || '').startsWith('image/')
  if (!isImage) {
    ElMessage.error('只能上传图片文件')
  }
  return isImage
}

async function loadMeta() {
  const res = await apiGetImageMeta()
  meta.value = res.data || meta.value
}

function buildQuery(nextPage = page.value) {
  const params = {
    page: nextPage,
    limit: pageSize,
    mine: filters.mine
  }
  if (filters.key.trim()) params.key = filters.key.trim()
  if (filters.visibility) params.visibility = filters.visibility
  if (filters.category) params.category = filters.category
  return params
}

async function fetchList(nextPage = 1) {
  page.value = nextPage
  loading.value = true
  try {
    const res = await apiGetImageList(buildQuery(nextPage))
    list.value = res.data?.list || []
    total.value = Number(res.data?.count || res.data?.total || 0)
  } catch (error) {
    list.value = []
    total.value = 0
    ElMessage.error(error?.message || '获取图片列表失败')
  } finally {
    loading.value = false
  }
}

async function refreshAll() {
  loading.value = true
  try {
    await Promise.all([loadMeta(), fetchList(1)])
  } finally {
    loading.value = false
  }
}

async function handleUpload(option) {
  const formData = new FormData()
  formData.append('image', option.file)
  formData.append('visibility', uploadForm.visibility)
  formData.append('image_category', uploadForm.image_category.trim())
  try {
    await apiUploadImage(formData)
    option.onSuccess?.({})
    ElMessage.success('图片上传成功')
    await Promise.all([loadMeta(), fetchList(1)])
  } catch (error) {
    option.onError?.(error)
    ElMessage.error(error?.message || '上传失败')
  }
}

function handleEdit(item) {
  editForm.id = Number(item.id || 0)
  editForm.name = item.name || ''
  editForm.visibility = item.visibility || 'public'
  editForm.image_category = item.image_category || ''
  editVisible.value = true
}

async function submitEdit() {
  saving.value = true
  try {
    await apiUpdateImage({
      id: editForm.id,
      name: editForm.name.trim(),
      visibility: editForm.visibility,
      image_category: editForm.image_category.trim()
    })
    ElMessage.success('图片信息已更新')
    editVisible.value = false
    await Promise.all([loadMeta(), fetchList(page.value)])
  } catch (error) {
    ElMessage.error(error?.message || '更新失败')
  } finally {
    saving.value = false
  }
}

async function handleDelete(item) {
  try {
    await ElMessageBox.confirm(`确定删除图片「${item.name || item.id}」吗？`, '删除图片', {
      type: 'warning'
    })
    await apiDeleteImage({ id_list: [item.id] })
    ElMessage.success('图片已删除')
    await Promise.all([loadMeta(), fetchList(1)])
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') {
      ElMessage.error(error?.message || '删除失败')
    }
  }
}

onMounted(async () => {
  await Promise.all([loadMeta(), fetchList(1)])
})
</script>

<style scoped>
.image-manage-page {
  display: grid;
  gap: 14px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
}

.summary-card {
  border-radius: 16px;
  padding: 16px;
  background: linear-gradient(180deg, #f8fcff 0%, #eff7ff 100%);
  border: 1px solid #dce8f3;
}

.summary-card span {
  display: block;
  color: #68809a;
  font-size: 12px;
}

.summary-card strong {
  display: block;
  margin-top: 8px;
  color: #153b60;
  font-size: 26px;
}

.upload-panel,
.toolbar,
.toolbar-left,
.upload-actions,
.image-title-row,
.card-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.upload-panel {
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5edf5;
}

.upload-copy strong {
  color: #163c60;
}

.upload-copy p {
  margin: 6px 0 0;
  color: #6d839b;
  font-size: 12px;
}

.toolbar {
  margin: 16px 0;
  justify-content: space-between;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}

.image-card {
  border-radius: 18px;
  border: 1px solid #dfe9f3;
  background: linear-gradient(180deg, #ffffff 0%, #fbfdff 100%);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.image-card:hover {
  transform: translateY(-2px);
  border-color: #b7d2e7;
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.08);
}

.image-preview {
  height: 180px;
  background: #eef3f8;
}

.image-preview :deep(.el-image) {
  width: 100%;
  height: 100%;
}

.image-body {
  padding: 14px;
  display: grid;
  gap: 10px;
}

.image-title-row strong {
  flex: 1;
  min-width: 0;
  color: #12375b;
  line-height: 1.5;
}

.image-meta,
.image-path {
  color: #71859f;
  font-size: 12px;
}

.image-meta {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.image-path {
  line-height: 1.6;
  word-break: break-all;
}

.pager {
  margin-top: 18px;
  display: flex;
  justify-content: center;
}

@media (max-width: 900px) {
  .upload-panel,
  .toolbar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
