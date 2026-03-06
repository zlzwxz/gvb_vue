<template>
  <div class="chat-manage">
    <el-card shadow="never">
      <div class="toolbar">
        <el-button type="primary" @click="showCreate = true">创建群组</el-button>
        <el-button @click="fetchList(1)">刷新</el-button>
      </div>

      <el-table :data="list" stripe>
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="nick_name" label="昵称" width="150" />
        <el-table-column prop="avatar" label="头像" width="100">
          <template #default="{ row }">
            <el-avatar :src="$resolveImg(row.avatar)" size="small" />
          </template>
        </el-table-column>
        <el-table-column prop="content" label="内容" show-overflow-tooltip />
        <el-table-column prop="created_at" label="发送时间" width="180" />
      </el-table>

      <el-empty v-if="!list.length" description="暂无群聊记录" />

      <el-pagination
        background
        layout="total, prev, pager, next"
        :page-size="pageSize"
        :total="total"
        @current-change="fetchList"
      />
    </el-card>

    <el-dialog title="创建聊天群组" v-model="showCreate">
      <el-form :model="form" ref="chatForm" label-width="80px">
        <el-form-item label="群组名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="群头像" prop="avatar">
          <el-upload
            action="/api/images"
            name="image"
            :headers="uploadHeaders"
            :show-file-list="false"
            :on-success="handleUploadSuccess"
          >
            <el-button type="primary" size="small">上传封面</el-button>
            <div v-if="form.avatar" class="cover-preview"><img :src="form.avatar" alt="封面" style="width: 100px; margin-top: 10px;" /></div>
          </el-upload>
        </el-form-item>
        <el-form-item label="成员ID" prop="user_ids">
          <el-input v-model="form.user_ids_raw" placeholder="输入用户ID, 以逗号分隔" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreate = false">取消</el-button>
        <el-button type="primary" @click="saveChatGroup">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { apiGetChatList, apiCreateChatGroup } from '@/api/chat'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()
const uploadHeaders = computed(() => {
  return { token: userStore.token }
})

const list = ref([])
const total = ref(0)
const pageSize = 15
const showCreate = ref(false)

const form = ref({
  name: '',
  avatar: '',
  user_ids_raw: ''
})

async function fetchList(page = 1) {
  const res = await apiGetChatList({ page, size: pageSize, limit: pageSize })
  const data = res.data || {}
  list.value = data.list || (Array.isArray(data) ? data : [])
  total.value = data.total || data.count || 0
}

function handleUploadSuccess(response) {
  form.value.avatar = response.data?.url || response.data || ''
}

async function saveChatGroup() {
  if (!form.value.name) return ElMessage.warning('名称不能为空')
  const userIds = form.value.user_ids_raw.split(',').map(id => Number(id.trim())).filter(id => id)
  try {
    await apiCreateChatGroup({
      name: form.value.name,
      avatar: form.value.avatar,
      user_ids: userIds
    })
    ElMessage.success('创建成功')
    showCreate.value = false
    fetchList()
  } catch(e) {
    ElMessage.error('创建失败')
  }
}

onMounted(() => fetchList())
</script>

<style scoped>
.toolbar {
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
}
</style>
