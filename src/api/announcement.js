import request from '@/utils/request'

export const apiGetAnnouncementList = (params) => request.get('/announcements', { params })
export const apiGetAnnouncementManageList = (params) => request.get('/announcements/manage', { params })
export const apiCreateAnnouncement = (data) => request.post('/announcements', data)
export const apiUpdateAnnouncement = (id, data) => request.put(`/announcements/${id}`, data)
export const apiDeleteAnnouncement = (data) => request.delete('/announcements', { data })
