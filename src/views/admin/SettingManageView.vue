<template>
  <div class="setting-manage">
    <el-card shadow="never">
      <template #header>
        <div class="header-row">
          <div>
            <strong>系统配置中心</strong>
            <p>已包含 `settings.yaml` 所有核心分组，可直接查看与修改。</p>
          </div>
          <div class="header-actions">
            <el-button @click="refreshCurrent" :loading="loading">刷新当前</el-button>
            <el-button type="primary" @click="saveCurrent" :loading="saving">保存当前</el-button>
          </div>
        </div>
      </template>

      <el-tabs v-model="activeTab" type="border-card">
        <el-tab-pane
          v-for="tab in tabList"
          :key="tab.name"
          :name="tab.name"
          :label="tab.label"
        >
          <el-form :model="forms[tab.name]" label-width="150px" v-loading="loading">
            <div class="form-grid">
              <template v-for="field in tab.fields" :key="`${tab.name}-${field.key}`">
                <el-form-item
                  :label="field.label"
                  :class="{ 'full-line': field.fullLine }"
                >
                  <el-input
                    v-if="field.type === 'text'"
                    v-model="forms[tab.name][field.key]"
                    :placeholder="field.placeholder || ''"
                  />
                  <el-input
                    v-else-if="field.type === 'password'"
                    v-model="forms[tab.name][field.key]"
                    type="password"
                    show-password
                    :placeholder="field.placeholder || ''"
                  />
                  <el-input-number
                    v-else-if="field.type === 'number'"
                    v-model="forms[tab.name][field.key]"
                    :min="field.min ?? 0"
                    :max="field.max ?? Number.MAX_SAFE_INTEGER"
                    style="width: 100%"
                  />
                  <el-switch
                    v-else-if="field.type === 'bool'"
                    v-model="forms[tab.name][field.key]"
                  />
                </el-form-item>
              </template>
            </div>

            <template v-if="tab.name === 'news'">
              <el-form-item label="启用来源(推荐)">
                <el-select
                  v-model="forms.news.enabled_source_ids"
                  multiple
                  filterable
                  clearable
                  collapse-tags
                  collapse-tags-tooltip
                  placeholder="留空表示启用全部来源"
                  style="width: 100%"
                >
                  <el-option
                    v-for="source in newsSourceList"
                    :key="source.id"
                    :label="formatSourceLabel(source)"
                    :value="source.id"
                  />
                </el-select>
                <div class="form-tip">来源先从 `https://api.codelife.cc/api/top/category?lang=cn` 拉取，再由 `/api/news/sources` 提供给后台页面。</div>
              </el-form-item>
              <el-form-item label="兼容名称配置">
                <el-select
                  v-model="forms.news.enabled_source_names"
                  multiple
                  filterable
                  clearable
                  collapse-tags
                  collapse-tags-tooltip
                  placeholder="留空表示展示全部榜单"
                  style="width: 100%"
                >
                  <el-option
                    v-for="source in newsSourceList"
                    :key="`name-${source.id}`"
                    :label="source.name"
                    :value="source.name"
                  />
                </el-select>
                <div class="form-tip">兼容旧配置字段，通常只需要维护上面的“启用来源(推荐)”。</div>
              </el-form-item>
            </template>

            <template v-if="tab.name === 'site_info'">
              <el-divider />
              <el-form-item label="采集操作">
                <div class="crawl-action-block">
                  <div class="crawl-action-row">
                    <el-button type="primary" plain :loading="previewing" @click="previewFengfengSync">
                      检测最新文章
                    </el-button>
                    <el-button type="primary" :loading="syncing" @click="triggerFengfengSync">
                      立即同步枫枫知道文章
                    </el-button>
                  </div>
                  <div v-if="crawlStat" class="crawl-stat">
                    来源总数：{{ Number(crawlStat.source_total || 0) }}，
                    本次扫描：{{ Number(crawlStat.latest_scanned || 0) }}，
                    可新增：{{ Number(crawlStat.new_candidate || 0) }}，
                    已更新：{{ Number(crawlStat.updated_count || 0) }}，
                    重复：{{ Number(crawlStat.duplicate_count || 0) }}，
                    无效：{{ Number(crawlStat.invalid_count || 0) }}，
                    失败：{{ Number(crawlStat.failed_count || 0) }}
                  </div>
                  <div class="form-tip">
                    开启“自动抓取”后，后端会按小时定时抓取；这里可手动触发一次并写入文章列表。
                  </div>
                </div>
              </el-form-item>
            </template>

            <template v-if="tab.name === 'es'">
              <el-divider />
              <el-form-item label="ES 工具区" class="full-line">
                <div class="es-tool-block">
                  <div class="es-tool-head">
                    <div>
                      <strong>索引导入导出</strong>
                      <p>
                        先选择索引再导出。页面导入目前只支持 `article_index`，
                        并且会按文章创建规则逐条校验 JSON 结构、标题重复、板块、作者、封面等数据。
                      </p>
                    </div>
                    <div class="crawl-action-row">
                      <el-button @click="loadESIndices" :loading="esIndexLoading">刷新索引</el-button>
                      <el-button
                        type="primary"
                        :loading="esExporting"
                        :disabled="!selectedESIndex"
                        @click="exportSelectedESIndex"
                      >
                        导出选中索引
                      </el-button>
                    </div>
                  </div>

                  <el-table
                    :data="esIndexList"
                    border
                    size="small"
                    v-loading="esIndexLoading"
                    class="es-index-table"
                    @row-click="selectESIndex"
                  >
                    <el-table-column label="选择" width="100">
                      <template #default="{ row }">
                        <el-tag v-if="selectedESIndex === row.name" type="success" effect="plain">已选中</el-tag>
                        <el-button v-else link type="primary" @click.stop="selectESIndex(row)">选择</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="索引名" min-width="180" />
                    <el-table-column prop="docs_count" label="文档数" width="110" />
                    <el-table-column label="能力" width="180">
                      <template #default="{ row }">
                        <div class="es-capability">
                          <el-tag size="small" type="primary" effect="plain">可导出</el-tag>
                          <el-tag
                            size="small"
                            :type="row.import_supported ? 'success' : 'info'"
                            effect="plain"
                          >
                            {{ row.import_supported ? '可导入' : '仅导出' }}
                          </el-tag>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="description" label="说明" min-width="260" />
                  </el-table>

                  <div class="es-action-bar">
                    <div class="es-selected-info">
                      <strong>当前选中：</strong>
                      <span>{{ selectedESIndex || '未选择索引' }}</span>
                      <span v-if="selectedESIndexMeta"> · 文档 {{ Number(selectedESIndexMeta.docs_count || 0) }} 条</span>
                    </div>

                    <el-upload
                      :show-file-list="false"
                      accept=".json,application/json"
                      :disabled="!selectedESIndexMeta?.import_supported"
                      :http-request="importESIndexFile"
                    >
                      <el-button
                        type="success"
                        :loading="esImporting"
                        :disabled="!selectedESIndexMeta?.import_supported"
                      >
                        导入 JSON
                      </el-button>
                    </el-upload>
                  </div>

                  <div class="form-tip">
                    导入说明：
                    只有 `article_index` 支持页面导入；导入文件建议直接使用本页导出的 JSON。
                    如果文件结构不对、文章标题重复，或者引用了不存在的板块 / 用户 / 封面，结果里都会显示失败原因。
                  </div>
                  <div v-if="lastImportFileName" class="es-last-file">
                    最近导入文件：{{ lastImportFileName }}
                  </div>

                  <div v-if="esImportResult" class="es-import-result">
                    <div class="es-import-summary">
                      <span>总数 {{ Number(esImportResult.total || 0) }}</span>
                      <span>成功 {{ Number(esImportResult.success || 0) }}</span>
                      <span>失败 {{ Number(esImportResult.failed || 0) }}</span>
                      <span v-if="esImportResult.completed">完成时间 {{ esImportResult.completed }}</span>
                    </div>

                    <el-alert
                      :title="`导入结果：成功 ${Number(esImportResult.success || 0)} 条，失败 ${Number(esImportResult.failed || 0)} 条`"
                      :type="Number(esImportResult.failed || 0) > 0 ? 'warning' : 'success'"
                      :closable="false"
                      show-icon
                    />

                    <el-table
                      v-if="importFailurePreview.length"
                      :data="importFailurePreview"
                      border
                      size="small"
                      class="es-failure-table"
                    >
                      <el-table-column prop="row" label="序号" width="80" />
                      <el-table-column prop="source_id" label="源文档 ID" min-width="160" />
                      <el-table-column prop="title" label="标题" min-width="180" show-overflow-tooltip />
                      <el-table-column prop="message" label="失败原因" min-width="280" show-overflow-tooltip />
                    </el-table>
                    <div v-if="Number(esImportResult.failed || 0) > importFailurePreview.length" class="form-tip">
                      失败明细较多，当前仅展示前 {{ importFailurePreview.length }} 条。
                    </div>
                  </div>
                </div>
              </el-form-item>
            </template>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import {
  apiExportESIndex,
  apiGetESIndices,
  apiGetNewsSourceList,
  apiGetPublicSiteInfo,
  apiGetSettings,
  apiImportESIndex,
  apiPreviewFengfengArticles,
  apiSyncFengfengArticles,
  apiUpdateSetting
} from '@/api/system'

