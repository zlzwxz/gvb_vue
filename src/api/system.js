import request from '@/utils/request'

// ==================== 12. 日志管理接口 ====================
export const apiGetLogList = (params) => request.get('/logs', { params })
export const apiDeleteLog = (data) => request.delete('/logs', { data })

// ==================== 13. 数据统计接口 ====================
export const apiGetDataSum = () => request.get('/data_sum')
export const apiGetAdminDataSum = () => request.get('/data_sum/admin')
export const apiGetSevenLoginData = () => request.get('/data_login')

// ==================== 14. 系统设置接口 ====================
export const apiGetSettings = (name) => request.get(`/settings/${name}`)
export const apiUpdateSetting = (name, data) => request.put(`/settings/${name}`, data)
export const apiGetPublicSiteInfo = () => request.get('/settings/public/site_info')
export const apiGetESIndices = () => request.get('/settings/es/indices')
export const apiExportESIndex = (index) => request.get('/settings/es/export', {
  params: { index },
  responseType: 'blob',
  timeout: 60000
})
export const apiImportESIndex = (formData) => request.post('/settings/es/import', formData, {
  timeout: 300000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
const crawlPreviewConfig = {
  timeout: 60000,
  timeoutErrorMessage: '检索超时，请缩小检索范围后重试'
}

const crawlSyncConfig = {
  timeout: 180000,
  timeoutErrorMessage: '抓取超时，请缩小抓取范围后重试'
}

export const apiPreviewFengfengArticles = (params = {}) => request.get('/settings/site_info/sync_fengfeng_preview', {
  params,
  ...crawlPreviewConfig
})
export const apiSyncFengfengArticles = (data = {}) => request.post('/settings/site_info/sync_fengfeng', data, crawlSyncConfig)
export const apiPreviewFengfengImages = () => request.get('/settings/site_info/sync_fengfeng_images_preview', crawlPreviewConfig)
export const apiSyncFengfengImages = (data = {}) => request.post('/settings/site_info/sync_fengfeng_images', data, crawlSyncConfig)

// ==================== 15. 新闻管理接口 ====================
export const apiGetNewsList = (params) => request.get('/news', { params })
export const apiGetNewsSourceList = () => request.get('/news/sources')

