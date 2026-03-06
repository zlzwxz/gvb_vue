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
    console.error('[Store] Decode JWT failed', e)
    return null
  }
}

// 用户状态 Store：集中管理 token、当前用户信息，以及和登录态相关的计算属性。
export const useUserStore = defineStore('user', () => {
  // token 从 localStorage 初始化，这样刷新页面后不会立刻掉登录态。
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)

  const isLoggedIn = computed(() => !!token.value)

  // 是否管理员优先以后端 userInfo 为准；如果当前页还没拉到 userInfo，再退回 JWT payload 兜底判断。
  const isAdmin = computed(() => {
    let r = userInfo.value?.role

    if (r === undefined || r === null) {
      r = decodeTokenPayload(token.value)?.role
      console.log('[Store] isAdmin check, role from JWT:', r)
    } else {
      console.log('[Store] isAdmin check, role from userInfo:', r)
    }

    return r === 1 || r === '1' || r === '管理员' || r === 'admin'
  })

  // currentUserId 也是同样的思路：先看 userInfo，没有就从 token 里兜底解析。
  const currentUserId = computed(() => {
    const id = userInfo.value?.id ?? decodeTokenPayload(token.value)?.user_id
    return Number(id) || 0
  })

  function setToken(val) {
    token.value = val
    localStorage.setItem('token', val)
  }

  // fetchUserInfo 把用户信息拉回来并缓存到 store，后续页面就可以直接复用。
  async function fetchUserInfo() {
    console.log('[Store] Fetching user info...')
    try {
      const res = await apiGetUserInfo()
      console.log('[Store] User info received:', res.data)
      userInfo.value = res.data
    } catch (e) {
      console.error('[Store] Fetch user info failed:', e)
    }
  }

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
