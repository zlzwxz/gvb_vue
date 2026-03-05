<template>
  <div class="profile-page">
    <div v-if="loading && !form.user_name" style="text-align:center; padding: 60px;">
      <el-icon class="is-loading" :size="30"><Loading /></el-icon>
    </div>
    
    <template v-else>
      <el-row :gutter="20">
        <!-- 左侧个人信息总览 -->
        <el-col :span="8">
          <el-card shadow="hover" class="profile-summary">
            <div class="avatar-wrapper">
              <el-avatar :size="100" :src="form.avatar ? $resolveImg(form.avatar) : 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" />
            </div>
            <h2 class="user-nickname">{{ form.nick_name || form.user_name || '未命名极客' }}</h2>
            <p class="user-role">{{ userStore.isAdmin ? '超级管理员' : '普通用户' }}</p>
            <div class="user-bio">{{ form.sign || '这个人很懒，什么都没有留下...' }}</div>
            
            <el-divider />
            
            <div class="profile-stats">
              <div class="stat-item" @click="$router.push('/collect')">
                <el-icon><Star /></el-icon>
                <span>我的收藏</span>
              </div>
              <div v-if="form.link" class="stat-item">
                <el-icon><Link /></el-icon>
                <a :href="form.link" target="_blank">个人主页</a>
              </div>
            </div>
          </el-card>
        </el-col>
        
        <!-- 右侧资料修改面板 -->
        <el-col :span="16">
          <el-card shadow="hover" class="profile-detail">
            <template #header>
              <div class="card-header">
                <h3><el-icon><EditPen /></el-icon> 基本资料设置</h3>
              </div>
            </template>
            
            <el-form :model="form" ref="profileForm" label-width="100px" label-position="left" class="custom-form">
              <el-form-item label="登录账号">
                <el-input v-model="form.user_name" disabled class="disabled-input" />
              </el-form-item>
              <el-form-item label="公开昵称" prop="nick_name">
                <el-input v-model="form.nick_name" placeholder="设置一个响亮的昵称" />
              </el-form-item>
              <el-form-item label="个性签名" prop="sign">
                <el-input v-model="form.sign" type="textarea" :rows="4" placeholder="介绍一下自己吧" />
              </el-form-item>
              <el-form-item label="个人链接" prop="link">
                <el-input v-model="form.link" placeholder="例如：https://github.com/yourname">
                  <template #prepend>http(s)://</template>
                </el-input>
              </el-form-item>
              
              <el-divider />
              <h3><el-icon><Message /></el-icon> 账号安全 (邮箱)</h3>
              
              <el-form-item label="绑定邮箱" prop="email" style="margin-top:20px;">
                <el-row :gutter="10" style="width:100%; align-items:center;">
                  <el-col :span="16">
                    <span v-if="form.email" class="bound-email"><el-icon color="#67C23A"><Select /></el-icon> {{ form.email }}</span>
                    <span v-else style="color:#909399; font-size:14px;">未绑定邮箱，建议立即绑定以保护账号安全</span>
                  </el-col>
                  <el-col :span="8" style="text-align: right;">
                    <el-button :type="form.email ? 'default' : 'primary'" plain @click="showBindDialog = true">
                      {{ form.email ? '换绑邮箱' : '立即绑定' }}
                    </el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              
              <el-form-item style="margin-top: 40px;">
                <el-button type="primary" native-type="submit" size="large" @click.prevent="saveProfile" :loading="loading" style="width: 150px;">
                  保存所有修改
                </el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>
    </template>

    <!-- 绑定邮箱安全验证弹窗 -->
    <el-dialog :title="form.email ? '换绑安全邮箱' : '绑定安全邮箱'" v-model="showBindDialog" width="450px" destroy-on-close custom-class="glass-dialog">
      <div style="margin-bottom: 20px; color: var(--text-secondary); font-size: 14px;">
        {{ form.email ? '为了您的账号安全，请验证新邮箱。' : '绑定邮箱可用于找回密码和接收站内极客快讯。' }}
      </div>
      <el-form :model="bindForm" label-position="top">
        <el-form-item label="输入邮箱地址">
          <el-input v-model="bindForm.email" placeholder="example@domain.com" size="large">
            <template #prefix><el-icon><Message /></el-icon></template>
          </el-input>
        </el-form-item>
        <el-form-item label="邮箱验证码">
          <el-row :gutter="15" style="width:100%;">
            <el-col :span="16">
              <el-input v-model="bindForm.code" placeholder="6位数字验证码" size="large" />
            </el-col>
            <el-col :span="8">
              <el-button size="large" type="primary" plain style="width: 100%;">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="text-align: right;">
          <el-button @click="showBindDialog = false">取消操作</el-button>
          <el-button type="primary" @click="confirmBindEmail" :loading="bindLoading">提交验证</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { apiGetUserInfo, apiUpdateUserNickName, apiBindEmail } from '@/api/user'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { EditPen, Message, Loading, Star, Link, Select } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const bindLoading = ref(false)
