<template>
  <div class="user-manage-page">
    <el-card shadow="never">
      <div class="toolbar">
        <div class="toolbar-left">
          <el-button type="primary" @click="openCreateDialog">新增用户</el-button>
          <el-button type="danger" :disabled="selectedRows.length === 0" @click="handleBatchDelete">批量删除</el-button>
        </div>
        <div class="toolbar-right">
          <el-input
            v-model="keyword"
            placeholder="搜索用户名/昵称/邮箱"
            clearable
            style="width: 240px"
            @clear="fetchList(1)"
            @keyup.enter="fetchList(1)"
          >
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
          <el-select v-model="roleFilter" style="width: 140px" @change="fetchList(1)">
            <el-option label="全部角色" value="all" />
            <el-option label="管理员" value="admin" />
            <el-option label="普通用户" value="normal" />
          </el-select>
          <el-button @click="fetchList(currentPage)" :loading="loading">刷新</el-button>
        </div>
      </div>

      <el-table
        :data="displayList"
        stripe
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="user_name" label="用户名" min-width="140" />
        <el-table-column prop="nick_name" label="昵称" min-width="140" />
        <el-table-column prop="email" label="邮箱" min-width="220" />
        <el-table-column prop="role" label="角色" width="110">
          <template #default="{ row }">
            <el-tag :type="isAdmin(row) ? 'danger' : 'info'">{{ isAdmin(row) ? '管理员' : '普通用户' }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="注册时间" width="180" />
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="openRoleDialog(row)">改角色</el-button>
            <el-button type="warning" link @click="openPwdDialog(row)">重置密码</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-empty v-if="!loading && displayList.length === 0" description="暂无用户数据" />

      <el-pagination
        v-if="total > 0"
        background
        layout="total, prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="fetchList"
      />
    </el-card>

    <el-dialog title="修改用户角色" v-model="roleDialogVisible" width="420px">
      <el-form label-width="90px">
        <el-form-item label="目标角色">
          <el-select v-model="roleForm.role" style="width: 100%">
            <el-option label="管理员" :value="1" />
            <el-option label="普通用户" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="roleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitRoleUpdate" :loading="submitLoading">保存</el-button>
      </template>
    </el-dialog>

    <el-dialog title="重置用户密码" v-model="pwdDialogVisible" width="420px">
      <el-form label-width="90px">
        <el-form-item label="新密码">
          <el-input v-model="pwdForm.pwd" type="password" show-password placeholder="请输入新密码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="pwdDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitPwdUpdate" :loading="submitLoading">保存</el-button>
      </template>
    </el-dialog>

    <el-dialog title="新增系统用户" v-model="createDialogVisible" width="460px">
      <el-form :model="createForm" ref="createFormRef" label-width="90px">
        <el-form-item label="用户名" prop="user_name" :rules="[{ required: true, message: '请输入用户名', trigger: 'blur' }]">
          <el-input v-model="createForm.user_name" />
        </el-form-item>
        <el-form-item label="昵称" prop="nick_name" :rules="[{ required: true, message: '请输入昵称', trigger: 'blur' }]">
          <el-input v-model="createForm.nick_name" />
        </el-form-item>
        <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入初始密码', trigger: 'blur' }]">
          <el-input v-model="createForm.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="createForm.email" />
        </el-form-item>
        <el-form-item label="权限组">
          <el-select v-model="createForm.role" style="width: 100%">
            <el-option label="管理员" :value="1" />
            <el-option label="普通用户" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="createDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitCreateUser" :loading="submitLoading">创建</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { apiDeleteUsers, apiGetUserList, apiRegister, apiUpdateUserPassword, apiUpdateUserRole } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

const list = ref([])
const loading = ref(false)
const submitLoading = ref(false)
const selectedRows = ref([])
const currentPage = ref(1)
const pageSize = 12
const total = ref(0)
const keyword = ref('')
const roleFilter = ref('all')

const roleDialogVisible = ref(false)
const roleForm = ref({ user_id: 0, role: 2 })

const pwdDialogVisible = ref(false)
const pwdForm = ref({ user_id: 0, pwd: '' })

const createDialogVisible = ref(false)
const createFormRef = ref(null)
const createForm = ref({ user_name: '', nick_name: '', password: '', email: '', role: 2 })

const displayList = computed(() => {
  if (roleFilter.value === 'all') return list.value
  return list.value.filter((row) => roleFilter.value === 'admin' ? isAdmin(row) : !isAdmin(row))
})

function isAdmin(row) {
  return row.role === '管理员' || Number(row.role) === 1 || row.role === 'admin'
}

async function fetchList(page = 1) {
  currentPage.value = page
  loading.value = true
  try {
    const params = { page, size: pageSize, limit: pageSize }
    if (keyword.value.trim()) {
      params.key = keyword.value.trim()
      params.user_name = keyword.value.trim()
    }
    const res = await apiGetUserList(params)
    const data = res.data || {}
    list.value = data.list || (Array.isArray(data) ? data : [])
    total.value = Number(data.total || data.count || list.value.length)
  } catch (e) {
    ElMessage.error('获取用户列表失败')
  } finally {
    loading.value = false
  }
}

function handleSelectionChange(val) {
  selectedRows.value = val
}

function openRoleDialog(row) {
  roleForm.value = { user_id: row.id, role: isAdmin(row) ? 1 : 2 }
  roleDialogVisible.value = true
}

async function submitRoleUpdate() {
  submitLoading.value = true
  try {
    await apiUpdateUserRole(roleForm.value)
    ElMessage.success('角色更新成功')
    roleDialogVisible.value = false
    await fetchList(currentPage.value)
  } catch {
    ElMessage.error('角色更新失败')
  } finally {
    submitLoading.value = false
  }
}

function openPwdDialog(row) {
  pwdForm.value = { user_id: row.id, pwd: '' }
  pwdDialogVisible.value = true
}

async function submitPwdUpdate() {
  if (!pwdForm.value.pwd) {
    ElMessage.warning('请输入新密码')
    return
  }
  submitLoading.value = true
  try {
    await apiUpdateUserPassword(pwdForm.value)
    ElMessage.success('密码重置成功')
    pwdDialogVisible.value = false
  } catch {
    ElMessage.error('密码重置失败')
  } finally {
    submitLoading.value = false
  }
}

function openCreateDialog() {
  createForm.value = { user_name: '', nick_name: '', password: '', email: '', role: 2 }
  createDialogVisible.value = true
}

function submitCreateUser() {
  createFormRef.value?.validate(async (valid) => {
    if (!valid) return
    submitLoading.value = true
    try {
      await apiRegister(createForm.value)
      ElMessage.success('用户创建成功')
      createDialogVisible.value = false
      await fetchList(currentPage.value)
    } catch (e) {
      ElMessage.error(e?.response?.data?.msg || '用户创建失败')
    } finally {
      submitLoading.value = false
    }
  })
}

function handleDelete(row) {
  ElMessageBox.confirm(`确定删除用户「${row.user_name}」吗？`, '删除确认', { type: 'warning' })
    .then(async () => {
      await apiDeleteUsers({ user_ids: [row.id] })
      ElMessage.success('删除成功')
      await fetchList(currentPage.value)
    })
    .catch(() => {})
}

function handleBatchDelete() {
  const ids = selectedRows.value.map((item) => item.id)
  ElMessageBox.confirm(`确定删除选中的 ${ids.length} 个用户吗？`, '批量删除', { type: 'warning' })
    .then(async () => {
      await apiDeleteUsers({ user_ids: ids })
      ElMessage.success('批量删除成功')
      selectedRows.value = []
      await fetchList(currentPage.value)
    })
    .catch(() => {})
}

onMounted(() => {
  fetchList(1)
})
</script>

<style scoped>
.toolbar {
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .toolbar-right {
    width: 100%;
  }
}
</style>
