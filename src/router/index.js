import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { useUserStore } from '@/stores/user'

// ==================== 前台路由 ====================
const frontRoutes = [
    {
        path: '/',
        component: () => import('@/layouts/FrontLayout.vue'),
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('@/views/front/HomeView.vue'),
                meta: { title: '首页' }
            },
            {
                path: 'article/:id',
                name: 'ArticleDetail',
                component: () => import('@/views/front/ArticleDetailView.vue'),
                meta: { title: '文章详情' }
            },
            {
                path: 'search',
                name: 'Search',
                component: () => import('@/views/front/SearchView.vue'),
                meta: { title: '搜索结果' }
            },
            {
                path: 'news',
                name: 'News',
                component: () => import('@/views/front/NewsView.vue'),
                meta: { title: '最新资讯' }
            },
            {
                path: 'chat',
                name: 'ChatRoom',
                component: () => import('@/views/front/ChatRoomView.vue'),
                meta: { title: '公共聊天室' }
            },
            {
                path: 'profile',
                name: 'Profile',
                component: () => import('@/views/front/ProfileView.vue'),
                meta: { title: '个人中心', requiresAuth: true }
            },
            {
                path: 'collect',
                name: 'Collect',
                component: () => import('@/views/front/CollectView.vue'),
                meta: { title: '我的收藏', requiresAuth: true }
            }
        ]
    }
]

// ==================== 后台路由 ====================
const adminRoutes = [
    {
        path: '/admin',
        component: () => import('@/layouts/AdminLayout.vue'),
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                redirect: '/admin/dashboard'
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('@/views/admin/DashboardView.vue'),
                meta: { title: '仪表盘', icon: 'DataLine' }
            },
            {
                path: 'users',
                name: 'UserManage',
                component: () => import('@/views/admin/UserManageView.vue'),
                meta: { title: '用户管理', icon: 'User', requiresAdmin: true }
            },
            {
                path: 'articles',
                name: 'ArticleManage',
                component: () => import('@/views/admin/ArticleManageView.vue'),
                meta: { title: '文章管理', icon: 'Document' }
            },
            {
                path: 'article/edit',
                name: 'ArticleEdit',
                component: () => import('@/views/admin/ArticleEditView.vue'),
                meta: { title: '编辑文章', icon: 'Edit' }
            },
            {
                path: 'tags',
                name: 'TagManage',
                component: () => import('@/views/admin/TagManageView.vue'),
                meta: { title: '标签管理', icon: 'PriceTag', requiresAdmin: true }
            },
            {
                path: 'images',
                name: 'ImageManage',
                component: () => import('@/views/admin/ImageManageView.vue'),
                meta: { title: '图片库', icon: 'Picture' }
            },
            {
                path: 'adverts',
                name: 'AdvertManage',
                component: () => import('@/views/admin/AdvertManageView.vue'),
                meta: { title: '广告管理', icon: 'Promotion', requiresAdmin: true }
            },
            {
                path: 'menus',
                name: 'MenuManage',
                component: () => import('@/views/admin/MenuManageView.vue'),
                meta: { title: '菜单管理', icon: 'Menu', requiresAdmin: true }
            },
            {
                path: 'messages',
                name: 'MessageManage',
                component: () => import('@/views/admin/MessageManageView.vue'),
                meta: { title: '消息管理', icon: 'Message' }
            },
            {
                path: 'comments',
                name: 'CommentManage',
                component: () => import('@/views/admin/CommentManageView.vue'),
                meta: { title: '评论管理', icon: 'ChatDotRound', requiresAdmin: true }
            },
            {
                path: 'chats',
                name: 'ChatManage',
                component: () => import('@/views/admin/ChatManageView.vue'),
                meta: { title: '聊天管理', icon: 'ChatLineSquare', requiresAdmin: true }
            },
            {
                path: 'logs',
                name: 'LogManage',
                component: () => import('@/views/admin/LogManageView.vue'),
                meta: { title: '日志管理', icon: 'Tickets', requiresAdmin: true }
            },
            {
                path: 'settings',
                name: 'SettingManage',
                component: () => import('@/views/admin/SettingManageView.vue'),
                meta: { title: '系统设置', icon: 'Setting', requiresAdmin: true }
            }
        ]
    }
]

// ==================== 独立路由 ====================
const standaloneRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/LoginView.vue'),
        meta: { title: '登录' }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/RegisterView.vue'),
        meta: { title: '注册' }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFoundView.vue'),
        meta: { title: '页面不存在' }
    }
]

// ==================== 创建路由实例 ====================
const router = createRouter({
    history: createWebHistory(),
    routes: [...frontRoutes, ...adminRoutes, ...standaloneRoutes],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        return { top: 0 }
    }
})

router.beforeEach(async (to, from, next) => {
    NProgress.start()

    document.title = to.meta.title ? `${to.meta.title} - GVB博客` : 'GVB博客'

    const userStore = useUserStore()

    if (userStore.isLoggedIn && !userStore.userInfo) {
        await userStore.fetchUserInfo()
    }

    if (to.meta.requiresAuth && !userStore.isLoggedIn) {
        next({ path: '/login', query: { redirect: to.fullPath } })
        return
    }

    if (to.meta.requiresAdmin && !userStore.isAdmin) {
        next({ path: '/' })
        return
    }

    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
