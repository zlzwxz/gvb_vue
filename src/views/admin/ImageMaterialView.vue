<template>
  <div class="image-material">
    <el-card shadow="never">
      <div class="toolbar">
        <el-button type="primary" plain :loading="previewing" @click="loadPreview">检索缺失图片</el-button>
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

      <el-table :data="candidates" stripe v-loading="previewing" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="52" />
        <el-table-column prop="category" label="图片类型" width="120" />
        <el-table-column label="预览" width="120">
          <template #default="{ row }">
            <el-image :src="$resolveImg(row.url)" fit="cover" style="width: 84px; height: 52px; border-radius: 6px;" />
          </template>
        </el-table-column>
        <el-table-column prop="article_title" label="来源文章" min-width="220" show-overflow-tooltip />
        <el-table-column prop="url" label="图片地址" min-width="320" show-overflow-tooltip />
      </el-table>
      <el-empty v-if="!previewing && !candidates.length" description="暂无可抓取图片" />
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { apiPreviewFengfengImages, apiSyncFengfengImages } from '@/api/system'

const previewing = ref(false)
const syncing = ref(false)
const stat = ref(null)
const candidates = ref([])
const selectedRows = ref([])

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
    const res = await apiPreviewFengfengImages()
    stat.value = res.data || null
    candidates.value = res.data?.candidates || []
  } catch (e) {
    ElMessage.error(resolveRequestError(e, '检索失败'))
  } finally {
    previewing.value = false
  }
}

async function syncSelected() {
  const selected = selectedRows.value.map((item) => item.url).filter(Boolean)
  if (!selected.length) {
    ElMessage.warning('请先选择要抓取的图片')
    return
  }
  syncing.value = true
  try {
    const res = await apiSyncFengfengImages({
      image_urls: selected,
      sync_all: false
    })
    const data = res.data || {}
    ElMessage.success(`抓取完成：新增 ${data.created || 0}，重复 ${data.duplicate_count || 0}，失败 ${data.failed_count || 0}`)
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
    const res = await apiSyncFengfengImages({ sync_all: true })
    const data = res.data || {}
    ElMessage.success(`抓取完成：新增 ${data.created || 0}，重复 ${data.duplicate_count || 0}，失败 ${data.failed_count || 0}`)
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
  gap: 8px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.stat {
  margin-bottom: 10px;
  color: #4e6a88;
  font-size: 13px;
}
</style>
