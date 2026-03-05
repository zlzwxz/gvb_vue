<template>
  <div class="setting-manage">
    <el-tabs v-model="activeTab" type="border-card" @tab-click="loadConfig">
      <el-tab-pane label="邮箱配置" name="email">
        <el-form :model="emailForm" label-width="140px" v-loading="loading">
          <el-form-item label="SMTP 主机"><el-input v-model="emailForm.host" /></el-form-item>
          <el-form-item label="端口"><el-input-number v-model="emailForm.port" :min="1" /></el-form-item>
          <el-form-item label="用户名"><el-input v-model="emailForm.user" /></el-form-item>
          <el-form-item label="密码"><el-input v-model="emailForm.password" type="password" show-password /></el-form-item>
          <el-form-item label="默认发件人"><el-input v-model="emailForm.default_from_email" /></el-form-item>
          <el-form-item label="使用 SSL"><el-switch v-model="emailForm.use_ssl" /></el-form-item>
          <el-form-item label="使用 TLS"><el-switch v-model="emailForm.use_tls" /></el-form-item>
          <el-form-item><el-button type="primary" @click="saveConfig('email', emailForm)">保存</el-button></el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="QQ 登录" name="qq">
        <el-form :model="qqForm" label-width="140px" v-loading="loading">
          <el-form-item label="App ID"><el-input v-model="qqForm.app_id" /></el-form-item>
          <el-form-item label="Key"><el-input v-model="qqForm.key" /></el-form-item>
          <el-form-item label="Redirect"><el-input v-model="qqForm.redirect" /></el-form-item>
          <el-form-item><el-button type="primary" @click="saveConfig('qq', qqForm)">保存</el-button></el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="七牛云" name="qiniu">
        <el-form :model="qiniuForm" label-width="140px" v-loading="loading">
          <el-form-item label="启用"><el-switch v-model="qiniuForm.enable" /></el-form-item>
          <el-form-item label="Access Key"><el-input v-model="qiniuForm.access_key" /></el-form-item>
          <el-form-item label="Secret Key"><el-input v-model="qiniuForm.secret_key" type="password" show-password /></el-form-item>
          <el-form-item label="Bucket"><el-input v-model="qiniuForm.bucket" /></el-form-item>
          <el-form-item label="CDN 域名"><el-input v-model="qiniuForm.cdn" /></el-form-item>
          <el-form-item label="Zone"><el-input v-model="qiniuForm.zone" /></el-form-item>
          <el-form-item label="前缀"><el-input v-model="qiniuForm.prefix" /></el-form-item>
          <el-form-item label="大小限制(MB)"><el-input-number v-model="qiniuForm.size" :min="0" /></el-form-item>
          <el-form-item><el-button type="primary" @click="saveConfig('qiniu', qiniuForm)">保存</el-button></el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="JWT 配置" name="jwt">
        <el-form :model="jwtForm" label-width="140px" v-loading="loading">
          <el-form-item label="Secret"><el-input v-model="jwtForm.secret" /></el-form-item>
          <el-form-item label="过期时间(小时)"><el-input-number v-model="jwtForm.expires" :min="1" /></el-form-item>
          <el-form-item label="签发者"><el-input v-model="jwtForm.issuer" /></el-form-item>
          <el-form-item><el-button type="primary" @click="saveConfig('jwt', jwtForm)">保存</el-button></el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiGetSettings, apiUpdateSetting } from '@/api/system'
import { ElMessage } from 'element-plus'

const loading = ref(false)
const activeTab = ref('email')

const emailForm = ref({})
const qqForm = ref({})
const qiniuForm = ref({})
const jwtForm = ref({})

const formMap = {
  email: emailForm,
  qq: qqForm,
  qiniu: qiniuForm,
  jwt: jwtForm
}

async function loadConfig() {
  loading.value = true
  try {
    const res = await apiGetSettings(activeTab.value)
    let data = res.data || res
    if (data) {
      formMap[activeTab.value].value = { ...data }
    }
  } catch (e) {
    ElMessage.error('获取配置失败')
  } finally { loading.value = false }
}

async function saveConfig(name, formData) {
  loading.value = true
  try {
    await apiUpdateSetting(name, formData)
    ElMessage.success('保存成功')
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '保存失败')
  } finally { loading.value = false }
}

onMounted(() => loadConfig())
</script>

<style scoped>
.setting-manage { padding: 20px; max-width: 900px; margin: 0 auto; }
</style>
