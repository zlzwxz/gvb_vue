<template>
  <div class="tag-manage">
    <el-row justify="space-between" style="margin-bottom:20px;">
      <el-col>
        <el-button type="primary" @click="showCreate = true">新建标签</el-button>
      </el-col>
      <el-col>
        <el-input placeholder="搜索标签" v-model="search" clearable @clear="fetchList" @keyup.enter="fetchList" style="width:200px;" />
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%" stripe>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="title" label="标签名" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <el-button type="text" @click="editTag(row)">编辑</el-button>
          <el-button type="text" @click="deleteTag(row.id)">删除</el-button>
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
    <el-dialog :title="isEdit ? '编辑标签' : '新建标签'" v-model="showCreate">
      <el-form :model="form" :rules="rules" ref="tagForm">
        <el-form-item label="标签名" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreate = false">取消</el-button>
        <el-button type="primary" @click="saveTag">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiGetTagList, apiCreateTag, apiUpdateTag, apiDeleteTag } from '@/api/tag'
import { ElMessage, ElMessageBox } from 'element-plus'

const list = ref([])
const total = ref(0)
const pageSize = 10
const search = ref('')
const showCreate = ref(false)
const isEdit = ref(false)
const form = ref({ id: null, title: '' })
const rules = { title: [{ required: true, message: '标签名不能为空', trigger: 'blur' }] }

async function fetchList(page = 1) {
  const params = { page, size: pageSize }
  if (search.value) params.title = search.value
  const res = await apiGetTagList(params)
  list.value = res.data.list || []
  total.value = res.data.total || 0
}

function editTag(row) {
  isEdit.value = true
  form.value = { ...row }
  showCreate.value = true
}

function deleteTag(id) {
  ElMessageBox.confirm('确定删除该标签吗？', '警告', { type: 'warning' }).then(async () => {
    await apiDeleteTag({ id_list: [id] })
    ElMessage.success('删除成功')
    fetchList()
  }).catch(() => {})
}

async function saveTag() {
  if (isEdit.value) {
    await apiUpdateTag(form.value.id, { title: form.value.title })
    ElMessage.success('更新成功')
  } else {
    await apiCreateTag({ title: form.value.title })
    ElMessage.success('创建成功')
  }
  showCreate.value = false
  isEdit.value = false
  fetchList()
}

onMounted(() => fetchList())
</script>

<style scoped>
.tag-manage { padding: 20px; }
</style>
