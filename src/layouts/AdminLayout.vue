<template>
  <el-container class="admin-layout">
    <el-aside :width="isCollapse ? '64px' : '220px'" class="admin-sidebar">
      <div class="brand" @click="goDashboard">
        <div class="brand-logo">{{ isCollapse ? 'G' : 'GVB' }}</div>
        <div v-if="!isCollapse" class="brand-copy">
          <strong>运营后台</strong>
          <span>Management Console</span>
        </div>
      </div>

      <el-scrollbar class="menu-scroll">
        <el-menu
          :default-active="$route.path"
          router
          :collapse="isCollapse"
          :collapse-transition="false"
          unique-opened
          class="admin-menu"
        >
          <el-menu-item index="/admin/dashboard"><el-icon><DataLine /></el-icon><template #title>仪表盘</template></el-menu-item>
          <el-menu-item index="/admin/articles"><el-icon><Document /></el-icon><template #title>文章管理</template></el-menu-item>
          <el-menu-item index="/admin/article/edit"><el-icon><Edit /></el-icon><template #title>发布文章</template></el-menu-item>
          <el-menu-item v-if="userStore.isAdmin" index="/admin/article/review"><el-icon><DocumentChecked /></el-icon><template #title>文章审核</template></el-menu-item>
          <el-menu-item index="/admin/images"><el-icon><Picture /></el-icon><template #title>图片素材</template></el-menu-item>
          <el-menu-item index="/admin/messages"><el-icon><Message /></el-icon><template #title>私信管理</template></el-menu-item>
          <el-menu-item index="/admin/collects"><el-icon><CollectionTag /></el-icon><template #title>收藏管理</template></el-menu-item>

          <el-sub-menu index="system-group" v-if="userStore.isAdmin">
            <template #title>
              <el-icon><Tools /></el-icon>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/admin/users"><el-icon><User /></el-icon>用户管理</el-menu-item>
            <el-menu-item index="/admin/tags"><el-icon><PriceTag /></el-icon>标签管理</el-menu-item>
            <el-menu-item index="/admin/adverts"><el-icon><Promotion /></el-icon>广告管理</el-menu-item>
            <el-menu-item index="/admin/menus"><el-icon><Menu /></el-icon>导航管理</el-menu-item>
            <el-menu-item index="/admin/comments"><el-icon><ChatDotRound /></el-icon>评论管理</el-menu-item>
            <el-menu-item index="/admin/chats"><el-icon><ChatLineSquare /></el-icon>群聊管理</el-menu-item>
            <el-menu-item index="/admin/logs"><el-icon><Tickets /></el-icon>日志审计</el-menu-item>
            <el-menu-item index="/admin/settings"><el-icon><Setting /></el-icon>系统配置</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header class="admin-header">
        <div class="header-left">
          <el-button class="icon-btn" circle @click="isCollapse = !isCollapse">
            <el-icon><Fold v-if="!isCollapse" /><Expand v-else /></el-icon>
          </el-button>
          <div class="header-titles">
            <h2>{{ pageTitle }}</h2>
            <el-breadcrumb separator="/" class="breadcrumb">
              <el-breadcrumb-item>控制台</el-breadcrumb-item>
              <el-breadcrumb-item>{{ pageTitle }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>

        <div class="header-right">
          <el-button type="primary" plain @click="goWriteArticle">
            <el-icon><Edit /></el-icon>
            发布文章
          </el-button>
          <el-button @click="router.push('/')">前台首页</el-button>
          <el-dropdown @command="handleCommand">
            <span class="profile-trigger">
              <el-avatar :size="34" :src="$resolveImg(userStore.userInfo?.avatar)" />
              <span>{{ userStore.userInfo?.nick_name || userStore.userInfo?.user_name || '用户' }}</span>
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">个人资料</el-dropdown-item>
                <el-dropdown-item command="home">返回前台</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="admin-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import {
  ArrowDown,
  ChatDotRound,
  ChatLineSquare,
  CollectionTag,
  DataLine,
  DocumentChecked,
  Document,
  Edit,
  Expand,
  Fold,
  Menu,
  Message,
  Picture,
  PriceTag,
  Promotion,
  Setting,
  Tickets,
  Tools,
  User
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const isCollapse = ref(false)

const pageTitle = computed(() => String(route.meta.title || '后台管理'))

function goDashboard() {
  router.push('/admin/dashboard')
}

function goWriteArticle() {
  router.push('/admin/article/edit')
}

function handleLogout() {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.replace('/login')
}

function handleCommand(command) {
  if (command === 'logout') handleLogout()
  if (command === 'home') router.push('/')
  if (command === 'profile') router.push('/profile')
}
</script>

<style scoped>
.admin-layout {
  height: 100vh;
  overflow: hidden;
}

.admin-sidebar {
  background: linear-gradient(180deg, #12365a 0%, #0f2c4a 100%);
  border-right: 1px solid rgba(139, 170, 202, 0.28);
  color: #fff;
  display: flex;
  flex-direction: column;
  transition: width 0.2s ease;
  overflow: hidden;
}

.brand {
  height: 64px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 14px;
  border-bottom: 1px solid rgba(171, 202, 231, 0.2);
  cursor: pointer;
}

.brand-logo {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.16);
  font-weight: 700;
  color: #d8eeff;
}

.brand-copy strong {
  display: block;
  line-height: 1.2;
  font-size: 14px;
}

.brand-copy span {
  display: block;
  margin-top: 2px;
  opacity: 0.8;
  font-size: 11px;
}

.menu-scroll {
  flex: 1;
  min-height: 0;
}

.admin-menu {
  border-right: none;
  --el-menu-bg-color: transparent;
  --el-menu-text-color: #c7d9eb;
  --el-menu-hover-bg-color: rgba(255, 255, 255, 0.1);
  --el-menu-active-color: #ffffff;
}

.admin-menu :deep(.el-menu-item.is-active) {
  background: linear-gradient(90deg, rgba(16, 150, 178, 0.7), rgba(17, 86, 151, 0.62));
}

.admin-header {
  height: 64px;
  padding: 0 18px;
  border-bottom: 1px solid #dfe7f0;
  background: rgba(255, 255, 255, 0.96);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-btn {
  border: 1px solid #d3deea;
}

.header-titles h2 {
  margin: 0;
  font-size: 18px;
  color: #1a3d61;
}

.breadcrumb {
  margin-top: 3px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.profile-trigger {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 999px;
  background: #f4f8fc;
  color: #1f456d;
}

.admin-main {
  background:
    radial-gradient(circle at 0% 0%, rgba(15, 126, 165, 0.08), transparent 32%),
    #f4f8fc;
  padding: 16px;
  overflow-y: auto;
  min-width: 0;
}

@media (max-width: 992px) {
  .header-right .el-button:nth-child(2) {
    display: none;
  }
}
</style>
