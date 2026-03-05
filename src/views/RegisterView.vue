<template>
  <el-row class="register-container" justify="center" align="middle">
    <el-col :xs="22" :sm="12" :md="8" :lg="6">
      <el-card class="register-card" shadow="hover">
        <h2 class="title" style="color:var(--primary-color);">极客注册</h2>
        <div style="text-align:center;color:var(--text-secondary);font-size:14px;margin-bottom:30px;">
          加入 GVB，和顶尖极客一起交流
        </div>
        <el-form :model="form" ref="registerForm" @submit.native.prevent="handleRegister" size="large">
          <el-form-item prop="user_name">
            <el-input v-model="form.user_name" autocomplete="off" placeholder="请输入用户名 (必填)" prefix-icon="User" />
          </el-form-item>
          <el-form-item prop="nick_name">
            <el-input v-model="form.nick_name" autocomplete="off" placeholder="请输入您的系统昵称 (必填)" prefix-icon="ChatLineRound" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" type="password" autocomplete="off" placeholder="请输入密码" show-password prefix-icon="Lock" />
          </el-form-item>
          <el-form-item prop="confirmPassword" style="margin-bottom: 30px;">
            <el-input v-model="form.confirmPassword" type="password" autocomplete="off" placeholder="确认登录密码" show-password prefix-icon="Lock" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" :loading="loading" style="width:100%;font-size:16px;">立即注册</el-button>
          </el-form-item>
          <div style="text-align:center; margin-top:10px;">
            <el-button type="primary" link @click="goLogin">已有极客账号？前往登录</el-button>
          </div>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiRegister } from '@/api/user'
import { ElMessage } from 'element-plus'
import { User, Lock, ChatLineRound } from '@element-plus/icons-vue'

const router = useRouter()
const form = ref({ user_name: '', nick_name: '', password: '', confirmPassword: '' })
const loading = ref(false)

async function handleRegister() {
  if (!form.value.user_name || !form.value.password || !form.value.nick_name) {
    return ElMessage.warning('请完整填写用户名、昵称和密码所需字段')
  }
  if (form.value.password !== form.value.confirmPassword) {
    return ElMessage.warning('两次密码输入不一致')
  }
  loading.value = true
  try {
    await apiRegister({ 
      user_name: form.value.user_name, 
      nick_name: form.value.nick_name,
      password: form.value.password,
      role: 2
    })
    ElMessage.success('注册成功，欢迎加入 GVB')
    router.replace({ name: 'Login' })
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function goLogin() {
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.register-container {
  height: 100vh;
  background: linear-gradient(135deg, #1c2331 0%, #29323c 100%);
  position: relative;
  overflow: hidden;
}
.register-container::before {
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
.register-card {
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
