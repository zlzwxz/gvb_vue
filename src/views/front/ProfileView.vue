<template>
  <div class="profile-page">
    <el-row :gutter="16">
      <el-col :xs="24" :lg="8">
        <el-card shadow="never" class="summary-card">
          <div class="avatar-block">
            <el-avatar :size="104" :src="$resolveImg(form.avatar)" />
            <el-upload :show-file-list="false" :http-request="uploadAvatar" accept="image/*">
              <el-button size="small" plain :loading="avatarUploading">更换头像</el-button>
            </el-upload>
          </div>
          <h3>{{ form.nick_name || form.user_name || '未命名用户' }}</h3>
          <p class="role">{{ userStore.isAdmin ? '管理员' : '普通用户' }}</p>
          <p class="sign">{{ form.sign || '这个人很懒，还没有个性签名。' }}</p>
          <div class="level-stats">
            <div class="stat"><span>等级</span><strong>{{ form.level || 1 }}</strong></div>
            <div class="stat"><span>积分</span><strong>{{ form.points || 0 }}</strong></div>
            <div class="stat"><span>经验</span><strong>{{ form.experience || 0 }}</strong></div>
            <div class="stat"><span>连签</span><strong>{{ checkInInfo.streak || 0 }}</strong></div>
          </div>
          <div class="quick-links">
            <el-button type="primary" :disabled="checkInInfo.checkedToday" @click="handleCheckIn">
              {{ checkInInfo.checkedToday ? '今日已签到' : '每日签到' }}
            </el-button>
            <el-button @click="openMySpace">我的空间</el-button>
            <el-button @click="router.push({ name: 'Collect' })">我的收藏</el-button>
            <el-button @click="router.push({ name: 'PrivateMessages' })">我的私信</el-button>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :lg="16">
        <el-card shadow="never">
          <template #header>
            <strong>个人资料</strong>
          </template>

          <el-form :model="form" label-width="90px">
            <el-form-item label="用户名">
              <el-input v-model="form.user_name" disabled />
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="form.nick_name" maxlength="30" />
            </el-form-item>
            <el-form-item label="签名">
              <el-input v-model="form.sign" maxlength="100" />
            </el-form-item>
            <el-form-item label="主页">
              <el-input v-model="form.link" placeholder="https://example.com" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" @click="saveProfile">保存资料</el-button>
            </el-form-item>
          </el-form>

          <el-divider />
          <div class="email-row">
            <div>
              <strong>邮箱绑定</strong>
              <p>{{ form.email ? `已绑定：${form.email}` : '未绑定邮箱，建议绑定用于找回密码。' }}</p>
            </div>
            <el-button type="primary" plain @click="openBindDialog">{{ form.email ? '换绑邮箱' : '绑定邮箱' }}</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog v-model="showBindDialog" title="邮箱验证" width="460px">
      <el-form :model="bindForm" label-width="90px">
        <el-form-item label="邮箱">
          <el-input v-model="bindForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="验证码">
          <div class="code-row">
            <el-input v-model="bindForm.code" placeholder="请输入验证码" />
            <el-button
              type="primary"
              plain
              :loading="bindCodeSending"
              :disabled="bindCodeSending || bindCountdown > 0"
              @click="sendBindCode"
            >
              {{ bindCountdown > 0 ? `${bindCountdown}s后重发` : '发送验证码' }}
            </el-button>
          </div>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="bindForm.password" type="password" show-password placeholder="可选，不修改可留空" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showBindDialog = false">取消</el-button>
        <el-button type="primary" :loading="bindLoading" @click="confirmBindEmail">确认绑定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { apiBindEmail, apiGetUserInfo, apiUpdateUserNickName, apiUserCheckIn, apiGetUserCheckInStatus } from '@/api/user'
import { apiUploadImage } from '@/api/image'

const router = useRouter()
const userStore = useUserStore()

const loading = ref(false)
const avatarUploading = ref(false)
const bindLoading = ref(false)
const bindCodeSending = ref(false)
const bindCountdown = ref(0)
const showBindDialog = ref(false)
let bindTimer = null

const form = ref({
  user_name: '',
  nick_name: '',
  sign: '',
  link: '',
  email: '',
  avatar: '',
  points: 0,
  experience: 0,
  level: 1
})

const checkInInfo = ref({
  checkedToday: false,
  streak: 0
})

const bindForm = ref({
  email: '',
  code: '',
  password: ''
})

function startBindCountdown(seconds = 60) {
  bindCountdown.value = seconds
  if (bindTimer) clearInterval(bindTimer)
  bindTimer = setInterval(() => {
    if (bindCountdown.value <= 1) {
      bindCountdown.value = 0
      clearInterval(bindTimer)
      bindTimer = null
      return
    }
    bindCountdown.value -= 1
  }, 1000)
}

