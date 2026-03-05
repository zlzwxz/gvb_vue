<template>
  <div class="front-layout">
    <header class="header">
      <div class="header-inner">
        <div class="logo-area" @click="goHome">
          <span class="logo-main">{{ settings.site_name || '枫枫知道' }}</span>
          <span class="logo-sub">FFENGZHIDAO</span>
        </div>
        <div class="nav-menu">
          <a v-for="menu in menus" :key="menu.id" 
             @click="goToMenu(menu.path)" 
             class="nav-item"
             :class="{'is-active': $route.path === menu.path || ($route.path === '/' && menu.path === '/index') }">
            {{ menu.title }}
          </a>
        </div>
        <div class="header-right">
          <el-icon class="search-icon" @click="goTo('Search')"><Search /></el-icon>
          <div class="user-action">
            <template v-if="!userStore.isLoggedIn">
              <span @click="goTo('Login')" class="login-text">登录</span>
              <span @click="goTo('Register')" class="login-text" style="margin-left: 12px">注册</span>
            </template>
            <template v-else>
              <div class="logged-in-area">
                <div class="user-block" @click="goTo('Profile')">
                  <el-avatar :size="32" :src="$resolveImg(userStore.userInfo?.avatar)" />
                  <span class="nick-name">{{ userStore.userInfo?.nick_name || userStore.userInfo?.user_name || '我的' }}</span>
                </div>
                <span class="nav-btn admin-btn" @click="goToAdmin">后台管理</span>
                <span class="nav-btn logout-btn" @click="handleLogout">注销</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </header>
    <main class="main-content">
      <router-view />
    </main>
    <footer class="footer">
      <div v-html="settings.site_copyright"></div>
      <div>{{ settings.site_icp }}</div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Search, ArrowDown } from '@element-plus/icons-vue'
import { apiGetMenuList } from '@/api/menu'
import { apiGetSettings } from '@/api/system'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const menus = ref([])
const settings = ref({
  site_name: '',
  site_copyright: '',
  site_icp: ''
})

async function fetchLayoutData() {
  try {
    const [menuRes, setRes] = await Promise.all([
      apiGetMenuList({ size: 10 }),
      apiGetSettings('site')
    ])
    // Filter and sort menus to show only visible ones
    menus.value = (menuRes.data?.list || menuRes.data || []).sort((a,b) => a.sort - b.sort)
    settings.value = setRes.data || {}
    document.title = settings.value.site_name || 'GVB博客'
  } catch (e) {
    console.error('获取基础配置失败', e)
  }
}

function goHome() { router.push('/') }
function goTo(name) { router.push({ name }) }
function goToMenu(path) {
  if (path.startsWith('http')) {
    window.open(path, '_blank')
  } else {
    router.push(path)
  }
}

function handleUserCommand(command) {
  if (command === 'logout') {
    userStore.logout()
    ElMessage.success('已退出登录')
    router.push('/')
  } else if (command === 'admin') {
    router.push('/admin')
  } else if (command === 'profile') {
    router.push('/profile')
  }
}

function handleLogout() {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/')
}

function goToAdmin() {
  router.push('/admin')
}

onMounted(() => {
  fetchLayoutData()
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
  z-index: 100;
  background-color: var(--bg-card);
  border-bottom: 1px solid var(--border-color);
  height: 60px;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.logo-area {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.logo-main {
  font-size: 18px;
  font-weight: bold;
  color: var(--text-primary);
  line-height: 1;
}
.logo-sub {
  font-size: 10px;
  color: var(--text-muted);
  margin-top: 2px;
  letter-spacing: 1px;
}

.nav-menu {
  flex: 1;
  display: flex;
  align-items: center;
  margin-left: 40px;
}
.nav-item {
  margin-right: 24px;
  color: var(--text-primary);
  font-size: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.nav-item:hover {
  color: var(--primary-color);
}
.nav-item.is-active {
  color: var(--primary-color);
  font-weight: bold;
  transform: scale(1.15);
}

.header-right {
  display: flex;
  align-items: center;
}
.search-icon {
  font-size: 20px;
  color: var(--text-primary);
  margin-right: 20px;
  cursor: pointer;
}
.login-text {
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.3s;
}
.login-text:hover {
  color: var(--primary-color);
}
.logged-in-area {
  display: flex;
  align-items: center;
  gap: 15px;
}
.user-block {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.user-block .nick-name {
  font-size: 14px;
  color: var(--text-primary);
}
.nav-btn {
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}
.admin-btn {
  color: var(--primary-color);
  font-weight: 600;
}
.logout-btn {
  color: #f56c6c;
}
.nav-btn:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 10px;
}

.footer {
  text-align: center;
  padding: 20px;
  color: var(--text-muted);
  font-size: 13px;
  line-height: 1.8;
}
</style>
