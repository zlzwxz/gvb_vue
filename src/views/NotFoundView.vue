<template>
  <div class="not-found" style="text-align:center;padding:40px;">
    <el-result
      icon="error"
      title="404"
      sub-title="页面不存在"
      extra="<el-button type='primary' @click='goHome'>返回首页</el-button>"
    />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function goHome() { router.replace('/') }
</script>

<style scoped>
.not-found { min-height: 60vh; display:flex; align-items:center; justify-content:center; }
</style>