const loading = ref(false)
const saving = ref(false)
const syncing = ref(false)
const previewing = ref(false)
const crawlStat = ref(null)
const activeTab = ref('system')
const newsSourceList = ref([])
const esIndexLoading = ref(false)
const esExporting = ref(false)
const esImporting = ref(false)
const esIndexList = ref([])
const selectedESIndex = ref('')
const esImportResult = ref(null)
const lastImportFileName = ref('')

const selectedESIndexMeta = computed(() => esIndexList.value.find(item => item.name === selectedESIndex.value) || null)
const importFailurePreview = computed(() => {
  const list = Array.isArray(esImportResult.value?.failures) ? esImportResult.value.failures : []
  return list.slice(0, 20)
})

const schemaMap = {
  system: {
    label: '系统运行',
    fields: [
      { key: 'host', label: '服务地址', type: 'text' },
      { key: 'port', label: '服务端口', type: 'number', min: 1, max: 65535 },
      { key: 'env', label: '运行环境', type: 'text' }
    ]
  },
  mysql: {
    label: 'MySQL',
    fields: [
      { key: 'host', label: '数据库地址', type: 'text' },
      { key: 'port', label: '数据库端口', type: 'number', min: 1, max: 65535 },
      { key: 'user', label: '用户名', type: 'text' },
      { key: 'password', label: '密码', type: 'password' },
      { key: 'db', label: '数据库名', type: 'text' },
      { key: 'log_level', label: '日志级别', type: 'text' },
      { key: 'config', label: '连接参数', type: 'text', fullLine: true },
      { key: 'maxidleconns', label: '最大空闲连接', type: 'number', min: 0 },
      { key: 'maxopenconns', label: '最大打开连接', type: 'number', min: 0 },
      { key: 'timeout', label: '超时(秒)', type: 'number', min: 0 }
    ]
  },
  logger: {
    label: '日志',
    fields: [
      { key: 'level', label: '日志级别', type: 'text' },
      { key: 'prefix', label: '日志前缀', type: 'text' },
      { key: 'director', label: '日志目录', type: 'text' },
      { key: 'show_line', label: '显示行号', type: 'bool' },
      { key: 'log_in_console', label: '控制台输出', type: 'bool' }
    ]
  },
  email: {
    label: '邮箱',
    fields: [
      { key: 'host', label: 'SMTP 主机', type: 'text' },
      { key: 'port', label: 'SMTP 端口', type: 'number', min: 1, max: 65535 },
      { key: 'user', label: '用户名', type: 'text' },
      { key: 'password', label: '密码', type: 'password' },
      { key: 'default_from_email', label: '默认发件人', type: 'text' },
      { key: 'use_ssl', label: '启用 SSL', type: 'bool' },
      { key: 'user_tls', label: '启用 TLS', type: 'bool' }
    ]
  },
  jwt: {
    label: 'JWT',
    fields: [
      { key: 'secret', label: '密钥', type: 'password' },
      { key: 'expires', label: '过期时间(小时)', type: 'number', min: 1 },
      { key: 'issuer', label: '签发者', type: 'text' }
    ]
  },
  qq: {
    label: 'QQ 登录',
    fields: [
      { key: 'app_id', label: 'App ID', type: 'text' },
      { key: 'key', label: 'App Key', type: 'password' },
      { key: 'redirect', label: '回调地址', type: 'text', fullLine: true }
    ]
  },
  qiniu: {
    label: '七牛云',
    fields: [
      { key: 'enable', label: '启用', type: 'bool' },
      { key: 'access_key', label: 'Access Key', type: 'password' },
      { key: 'secret_key', label: 'Secret Key', type: 'password' },
      { key: 'bucket', label: 'Bucket', type: 'text' },
      { key: 'cdn', label: 'CDN 域名', type: 'text' },
      { key: 'zone', label: '机房 Zone', type: 'text' },
      { key: 'prefix', label: '目录前缀', type: 'text' },
      { key: 'size', label: '大小限制(MB)', type: 'number', min: 0 }
    ]
  },
  upload: {
    label: '上传',
    fields: [
      { key: 'path', label: '存储路径', type: 'text', fullLine: true },
      { key: 'max_size', label: '最大大小(MB)', type: 'number', min: 1 }
    ]
  },
  redis: {
    label: 'Redis',
    fields: [
      { key: 'ip', label: '地址', type: 'text' },
      { key: 'port', label: '端口', type: 'number', min: 1, max: 65535 },
      { key: 'password', label: '密码', type: 'password' },
      { key: 'poolSize', label: '连接池大小', type: 'number', min: 0 }
    ]
  },
  es: {
    label: 'Elasticsearch',
    fields: [
      { key: 'host', label: '地址', type: 'text' },
      { key: 'port', label: '端口', type: 'number', min: 1, max: 65535 },
      { key: 'user', label: '用户名', type: 'text' },
      { key: 'password', label: '密码', type: 'password' }
    ]
  },
  site_info: {
    label: '站点信息',
    fields: [
      { key: 'title', label: '站点标题', type: 'text' },
      { key: 'name', label: '站点名称', type: 'text' },
      { key: 'slogan', label: '中文标语', type: 'text' },
      { key: 'slogan_en', label: '英文标语', type: 'text' },
      { key: 'job', label: '职业', type: 'text' },
      { key: 'addr', label: '地址', type: 'text' },
      { key: 'email', label: '联系邮箱', type: 'text' },
      { key: 'created_at', label: '创建时间', type: 'text' },
      { key: 'version', label: '版本', type: 'text' },
      { key: 'bei_an', label: '备案号', type: 'text' },
      { key: 'web', label: '站点地址', type: 'text', fullLine: true },
      { key: 'qq_image', label: 'QQ 图片', type: 'text', fullLine: true },
      { key: 'wechat_image', label: '微信图片', type: 'text', fullLine: true },
      { key: 'profile', label: '个人介绍', type: 'text', fullLine: true },
      { key: 'contact', label: '联系方式', type: 'text', fullLine: true },
      { key: 'service_url', label: '客服跳转地址', type: 'text', fullLine: true },
      { key: 'auto_crawl_fengfeng_articles', label: '自动抓取枫枫文章', type: 'bool' },
      { key: 'crawler_user_name', label: '系统员账号', type: 'text' },
      { key: 'crawler_nick_name', label: '系统员昵称', type: 'text' },
      { key: 'bilibili_url', label: 'Bilibili', type: 'text', fullLine: true },
      { key: 'gitee_url', label: 'Gitee', type: 'text', fullLine: true },
      { key: 'github_url', label: 'GitHub', type: 'text', fullLine: true }
    ]
  },
  news: {
    label: '资讯',
    fields: []
  }
}

