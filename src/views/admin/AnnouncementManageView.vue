<template>
  <div class="announcement-manage">
    <el-card shadow="never">
      <div class="toolbar">
        <div class="toolbar-left">
          <el-button type="primary" @click="openCreate">新建公告</el-button>
          <el-input
            v-model="search"
            placeholder="搜索公告标题或内容"
            clearable
            style="width: 240px"
            @clear="fetchList(1)"
            @keyup.enter="fetchList(1)"
          />
          <el-select v-model="boardID" style="width: 180px" @change="fetchList(1)">
            <el-option label="全部范围" :value="0" />
            <el-option label="全站公告" :value="-1" />
            <el-option
              v-for="board in boards"
              :key="board.id"
              :label="board.name"
              :value="Number(board.id)"
            />
          </el-select>
          <el-select v-model="showState" style="width: 140px" @change="fetchList(1)">
            <el-option label="全部显示状态" value="all" />
            <el-option label="仅显示中" value="true" />
            <el-option label="仅已隐藏" value="false" />
          </el-select>
        </div>
        <el-button @click="fetchList(page)" :loading="loading">刷新</el-button>
      </div>

      <el-table :data="list" stripe v-loading="loading">
        <el-table-column prop="title" label="公告标题" min-width="220" show-overflow-tooltip />
        <el-table-column label="范围" width="140">
          <template #default="{ row }">
            <el-tag size="small" effect="plain" :type="row.board_id ? 'success' : 'info'">
              {{ row.board_name || '全站公告' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="等级" width="100">
          <template #default="{ row }">
            <el-tag :type="levelTagType(row.level)" size="small" effect="plain">
              {{ levelText(row.level) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="公告内容" min-width="260" show-overflow-tooltip />
        <el-table-column label="展示状态" width="110">
          <template #default="{ row }">
            <el-tag :type="displayTagType(row)" size="small">
              {{ displayStateText(row) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="生效时间" width="280">
          <template #default="{ row }">
            <div class="time-cell">
              <span>{{ row.starts_at || '立即生效' }}</span>
              <span>{{ row.ends_at || '长期有效' }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="jump_link" label="跳转链接" min-width="180" show-overflow-tooltip />
        <el-table-column prop="sort" label="排序" width="80" />
        <el-table-column prop="created_at" label="创建时间" width="170" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="openEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="removeAnnouncement(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-empty v-if="!loading && !list.length" description="暂无公告数据" />

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

    <el-dialog :title="isEdit ? '编辑公告' : '新建公告'" v-model="visible" width="760px">
      <el-form :model="form" label-width="110px">
        <el-form-item label="公告标题" required>
          <el-input v-model="form.title" maxlength="120" show-word-limit />
        </el-form-item>
        <el-form-item label="公告内容" required>
          <el-input v-model="form.content" type="textarea" :rows="5" maxlength="2000" show-word-limit />
        </el-form-item>
        <el-form-item label="公告等级">
          <el-select v-model="form.level" style="width: 180px">
            <el-option label="普通" value="info" />
            <el-option label="活动" value="success" />
            <el-option label="提醒" value="warning" />
            <el-option label="紧急" value="danger" />
          </el-select>
        </el-form-item>
        <el-form-item label="公告范围">
          <el-select v-model="form.board_id" style="width: 220px">
            <el-option label="全站公告" :value="0" />
            <el-option
              v-for="board in boards"
              :key="board.id"
              :label="board.name"
              :value="Number(board.id)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="跳转链接">
          <el-input v-model="form.jump_link" placeholder="支持 http(s) 链接或 /board/xxx 站内路径" />
        </el-form-item>
        <div class="time-grid">
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="form.starts_at"
              type="datetime"
              value-format="YYYY-MM-DD HH:mm:ss"
              placeholder="留空则立即生效"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="form.ends_at"
              type="datetime"
              value-format="YYYY-MM-DD HH:mm:ss"
              placeholder="留空则长期有效"
              style="width: 100%"
            />
          </el-form-item>
        </div>
        <div class="time-grid">
          <el-form-item label="是否显示">
            <el-switch v-model="form.is_show" />
          </el-form-item>
          <el-form-item label="排序">
            <el-input-number v-model="form.sort" :min="0" />
          </el-form-item>
        </div>
      </el-form>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="submit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  apiCreateAnnouncement,
  apiDeleteAnnouncement,
  apiGetAnnouncementManageList,
  apiUpdateAnnouncement
} from '@/api/announcement'
import { apiGetBoardList } from '@/api/board'

const list = ref([])
const boards = ref([])
const loading = ref(false)
const saving = ref(false)
const visible = ref(false)
const isEdit = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = 10
const search = ref('')
const boardID = ref(0)
const showState = ref('all')
const form = ref(buildDefaultForm())

function buildDefaultForm() {
  return {
    id: 0,
    title: '',
    content: '',
    level: 'info',
    board_id: 0,
    jump_link: '',
    starts_at: '',
    ends_at: '',
    sort: 0,
    is_show: true
  }
}

function parseDateTime(value) {
  if (!value) return null
  const normalized = String(value).trim().replace(/-/g, '/')
  const date = new Date(normalized)
  return Number.isNaN(date.getTime()) ? null : date
}

function levelText(level) {
  if (level === 'success') return '活动'
  if (level === 'warning') return '提醒'
  if (level === 'danger') return '紧急'
  return '普通'
}

function levelTagType(level) {
  if (level === 'success') return 'success'
  if (level === 'warning') return 'warning'
  if (level === 'danger') return 'danger'
  return 'info'
}

function displayStateText(row) {
  if (!row.is_show) return '已隐藏'
  const now = Date.now()
  const startsAt = parseDateTime(row.starts_at)
  const endsAt = parseDateTime(row.ends_at)
  if (startsAt && startsAt.getTime() > now) return '未开始'
  if (endsAt && endsAt.getTime() < now) return '已过期'
  return '生效中'
}

function displayTagType(row) {
  const state = displayStateText(row)
  if (state === '生效中') return 'success'
  if (state === '未开始') return 'warning'
  if (state === '已过期') return 'info'
  return 'danger'
}

async function fetchBoards() {
  try {
    const res = await apiGetBoardList({ scope: 'all', page: 1, limit: 200 })
    boards.value = res.data?.list || []
  } catch {
    boards.value = []
  }
}

async function fetchList(nextPage = 1) {
  page.value = nextPage
  loading.value = true
  try {
    const params = {
      page: nextPage,
      limit: pageSize
    }
    if (search.value.trim()) {
      params.key = search.value.trim()
    }
    if (boardID.value > 0) {
      params.board_id = boardID.value
    } else if (boardID.value === -1) {
      params.scope = 'global'
    }
    if (showState.value !== 'all') {
      params.is_show = showState.value === 'true'
    }
    const res = await apiGetAnnouncementManageList(params)
    list.value = res.data?.list || []
    total.value = Number(res.data?.count || 0)
  } catch {
    ElMessage.error('获取公告列表失败')
  } finally {
    loading.value = false
  }
}

function openCreate() {
  isEdit.value = false
  form.value = buildDefaultForm()
  visible.value = true
}

function openEdit(row) {
  isEdit.value = true
  form.value = {
    id: Number(row.id),
    title: row.title || '',
    content: row.content || '',
    level: row.level || 'info',
    board_id: Number(row.board_id || 0),
    jump_link: row.jump_link || '',
    starts_at: row.starts_at || '',
    ends_at: row.ends_at || '',
    sort: Number(row.sort || 0),
    is_show: Boolean(row.is_show)
  }
  visible.value = true
}

async function submit() {
  if (!form.value.title.trim()) {
    ElMessage.warning('公告标题不能为空')
    return
  }
  if (!form.value.content.trim()) {
    ElMessage.warning('公告内容不能为空')
    return
  }

  saving.value = true
  try {
    const payload = {
      ...form.value,
      board_id: Number(form.value.board_id || 0)
    }
    if (isEdit.value) {
      await apiUpdateAnnouncement(form.value.id, payload)
      ElMessage.success('更新成功')
    } else {
      await apiCreateAnnouncement(payload)
      ElMessage.success('创建成功')
    }
    visible.value = false
    fetchList(page.value)
  } catch (error) {
    ElMessage.error(error?.message || '保存公告失败')
  } finally {
    saving.value = false
  }
}

async function removeAnnouncement(id) {
  try {
    await ElMessageBox.confirm('确定删除该公告吗？', '提示', { type: 'warning' })
    await apiDeleteAnnouncement({ id_list: [id] })
    ElMessage.success('删除成功')
    fetchList(page.value)
  } catch {}
}

onMounted(async () => {
  await Promise.all([fetchBoards(), fetchList(1)])
})
</script>

<style scoped>
.toolbar {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.time-cell {
  display: grid;
  gap: 4px;
  color: #5f748f;
  font-size: 12px;
}

.time-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.pager {
  margin-top: 16px;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .time-grid {
    grid-template-columns: 1fr;
  }
}
</style>
