<template>
  <div class="tag-manage">
    <el-card shadow="never">
      <div class="toolbar">
        <el-button type="primary" @click="showCreate = true">新建标签</el-button>
        <el-input placeholder="搜索标签" v-model="search" clearable @clear="fetchList" @keyup.enter="fetchList" style="width:220px;" />
      </div>

      <el-table :data="list" stripe>
        <el-table-column prop="id" label="ID" width="60" />
        <el-table-column prop="title" label="标签名" />
        <el-table-column label="操作" width="180">
          <template #default="{ row }">
            <el-button type="primary" link @click="editTag(row)">编辑</el-button>
            <el-button type="danger" link @click="deleteTag(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-empty v-if="!list.length" description="暂无标签" />

      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="fetchList"
      />
    </el-card>

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
  const params = { page, size: pageSize, limit: pageSize }
  if (search.value) params.title = search.value
  const res = await apiGetTagList(params)
  const data = res.data || {}
  list.value = data.list || []
  total.value = data.total || data.count || 0
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
.toolbar {
  margin-bottom: 14px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
