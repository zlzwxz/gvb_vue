<template>
  <div class="article-material">
    <el-card shadow="never">
      <div class="toolbar">
        <span class="scan-label">检索上限</span>
        <el-input-number v-model="scanLimit" :min="0" :max="10000" :step="100" />
        <span class="scan-tip">0 表示全量检索，建议先用 200~500 试跑</span>
        <el-button type="primary" plain :loading="previewing" @click="loadPreview">检索缺失文章</el-button>
        <el-button type="primary" :loading="syncing" @click="syncSelected">抓取选中</el-button>
        <el-button :loading="syncing" @click="syncAll">一键抓取缺失</el-button>
      </div>

      <div class="stat" v-if="stat">
        来源总数：{{ stat.source_total || 0 }}，
        扫描：{{ stat.latest_scanned || 0 }}，
        可新增：{{ stat.new_candidate || 0 }}，
        重复：{{ stat.duplicate_count || 0 }}，
        无效：{{ stat.invalid_count || 0 }}
      </div>

      <el-table
        :data="candidates"
        stripe
        v-loading="previewing"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="52" />
        <el-table-column prop="article_id" label="文章ID" width="120" />
        <el-table-column prop="title" label="标题" min-width="260" show-overflow-tooltip />
        <el-table-column prop="abstract" label="摘要" min-width="260" show-overflow-tooltip />
        <el-table-column label="封面" width="120">
          <template #default="{ row }">
            <el-image
              v-if="row.cover_url"
              :src="$resolveImg(row.cover_url)"
              fit="cover"
              style="width: 84px; height: 52px; border-radius: 6px;"
            />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="link" label="原文链接" min-width="260" show-overflow-tooltip />
      </el-table>
      <el-empty v-if="!previewing && !candidates.length" description="暂无可抓取文章" />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { apiPreviewFengfengArticles, apiSyncFengfengArticles } from '@/api/system'

const previewing = ref(false)
const syncing = ref(false)
const stat = ref(null)
const candidates = ref([])
const selectedRows = ref([])
const scanLimit = ref(200)

function resolveRequestError(error, fallback) {
  const message = String(error?.message || error?.response?.data?.msg || '').trim()
  return message || fallback
}

function handleSelectionChange(rows) {
  selectedRows.value = rows || []
}

async function loadPreview() {
  previewing.value = true
  try {
    const res = await apiPreviewFengfengArticles({ limit: scanLimit.value })
    stat.value = res.data || null
    candidates.value = res.data?.candidates || []
  } catch (e) {
    ElMessage.error(resolveRequestError(e, '检索失败'))
  } finally {
    previewing.value = false
  }
}

async function syncSelected() {
  const selected = selectedRows.value.map((item) => item.article_id).filter(Boolean)
  if (!selected.length) {
    ElMessage.warning('请先选择要抓取的文章')
    return
  }
  syncing.value = true
  try {
    const res = await apiSyncFengfengArticles({
      article_ids: selected,
      sync_all: false,
      include_update: true,
      limit: scanLimit.value
    })
    const data = res.data || {}
    ElMessage.success(`抓取完成：新增 ${data.created || 0}，更新 ${data.updated_count || 0}，重复 ${data.duplicate_count || 0}`)
    await loadPreview()
  } catch (e) {
    ElMessage.error(resolveRequestError(e, '抓取失败'))
  } finally {
    syncing.value = false
  }
}

async function syncAll() {
  syncing.value = true
  try {
    const res = await apiSyncFengfengArticles({
      sync_all: true,
      include_update: true,
      limit: scanLimit.value
    })
    const data = res.data || {}
    ElMessage.success(`抓取完成：新增 ${data.created || 0}，更新 ${data.updated_count || 0}，重复 ${data.duplicate_count || 0}`)
    await loadPreview()
  } catch (e) {
    ElMessage.error(resolveRequestError(e, '抓取失败'))
  } finally {
    syncing.value = false
  }
}

loadPreview()
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.scan-label {
  color: #4e6a88;
  font-size: 13px;
}

.scan-tip {
  color: #8297ad;
  font-size: 12px;
}

.stat {
  margin-bottom: 10px;
  color: #4e6a88;
  font-size: 13px;
}
</style>
