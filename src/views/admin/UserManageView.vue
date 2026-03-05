<template>
  <div class="user-manage">
    <el-row justify="space-between" style="margin-bottom:20px;">
      <el-col :span="12">
        <el-button type="primary" @click="openCreateDialog">新增用户</el-button>
        <el-button type="danger" :disabled="selectedRows.length === 0" style="margin-left: 10px;" @click="handleBatchDelete">批量删除</el-button>
      </el-col>
    </el-row>

    <el-table 
      :data="list" 
      style="width: 100%" 
      stripe 
      @selection-change="handleSelectionChange"
      v-loading="loading"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="user_name" label="用户名" />
      <el-table-column prop="nick_name" label="昵称" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="role" label="角色">
        <template #default="{ row }">
          <el-tag :type="row.role === '管理员' || row.role === 1 ? 'danger' : 'info'">
            {{ row.role === '管理员' || row.role === 1 ? '管理员' : '普通用户' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="注册时间" width="180" />
      
      <el-table-column label="操作" width="220" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" link @click="openRoleDialog(row)">改角色</el-button>
          <el-button type="warning" link @click="openPwdDialog(row)">改密码</el-button>
          <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改角色弹窗 -->
    <el-dialog title="修改用户角色" v-model="roleDialogVisible" width="400px">
      <el-form label-width="80px">
        <el-form-item label="目标角色">
          <el-select v-model="roleForm.role" style="width: 100%;">
            <el-option label="管理员" :value="1" />
            <el-option label="普通用户" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="roleDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitRoleUpdate" :loading="submitLoading">确定</el-button>
      </template>
    </el-dialog>

    <!-- 修改密码弹窗 -->
    <el-dialog title="重置用户密码" v-model="pwdDialogVisible" width="400px">
      <el-form label-width="80px">
        <el-form-item label="新密码">
          <el-input v-model="pwdForm.pwd" type="password" show-password placeholder="请输入新密码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="pwdDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitPwdUpdate" :loading="submitLoading">确定</el-button>
      </template>
    </el-dialog>

    <!-- 新增用户弹窗 -->
    <el-dialog title="新增系统用户" v-model="createDialogVisible" width="450px">
      <el-form :model="createForm" ref="createFormRef" label-width="80px">
        <el-form-item label="用户名" prop="user_name" :rules="[{ required: true, message: '必填' }]">
          <el-input v-model="createForm.user_name" placeholder="建议输入拼音字母组合" />
        </el-form-item>
        <el-form-item label="昵称" prop="nick_name" :rules="[{ required: true, message: '必填' }]">
          <el-input v-model="createForm.nick_name" placeholder="展示用的花名" />
        </el-form-item>
        <el-form-item label="初始密码" prop="password" :rules="[{ required: true, message: '必填' }]">
          <el-input v-model="createForm.password" type="password" show-password placeholder="请输入明文密码" />
        </el-form-item>
        <el-form-item label="权限组" prop="role">
          <el-select v-model="createForm.role" style="width: 100%;">
            <el-option label="管理员" :value="1" />
            <el-option label="普通用户" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="createDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitCreateUser" :loading="submitLoading">添加</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiGetUserList, apiUpdateUserRole, apiUpdateUserPassword, apiDeleteUsers, apiRegister } from '@/api/user'
import { ElMessage, ElMessageBox } from 'element-plus'

const list = ref([])
const loading = ref(false)
const selectedRows = ref([])
const submitLoading = ref(false)

// 角色表单
const roleDialogVisible = ref(false)
const roleForm = ref({ user_id: 0, role: 2 })

// 密码表单
const pwdDialogVisible = ref(false)
const pwdForm = ref({ user_id: 0, pwd: '' })

// 新增用户表单
const createDialogVisible = ref(false)
const createFormRef = ref(null)
const createForm = ref({ user_name: '', nick_name: '', password: '', role: 2 })

async function fetchList() {
  loading.value = true
  try {
    const res = await apiGetUserList()
    list.value = res.data.list || res.data || []
  } catch (e) {
    console.error('获取用户列表失败', e)
    ElMessage.error('加载失败')
  } finally {
    loading.value = false
  }
}

function handleSelectionChange(val) {
  selectedRows.value = val
}

function openRoleDialog(row) {
  roleForm.value.user_id = row.id
  roleForm.value.role = (row.role === '管理员' || row.role === 1) ? 1 : 2
  roleDialogVisible.value = true
}

async function submitRoleUpdate() {
  submitLoading.value = true
  try {
    await apiUpdateUserRole(roleForm.value)
    ElMessage.success('角色修改成功')
    roleDialogVisible.value = false
    fetchList()
  } catch(e) {
    ElMessage.error('角色修改失败')
  } finally {
    submitLoading.value = false
  }
}

function openPwdDialog(row) {
  pwdForm.value.user_id = row.id
  pwdForm.value.pwd = ''
  pwdDialogVisible.value = true
}

async function submitPwdUpdate() {
  if (!pwdForm.value.pwd) return ElMessage.warning('密码不能为空')
  submitLoading.value = true
  try {
    await apiUpdateUserPassword(pwdForm.value)
    ElMessage.success('密码重置成功')
    pwdDialogVisible.value = false
  } catch(e) {
    ElMessage.error('密码重置失败')
  } finally {
    submitLoading.value = false
  }
}

function openCreateDialog() {
  createForm.value = { user_name: '', nick_name: '', password: '', role: 2 }
  createDialogVisible.value = true
}

async function submitCreateUser() {
  createFormRef.value?.validate(async (valid) => {
    if (!valid) return
    submitLoading.value = true
    try {
      await apiRegister(createForm.value)
      ElMessage.success('用户创建成功')
      createDialogVisible.value = false
      fetchList()
    } catch (e) {
      ElMessage.error(e.response?.data?.msg || '创建失败，可能用户名重复')
    } finally {
      submitLoading.value = false
    }
  })
}

function handleDelete(row) {
  ElMessageBox.confirm(`确定要删除用户 "${row.user_name}" 吗？此操作不可逆！`, '警告', {
    type: 'warning',
    confirmButtonClass: 'el-button--danger'
  }).then(async () => {
    try {
      await apiDeleteUsers({ user_ids: [row.id] })
      ElMessage.success('删除成功')
      fetchList()
    } catch(e) {
      ElMessage.error('删除失败')
    }
  }).catch(() => {})
}

function handleBatchDelete() {
  const ids = selectedRows.value.map(item => item.id)
  ElMessageBox.confirm(`确定要删除选中的 ${ids.length} 个用户吗？`, '危险操作', {
    type: 'error',
    confirmButtonClass: 'el-button--danger'
  }).then(async () => {
    try {
      await apiDeleteUsers({ user_ids: ids })
      ElMessage.success('批量删除成功')
      fetchList()
    } catch(e) {
      ElMessage.error('批量删除失败')
    }
  }).catch(() => {})
}

onMounted(() => fetchList())
</script>

<style scoped>
.user-manage { padding: 20px; }
</style>
