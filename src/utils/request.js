// `src/utils/request.js` 是整个前端的统一请求层。
// 所有 API 文件最终都会复用这里导出的 axios 实例。
//
// 统一请求层的价值在于：
// 1. 所有接口共用 baseURL / timeout / headers；
// 2. 自动携带 token；
// 3. 统一处理后端业务码；
// 4. 统一处理 401/403/404/500 等 HTTP 错误；
// 5. 页面层只关心“成功时拿数据、失败时给提示”，不需要每次都写重复逻辑。
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import router from '@/router'

// 后端 code=401 一般意味着 token 失效或未登录。
const TOKEN_EXPIRED_CODES = [401]
const TOKEN_EXPIRED_MSG_PATTERNS = [
  'token',
  '未授权',
  '未登录',
  '未携带token',
  '登录已过期',
  'token已失效'
]

// 统一错误提示入口，后续如果想切换成通知、弹窗、日志上报，只改这里就行。
const showError = (message) => {
  ElMessage.error(message || '请求失败')
}

// 后端并不一定总是只靠 HTTP 401 表达“登录失效”；
// 有些接口会返回业务码或业务消息，所以这里额外做一层兼容判断。
const isAuthFailure = (code, message) => {
  if (TOKEN_EXPIRED_CODES.includes(code)) return true
  if (code !== 7) return false
  const text = String(message || '').toLowerCase()
  return TOKEN_EXPIRED_MSG_PATTERNS.some((pattern) => text.includes(String(pattern).toLowerCase()))
}

// redirectToLogin 统一处理“登录态失效”这一类场景。
// 好处是：不管哪个接口报 401，行为都一致，不会一个页面跳转、另一个页面却只是报错。
const redirectToLogin = (message = '登录已过期，请重新登录') => {
  const userStore = useUserStore()
  userStore.logout()

  if (router.currentRoute.value.path !== '/login') {
    router.push('/login')
  }

  showError(message)
}

// 创建 axios 实例，后续所有 API 模块都共用这一份配置。
const request = axios.create({
  // 开发环境通常通过 Vite 代理把 `/api` 转到后端；
  // 如果配置了完整的后端地址，也支持直接走绝对地址。
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

request.interceptors.request.use(
  (config) => {
    // 每次请求发出前，都从 localStorage 中读取最新 token。
    // 这样即使页面刷新，或者 store 还没恢复，也能先把 token 带上。
    const token = localStorage.getItem('token')
    if (token) {
      // 同时兼容两种后端取 token 的方式：
      // 1. 标准 `Authorization: Bearer xxx`
      // 2. 历史兼容 `token: xxx`
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
    // 文件下载、二进制流响应不走业务码判断，直接把原始响应还给调用方。
    if (response?.config?.responseType === 'blob' || response?.config?.responseType === 'arraybuffer') {
      return response
    }

    const payload = response.data || {}
    const { code, msg } = payload

    // 你的后端约定里，code=0 才是业务成功；没有 code 时也按普通成功响应处理。
    if (code === 0 || typeof code === 'undefined') {
      return payload
    }

    if (isAuthFailure(code, msg)) {
      redirectToLogin(msg)
      return Promise.reject(new Error(msg || '登录已过期'))
    }

    showError(msg)
    return Promise.reject(new Error(msg || '请求失败'))
  },
  (error) => {
    const { response } = error

    if (!response) {
      // 没有 response 一般意味着根本没打到后端：
      // 例如后端没启动、网络断开、跨域被拦截等。
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
