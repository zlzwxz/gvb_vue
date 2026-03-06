import request from '@/utils/request'

// ==================== 1. 认证相关接口 ====================
export const apiEmailLogin = (data) => request.post('/email_login', data)
export const apiQQLogin = (code) => request.post('/qq_login', null, { params: { code } })
export const apiLogout = () => request.post('/logout')

// ==================== 2. 用户管理接口 ====================
export const apiGetUserList = (params) => request.get('/users', { params })
export const apiUpdateUserRole = (data) => request.put('/user_role', data)
export const apiUpdateUserPassword = (data) => request.put('/user_password', data)
export const apiDeleteUsers = (data) => request.delete('/users', { data })
export const apiBindEmail = (data) => request.post('/user_bind_email', data)
export const apiRegister = (data) => request.post('/user_create', data)
export const apiSendRegisterEmailCode = (data) => request.post('/user_register_email_code', data)
export const apiGetUserInfo = () => request.get('/user_info')
export const apiUpdateUserNickName = (data) => request.put('/user_update_nick_name', data)
export const apiGetQQLoginPath = () => request.get('/qq_login_path')
export const apiUserCheckIn = () => request.post('/user_check_in')
export const apiGetUserCheckInStatus = () => request.get('/user_check_in_status')
export const apiGetUserLevelRank = (params) => request.get('/user_level_rank', { params })