const tabList = Object.entries(schemaMap).map(([name, item]) => ({
  name,
  label: item.label,
  fields: item.fields
}))

function buildDefaultForm(fields) {
  const form = {}
  for (const field of fields) {
    if (field.type === 'number') form[field.key] = 0
    else if (field.type === 'bool') form[field.key] = false
    else form[field.key] = ''
  }
  return form
}

const forms = reactive(
  Object.fromEntries(
    Object.entries(schemaMap).map(([name, item]) => [name, buildDefaultForm(item.fields)])
  )
)
forms.news = { enabled_source_ids: [], enabled_source_names: [] }

function normalizeEmailData(data) {
  const normalized = { ...data }
  if (typeof normalized.user_tls === 'undefined' && typeof normalized.use_tls !== 'undefined') {
    normalized.user_tls = normalized.use_tls
  }
  if (typeof normalized.use_tls === 'undefined' && typeof normalized.user_tls !== 'undefined') {
    normalized.use_tls = normalized.user_tls
  }
  return normalized
}

async function loadNewsSources() {
  try {
    const res = await apiGetNewsSourceList()
    newsSourceList.value = res.data || []
  } catch {
    newsSourceList.value = []
  }
}

async function loadConfigByName(name = activeTab.value) {
  loading.value = true
  try {
    if (name === 'news' && !newsSourceList.value.length) {
      await loadNewsSources()
    }
    if (name === 'es') {
      await loadESIndices()
    }

    const res = name === 'site_info' ? await apiGetSettings(name).catch(async () => apiGetPublicSiteInfo()) : await apiGetSettings(name)
    const rawData = res.data || {}
    const data = name === 'email' ? normalizeEmailData(rawData) : rawData

    if (name === 'news') {
      forms.news.enabled_source_ids = Array.isArray(data.enabled_source_ids) ? data.enabled_source_ids : []
      forms.news.enabled_source_names = Array.isArray(data.enabled_source_names) ? data.enabled_source_names : []
      return
    }

    Object.assign(forms[name], buildDefaultForm(schemaMap[name].fields), data)
  } catch (e) {
    ElMessage.error(`加载 ${schemaMap[name]?.label || name} 配置失败`)
  } finally {
    loading.value = false
  }
}

