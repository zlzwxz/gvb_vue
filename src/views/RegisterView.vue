<template>
  <div class="auth-shell">
    <el-card class="auth-card" shadow="never">
      <h2 class="auth-title">创建账号</h2>
      <p class="auth-desc">注册需填写邮箱并完成验证码校验，注册后会自动登录。</p>

      <el-form :model="form" class="auth-form" @submit.native.prevent="handleRegister" size="large">
        <el-form-item>
          <el-input v-model="form.user_name" autocomplete="off" placeholder="用户名（必填）">
            <template #prefix><el-icon><User /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.nick_name" autocomplete="off" placeholder="昵称（必填）">
            <template #prefix><el-icon><ChatLineRound /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.email" autocomplete="off" placeholder="邮箱（必填）">
            <template #prefix><el-icon><Message /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <div class="code-row">
            <el-input v-model="form.code" autocomplete="off" placeholder="邮箱验证码（必填）" maxlength="6" />
            <el-button
              type="primary"
              plain
              :disabled="codeSending || countdown > 0"
              :loading="codeSending"
              @click="sendCode"
            >
              {{ countdown > 0 ? `${countdown}s后重发` : '发送验证码' }}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" autocomplete="off" placeholder="密码" show-password>
            <template #prefix><el-icon><Lock /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.confirmPassword" type="password" autocomplete="off" placeholder="确认密码" show-password>
            <template #prefix><el-icon><Lock /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading" style="width: 100%">注册并登录</el-button>
        </el-form-item>
      </el-form>

      <div class="extra-actions">
        <el-button type="primary" link @click="goLogin">已有账号？去登录</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { apiEmailLogin, apiRegister, apiSendRegisterEmailCode } from '@/api/user'
import { ChatLineRound, Lock, Message, User } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const codeSending = ref(false)
const countdown = ref(0)
let countdownTimer = null

const form = ref({
  user_name: '',
  nick_name: '',
  email: '',
  code: '',
  password: '',
  confirmPassword: ''
})

function startCountdown(seconds = 60) {
  countdown.value = seconds
  if (countdownTimer) {
    clearInterval(countdownTimer)
  }
  countdownTimer = setInterval(() => {
    if (countdown.value <= 1) {
      countdown.value = 0
      clearInterval(countdownTimer)
      countdownTimer = null
      return
    }
    countdown.value -= 1
  }, 1000)
}

async function sendCode() {
  const email = form.value.email.trim()
  if (!email) {
    ElMessage.warning('请先输入邮箱')
    return
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    ElMessage.warning('邮箱格式不正确')
    return
  }

  codeSending.value = true
  try {
    await apiSendRegisterEmailCode({ email })
    ElMessage.success('验证码已发送，请查收邮箱')
    startCountdown(60)
  } finally {
    codeSending.value = false
  }
}

async function handleRegister() {
  if (!form.value.user_name || !form.value.nick_name || !form.value.password) {
    ElMessage.warning('请填写用户名、昵称和密码')
    return
  }
  if (!form.value.email) {
    ElMessage.warning('请填写邮箱')
    return
  }
  if (!/^\S+@\S+\.\S+$/.test(form.value.email)) {
    ElMessage.warning('邮箱格式不正确')
    return
  }
  if (!form.value.code.trim()) {
    ElMessage.warning('请输入邮箱验证码')
    return
  }
  if (form.value.password !== form.value.confirmPassword) {
    ElMessage.warning('两次输入的密码不一致')
    return
  }

  loading.value = true
  try {
    await apiRegister({
      user_name: form.value.user_name,
      nick_name: form.value.nick_name,
      email: form.value.email,
      code: form.value.code.trim(),
      password: form.value.password,
      role: 2
    })

    const loginRes = await apiEmailLogin({
      user_name: form.value.email,
      password: form.value.password
    })
    const token = loginRes.data?.token || loginRes.data || loginRes.token
    if (token) {
      userStore.setToken(token)
      await userStore.fetchUserInfo()
    }
    ElMessage.success('注册成功')
    router.replace('/')
  } finally {
    loading.value = false
  }
}

function goLogin() {
  router.push({ name: 'Login' })
}

onBeforeUnmount(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer)
    countdownTimer = null
  }
})
</script>

<style scoped>
.extra-actions {
  margin-top: 6px;
  text-align: center;
}

.code-row {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
}
</style>
