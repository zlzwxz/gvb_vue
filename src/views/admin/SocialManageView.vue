<template>
  <div class="social-manage-page">
    <section class="summary-grid">
      <article v-for="item in summaryItems" :key="item.key" class="summary-card">
        <span>{{ item.label }}</span>
        <strong>{{ overview[item.key] || 0 }}</strong>
      </article>
    </section>

    <section class="manage-tip">
      <strong>快捷说明</strong>
      <p>
        这里的“去聊天”会跳到前台私信页，并使用你当前登录的账号发起会话。
        它不会模拟表格中的两位用户互相聊天，这样可以避免后台管理和真实聊天身份混淆。
      </p>
    </section>

    <el-card shadow="never">
      <div class="toolbar">
        <div class="toolbar-left">
          <el-tabs v-model="activeTab" class="social-tabs">
            <el-tab-pane label="好友关系" name="friends" />
            <el-tab-pane label="黑名单" name="blocks" />
            <el-tab-pane label="群组" name="groups" />
          </el-tabs>
          <el-select v-if="activeTab === 'friends'" v-model="relationMode" style="width: 160px" @change="fetchCurrent(1)">
            <el-option label="双向好友" value="friend" />
            <el-option label="单向关注" value="follow" />
            <el-option label="全部关注关系" value="all" />
          </el-select>
        </div>
        <div class="toolbar-right">
          <el-input
            v-model="search"
            clearable
            placeholder="搜索用户昵称、ID、群号或备注"
            style="width: 260px"
            @clear="triggerSearch"
            @keyup.enter="triggerSearch"
          />
          <el-button @click="refreshAll" :loading="loading">刷新</el-button>
        </div>
      </div>

      <el-table v-if="activeTab === 'friends'" :data="friendList" stripe v-loading="loading">
        <el-table-column label="发起方" min-width="220">
          <template #default="{ row }">
            <div class="user-cell">
              <el-avatar :src="row.user_avatar ? $resolveImg(row.user_avatar) : ''" :size="34">
                {{ avatarText(row.user_nick_name || row.user_name) }}
              </el-avatar>
              <div>
                <strong>{{ row.user_nick_name || row.user_name || `用户${row.user_id}` }}</strong>
                <span>ID {{ row.user_id }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="关系" width="120">
          <template #default="{ row }">
            <el-tag :type="row.is_friend ? 'success' : 'warning'" effect="plain">
              {{ row.is_friend ? '互为好友' : '单向关注' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="目标方" min-width="220">
          <template #default="{ row }">
            <div class="user-cell">
              <el-avatar :src="row.follow_user_avatar ? $resolveImg(row.follow_user_avatar) : ''" :size="34">
                {{ avatarText(row.follow_nick_name || row.follow_user_name) }}
              </el-avatar>
              <div>
                <strong>{{ row.follow_nick_name || row.follow_user_name || `用户${row.follow_user_id}` }}</strong>
                <span>ID {{ row.follow_user_id }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="建立时间" width="180" />
        <el-table-column label="操作" min-width="220" fixed="right">
          <template #default="{ row }">
            <div class="action-cell">
              <el-button type="primary" link @click="goDirectChat(row.user_id)">
                聊发起方
              </el-button>
              <el-button type="success" link @click="goDirectChat(row.follow_user_id)">
                聊目标方
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-table v-else-if="activeTab === 'blocks'" :data="blockList" stripe v-loading="loading">
        <el-table-column label="拉黑人" min-width="220">
          <template #default="{ row }">
            <div class="user-cell">
              <el-avatar :src="row.user_avatar ? $resolveImg(row.user_avatar) : ''" :size="34">
                {{ avatarText(row.user_nick_name || row.user_name) }}
              </el-avatar>
              <div>
                <strong>{{ row.user_nick_name || row.user_name || `用户${row.user_id}` }}</strong>
                <span>ID {{ row.user_id }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="被拉黑用户" min-width="220">
          <template #default="{ row }">
            <div class="user-cell">
              <el-avatar :src="row.block_user_avatar ? $resolveImg(row.block_user_avatar) : ''" :size="34">
                {{ avatarText(row.block_nick_name || row.block_user_name) }}
              </el-avatar>
              <div>
                <strong>{{ row.block_nick_name || row.block_user_name || `用户${row.block_user_id}` }}</strong>
                <span>ID {{ row.block_user_id }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="reason" label="原因" min-width="220" show-overflow-tooltip />
        <el-table-column prop="created_at" label="拉黑时间" width="180" />
        <el-table-column label="操作" min-width="220" fixed="right">
          <template #default="{ row }">
            <div class="action-cell">
              <el-button type="primary" link @click="goDirectChat(row.user_id)">
                聊拉黑人
              </el-button>
              <el-button type="warning" link @click="goDirectChat(row.block_user_id)">
                聊被拉黑用户
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-table v-else :data="groupList" stripe v-loading="loading">
        <el-table-column label="群组" min-width="260">
          <template #default="{ row }">
            <div class="user-cell">
              <el-avatar :src="row.avatar ? $resolveImg(row.avatar) : ''" :size="34">
                {{ avatarText(row.name) }}
              </el-avatar>
              <div>
                <strong>{{ row.name || `群组${row.id}` }}</strong>
                <span>{{ row.group_no || `G${row.id}` }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="owner_name" label="群主" width="160" />
        <el-table-column prop="member_count" label="成员数" width="100" />
        <el-table-column prop="notice" label="群公告" min-width="240" show-overflow-tooltip />
        <el-table-column prop="updated_at" label="最近活跃" width="180" />
        <el-table-column label="操作" min-width="220" fixed="right">
          <template #default="{ row }">
            <div class="action-cell">
              <el-button type="primary" link @click="goDirectChat(row.owner_user_id)">
                联系群主
              </el-button>
              <el-button type="success" link @click="goGroupChat(row.id)">
                进入群聊
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-empty v-if="!loading && !currentList.length" :description="emptyText" />

      <el-pagination
        v-if="total > 0"
        background
        layout="total, prev, pager, next"
        :current-page="page"
        :page-size="pageSize"
        :total="total"
        class="pager"
        @current-change="fetchCurrent"
      />
    </el-card>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  apiGetSocialManageBlocks,
  apiGetSocialManageFollows,
  apiGetSocialManageGroups,
  apiGetSocialManageSummary
} from '@/api/social'

const router = useRouter()
const activeTab = ref('friends')
const relationMode = ref('friend')
const search = ref('')
const loading = ref(false)
const page = ref(1)
const pageSize = 12
const total = ref(0)
const overview = ref({})
const friendList = ref([])
const blockList = ref([])
const groupList = ref([])
let searchTimer = 0

const summaryItems = [
  { key: 'mutual_friend_count', label: '双向好友' },
  { key: 'follow_count', label: '关注关系' },
  { key: 'block_count', label: '黑名单关系' },
  { key: 'group_count', label: '好友群组' },
  { key: 'group_member_count', label: '群成员总量' },
  { key: 'online_user_count', label: '在线用户' }
]

const currentList = computed(() => {
  if (activeTab.value === 'friends') return friendList.value
  if (activeTab.value === 'blocks') return blockList.value
  return groupList.value
})

const emptyText = computed(() => {
  if (search.value.trim()) return '没有匹配的数据'
  if (activeTab.value === 'friends') return '暂无好友关系数据'
  if (activeTab.value === 'blocks') return '暂无黑名单数据'
  return '暂无群组数据'
})

function avatarText(value) {
  return String(value || '友').trim().charAt(0) || '友'
}

function goDirectChat(userId) {
  const target = Number(userId || 0)
  if (!target) {
    ElMessage.warning('目标用户不存在，无法跳转聊天')
    return
  }
  router.push({ name: 'PrivateMessages', query: { user_id: String(target) } })
}

function goGroupChat(groupId) {
  const target = Number(groupId || 0)
  if (!target) {
    ElMessage.warning('目标群组不存在，无法进入群聊')
    return
  }
  router.push({ name: 'PrivateMessages', query: { group_id: String(target) } })
}

async function fetchSummary() {
  try {
    const res = await apiGetSocialManageSummary()
    overview.value = res.data || {}
  } catch {
    overview.value = {}
  }
}

async function fetchFriends(nextPage = 1) {
  const res = await apiGetSocialManageFollows({
    page: nextPage,
    limit: pageSize,
    key: search.value.trim(),
    mode: relationMode.value
  })
  friendList.value = res.data?.list || []
  total.value = Number(res.data?.count || 0)
}

async function fetchBlocks(nextPage = 1) {
  const res = await apiGetSocialManageBlocks({
    page: nextPage,
    limit: pageSize,
    key: search.value.trim()
  })
  blockList.value = res.data?.list || []
  total.value = Number(res.data?.count || 0)
}

async function fetchGroups(nextPage = 1) {
  const res = await apiGetSocialManageGroups({
    page: nextPage,
    limit: pageSize,
    key: search.value.trim()
  })
  groupList.value = res.data?.list || []
  total.value = Number(res.data?.count || 0)
}

async function fetchCurrent(nextPage = 1) {
  page.value = nextPage
  loading.value = true
  try {
    if (activeTab.value === 'friends') {
      await fetchFriends(nextPage)
    } else if (activeTab.value === 'blocks') {
      await fetchBlocks(nextPage)
    } else {
      await fetchGroups(nextPage)
    }
  } catch (error) {
    ElMessage.error(error?.message || '获取社交管理数据失败')
    total.value = 0
    friendList.value = []
    blockList.value = []
    groupList.value = []
  } finally {
    loading.value = false
  }
}

async function refreshAll() {
  await Promise.all([fetchSummary(), fetchCurrent(page.value)])
}

function queueSearch() {
  if (searchTimer) window.clearTimeout(searchTimer)
  searchTimer = window.setTimeout(() => {
    searchTimer = 0
    fetchCurrent(1)
  }, 260)
}

function triggerSearch() {
  if (searchTimer) {
    window.clearTimeout(searchTimer)
    searchTimer = 0
  }
  fetchCurrent(1)
}

watch(activeTab, () => {
  fetchCurrent(1)
})

watch(search, (value, oldValue) => {
  if (value === oldValue) return
  queueSearch()
})

onMounted(async () => {
  await Promise.all([fetchSummary(), fetchCurrent(1)])
})

onBeforeUnmount(() => {
  if (searchTimer) window.clearTimeout(searchTimer)
})
</script>

<style scoped>
.social-manage-page {
  display: grid;
  gap: 14px;
}

.manage-tip {
  border-radius: 16px;
  padding: 14px 16px;
  border: 1px solid #cfe3f4;
  background: linear-gradient(180deg, #f7fbff 0%, #eef6fd 100%);
}

.manage-tip strong {
  display: block;
  color: #174064;
  font-size: 14px;
}

.manage-tip p {
  margin: 8px 0 0;
  color: #53708c;
  line-height: 1.7;
  font-size: 13px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.summary-card {
  border-radius: 14px;
  padding: 14px;
  background: linear-gradient(180deg, #f8fcff 0%, #eef7ff 100%);
  border: 1px solid #d6e6f2;
}

.summary-card span {
  display: block;
  color: #66809a;
  font-size: 12px;
}

.summary-card strong {
  display: block;
  margin-top: 8px;
  color: #173c61;
  font-size: 24px;
}

.toolbar {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.social-tabs {
  margin-right: 4px;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-cell strong {
  display: block;
  color: #173a60;
}

.user-cell span {
  display: block;
  margin-top: 2px;
  color: #6f839e;
  font-size: 12px;
}

.action-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.pager {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
</style>