async function refreshCurrent() {
  await loadConfigByName(activeTab.value)
}

function buildPayload(name) {
  if (name === 'news') {
    return {
      enabled_source_ids: Array.isArray(forms.news.enabled_source_ids) ? forms.news.enabled_source_ids : [],
      enabled_source_names: Array.isArray(forms.news.enabled_source_names) ? forms.news.enabled_source_names : []
    }
  }

  const payload = { ...forms[name] }
  if (name === 'email') {
    payload.user_tls = Boolean(payload.user_tls ?? payload.use_tls)
    delete payload.use_tls
  }
  return payload
}

function formatSourceLabel(source) {
  const name = source?.name || '未命名来源'
  const type = source?.type || '未知类型'
  const category = source?.category || '未分类'
  const id = source?.id || ''
  return `${name} · ${type} · ${category} (${id})`
}

async function loadESIndices() {
  esIndexLoading.value = true
  try {
    const res = await apiGetESIndices()
    esIndexList.value = Array.isArray(res.data) ? res.data : []
    if (!esIndexList.value.some(item => item.name === selectedESIndex.value)) {
      selectedESIndex.value = esIndexList.value[0]?.name || ''
    }
  } catch (e) {
    esIndexList.value = []
    selectedESIndex.value = ''
    ElMessage.error(e?.response?.data?.msg || '获取 ES 索引列表失败')
  } finally {
    esIndexLoading.value = false
  }
}