const showBindDialog = ref(false)

const form = ref({
  user_name: '',
  nick_name: '',
  sign: '',
  link: '',
  email: '',
  avatar: ''
})

const bindForm = ref({ email: '', code: '' })

async function fetchProfile() {
  loading.value = true
  try {
    const res = await apiGetUserInfo()
    if (res.data) {
      form.value = { ...res.data }
    }
  } catch (e) {
    ElMessage.error('获取个人信息失败')
  } finally {
    loading.value = false
  }
}

async function saveProfile() {
  loading.value = true
  try {
    const linkToSave = form.value.link && !form.value.link.startsWith('http') && form.value.link.length > 0 
      ? 'https://' + form.value.link 
      : form.value.link
      
    await apiUpdateUserNickName({
      nick_name: form.value.nick_name,
      sign: form.value.sign,
      link: linkToSave
    })
    ElMessage.success('资料已更新')
    await userStore.fetchUserInfo()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function confirmBindEmail() {
  if (!bindForm.value.email || !bindForm.value.code) {
    ElMessage.warning('请完整输入邮箱和验证码')
    return
  }
  bindLoading.value = true
  try {
    await apiBindEmail(bindForm.value)
    ElMessage.success('邮箱绑定成功')
    showBindDialog.value = false
    bindForm.value = { email: '', code: '' }
    fetchProfile()
  } catch (e) {
    console.error(e)
  } finally {
    bindLoading.value = false
  }
}

onMounted(() => fetchProfile())
</script>

<style scoped>
.profile-page { padding: 40px 20px; max-width: 1000px; margin: 0 auto; min-height: 70vh; }

.profile-summary { text-align: center; border-radius: 12px; }
.avatar-wrapper { margin: 20px 0; }
.user-nickname { margin: 10px 0 5px 0; font-size: 20px; color: var(--text-primary); }
.user-role { color: var(--primary-color); font-size: 13px; font-weight: bold; margin-bottom: 20px; }
.user-bio { color: var(--text-secondary); font-size: 14px; margin-bottom: 20px; padding: 0 15px; line-height: 1.6; }

.profile-stats { margin-top: 20px; }
.stat-item { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; color: var(--text-regular); font-size: 14px; cursor: pointer; transition: all 0.3s; border-radius: 8px; }
.stat-item:hover { background-color: #f2f3f5; color: var(--primary-color); }
.stat-item a { color: inherit; text-decoration: none; }

.profile-detail { border-radius: 12px; }
.card-header h3 { margin: 0; display: flex; align-items: center; gap: 8px; font-size: 18px; color: var(--text-primary); }
.custom-form { padding: 10px 20px 20px 10px; }
.disabled-input :deep(.el-input__wrapper) { background-color: #f7f8fa; }

.bound-email { font-size: 15px; color: var(--text-primary); font-weight: 500; display: flex; align-items: center; gap: 6px; }

h3 { color: var(--text-primary); margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
</style>
