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

const QQ_REDIRECT_KEY = 'qq_login_redirect'
const QQ_REDIRECT_TS_KEY = 'qq_login_redirect_ts'

function safeRedirectPath(value) {
  const text = String(value || '').trim()
  // 只允许站内跳转，避免被 query 注入外链地址导致 open redirect。
  if (text && text.startsWith('/')) return text
  return '/'
}

function stashRedirectForQQ() {
  const redirect = safeRedirectPath(route.query.redirect)
  if (redirect && redirect !== '/') {
    sessionStorage.setItem(QQ_REDIRECT_KEY, redirect)
    sessionStorage.setItem(QQ_REDIRECT_TS_KEY, String(Date.now()))
    return
  }
  sessionStorage.removeItem(QQ_REDIRECT_KEY)
  sessionStorage.removeItem(QQ_REDIRECT_TS_KEY)
}

function consumeStashedQQRedirect() {
  const redirect = safeRedirectPath(sessionStorage.getItem(QQ_REDIRECT_KEY))
  sessionStorage.removeItem(QQ_REDIRECT_KEY)
  sessionStorage.removeItem(QQ_REDIRECT_TS_KEY)
  return redirect
}

function detectQQDisplay() {
  return window.matchMedia?.('(max-width: 768px)')?.matches ? 'mobile' : 'pc'
}

async function finishLogin(token) {
  if (!token) {
    ElMessage.error('登录失败：未获取到令牌')
    return
  }
  userStore.setToken(token)
  await userStore.fetchUserInfo()
  ElMessage.success('登录成功')
  const redirectFromQuery = safeRedirectPath(route.query.redirect)
  const redirectFromStash = consumeStashedQQRedirect()
  router.replace(redirectFromQuery !== '/' ? redirectFromQuery : redirectFromStash)
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
  } catch (e) {
    // 具体错误提示由 request 拦截器统一处理，这里只防止未捕获异常噪音。
  } finally {
    loading.value = false
  }
}

async function handleQQLogin() {
  stashRedirectForQQ()
  qqLoading.value = true
  try {
    const res = await apiGetQQLoginPath({ display: detectQQDisplay() })
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

    // 修改提取逻辑，兼容不同返回格式
    let token
    if (typeof res.data === 'string') {
      token = res.data
    } else if (res.data?.data && typeof res.data.data === 'string') {
      token = res.data.data
    } else if (res.data?.token) {
      token = res.data.token
    } else {
      token = res.data || res.token
    }

    if (!token) {
      ElMessage.error('未获取到登录凭证')
      return
    }

    await finishLogin(token)
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || e?.message || 'QQ登录失败')
  } finally {
    qqLoading.value = false
  }
}

function goRegister() {
  router.push({ name: 'Register' })
}

onMounted(() => {
  const code = String(route.query.code || '')
  if (code) {
    // QQ 回调会把 `code` 带回 `/login?code=xxx`，这里自动完成二次登录。
    handleQQCallback(code)
  }
})
</script>

<style scoped>
.extra-actions {
  margin-top: 10px;
  display: grid;
  gap: 8px;
}
</style>
