<template>
  <div class="community-manage-page">
    <section class="summary-grid">
      <article class="summary-card">
        <span>交流帖子</span>
        <strong>{{ metaMap.plaza?.total || 0 }}</strong>
      </article>
      <article class="summary-card">
        <span>赏金任务</span>
        <strong>{{ metaMap.bounty?.total || 0 }}</strong>
      </article>
      <article class="summary-card">
        <span>交流中</span>
        <strong>{{ Number(metaMap.plaza?.status?.published || 0) }}</strong>
      </article>
      <article class="summary-card">
        <span>招募中</span>
        <strong>{{ Number(metaMap.bounty?.status?.open || 0) }}</strong>
      </article>
    </section>

    <el-card shadow="never">
      <div class="toolbar">
        <div class="toolbar-left">
          <el-tabs v-model="scene" class="scene-tabs" @tab-change="handleSceneChange">
            <el-tab-pane label="闲聊交流" name="plaza" />
            <el-tab-pane label="赏金大厅" name="bounty" />
          </el-tabs>
          <el-select v-model="filters.status" style="width: 170px" @change="fetchList(1)">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="filters.category" clearable style="width: 180px" @change="fetchList(1)">
            <el-option label="全部分类" value="" />
            <el-option
              v-for="item in currentCategories"
              :key="item.category"
              :label="`${item.category} (${item.count})`"
              :value="item.category"
            />
          </el-select>
        </div>
        <div class="toolbar-right">
          <el-input
            v-model="filters.key"
            clearable
            placeholder="搜索标题、作者、分类"
            style="width: 260px"
            @clear="fetchList(1)"
            @keyup.enter="fetchList(1)"
          />
          <el-select v-model="filters.sort" style="width: 150px" @change="fetchList(1)">
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button @click="refreshAll" :loading="loading">刷新</el-button>
        </div>
      </div>

      <el-table :data="list" stripe v-loading="loading">
        <el-table-column label="标题" min-width="320">
          <template #default="{ row }">
            <div class="title-cell">
              <div class="title-row">
                <el-tag v-if="row.is_pinned" type="warning" effect="dark" size="small">置顶</el-tag>
                <strong>{{ row.title }}</strong>
              </div>
              <span>{{ row.summary || '暂无摘要' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="作者" width="180">
          <template #default="{ row }">
            <div class="user-cell">
              <el-avatar :size="30" :src="row.user_avatar ? $resolveImg(row.user_avatar) : ''">
                {{ avatarText(row.user_nick_name) }}
              </el-avatar>
              <div>
                <strong>{{ row.user_nick_name || `用户${row.user_id}` }}</strong>
                <span>ID {{ row.user_id }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="120" />
        <el-table-column label="状态" width="140">
          <template #default="{ row }">
            <el-tag :type="statusTagType(row.status)" effect="plain">
              {{ row.status_label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="scene === 'bounty'" label="赏金/承接" min-width="200">
          <template #default="{ row }">
            <div class="bounty-cell">
              <strong>{{ Number(row.budget || 0) }} {{ row.reward_unit || '积分' }}</strong>
              <span>{{ row.accepted_user_nick || '待认领' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="互动" width="140">
          <template #default="{ row }">
            <div class="meta-cell">
              <span>{{ row.reply_count || 0 }} 回复</span>
              <span>{{ row.view_count || 0 }} 浏览</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="发布时间" width="180" />
        <el-table-column label="快捷状态" min-width="200">
          <template #default="{ row }">
            <div class="status-action">
              <el-select v-model="statusDraftMap[row.id]" size="small">
                <el-option
                  v-for="item in statusOptions.slice(1)"
                  :key="`${row.id}-${item.value}`"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-button
                size="small"
                type="primary"
                plain
                :disabled="statusDraftMap[row.id] === row.status"
                @click="updateStatus(row)"
              >
                保存
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="220" fixed="right">
          <template #default="{ row }">
            <div class="action-cell">
              <el-button link type="primary" @click="openPost(row)">查看</el-button>
              <el-button link :type="row.is_pinned ? 'warning' : 'success'" @click="togglePin(row)">
                {{ row.is_pinned ? '取消置顶' : '设为置顶' }}
              </el-button>
              <el-button link type="danger" @click="removePost(row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-empty v-if="!loading && !list.length" description="当前筛选没有数据" />

      <el-pagination
        v-if="total > 0"
        background
        layout="total, prev, pager, next"
        :current-page="page"
        :page-size="pageSize"
        :total="total"
        class="pager"
        @current-change="fetchList"
      />
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  apiDeleteCommunityPost,
  apiGetAdminCommunityPostList,
  apiGetCommunityMeta,
  apiToggleCommunityPostPin,
  apiUpdateCommunityPostStatus
} from '@/api/social'

const router = useRouter()

const pageSize = 12
const loading = ref(false)
const scene = ref('plaza')
const page = ref(1)
const total = ref(0)
const list = ref([])
const metaMap = reactive({
  plaza: { total: 0, categories: [], status: {} },
  bounty: { total: 0, categories: [], status: {} }
})
const statusDraftMap = reactive({})
const filters = reactive({
  key: '',
  status: 'all',
  category: '',
  sort: ''
})

const currentCategories = computed(() => metaMap[scene.value]?.categories || [])
const sortOptions = computed(() => {
  if (scene.value === 'bounty') {
    return [
      { label: '默认排序', value: '' },
      { label: '最新发布', value: 'latest' },
      { label: '赏金优先', value: 'reward' },
      { label: '截止优先', value: 'deadline' },
      { label: '热度优先', value: 'hot' }
    ]
  }
  return [
    { label: '默认排序', value: '' },
    { label: '最新发布', value: 'latest' },
    { label: '热度优先', value: 'hot' }
  ]
})
const statusOptions = computed(() => {
  if (scene.value === 'bounty') {
    return [
      { label: '全部状态', value: 'all' },
      { label: '招募中', value: 'open' },
      { label: '进行中', value: 'in_progress' },
      { label: '已完成', value: 'resolved' },
      { label: '已关闭', value: 'closed' }
    ]
  }
  return [
    { label: '全部状态', value: 'all' },
    { label: '交流中', value: 'published' },
    { label: '已解决', value: 'resolved' },
    { label: '已归档', value: 'closed' }
  ]
})

function avatarText(value) {
  return String(value || '社').trim().charAt(0) || '社'
}

function statusTagType(status) {
  if (status === 'open' || status === 'published') return 'success'
  if (status === 'in_progress') return 'warning'
  if (status === 'resolved') return 'primary'
  if (status === 'closed') return 'info'
  return 'info'
}

function buildQuery(nextPage = page.value) {
  const params = {
    page: nextPage,
    limit: pageSize,
    scene: scene.value
  }
  if (filters.key.trim()) params.key = filters.key.trim()
  if (filters.status && filters.status !== 'all') params.status = filters.status
  if (filters.category) params.category = filters.category
  if (filters.sort) params.sort = filters.sort
  return params
}

async function loadMeta() {
  const [plazaRes, bountyRes] = await Promise.all([
    apiGetCommunityMeta({ scene: 'plaza' }),
    apiGetCommunityMeta({ scene: 'bounty' })
  ])
  metaMap.plaza = plazaRes.data || metaMap.plaza
  metaMap.bounty = bountyRes.data || metaMap.bounty
}

async function fetchList(nextPage = 1) {
  page.value = nextPage
  loading.value = true
  try {
    const res = await apiGetAdminCommunityPostList(buildQuery(nextPage))
    list.value = res.data?.list || []
    total.value = Number(res.data?.count || 0)
    list.value.forEach((item) => {
      statusDraftMap[item.id] = item.status
    })
  } catch (error) {
    list.value = []
    total.value = 0
    ElMessage.error(error?.message || '获取社区列表失败')
  } finally {
    loading.value = false
  }
}

async function refreshAll() {
  loading.value = true
  try {
    await Promise.all([loadMeta(), fetchList(1)])
  } finally {
    loading.value = false
  }
}

function handleSceneChange() {
  filters.status = 'all'
  filters.category = ''
  filters.sort = ''
  fetchList(1)
}

function openPost(row) {
  router.push({
    name: scene.value === 'bounty' ? 'BountyPostDetail' : 'CommunityPostDetail',
    params: { id: String(row.id) }
  })
}

async function togglePin(row) {
  try {
    await apiToggleCommunityPostPin(row.id, { is_pinned: !row.is_pinned })
    ElMessage.success(row.is_pinned ? '已取消置顶' : '已设为置顶')
    await Promise.all([loadMeta(), fetchList(page.value)])
  } catch (error) {
    ElMessage.error(error?.message || '置顶操作失败')
  }
}

async function updateStatus(row) {
  const nextStatus = statusDraftMap[row.id]
  if (!nextStatus || nextStatus === row.status) return
  try {
    await apiUpdateCommunityPostStatus(row.id, { status: nextStatus })
    ElMessage.success('状态已更新')
    await Promise.all([loadMeta(), fetchList(page.value)])
  } catch (error) {
    ElMessage.error(error?.message || '更新状态失败')
  }
}

async function removePost(row) {
  try {
    await ElMessageBox.confirm('确定删除这条社区内容吗？回复也会一起删除。', '删除确认', {
      type: 'warning'
    })
    await apiDeleteCommunityPost(row.id)
    ElMessage.success('内容已删除')
    await Promise.all([loadMeta(), fetchList(1)])
  } catch (error) {
    if (error !== 'cancel' && error !== 'close') {
      ElMessage.error(error?.message || '删除失败')
    }
  }
}

onMounted(async () => {
  await Promise.all([loadMeta(), fetchList(1)])
})
</script>

<style scoped>
.community-manage-page {
  display: grid;
  gap: 14px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
}

.summary-card {
  border-radius: 16px;
  padding: 16px;
  border: 1px solid #dbe7f2;
  background: linear-gradient(180deg, #f8fcff 0%, #eff7ff 100%);
}

.summary-card span {
  display: block;
  color: #68809a;
  font-size: 12px;
}

.summary-card strong {
  display: block;
  margin-top: 8px;
  color: #153b60;
  font-size: 26px;
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
.toolbar-right,
.user-cell,
.status-action,
.action-cell {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.scene-tabs {
  margin-right: 2px;
}

.title-cell strong,
.user-cell strong {
  color: #12375b;
}

.title-cell span,
.user-cell span,
.meta-cell span,
.bounty-cell span {
  color: #71859f;
  font-size: 12px;
}

.title-cell {
  display: grid;
  gap: 6px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.meta-cell,
.bounty-cell {
  display: grid;
  gap: 4px;
}

.bounty-cell strong {
  color: #8a4c13;
}

.pager {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}
</style>
