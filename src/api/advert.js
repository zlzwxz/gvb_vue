import request from '@/utils/request'

// ==================== 7. 广告管理接口 ====================
export const apiGetAdvertList = (params) => request.get('/adverts', { params })
export const apiCreateAdvert = (data) => request.post('/adverts', data)
export const apiUpdateAdvert = (id, data) => request.put(`/adverts/${id}`, data)
export const apiDeleteAdvert = (data) => request.delete('/adverts', { data })
