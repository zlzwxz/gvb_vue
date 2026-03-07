// `src/router/index.js` 负责定义整个前端的页面地图。
// 你可以把它理解成“地址栏 -> 页面组件”的对应关系表。
//
// 一个完整的路由系统通常要回答 4 个问题：
// 1. 有哪些页面？
// 2. 某个 URL 应该渲染哪个组件？
// 3. 进入这个页面前是否需要登录/管理员权限？
// 4. 页面切换时标题、滚动条、进度条该怎么处理？
import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { useUserStore } from '@/stores/user'

// 前台路由：普通访客和登录用户都可能访问的页面。
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
        path: 'board/:key',
        name: 'BoardDetail',
        component: () => import('@/views/front/BoardDetailView.vue'),
        meta: { title: '板块' }
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
        path: 'games',
        name: 'Games',
        component: () => import('@/views/front/GameHubView.vue'),
        meta: { title: '小游戏' }
      },
      {
        path: 'chat',
        name: 'ChatRoom',
        component: () => import('@/views/front/ChatRoomView.vue'),
        meta: { title: '公共聊天室' }
      },
      {
        path: 'messages',
        name: 'PrivateMessages',
        component: () => import('@/views/front/PrivateMessageView.vue'),
        meta: { title: '我的私信', requiresAuth: true }
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@/views/front/ProfileView.vue'),
        meta: { title: '个人中心', requiresAuth: true }
      },
      {
        path: 'space/:id',
        name: 'UserSpace',
        component: () => import('@/views/front/UserSpaceView.vue'),
        meta: { title: '用户空间' }
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

// 后台路由：需要先登录，部分页面还要求管理员权限。
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
        path: 'article/review',
        name: 'ArticleReview',
        component: () => import('@/views/admin/ArticleReviewView.vue'),
        meta: { title: '文章审核', icon: 'DocumentChecked' }
      },
      {
        path: 'article/reports',
        name: 'ArticleReport',
        component: () => import('@/views/admin/ArticleReportView.vue'),
        meta: { title: '文章举报', icon: 'WarningFilled' }
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
        path: 'boards',
        name: 'BoardManage',
        component: () => import('@/views/admin/BoardManageView.vue'),
        meta: { title: '板块管理', icon: 'Grid', requiresAdmin: true }
      },
      {
        path: 'socials',
        name: 'SocialManage',
        component: () => import('@/views/admin/SocialManageView.vue'),
        meta: { title: '好友管理', icon: 'User', requiresAdmin: true }
      },
      {
        path: 'announcements',
        name: 'AnnouncementManage',
        component: () => import('@/views/admin/AnnouncementManageView.vue'),
        meta: { title: '公告管理', icon: 'Bell', requiresAdmin: true }
      },
      {
        path: 'messages',
        name: 'MessageManage',
        component: () => import('@/views/admin/MessageManageView.vue'),
        meta: { title: '消息管理', icon: 'Message' }
      },
      {
        path: 'collects',
        name: 'CollectManage',
        component: () => import('@/views/admin/CollectManageView.vue'),
        meta: { title: '收藏管理', icon: 'CollectionTag' }
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
      },
      {
        path: 'material/articles',
        name: 'ArticleMaterial',
        component: () => import('@/views/admin/ArticleMaterialView.vue'),
        meta: { title: '文章素材', icon: 'DocumentAdd', requiresAdmin: true }
      },
      {
        path: 'material/images',
        name: 'ImageMaterial',
        component: () => import('@/views/admin/ImageMaterialView.vue'),
        meta: { title: '图片素材', icon: 'PictureFilled', requiresAdmin: true }
      }
    ]
  }
]

// 独立路由：不挂前后台布局的页面。
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

const router = createRouter({
  // 使用浏览器原生 History 模式，因此地址会是 `/login`、`/admin/users` 这种干净路径，
  // 而不是 `/#/login` 这种 hash 路径。
  history: createWebHistory(),
  routes: [...frontRoutes, ...adminRoutes, ...standaloneRoutes],
  scrollBehavior(to, from, savedPosition) {
    // 浏览器“前进/后退”时，优先恢复原来的滚动位置。
    if (savedPosition) return savedPosition
    // 普通跳转时回到页面顶部，避免用户在新页面还停留在旧页面滚动位置。
    return { top: 0 }
  }
})

// 全局前置守卫：统一做标题设置、用户信息懒加载、登录鉴权、管理员鉴权。
router.beforeEach(async (to, from, next) => {
  // 页面一开始切换，就启动顶部进度条。
  NProgress.start()

  // 根据路由元信息设置浏览器标题。
  // 这里约定：每个页面在 `meta.title` 里声明自己的标题。
  document.title = to.meta.title ? `${to.meta.title} - GVB社区` : 'GVB社区'

  const userStore = useUserStore()

  // 刷新页面后，token 还在，但 userInfo 可能丢了，所以这里兜底补拉一次。
  if (userStore.isLoggedIn && !userStore.userInfo) {
    await userStore.fetchUserInfo()
  }

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    // 未登录用户访问受保护页面时，先跳去登录页，
    // 并把原始目标地址记到 `redirect`，登录成功后可以再跳回来。
    next({ path: '/login', query: { redirect: to.fullPath } })
    return
  }

  if (to.meta.requiresAdmin && !userStore.isAdmin) {
    // 不是管理员时，直接打回首页。
    next({ path: '/' })
    return
  }

  // 以上条件都通过后，放行进入目标页面。
  next()
})

router.afterEach(() => {
  // 页面切换结束后，关闭顶部进度条。
  NProgress.done()
})

export default router
