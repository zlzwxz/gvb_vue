import request from '@/utils/request'

// ==================== 8. 菜单管理接口 ====================
export const apiGetMenuList = (params) => request.get('/menus', { params })
export const apiGetMenuNameList = () => request.get('/menu_names')
export const apiCreateMenu = (data) => request.post('/menus', data)
export const apiUpdateMenu = (data) => request.put('/menus', data)
export const apiDeleteMenu = (data) => request.delete('/menus', { data })
