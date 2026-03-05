import request from '@/utils/request'

// ==================== 12. 日志管理接口 ====================
export const apiGetLogList = (params) => request.get('/logs', { params })
export const apiDeleteLog = (data) => request.delete('/logs', { data })

// ==================== 13. 数据统计接口 ====================
export const apiGetDataSum = () => request.get('/data_sum')
export const apiGetSevenLoginData = () => request.get('/data_login')

// ==================== 14. 系统设置接口 ====================
export const apiGetSettings = (name) => request.get(`/settings/${name}`)
export const apiUpdateSetting = (name, data) => request.put(`/settings/${name}`, data)

// ==================== 15. 新闻管理接口 ====================
export const apiGetNewsList = (params) => request.get('/news', { params })
