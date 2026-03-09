<template>
  <div class="front-layout">
    <header class="header">
      <div class="header-inner">
        <div class="logo-area" @click="goHome">
          <span class="logo-main">{{ settings.site_name || settings.title || 'GVB 社区' }}</span>
          <span class="logo-sub">Community Forum</span>
        </div>

        <nav class="nav-menu">
          <a
            v-for="menu in menus"
            :key="menu.id"
            class="nav-item"
            :class="{ 'is-active': isActiveMenu(menu.path) }"
            @click="goToMenu(menu.path)"
          >
            {{ menu.title }}
          </a>
        </nav>

        <div class="header-right">
          <el-button class="publish-btn" type="primary" @click="goPublish">
            <el-icon><Plus /></el-icon>
            发布主题
          </el-button>
          <el-icon class="search-icon" @click="goTo('Search')"><Search /></el-icon>
          <span class="text-btn" @click="goTo('CommunityHub')">闲聊</span>
          <span class="text-btn" @click="goTo('BountyHub')">赏金</span>
          <span class="text-btn" @click="goTo('Games')">小游戏</span>
          <template v-if="!userStore.isLoggedIn">
            <span class="text-btn" @click="goTo('Login')">登录</span>
            <span class="text-btn" @click="goTo('Register')">注册</span>
          </template>
          <template v-else>
            <div class="user-block" @click="goTo('Profile')">
              <el-avatar :size="30" :src="$resolveImg(userStore.userInfo?.avatar)" />
              <span class="nick-name">{{ userStore.userInfo?.nick_name || userStore.userInfo?.user_name || '我的' }}</span>
            </div>
            <span class="text-btn" @click="goTo('PrivateMessages')">私信</span>
            <span class="text-btn admin" @click="goToAdmin">后台</span>
            <span class="text-btn logout" @click="handleLogout">退出</span>
          </template>
        </div>
      </div>

      <div class="metrics-strip" v-if="metrics.article_count > 0">
        <div class="metrics-inner">
          <div class="metric-item"><span>文章</span><strong>{{ metrics.article_count }}</strong></div>
          <div class="metric-item"><span>阅读</span><strong>{{ metrics.look_total || metrics.article_count * 10 }}</strong></div>
          <div class="metric-item"><span>互动</span><strong>{{ (metrics.comment_total || 0) + (metrics.digg_total || 0) }}</strong></div>
          <div class="metric-item"><span>今日登录</span><strong>{{ metrics.now_login_count || 0 }}</strong></div>
        </div>
      </div>
    </header>

    <main class="main-content">
      <section v-if="showFrontBreadcrumb" class="breadcrumb-panel">
        <div class="breadcrumb-bar">
          <el-button text class="breadcrumb-back" @click="goBackByBreadcrumb">
            <el-icon><ArrowLeft /></el-icon>
            返回上一级
          </el-button>
          <el-breadcrumb separator="/" class="breadcrumb-nav">
            <el-breadcrumb-item
              v-for="item in frontBreadcrumbs"
              :key="`${item.label}-${item.to || 'current'}`"
            >
              <a
                v-if="item.to && !item.current"
                href="#"
                class="breadcrumb-link"
                @click.prevent="goBreadcrumb(item.to)"
              >
                {{ item.label }}
              </a>
              <span v-else class="breadcrumb-current">{{ item.label }}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </section>
      <router-view />
    </main>

    <div class="float-nav">
      <el-button class="float-btn top-btn" type="primary" @click="scrollToTop" :disabled="!showFloatNav">
        <el-icon><ArrowUpBold /></el-icon>
        <span>回顶部</span>
      </el-button>
      <el-button class="float-btn bottom-btn" @click="scrollToBottom">
        <el-icon><ArrowDownBold /></el-icon>
        <span>到底部</span>
      </el-button>
    </div>

    <FriendFloatPanel />

    <footer class="footer">
      <div v-html="safeCopyright"></div>
      <div>{{ settings.site_icp || settings.bei_an }}</div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useSocialStore } from '@/stores/social'
import { ArrowDownBold, ArrowLeft, ArrowUpBold, Plus, Search } from '@element-plus/icons-vue'
import { apiGetMenuList } from '@/api/menu'
import { apiGetDataSum, apiGetPublicSiteInfo } from '@/api/system'
import { ElMessage } from 'element-plus'
import DOMPurify from 'dompurify'
import FriendFloatPanel from '@/components/social/FriendFloatPanel.vue'
import { buildFrontBreadcrumbs, resolveBreadcrumbFallback } from '@/utils/breadcrumb'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const socialStore = useSocialStore()

const menus = ref([])
const settings = ref({
  site_name: '',
  site_copyright: '',
  site_icp: ''
})

const metrics = ref({
  article_count: 0,
  look_total: 0,
  comment_total: 0,
  digg_total: 0,
  now_login_count: 0
})
const showFloatNav = ref(false)
const frontBreadcrumbs = computed(() => buildFrontBreadcrumbs(route))
const showFrontBreadcrumb = computed(() => route.name !== 'Home' && frontBreadcrumbs.value.length > 0)
const safeCopyright = computed(() => {
  const html = settings.value.site_copyright || settings.value.profile || ''
  return DOMPurify.sanitize(String(html), {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form'],
    ALLOW_UNKNOWN_PROTOCOLS: false
  })
})

