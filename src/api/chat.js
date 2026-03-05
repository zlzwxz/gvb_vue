import request from '@/utils/request'

// ==================== 11. 聊天管理接口 ====================
export const apiGetChatList = (params) => request.get('/chat_groups', { params })
export const apiCreateChatGroup = (data) => request.post('/chat_group', data)
