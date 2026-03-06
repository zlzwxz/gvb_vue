import request from '@/utils/request'

// ==================== 3. 文章管理接口 & 10. 点赞接口 ====================
export const apiGetArticleList = (params) => request.get('/articles', { params })
export const apiGetArticleDetail = (id) => request.get(`/articles/${id}`)
export const apiGetArticleContent = (id) => request.get(`/articles/content/${id}`)
export const apiCreateArticle = (data) => request.post('/articles', data)
export const apiUpdateArticle = (data) => request.put('/articles', data)
export const apiDeleteArticle = (data) => request.delete('/articles', { data })
export const apiReviewArticle = (data) => request.put('/articles/review', data)
export const apiGetArticleCategoryList = () => request.get('/articles/categorys')
export const apiGetArticleTagList = () => request.get('/articles/tags')
export const apiCollectArticle = (data) => request.post('/articles/collects', data)
export const apiGetCollectList = (params) => request.get('/articles/collects', { params })
export const apiRemoveCollectBatch = (data) => request.delete('/articles/collects/batch', { data })
export const apiFullTextSearch = (params) => request.get('/article/text', { params })
export const apiGetArticleTOC = (id) => request.get(`/article/text?id=${id}`)

export const apiDiggArticle = (data) => request.post('/article/digg', data)

export const apiGetCollectManageList = (params) => request.get('/articles/collects/manage', { params })
export const apiRemoveCollectManageBatch = (data) => request.delete('/articles/collects/manage', { data })


export const apiGetArticleInsights = (params) => request.get('/articles/insights', { params })
export const apiUploadArticleFile = (formData) => request.post('/files', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
})

