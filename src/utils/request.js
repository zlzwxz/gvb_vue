import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'

// 后端 res.Error = 7 为通用错误，401 通常为未授权
const TOKEN_EXPIRED_CODES = [401]

const showError = (message) => {
    ElMessage.error(message || '请求失败')
}

const redirectToLogin = (message = '登录已过期，请重新登录') => {
    const userStore = useUserStore()
    userStore.logout()

    if (router.currentRoute.value.path !== '/login') {
        router.push('/login')
    }

    showError(message)
}

// 创建 axios 实例
const request = axios.create({
    baseURL: '/api',
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json'
    }
})

request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        console.log(`[Request] ${config.method.toUpperCase()} ${config.url}`, token ? '(Has Token)' : '(No Token)')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
            config.headers.token = token
        }
        return config
    },
    (error) => {
        console.error('[Request Error]', error)
        return Promise.reject(error)
    }
)

request.interceptors.response.use(
    (response) => {
        const payload = response.data || {}
        const { code, msg } = payload
        console.log(`[Response] ${response.config.url} Code: ${code}`)

        if (code === 0 || typeof code === 'undefined') {
            return payload
        }

        if (TOKEN_EXPIRED_CODES.includes(code)) {
            redirectToLogin(msg)
            return Promise.reject(new Error(msg || '登录已过期'))
        }

        showError(msg)
        return Promise.reject(new Error(msg || '请求失败'))
    },
    (error) => {
        const { response } = error

        if (!response) {
            showError('网络连接失败，请检查网络')
            return Promise.reject(error)
        }

        switch (response.status) {
            case 401:
                redirectToLogin('未授权，请先登录')
                break
            case 403:
                showError('权限不足，无法访问')
                break
            case 404:
                showError('请求资源不存在')
                break
            case 500:
                showError('服务器内部错误')
                break
            default:
                showError(`请求错误：${response.status}`)
        }

        return Promise.reject(error)
    }
)

export default request
