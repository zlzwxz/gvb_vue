import request from '@/utils/request'

export const apiGetBoardList = (params) => request.get('/boards', { params })
export const apiCreateBoard = (data) => request.post('/boards', data)
export const apiUpdateBoard = (data) => request.put('/boards', data)
export const apiDeleteBoard = (data) => request.delete('/boards', { data })
