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
    const isAdmin = computed(() => {
        const r = userInfo.value?.role || userInfo.value?.role_id
        return Number(r) === 1 || r === '管理员' || r === 'admin' || r === 1
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
        try {
            const res = await apiGetUserInfo()
            userInfo.value = res.data
        } catch (e) {
            console.error('获取用户信息失败', e)
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
