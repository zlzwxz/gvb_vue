import request from '@/utils/request'

// ==================== 5. 标签管理接口 ====================
export const apiGetTagList = (params) => request.get('/tags', { params })
export const apiGetTagNameList = () => request.get('/tags/names')
export const apiCreateTag = (data) => request.post('/tags', data)
export const apiUpdateTag = (id, data) => request.put(`/tags/${id}`, data)
export const apiDeleteTag = (data) => request.delete('/tags', { data })
