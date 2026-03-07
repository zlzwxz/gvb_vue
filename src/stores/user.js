// `src/stores/user.js` 用来集中管理“登录态”。
// 这是前端最重要的 store 之一，主要负责：
// 1. 保存 token；
// 2. 保存当前登录用户资料；
// 3. 提供是否登录、是否管理员、当前用户 ID 等计算属性；
// 4. 提供登录后拉取用户资料、退出登录等动作。
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiGetUserInfo } from '@/api/user'

// decodeTokenPayload 只做“尽力解析”。
// 解析失败时返回 null，而不是直接抛错把整个页面打断。
function decodeTokenPayload(tokenValue) {
  if (!tokenValue) return null
  try {
    const parts = tokenValue.split('.')
    if (parts.length < 2) return null
    return JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
  } catch (e) {
    return null
  }
}

// 用户状态 Store：集中管理 token、当前用户信息，以及和登录态相关的计算属性。
export const useUserStore = defineStore('user', () => {
  // token 从 localStorage 初始化，这样刷新页面后不会立刻掉登录态。
  const token = ref(localStorage.getItem('token') || '')
  // `userInfo` 保存当前登录用户的完整资料，由后端接口返回。
  const userInfo = ref(null)

  // 只要本地还保存着 token，就先认为“处于登录态”。
  // 真正是否过期，会在请求拦截器和后端鉴权中进一步确认。
  const isLoggedIn = computed(() => !!token.value)

  // 是否管理员优先以后端 userInfo 为准；如果当前页还没拉到 userInfo，再退回 JWT payload 兜底判断。
  const isAdmin = computed(() => {
    let r = userInfo.value?.role

    if (r === undefined || r === null) {
      r = decodeTokenPayload(token.value)?.role
    }

    return r === 1 || r === '1' || r === '管理员' || r === 'admin'
  })

  // currentUserId 也是同样的思路：先看 userInfo，没有就从 token 里兜底解析。
  const currentUserId = computed(() => {
    const id = userInfo.value?.id ?? decodeTokenPayload(token.value)?.user_id
    return Number(id) || 0
  })

  // `setToken` 通常在登录成功后调用。
  // 它会同时更新 Pinia 内存状态和浏览器本地存储。
  function setToken(val) {
    token.value = val
    localStorage.setItem('token', val)
  }

  // fetchUserInfo 把用户信息拉回来并缓存到 store，后续页面就可以直接复用。
  async function fetchUserInfo() {
    try {
      const res = await apiGetUserInfo()
      userInfo.value = res.data
    } catch (e) {
      // 获取失败时不要把异常继续抛到全局，避免单次接口失败把整个路由守卫打断。
      userInfo.value = null
    }
  }

  // `logout` 是退出登录的统一出口。
  // 无论是用户主动退出，还是 token 过期被动登出，都走这里。
  function logout() {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    isAdmin,
    currentUserId,
    setToken,
    fetchUserInfo,
    logout
  }
})
