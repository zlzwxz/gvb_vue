<template>
  <div class="board-manage">
    <el-card shadow="never">
      <div class="toolbar">
        <div class="toolbar-left">
          <el-button type="primary" @click="openCreate">新建板块</el-button>
          <span class="toolbar-tip">进入“编辑板块”即可任命版主和副版主</span>
        </div>
        <el-button @click="fetchList" :loading="loading">刷新</el-button>
      </div>

      <el-table :data="list" stripe v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="板块名称" width="160" />
        <el-table-column prop="slug" label="标识" width="140" />
        <el-table-column prop="description" label="描述" min-width="260" show-overflow-tooltip />
        <el-table-column prop="notice" label="板块公告" min-width="220" show-overflow-tooltip />
        <el-table-column label="版主" width="200">
          <template #default="{ row }">
            <el-tag
              v-for="userId in row.moderator_user_ids || []"
              :key="`m-${row.id}-${userId}`"
              size="small"
              style="margin-right: 4px;"
            >
              {{ resolveUserName(userId) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="副版主" width="220">
          <template #default="{ row }">
            <el-tag
              v-for="userId in row.deputy_moderator_user_ids || []"
              :key="`d-${row.id}-${userId}`"
              type="info"
              size="small"
              style="margin-right: 4px;"
            >
              {{ resolveUserName(userId) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.is_enabled ? 'success' : 'warning'" size="small">
              {{ row.is_enabled ? '启用' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="置顶帖" width="100">
          <template #default="{ row }">
            <el-tag size="small" effect="plain">{{ (row.pinned_article_ids || []).length }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="90" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="openEdit(row)">编辑</el-button>
            <el-button type="danger" link @click="removeBoard(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="isEdit ? '编辑板块' : '新建板块'" v-model="visible" width="760px">
      <el-form :model="form" label-width="110px">
        <el-form-item label="板块名称" required>
          <el-input v-model="form.name" placeholder="例如：AI板块" />
        </el-form-item>
        <el-form-item label="标识">
          <el-input v-model="form.slug" placeholder="例如：ai" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description" type="textarea" :rows="2" />
        </el-form-item>
        <el-form-item label="板块公告">
          <el-input v-model="form.notice" type="textarea" :rows="3" maxlength="600" show-word-limit />
        </el-form-item>
        <el-form-item label="板块规则">
          <el-input v-model="form.rules" type="textarea" :rows="4" maxlength="1200" show-word-limit />
        </el-form-item>
        <el-form-item label="置顶文章ID">
          <div class="pin-box">
            <el-input
              v-model="form.pinned_article_ids_text"
              type="textarea"
              :rows="4"
              placeholder="每行一个文章ID，保存后会在板块页置顶展示"
            />
            <div class="pin-preview" v-if="parsePinnedArticleIDs(form.pinned_article_ids_text).length">
              <el-tag
                v-for="id in parsePinnedArticleIDs(form.pinned_article_ids_text)"
                :key="`pin-${id}`"
                size="small"
                effect="plain"
              >
                {{ id }}
              </el-tag>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="版主">
          <el-select v-model="form.moderator_user_ids" multiple filterable clearable style="width: 100%">
            <el-option v-for="user in userOptions" :key="user.id" :label="user.label" :value="user.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="副版主">
          <el-select v-model="form.deputy_moderator_user_ids" multiple filterable clearable style="width: 100%">
            <el-option v-for="user in userOptions" :key="`d-${user.id}`" :label="user.label" :value="user.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch v-model="form.is_enabled" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort" :min="0" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="saving" @click="submit">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { apiCreateBoard, apiDeleteBoard, apiGetBoardList, apiUpdateBoard } from '@/api/board'
import { apiGetUserList } from '@/api/user'

const list = ref([])
const loading = ref(false)
const saving = ref(false)
const visible = ref(false)
const isEdit = ref(false)
const users = ref([])

const form = ref(buildDefaultForm())

const userOptions = computed(() => users.value.map((item) => ({
  id: Number(item.id),
  label: item.nick_name || item.user_name || `用户${item.id}`
})))

const userMap = computed(() => {
  const map = new Map()
  for (const user of userOptions.value) {
    map.set(Number(user.id), user.label)
  }
  return map
})

function buildDefaultForm() {
  return {
    id: 0,
    name: '',
    slug: '',
    description: '',
    notice: '',
    rules: '',
    pinned_article_ids_text: '',
    moderator_user_ids: [],
    deputy_moderator_user_ids: [],
    sort: 0,
    is_enabled: true
  }
}

function resolveUserName(userId) {
  return userMap.value.get(Number(userId)) || `用户${userId}`
}

function parsePinnedArticleIDs(value) {
  const rawList = String(value || '')
    .split(/\r?\n|,|，/)
    .map((item) => item.trim())
    .filter(Boolean)
  return [...new Set(rawList)].slice(0, 20)
}

async function fetchUsers() {
  try {
    const res = await apiGetUserList({ page: 1, limit: 200 })
    users.value = res.data?.list || []
  } catch {
    users.value = []
  }
}

async function fetchList() {
  loading.value = true
  try {
    const res = await apiGetBoardList({ scope: 'all', page: 1, limit: 200 })
    list.value = res.data?.list || []
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
    name: row.name || '',
    slug: row.slug || '',
    description: row.description || '',
    notice: row.notice || '',
    rules: row.rules || '',
    pinned_article_ids_text: Array.isArray(row.pinned_article_ids) ? row.pinned_article_ids.join('\n') : '',
    moderator_user_ids: Array.isArray(row.moderator_user_ids) ? row.moderator_user_ids.map((id) => Number(id)) : [],
    deputy_moderator_user_ids: Array.isArray(row.deputy_moderator_user_ids) ? row.deputy_moderator_user_ids.map((id) => Number(id)) : [],
    sort: Number(row.sort || 0),
    is_enabled: Boolean(row.is_enabled)
  }
  visible.value = true
}

async function submit() {
  if (!form.value.name.trim()) {
    ElMessage.warning('板块名称不能为空')
    return
  }
  saving.value = true
  try {
    const payload = {
      ...form.value,
      pinned_article_ids: parsePinnedArticleIDs(form.value.pinned_article_ids_text)
    }
    if (isEdit.value) {
      await apiUpdateBoard(payload)
      ElMessage.success('更新成功')
    } else {
      await apiCreateBoard(payload)
      ElMessage.success('创建成功')
    }
    visible.value = false
    await fetchList()
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '保存失败')
  } finally {
    saving.value = false
  }
}

async function removeBoard(id) {
  try {
    await ElMessageBox.confirm('确定删除该板块吗？', '提示', { type: 'warning' })
    await apiDeleteBoard({ id_list: [id] })
    ElMessage.success('删除成功')
    await fetchList()
  } catch {}
}

onMounted(async () => {
  await Promise.all([fetchUsers(), fetchList()])
})
</script>

<style scoped>
.toolbar {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.toolbar-tip {
  color: #6b819a;
  font-size: 13px;
}

.pin-box {
  width: 100%;
  display: grid;
  gap: 8px;
}

.pin-preview {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
</style>
