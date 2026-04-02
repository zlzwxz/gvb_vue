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
            <span class="publish-text">发布主题</span>
          </el-button>
          <el-icon class="search-icon" @click="goTo('Search')"><Search /></el-icon>
          <el-button class="mobile-menu-btn" circle @click="openMobileMenu">
            <el-icon><MoreFilled /></el-icon>
          </el-button>

          <div class="desktop-actions">
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

    <el-drawer
      v-model="mobileMenuVisible"
      direction="rtl"
      size="86%"
      :with-header="false"
      append-to-body
    >
      <div class="mobile-menu">
        <div class="menu-head">
          <div class="menu-brand">
            <strong>{{ settings.site_name || settings.title || 'GVB 社区' }}</strong>
            <span>导航菜单</span>
          </div>
          <el-button class="menu-close" circle @click="mobileMenuVisible = false">
            <el-icon><Close /></el-icon>
          </el-button>
        </div>

        <section class="menu-section" v-if="menus.length">
          <div class="menu-title">站点菜单</div>
          <div class="menu-grid">
            <button
              v-for="menu in menus"
              :key="`m-${menu.id}`"
              type="button"
              class="menu-btn"
              @click="mobileGoToMenu(menu.path)"
            >
              {{ menu.title }}
            </button>
          </div>
        </section>

        <section class="menu-section">
          <div class="menu-title">快捷入口</div>
          <div class="menu-grid">
            <button type="button" class="menu-btn" @click="mobileGoTo('Search')">搜索</button>
            <button type="button" class="menu-btn" @click="mobileGoTo('CommunityHub')">闲聊广场</button>
            <button type="button" class="menu-btn" @click="mobileGoTo('BountyHub')">赏金大厅</button>
            <button type="button" class="menu-btn" @click="mobileGoTo('Games')">小游戏</button>
            <button type="button" class="menu-btn" @click="mobileGoPublish">发布主题</button>
          </div>
        </section>

        <section class="menu-section" v-if="!userStore.isLoggedIn">
          <div class="menu-title">账号</div>
          <div class="menu-grid">
            <button type="button" class="menu-btn" @click="mobileGoTo('Login')">登录</button>
            <button type="button" class="menu-btn" @click="mobileGoTo('Register')">注册</button>
          </div>
        </section>

        <section class="menu-section" v-else>
          <div class="menu-title">我的</div>
          <button type="button" class="menu-user" @click="mobileGoTo('Profile')">
            <el-avatar :size="38" :src="$resolveImg(userStore.userInfo?.avatar)" />
            <div class="menu-user-copy">
              <strong>{{ userStore.userInfo?.nick_name || userStore.userInfo?.user_name || '我的' }}</strong>
              <span>进入个人中心</span>
            </div>
          </button>
          <div class="menu-grid">
            <button type="button" class="menu-btn" @click="mobileGoTo('PrivateMessages')">私信</button>
            <button type="button" class="menu-btn" @click="mobileGoToAdmin">后台</button>
            <button type="button" class="menu-btn danger" @click="mobileLogout">退出登录</button>
          </div>
        </section>
      </div>
    </el-drawer>

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
      <section v-if="visibleFriendLinks.length" class="friend-links">
        <div class="friend-links-title">友情链接</div>
        <div class="friend-links-grid">
          <a
            v-for="(link, index) in visibleFriendLinks"
            :key="`${link.title}-${index}`"
            class="friend-link"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            :title="link.desc || link.title"
          >
            <img
              v-if="link.icon"
              class="friend-link-icon"
              :src="$resolveImg(link.icon)"
              :alt="link.title"
              loading="lazy"
            />
            <span class="friend-link-text">{{ link.title }}</span>
          </a>
        </div>
        <div v-if="icpText" class="friend-icp">
          备案号：
          <a class="icp-link" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">{{ icpText }}</a>
        </div>
      </section>

      <div class="footer-meta">
        <div v-html="safeCopyright"></div>
        <div v-if="icpText && !visibleFriendLinks.length" class="footer-icp">
          备案号：
          <a class="icp-link" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">{{ icpText }}</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useSocialStore } from '@/stores/social'