async function fetchProfile() {
  loading.value = true
  try {
    const res = await apiGetUserInfo()
    form.value = { ...form.value, ...(res.data || {}) }
  } catch {
    ElMessage.error('获取个人资料失败')
  } finally {
    loading.value = false
  }
}

async function fetchCheckInStatus() {
  try {
    const res = await apiGetUserCheckInStatus()
    const data = res.data || {}
    checkInInfo.value = {
      checkedToday: Boolean(data.checked_today),
      streak: Number(data.streak || 0)
    }
  } catch {
    checkInInfo.value = { checkedToday: false, streak: 0 }
  }
}

async function handleCheckIn() {
  try {
    const res = await apiUserCheckIn()
    const data = res.data || {}
    ElMessage.success(`签到成功，+${data.reward_points || 0}积分，+${data.reward_experience || 0}经验`)
    await Promise.all([fetchProfile(), fetchCheckInStatus(), userStore.fetchUserInfo()])
  } catch {
    ElMessage.error('签到失败')
  }
}

async function uploadAvatar(option) {
  avatarUploading.value = true
  try {
    const fd = new FormData()
    fd.append('image', option.file)
    const res = await apiUploadImage(fd)
    const avatar = res.data || ''
    if (!avatar) throw new Error('上传返回为空')
    form.value.avatar = avatar
    ElMessage.success('头像上传成功，请记得保存资料')
  } catch {
    ElMessage.error('头像上传失败')
  } finally {
    avatarUploading.value = false
  }
}

async function saveProfile() {
  loading.value = true
  try {
    const payload = {
      nick_name: form.value.nick_name || '',
      sign: form.value.sign || '',
      link: form.value.link || '',
      avatar: form.value.avatar || ''
    }
    await apiUpdateUserNickName(payload)
    ElMessage.success('资料保存成功')
    await userStore.fetchUserInfo()
    await fetchProfile()
  } catch {
    ElMessage.error('资料保存失败')
  } finally {
    loading.value = false
  }
}

function openBindDialog() {
  bindForm.value.email = form.value.email || ''
  bindForm.value.code = ''
  bindForm.value.password = ''
  showBindDialog.value = true
}

function openMySpace() {
  if (!userStore.currentUserId) return
  router.push({ name: 'UserSpace', params: { id: String(userStore.currentUserId) } })
}

async function sendBindCode() {
  const email = bindForm.value.email.trim()
  if (!email) {
    ElMessage.warning('请先填写邮箱')
    return
  }
  bindCodeSending.value = true
  try {
    await apiBindEmail({ email })
    ElMessage.success('验证码已发送到邮箱')
    startBindCountdown(60)
  } catch {
    ElMessage.error('验证码发送失败')
  } finally {
    bindCodeSending.value = false
  }
}

async function confirmBindEmail() {
  if (!bindForm.value.email.trim() || !bindForm.value.code.trim()) {
    ElMessage.warning('请填写邮箱和验证码')
    return
  }
  bindLoading.value = true
  try {
    await apiBindEmail({
      email: bindForm.value.email.trim(),
      code: bindForm.value.code.trim(),
      password: bindForm.value.password || ''
    })
    ElMessage.success('邮箱绑定成功')
    showBindDialog.value = false
    await fetchProfile()
    await userStore.fetchUserInfo()
  } catch {
    ElMessage.error('邮箱绑定失败')
  } finally {
    bindLoading.value = false
  }
}

onMounted(async () => {
  await Promise.all([fetchProfile(), fetchCheckInStatus()])
})

onBeforeUnmount(() => {
  if (bindTimer) {
    clearInterval(bindTimer)
    bindTimer = null
  }
})
</script>

<style scoped>
.profile-page {
  max-width: 1100px;
  margin: 0 auto;
}

.summary-card {
  text-align: center;
}

.avatar-block {
  display: grid;
  justify-items: center;
  gap: 10px;
}

.summary-card h3 {
  margin: 10px 0 4px;
  font-size: 20px;
  color: #193f66;
}

.role {
  margin: 0;
  color: #0f7ea5;
  font-size: 13px;
}

.sign {
  margin: 10px 0 12px;
  color: #6f849e;
  font-size: 13px;
  line-height: 1.7;
}

.quick-links {
  display: grid;
  gap: 8px;
}

.level-stats {
  margin: 12px 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
}

.stat {
  border: 1px solid #e7edf6;
  border-radius: 8px;
  padding: 8px 4px;
}

.stat span {
  display: block;
  font-size: 12px;
  color: #7e91a8;
}

.stat strong {
  font-size: 16px;
  color: #1f456d;
}

.email-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}

.email-row p {
  margin: 6px 0 0;
  color: #6f849e;
  font-size: 13px;
}

.code-row {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
}
</style>
