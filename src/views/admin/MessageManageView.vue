<template>
  <div class="message-manage">
    <el-card shadow="never">
      <div class="toolbar">
        <div class="toolbar-left">
          <el-button type="primary" @click="openCreateDialog">发送私信</el-button>
          <el-button plain @click="fetchList" :loading="loading">刷新会话</el-button>
        </div>
        <div class="toolbar-right">
          <el-input v-model="keyword" placeholder="搜索用户昵称/ID" clearable style="width: 240px" />
        </div>
      </div>

      <el-table :data="pagedList" stripe v-loading="loading">
        <el-table-column label="用户" min-width="220">
          <template #default="{ row }">
            <div class="user-cell">
              <el-avatar :size="38" :src="$resolveImg(row.avatar)">
                {{ avatarText(row.nick_name || row.user_name) }}
              </el-avatar>
              <div class="user-meta">
                <strong>{{ row.nick_name || row.user_name || `用户${row.user_id}` }}</strong>
                <span>ID: {{ row.user_id }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="最新消息" min-width="320" show-overflow-tooltip />
        <el-table-column prop="unread_count" label="未读" width="90" />
        <el-table-column prop="message_count" label="总消息" width="90" />
        <el-table-column prop="created_at" label="最新时间" width="180">
          <template #default="{ row }">{{ formatTime(row.created_at) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="goChat(row.user_id)">去聊天</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-if="!loading && !filteredList.length" description="暂无私信会话" />

      <el-pagination
        v-if="filteredList.length > 0"
        background
        layout="total, prev, pager, next"
        :total="filteredList.length"
        :page-size="pageSize"
        :current-page="currentPage"
        @current-change="currentPage = $event"
      />
    </el-card>

    <el-dialog title="发送私信" v-model="showCreate" width="520px">
      <el-form :model="form" label-width="90px">
        <el-form-item label="接收用户" required>
          <el-select v-model="form.rev_user_id" filterable placeholder="请选择用户" style="width: 100%">
            <el-option
              v-for="user in users"
              :key="user.id"
              :label="`${user.nick_name || user.user_name || `用户${user.id}`} (ID:${user.id})`"
              :value="user.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="消息内容" required>
          <el-input v-model="form.content" type="textarea" :rows="5" maxlength="1000" show-word-limit />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCreate = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="submitCreate">发送</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { apiCreateMessage, apiGetMessageList } from '@/api/message'
import { apiGetUserList } from '@/api/user'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const list = ref([])
const users = ref([])
const loading = ref(false)
const submitLoading = ref(false)
const showCreate = ref(false)
const form = ref({ rev_user_id: undefined, content: '' })
const keyword = ref('')
const currentPage = ref(1)
const pageSize = 10

const filteredList = computed(() => {
  const text = keyword.value.trim().toLowerCase()
  if (!text) return list.value
  return list.value.filter(item => {
    const name = `${item.nick_name || ''}${item.user_name || ''}${item.user_id || ''}`.toLowerCase()
    return name.includes(text)
  })
})

const pagedList = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredList.value.slice(start, start + pageSize)
})

watch(keyword, () => {
  currentPage.value = 1
})

function avatarText(name) {
  return (name || '私').trim().charAt(0) || '私'
}

function formatTime(value) {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const hh = String(date.getHours()).padStart(2, '0')
  const mm = String(date.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}`
}

async function fetchList() {
  loading.value = true
  try {
    const res = await apiGetMessageList()
    list.value = res.data || []
    currentPage.value = 1
  } catch {
    ElMessage.error('获取私信会话失败')
  } finally {
    loading.value = false
  }
}

async function fetchUsers() {
  try {
    const res = await apiGetUserList({ limit: 0 })
    users.value = (res.data?.list || []).filter(item => Number(item.id) !== Number(userStore.currentUserId))
  } catch {
    ElMessage.error('获取用户列表失败')
  }
}

function openCreateDialog() {
  form.value = { rev_user_id: undefined, content: '' }
  showCreate.value = true
}

function goChat(userId) {
  router.push({ name: 'PrivateMessages', query: { user_id: String(userId) } })
}

async function submitCreate() {
  const content = form.value.content.trim()
  if (!form.value.rev_user_id) {
    ElMessage.warning('请选择接收用户')
    return
  }
  if (!content) {
    ElMessage.warning('请输入消息内容')
    return
  }

  submitLoading.value = true
  try {
    await apiCreateMessage({ rev_user_id: form.value.rev_user_id, content })
    ElMessage.success('私信发送成功')
    showCreate.value = false
    await fetchList()
  } catch {
    ElMessage.error('私信发送失败')
  } finally {
    submitLoading.value = false
  }
}

onMounted(async () => {
  await Promise.all([fetchList(), fetchUsers()])
})
</script>

<style scoped>
.toolbar {
  margin-bottom: 14px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-meta strong {
  display: block;
  color: #1a3f64;
  font-size: 14px;
}

.user-meta span {
  display: block;
  margin-top: 2px;
  color: #6f849e;
  font-size: 12px;
}
</style>
