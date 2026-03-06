<template>
  <div class="auth-shell">
    <el-card class="auth-card" shadow="never">
      <h2 class="auth-title">欢迎回来</h2>
      <p class="auth-desc">使用用户名/邮箱登录，登录后可发帖、私信、收藏与后台管理。</p>

      <el-form :model="form" class="auth-form" @submit.native.prevent="handleLogin" size="large">
        <el-form-item>
          <el-input v-model="form.user_name" autocomplete="off" placeholder="用户名或邮箱">
            <template #prefix><el-icon><User /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" autocomplete="off" placeholder="密码" show-password>
            <template #prefix><el-icon><Lock /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>

      <div class="extra-actions">
        <el-button type="success" plain :loading="qqLoading" style="width: 100%" @click="handleQQLogin">QQ 一键登录</el-button>
        <el-button type="primary" link @click="goRegister">没有账号？立即注册</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { apiEmailLogin, apiGetQQLoginPath, apiQQLogin } from '@/api/user'
import { ElMessage } from 'element-plus'
import { Lock, User } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const form = ref({ user_name: '', password: '' })
const loading = ref(false)
const qqLoading = ref(false)

async function finishLogin(token) {
  if (!token) {
    ElMessage.error('登录失败：未获取到令牌')
    return
  }
  userStore.setToken(token)
  await userStore.fetchUserInfo()
  ElMessage.success('登录成功')
  const redirect = String(route.query.redirect || '/')
  router.replace(redirect)
}

async function handleLogin() {
  if (!form.value.user_name || !form.value.password) {
    ElMessage.warning('请输入账号和密码')
    return
  }
  loading.value = true
  try {
    const res = await apiEmailLogin(form.value)
    const token = res.data?.token || res.data || res.token
    await finishLogin(token)
  } finally {
    loading.value = false
  }
}

async function handleQQLogin() {
  qqLoading.value = true
  try {
    const res = await apiGetQQLoginPath()
    const url = res.data || res.url
    if (!url) {
      ElMessage.error('QQ 登录地址未配置')
      return
    }
    window.location.href = url
  } finally {
    qqLoading.value = false
  }
}

async function handleQQCallback(code) {
  qqLoading.value = true
  try {
    const res = await apiQQLogin(code)
    const token = res.data?.token || res.data || res.token
    await finishLogin(token)
  } finally {
    qqLoading.value = false
  }
}

function goRegister() {
  router.push({ name: 'Register' })
}

onMounted(() => {
  const code = String(route.query.code || '')
  if (code) handleQQCallback(code)
})
</script>

<style scoped>
.extra-actions {
  margin-top: 10px;
  display: grid;
  gap: 8px;
}
</style>
