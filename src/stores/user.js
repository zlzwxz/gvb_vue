import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiGetUserInfo } from '@/api/user'

// 用户状态 Store
export const useUserStore = defineStore('user', () => {
    // ==================== 状态 ====================
    // token 从 localStorage 初始化，保持刷新后登录状态
    const token = ref(localStorage.getItem('token') || '')
    // 当前登录用户信息
    const userInfo = ref(null)

    // ==================== 计算属性 ====================
    // 是否已登录
    const isLoggedIn = computed(() => !!token.value)
    // 是否是管理员（管理员判断由后端返回的 role 字段决定）
    // 是否是管理员（管理员判断由后端返回的 role 字段决定）
    const isAdmin = computed(() => {
        // 优先从 userInfo 取，如果没取到（后端 json-filter 过滤了），尝试从 token payload 解析
        let r = userInfo.value?.role

        if (r === undefined || r === null) {
            try {
                const parts = token.value.split('.')
                if (parts.length === 2 || parts.length === 3) {
                    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
                    r = payload.role
                    console.log('[Store] isAdmin check, role from JWT:', r)
                }
            } catch (e) {
                console.error('[Store] Decode JWT failed', e)
            }
        } else {
            console.log('[Store] isAdmin check, role from userInfo:', r)
        }

        return r === 1 || r === '1' || r === '管理员' || r === 'admin'
    })

    // ==================== 方法 ====================
    /**
     * 设置 token 并持久化到 localStorage
     * @param {string} val - JWT token 字符串
     */
    function setToken(val) {
        token.value = val
        localStorage.setItem('token', val)
    }

    /**
     * 获取并缓存用户信息
     */
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

    /**
     * 退出登录：清除 token 和用户信息
     */
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
        setToken,
        fetchUserInfo,
        logout
    }
})
