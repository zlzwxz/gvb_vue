import request from '@/utils/request'

// ==================== 9. 消息管理接口 ====================
export const apiGetMessageList = (params) => request.get('/messages', { params })
export const apiGetAllMessages = (params) => request.get('/messages_all', { params })
export const apiCreateMessage = (data) => request.post('/messages', data)
export const apiGetMessageRecord = (params) => request.get('/messages_record', { params })
