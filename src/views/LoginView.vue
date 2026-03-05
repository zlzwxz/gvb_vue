<template>
  <el-row class="login-container" justify="center" align="middle">
    <el-col :xs="22" :sm="12" :md="8" :lg="6">
      <el-card class="login-card" shadow="hover">
        <h2 class="title" style="color:var(--primary-color);">GVB 极客登录</h2>
        <div style="text-align:center;color:var(--text-secondary);font-size:14px;margin-bottom:30px;">
          欢迎回来，请使用账号密码登录
        </div>
        <el-form :model="form" ref="loginForm" @submit.native.prevent="handleLogin" size="large">
          <el-form-item prop="user_name">
            <el-input v-model="form.user_name" autocomplete="off" placeholder="请输入用户名" prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="password" style="margin-bottom: 30px;">
            <el-input v-model="form.password" type="password" autocomplete="off" placeholder="请输入密码" show-password prefix-icon="Lock" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" :loading="loading" style="width:100%;font-size:16px;">立即登录</el-button>
          </el-form-item>
          <div style="text-align:center; margin-top:10px;">
            <el-button type="primary" link @click="goRegister">没有账号？点击注册新极客</el-button>
          </div>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { apiEmailLogin } from '@/api/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const form = ref({ user_name: '', password: '' })
const loading = ref(false)

async function handleLogin() {
  if (!form.value.user_name || !form.value.password) {
    return ElMessage.warning('请输入用户名和密码')
  }
  loading.value = true
  try {
    const res = await apiEmailLogin(form.value)
    const token = res.data?.token || res.data || res.token
    if (token) {
      userStore.setToken(token)
      await userStore.fetchUserInfo()
      ElMessage.success('登录成功')
      const redirect = route.query.redirect || '/'
      router.replace(redirect)
    } else {
      ElMessage.error('登录异常: 未获取到令牌')
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function goRegister() {
  router.push({ name: 'Register' })
}
</script>

<style scoped>
.login-container {
  height: 100vh;
  /* 科技感深色炫光背景，更契合“极客”博客风格 */
  background: linear-gradient(135deg, #1c2331 0%, #29323c 100%);
  position: relative;
  overflow: hidden;
}
.login-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(245,63,63,0.1) 0%, rgba(0,0,0,0) 60%);
  z-index: 0;
  pointer-events: none;
}
.login-card {
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  position: relative;
  z-index: 1;
}
.title {
  text-align: center;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: 700;
}
</style>