import { ArrowDownBold, ArrowLeft, ArrowUpBold, Close, MoreFilled, Plus, Search } from '@element-plus/icons-vue'
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
const mobileMenuVisible = ref(false)
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
const icpText = computed(() => String(settings.value.site_icp || settings.value.bei_an || '').trim())

function isSafeFriendLinkHref(value) {
  const href = String(value || '').trim()
  if (!href) return false
  // 防止把友情链接配置成危险协议（例如 javascript:）。
  if (/^(javascript:|data:|vbscript:)/i.test(href)) return false
  // 允许绝对 URL、协议相对 URL 或站内相对路径。
  return /^(https?:\/\/|\/\/|\/)/i.test(href)
}

const visibleFriendLinks = computed(() => {
  const rawList = settings.value?.friend_links || settings.value?.friendLinks || []
  const list = Array.isArray(rawList) ? rawList : []
  return list
    .map((item) => {
      const title = String(item?.title || item?.name || '').trim()
      const href = String(item?.href || item?.url || '').trim()
      const icon = String(item?.icon || item?.logo || item?.images || '').trim()
      const desc = String(item?.desc || item?.description || '').trim()
      const isShow = item?.is_show !== false && item?.isShow !== false
      return { title, href, icon, desc, isShow }
    })
    .filter((item) => item.isShow && item.title && item.href && isSafeFriendLinkHref(item.href))
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

function openMobileMenu() {
  mobileMenuVisible.value = true
}

function mobileGoTo(name) {
  mobileMenuVisible.value = false
  goTo(name)
}

function mobileGoToMenu(path) {
  mobileMenuVisible.value = false
  goToMenu(path)
}

function mobileGoPublish() {
  mobileMenuVisible.value = false
  goPublish()
}

function mobileGoToAdmin() {
  mobileMenuVisible.value = false
  goToAdmin()
}

function mobileLogout() {
  mobileMenuVisible.value = false
  handleLogout()
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
  padding-left: calc(16px + env(safe-area-inset-left));
  padding-right: calc(16px + env(safe-area-inset-right));
}

.header-inner {
  height: 62px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "logo nav right";
  align-items: center;
  gap: 14px;
}

.logo-area {
  grid-area: logo;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.logo-main {
  font-size: 18px;
  font-weight: 800;
  color: #12385c;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.logo-sub {
  font-size: 10px;
  color: #6c819b;
}

.nav-menu {
  grid-area: nav;
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  white-space: nowrap;
  min-width: 0;
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
  grid-area: right;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.publish-btn {
  border-radius: 10px;
}

.publish-text {
  display: inline-block;
}

.mobile-menu-btn {
  display: none;
  border: 1px solid #d3deea;
}

.desktop-actions {
  display: inline-flex;
  align-items: center;
  gap: 8px;
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
  padding-left: calc(12px + env(safe-area-inset-left));
  padding-right: calc(12px + env(safe-area-inset-right));
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
  padding-left: calc(20px + env(safe-area-inset-left));
  padding-right: calc(20px + env(safe-area-inset-right));
  color: var(--text-muted);
  font-size: 12px;
  line-height: 1.7;
  display: grid;
  gap: 12px;
  border-top: 1px solid #e7edf5;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.85), rgba(247, 251, 255, 0.9));
}

.footer-meta {
  display: grid;
  gap: 6px;
}

.friend-icp,
.footer-icp {
  font-size: 12px;
  color: #69839e;
  line-height: 1.7;
}

.icp-link {
  color: #0f7ea5;
  text-decoration: none;
}

.icp-link:hover {
  color: #0a6381;
}

.friend-links {
  display: grid;
  gap: 10px;
  justify-items: center;
}

.friend-links-title {
  font-size: 13px;
  font-weight: 800;
  color: #14385d;
  letter-spacing: 0.04em;
}

.friend-links-grid {
  width: min(1060px, 100%);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 10px;
}

.friend-link {
  max-width: 220px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid #dce7f2;
  background: #ffffff;
  color: #2d4a67;
}

.friend-link:hover {
  border-color: #a9cae3;
  background: #eaf6fc;
  color: #0f7ea5;
}

.friend-link-icon {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
  border: 1px solid rgba(214, 224, 236, 0.9);
  background: #f8fbff;
}

.friend-link-text {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.el-drawer) {
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
}

:deep(.el-drawer__body) {
  padding: 0;
}

.mobile-menu {
  min-height: 100%;
  padding: 16px;
  display: grid;
  gap: 16px;
  background:
    radial-gradient(circle at 15% 15%, rgba(15, 126, 165, 0.12), transparent 38%),
    radial-gradient(circle at 90% 80%, rgba(16, 150, 178, 0.12), transparent 34%),
    linear-gradient(180deg, rgba(248, 251, 255, 0.98), rgba(255, 255, 255, 0.98));
}

.menu-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.menu-brand strong {
  display: block;
  color: #12385c;
  font-size: 16px;
}

.menu-brand span {
  display: block;
  margin-top: 4px;
  color: #6c819b;
  font-size: 12px;
}

.menu-close {
  border: 1px solid #d3deea;
}

.menu-section {
  display: grid;
  gap: 10px;
}

.menu-title {
  font-size: 12px;
  font-weight: 800;
  color: #14385d;
  letter-spacing: 0.06em;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.menu-btn {
  width: 100%;
  border: 1px solid #dce7f2;
  background: #ffffff;
  color: #2f4f70;
  border-radius: 14px;
  padding: 12px 12px;
  text-align: left;
  font-size: 13px;
  cursor: pointer;
  transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;
}

.menu-btn:hover {
  border-color: #a9cae3;
  background: #eaf6fc;
  color: #0f7ea5;
}

.menu-btn.danger {
  border-color: rgba(220, 38, 38, 0.28);
  background: rgba(220, 38, 38, 0.06);
  color: #b91c1c;
}

.menu-btn.danger:hover {
  border-color: rgba(220, 38, 38, 0.45);
  background: rgba(220, 38, 38, 0.1);
  color: #991b1b;
}

.menu-user {
  width: 100%;
  border: 1px solid #dce7f2;
  background: #ffffff;
  border-radius: 16px;
  padding: 12px;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  cursor: pointer;
  text-align: left;
}

.menu-user:hover {
  border-color: #a9cae3;
  background: #eaf6fc;
}

.menu-user-copy {
  min-width: 0;
  display: grid;
  gap: 4px;
}

.menu-user-copy strong {
  color: #12385c;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.menu-user-copy span {
  color: #6c819b;
  font-size: 12px;
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
    padding-top: 10px;
    padding-bottom: 10px;
    grid-template-columns: 1fr auto;
    grid-template-areas: "logo right";
    gap: 10px;
  }

  .logo-sub {
    display: none;
  }

  .nav-menu {
    display: none;
  }

  .publish-btn {
    height: 34px;
    padding: 0 12px;
    border-radius: 999px;
  }

  .publish-text {
    display: none;
  }

  .search-icon {
    font-size: 19px;
  }

  .mobile-menu-btn {
    display: inline-flex;
  }

  .desktop-actions {
    display: none;
  }

  .breadcrumb-bar {
    align-items: flex-start;
  }

  .float-nav {
    right: 10px;
    top: auto;
    bottom: calc(14px + env(safe-area-inset-bottom));
    transform: none;
  }

  .float-btn {
    min-width: 84px;
    height: 34px;
    font-size: 11px;
  }

  .friend-link {
    max-width: 46vw;
  }

  .friend-links-grid {
    justify-content: flex-start;
  }
}

@media (max-width: 420px) {
  .menu-grid {
    grid-template-columns: 1fr;
  }
}
</style>