function selectESIndex(row) {
  if (!row?.name) return
  selectedESIndex.value = row.name
}

async function exportSelectedESIndex() {
  if (!selectedESIndex.value) {
    ElMessage.warning('请先选择要导出的索引')
    return
  }
  esExporting.value = true
  try {
    const response = await apiExportESIndex(selectedESIndex.value)
    const { blob, fileName } = await resolveDownloadResponse(response)
    downloadBlob(blob, fileName || `${selectedESIndex.value}.json`)
    ElMessage.success('索引导出成功')
  } catch (e) {
    ElMessage.error(e?.message || '索引导出失败')
  } finally {
    esExporting.value = false
  }
}

async function importESIndexFile(option) {
  if (!selectedESIndexMeta.value?.import_supported) {
    const error = new Error('当前索引不支持页面导入')
    option?.onError?.(error)
    ElMessage.warning(error.message)
    return
  }
  esImporting.value = true
  lastImportFileName.value = option?.file?.name || ''
  try {
    const formData = new FormData()
    formData.append('index', selectedESIndex.value)
    formData.append('file', option.file)
    const res = await apiImportESIndex(formData)
    esImportResult.value = res.data || null
    option?.onSuccess?.(res)
    ElMessage.success(res.msg || '导入完成')
    await loadESIndices()
  } catch (e) {
    option?.onError?.(e)
    ElMessage.error(e?.response?.data?.msg || e?.message || '导入失败')
  } finally {
    esImporting.value = false
  }
}

