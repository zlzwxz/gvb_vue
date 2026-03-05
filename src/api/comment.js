import request from '@/utils/request'

// ==================== 4. 评论管理接口 ====================
export const apiGetCommentList = (params) => request.get('/comments', { params })
export const apiCreateComment = (data) => request.post('/comments', data)
export const apiDeleteComment = (id) => request.delete(`/comments/${id}`)
export const apiDiggComment = (id) => request.get(`/comments/${id}`)
