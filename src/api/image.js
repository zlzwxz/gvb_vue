import request from '@/utils/request'

// ==================== 6. 图片管理接口 ====================
export const apiUploadImage = (formData) => request.post('/images', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
})
export const apiGetImageMeta = () => request.get('/images/meta')
export const apiGetImageList = (params) => request.get('/images', { params })
export const apiUpdateImage = (data) => request.put('/images', data)
export const apiDeleteImage = (data) => request.delete('/images', { data })