async function resolveDownloadResponse(response) {
  const disposition = String(response?.headers?.['content-disposition'] || '')
  if (!disposition) {
    const text = await response.data.text()
    try {
      const payload = JSON.parse(text)
      throw new Error(payload?.msg || '导出失败')
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new Error('导出失败，返回内容无法识别')
      }
      throw e
    }
  }

  const blob = response.data instanceof Blob ? response.data : new Blob([response.data], { type: 'application/json' })
  const matched = disposition.match(/filename\*=UTF-8''([^;]+)|filename=\"?([^\";]+)\"?/i)
  const fileName = matched?.[1] ? decodeURIComponent(matched[1]) : (matched?.[2] || '')
  return { blob, fileName }
}

function downloadBlob(blob, fileName) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName || `export_${Date.now()}.json`
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
}

async function saveCurrent() {
  const name = activeTab.value
  saving.value = true
  try {
    await apiUpdateSetting(name, buildPayload(name))
    ElMessage.success('保存成功')
    await loadConfigByName(name)
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '保存失败')
  } finally {
    saving.value = false
  }
}

async function triggerFengfengSync() {
  // 管理员手动触发一次抓取，便于开关后立即验证效果。
  syncing.value = true
  try {
    const res = await apiSyncFengfengArticles()
    crawlStat.value = res?.data || null
    const created = Number(res?.data?.created || 0)
    const updatedCount = Number(res?.data?.updated_count || 0)
    const duplicateCount = Number(res?.data?.duplicate_count || 0)
    const failedCount = Number(res?.data?.failed_count || 0)
    const latestScanned = Number(res?.data?.latest_scanned || 0)
    ElMessage.success(`同步完成：扫描 ${latestScanned}，新增 ${created}，更新 ${updatedCount}，重复 ${duplicateCount}，失败 ${failedCount}`)
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '同步失败')
  } finally {
    syncing.value = false
  }
}

async function previewFengfengSync() {
  previewing.value = true
  try {
    const res = await apiPreviewFengfengArticles()
    crawlStat.value = res?.data || null
    const sourceTotal = Number(res?.data?.source_total || 0)
    const latestScanned = Number(res?.data?.latest_scanned || 0)
    const newCandidate = Number(res?.data?.new_candidate || 0)
    const duplicateCount = Number(res?.data?.duplicate_count || 0)
    ElMessage.success(`检索完成：来源 ${sourceTotal}，扫描 ${latestScanned}，可新增 ${newCandidate}，重复 ${duplicateCount}`)
  } catch (e) {
    ElMessage.error(e?.response?.data?.msg || '检索失败')
  } finally {
    previewing.value = false
  }
}

watch(activeTab, (name) => {
  loadConfigByName(name)
}, { immediate: true })

onMounted(() => {
  loadNewsSources()
})
</script>

<style scoped>
.setting-manage {
  max-width: 1060px;
  margin: 0 auto;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
}

.header-row strong {
  color: #1b3f64;
  font-size: 16px;
}

.header-row p {
  margin: 6px 0 0;
  font-size: 12px;
  color: #69839e;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2px 14px;
}

.full-line {
  grid-column: 1 / -1;
}

.form-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #7d91a9;
  line-height: 1.6;
}

.crawl-action-block {
  display: grid;
  gap: 8px;
}

.crawl-action-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.crawl-stat {
  font-size: 12px;
  color: #456b92;
  line-height: 1.7;
}

.es-tool-block {
  width: 100%;
  display: grid;
  gap: 12px;
}

.es-tool-head {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.es-tool-head strong,
.es-selected-info strong {
  color: #1b3f64;
}

.es-tool-head p {
  margin: 6px 0 0;
  font-size: 12px;
  color: #69839e;
  line-height: 1.7;
}

.es-index-table,
.es-failure-table {
  width: 100%;
}

.es-capability {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.es-action-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.es-selected-info {
  font-size: 13px;
  color: #456b92;
  line-height: 1.7;
}

.es-last-file {
  font-size: 12px;
  color: #69839e;
}

.es-import-result {
  display: grid;
  gap: 10px;
  border-radius: 12px;
  border: 1px solid #dce8f4;
  padding: 12px;
  background: #f8fbff;
}

.es-import-summary {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #456b92;
}

@media (max-width: 900px) {
  .header-row {
    flex-direction: column;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .es-tool-head,
  .es-action-bar {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
