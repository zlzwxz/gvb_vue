<template>
  <div class="advert-manage">
    <el-card shadow="never">
      <div class="toolbar">
        <el-button type="primary" @click="openCreate">新建广告</el-button>
        <el-input placeholder="搜索标题" v-model="search" clearable @clear="fetchList" @keyup.enter="fetchList" style="width:220px;" />
      </div>

      <el-table :data="list" stripe v-loading="loading">
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="title" label="标题" />
        <el-table-column label="封面" width="120">
          <template #default="{ row }">
            <el-image :src="$resolveImg(row.images)" style="width:80px;height:50px;" fit="scale-down" />
          </template>
        </el-table-column>
        <el-table-column prop="href" label="链接" show-overflow-tooltip />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="is_show" label="显示" width="80">
          <template #default="{ row }">
            <el-tag type="success" v-if="row.is_show">是</el-tag>
            <el-tag type="info" v-else>否</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" link @click="editAdvert(row)">编辑</el-button>
            <el-button type="danger" link @click="deleteAdvert(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-empty v-if="!loading && !list.length" description="暂无广告数据" />

      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="fetchList"
      />
    </el-card>

    <el-dialog :title="isEdit ? '编辑广告' : '新建广告'" v-model="showCreate" width="700px">
      <el-form :model="form" :rules="rules" ref="advertForm">
        <el-form-item label="标题" prop="title"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="封面图片" prop="images">
          <!-- 图片选择区域 -->
          <div class="image-picker">
            <div
              v-for="img in imageList"
              :key="img.id"
              class="image-picker-item"
              :class="{ 'is-selected': form.images === img.path }"
              @click="form.images = img.path"
            >
              <el-image :src="$resolveImg(img.path)" fit="scale-down" style="width:80px;height:80px;" />
              <div class="image-picker-name">{{ img.name }}</div>
              <div v-if="form.images === img.path" class="selected-mark">✓</div>
            </div>
            <el-empty v-if="imageList.length === 0" description="暂无图片，请先在图片库上传" :image-size="60" />
          </div>
          <div v-if="form.images" style="margin-top: 8px; color: #67c23a; font-size: 13px;">
            已选择: {{ form.images }}
          </div>
        </el-form-item>
        <el-form-item label="链接" prop="href"><el-input v-model="form.href" placeholder="跳转链接" /></el-form-item>
        <el-form-item label="排序" prop="sort"><el-input-number v-model="form.sort" :min="0" /></el-form-item>
        <el-form-item label="是否显示" prop="is_show"><el-switch v-model="form.is_show" /></el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreate = false">取消</el-button>
        <el-button type="primary" @click="saveAdvert">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiGetAdvertList, apiCreateAdvert, apiUpdateAdvert, apiDeleteAdvert } from '@/api/advert'
import { apiGetImageList } from '@/api/image'
import { ElMessage, ElMessageBox } from 'element-plus'

const list = ref([])
const total = ref(0)
const pageSize = 10
const loading = ref(false)
const search = ref('')
const showCreate = ref(false)
const isEdit = ref(false)
const form = ref({ title: '', images: '', href: '', sort: 0, is_show: true })
const imageList = ref([])
const rules = {
  title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
  href: [{ required: true, message: '链接不能为空', trigger: 'blur' }],
  images: [{ required: true, message: '请选择一张封面图片', trigger: 'change' }]
}

async function fetchList(page = 1) {
  loading.value = true
  try {
    const params = { page, size: pageSize, limit: pageSize }
    if (search.value) params.title = search.value
    const res = await apiGetAdvertList(params)
    const data = res.data || {}
    list.value = data.list || []
    total.value = data.total || data.count || 0
  } finally {
    loading.value = false
  }
}

async function loadImages() {
  try {
    const res = await apiGetImageList({ page: 1, size: 100 })
    imageList.value = res.data.list || res.data || []
  } catch (e) {
    imageList.value = []
  }
}

function openCreate() {
  isEdit.value = false
  form.value = { title: '', images: '', href: '', sort: 0, is_show: true }
  loadImages()
  showCreate.value = true
}

function editAdvert(row) {
  isEdit.value = true
  form.value = { ...row }
  loadImages()
  showCreate.value = true
}

function deleteAdvert(id) {
  ElMessageBox.confirm('确定删除该广告吗？', '警告', { type: 'warning' }).then(async () => {
    await apiDeleteAdvert({ id_list: [id] })
    ElMessage.success('删除成功')
    fetchList()
  }).catch(() => {})
}

async function saveAdvert() {
  if (!form.value.images) {
    ElMessage.warning('请选择一张封面图片')
    return
  }
  try {
    if (isEdit.value) {
      const { id, ...updateData } = form.value
      await apiUpdateAdvert(id, updateData)
      ElMessage.success('更新成功')
    } else {
      await apiCreateAdvert(form.value)
      ElMessage.success('创建成功')
    }
    showCreate.value = false
    isEdit.value = false
    fetchList()
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '操作失败')
  }
}

onMounted(() => fetchList())
</script>

<style scoped>
.toolbar {
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}
.image-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  max-height: 300px;
  overflow-y: auto;
  padding: 8px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fafafa;
}
.image-picker-item {
  position: relative;
  cursor: pointer;
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 4px;
  text-align: center;
  transition: all 0.2s;
  width: 90px;
}
.image-picker-item:hover {
  border-color: #409eff;
}
.image-picker-item.is-selected {
  border-color: #67c23a;
  background: #f0f9eb;
}
.image-picker-name {
  font-size: 11px;
  color: #606266;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 4px;
}
.selected-mark {
  position: absolute;
  top: 2px;
  right: 2px;
  background: #67c23a;
  color: #fff;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-size: 12px;
  line-height: 20px;
  text-align: center;
}
</style>
