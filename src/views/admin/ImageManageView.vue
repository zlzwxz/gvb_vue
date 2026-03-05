<template>
  <div class="image-manage">
    <el-row justify="space-between" style="margin-bottom:20px;">
      <el-col>
        <el-upload
          action="/api/images"
          name="image"
          :headers="uploadHeaders"
          list-type="picture-card"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
        >
          <el-icon><Plus /></el-icon>
        </el-upload>
      </el-col>
      <el-col>
        <el-input placeholder="搜索图片" v-model="search" clearable @clear="fetchList" @keyup.enter="fetchList" style="width:200px;" />
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="名称" />
      <el-table-column label="预览" width="120">
        <template #default="{ row }">
          <el-image :src="$resolveImg(row.path)" style="width:80px;height:80px;" fit="scale-down" />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="text" @click="handleRename(row)">重命名</el-button>
          <el-button type="text" @click="handleDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="total"
      @current-change="fetchList"
      style="margin-top:20px; text-align:center;"
    />
    <el-dialog title="重命名图片" v-model="showRename">
      <el-input v-model="renameForm.name" placeholder="新名称" />
      <template #footer>
        <el-button @click="showRename = false">取消</el-button>
        <el-button type="primary" @click="confirmRename">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { apiGetImageList, apiUpdateImage, apiDeleteImage } from '@/api/image'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const userStore = useUserStore()
const uploadHeaders = computed(() => {
  return { token: userStore.token }
})

const list = ref([])
const total = ref(0)
const pageSize = 12
const search = ref('')
const showRename = ref(false)
const renameForm = ref({ id: null, name: '' })

async function fetchList(page = 1) {
  const params = { page, size: pageSize }
  if (search.value) params.name = search.value
  const res = await apiGetImageList(params)
  list.value = res.data.list || []
  total.value = res.data.total || 0
}

function beforeUpload(file) {
  const isImg = file.type.startsWith('image/')
  if (!isImg) ElMessage.error('只能上传图片文件')
  return isImg
}

function handleUploadSuccess(response, file) {
  ElMessage.success('上传成功')
  fetchList()
}

function handleRename(row) {
  renameForm.value = { id: row.id, name: row.name }
  showRename.value = true
}

async function confirmRename() {
  await apiUpdateImage({ id: renameForm.value.id, name: renameForm.value.name })
  ElMessage.success('重命名成功')
  showRename.value = false
  fetchList()
}

function handleDelete(id) {
  ElMessageBox.confirm('确定删除该图片吗？', '警告', { type: 'warning' }).then(async () => {
    await apiDeleteImage({ id_list: [id] })
    ElMessage.success('删除成功')
    fetchList()
  })
}

onMounted(() => fetchList())
</script>

<style scoped>
.image-manage { padding: 20px; }
</style>