async function fetchLayoutData() {
  try {
    const [menuRes, setRes, sumRes] = await Promise.all([
      apiGetMenuList({ size: 30 }),
      apiGetPublicSiteInfo(),
      apiGetDataSum()
    ])

    menus.value = (menuRes.data?.list || menuRes.data || []).sort((a, b) => Number(a.sort || 0) - Number(b.sort || 0))
    settings.value = setRes.data || {}
    const sum = sumRes.data || {}
    metrics.value = {
      article_count: sum.article_count || 0,
      look_total: sum.look_total || 0,
      comment_total: sum.comment_total || 0,
      digg_total: sum.digg_total || 0,
      now_login_count: sum.now_login_count || 0
    }
    document.title = settings.value.site_name || settings.value.title || 'GVB社区'
  } catch (e) {
    console.error('获取布局数据失败', e)
  }
}

function normalizePath(path) {
  if (!path || path === '/index') return '/'
  return path.replace(/\/+$/, '') || '/'
}

function isActiveMenu(path) {
  return normalizePath(route.path) === normalizePath(path)
}

function goHome() {
  router.push('/')
}

function goTo(name) {
  router.push({ name })
}

function goToMenu(path) {
  if (String(path).startsWith('http')) {
    window.open(path, '_blank')
    return
  }
  router.push(path)
}

function goBreadcrumb(target) {
  if (!target) return
  router.push(target)
}

function goBackByBreadcrumb() {
  const fallback = resolveBreadcrumbFallback(frontBreadcrumbs.value, '/')
  const back = window.history.state?.back
  if (typeof back === 'string' && back.startsWith('/')) {
    router.back()
    return
  }
  router.push(fallback)
}

function goPublish() {
  if (!userStore.isLoggedIn) {
    router.push({ path: '/login', query: { redirect: '/admin/article/edit' } })
    return
  }
  router.push('/admin/article/edit')
}

function goToAdmin() {
  router.push('/admin')
}

function handleLogout() {
  socialStore.stop()
  userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/')
}

function onScroll() {
  const top = window.scrollY || document.documentElement.scrollTop || 0
  showFloatNav.value = top > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function scrollToBottom() {
  const h = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  )
  window.scrollTo({ top: h, behavior: 'smooth' })
}

onMounted(() => {
  fetchLayoutData()
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

watch(
  () => userStore.isLoggedIn,
  async (value) => {
    if (value) {
      await socialStore.ensureStarted()
      return
    }
    socialStore.stop()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  socialStore.stop()
})
</script>

<style scoped>
.front-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
  z-index: 120;
  border-bottom: 1px solid #dce7f2;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
}

.header-inner,
.metrics-inner {
  max-width: 1260px;
  margin: 0 auto;
  padding: 0 16px;
}

.header-inner {
  height: 62px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 14px;
}

.logo-area {
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.logo-main {
  font-size: 18px;
  font-weight: 800;
  color: #12385c;
}

.logo-sub {
  font-size: 10px;
  color: #6c819b;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  white-space: nowrap;
}

.nav-item {
  font-size: 14px;
  color: var(--text-primary);
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
}

.nav-item:hover,
.nav-item.is-active {
  color: #0f7ea5;
  background: #eaf6fc;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.publish-btn {
  border-radius: 10px;
}

.search-icon {
  font-size: 18px;
  color: #45637f;
  cursor: pointer;
}

.user-block {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f4f9fc;
  border-radius: 999px;
  padding: 2px 8px;
  cursor: pointer;
}

.nick-name,
.text-btn {
  font-size: 13px;
  color: var(--text-secondary);
  cursor: pointer;
}

.text-btn.admin {
  color: #0f7ea5;
  font-weight: 700;
}

.text-btn.logout {
  color: #dc2626;
}

.metrics-strip {
  border-top: 1px solid #e7edf5;
  background: #f7fbff;
}

.metrics-inner {
  min-height: 34px;
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  padding-top: 5px;
  padding-bottom: 5px;
}

.metric-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  color: #4d6783;
}

.metric-item strong {
  color: #0f7ea5;
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 1260px;
  margin: 14px auto;
  padding: 0 12px;
}

.breadcrumb-panel {
  margin-bottom: 14px;
}

.breadcrumb-bar {
  border-radius: 14px;
  border: 1px solid #dce7f2;
  background: linear-gradient(180deg, #fbfdff 0%, #f4f9fd 100%);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.breadcrumb-back {
  padding: 0;
}

.breadcrumb-nav {
  min-width: 0;
}

.breadcrumb-link {
  color: #0f7ea5;
  text-decoration: none;
}

.breadcrumb-link:hover {
  color: #0a6381;
}

.breadcrumb-current {
  color: #4d6783;
}

.footer {
  text-align: center;
  padding: 20px;
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.7;
}

.float-nav {
  position: fixed;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 130;
  display: grid;
  gap: 10px;
}

.float-btn {
  min-width: 92px;
  height: 38px;
  font-size: 12px;
  border-radius: 999px;
  border: 1px solid #cfe1ef;
  box-shadow: 0 6px 16px rgba(17, 58, 92, 0.14);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.bottom-btn {
  background: #fff;
  color: #2f4f70;
}

.bottom-btn:hover {
  color: #0f7ea5;
  border-color: #a9cae3;
}

@media (max-width: 992px) {
  .header-inner {
    height: auto;
    padding-top: 8px;
    padding-bottom: 8px;
    grid-template-columns: 1fr;
  }

  .header-right {
    flex-wrap: wrap;
  }

  .breadcrumb-bar {
    align-items: flex-start;
  }

  .float-nav {
    right: 10px;
    top: auto;
    bottom: 14px;
    transform: none;
  }

  .float-btn {
    min-width: 84px;
    height: 34px;
    font-size: 11px;
  }
}
</style>
