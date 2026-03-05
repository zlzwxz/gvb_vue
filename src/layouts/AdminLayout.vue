<template>
  <el-container style="height: 100vh;">
    <el-aside width="220px" class="admin-sidebar" :class="{ 'is-collapse': isCollapse }">
      <div class="sidebar-logo">
        <h2>{{ isCollapse ? 'GVB' : 'GVB 控制台' }}</h2>
      </div>
      <el-menu 
        :default-active="$route.path" 
        router 
        background-color="#2d3a4b" 
        text-color="#bfcbd9" 
        active-text-color="#409EFF"
        :collapse="isCollapse"
        class="admin-menu"
      >
        <!-- 写作者常用菜单 -->
        <el-menu-item index="/admin/dashboard"><el-icon><DataLine /></el-icon><template #title>仪表盘</template></el-menu-item>
        <el-menu-item index="/admin/articles"><el-icon><Document /></el-icon><template #title>文章管理</template></el-menu-item>
        <el-menu-item index="/admin/images"><el-icon><Picture /></el-icon><template #title>图片素材</template></el-menu-item>
        <el-menu-item index="/admin/messages"><el-icon><Message /></el-icon><template #title>我的消息</template></el-menu-item>
        
        <!-- 管理员专享功能 -->
        <el-sub-menu index="admin-system" v-if="userStore.isAdmin">
          <template #title>
            <el-icon><Tools /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/admin/users"><el-icon><User /></el-icon>用户管理</el-menu-item>
          <el-menu-item index="/admin/tags"><el-icon><PriceTag /></el-icon>标签管理</el-menu-item>
          <el-menu-item index="/admin/adverts"><el-icon><Promotion /></el-icon>广告管理</el-menu-item>
          <el-menu-item index="/admin/menus"><el-icon><Menu /></el-icon>导航管理</el-menu-item>
          <el-menu-item index="/admin/comments"><el-icon><ChatDotRound /></el-icon>评论管理</el-menu-item>
          <el-menu-item index="/admin/chats"><el-icon><ChatLineSquare /></el-icon>聊天管理</el-menu-item>
          <el-menu-item index="/admin/logs"><el-icon><Tickets /></el-icon>安全审计</el-menu-item>
          <el-menu-item index="/admin/settings"><el-icon><Setting /></el-icon>系统配置</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="admin-header">
        <div class="header-left">
          <el-icon class="toggle-btn" @click="isCollapse = !isCollapse">
            <Fold v-if="!isCollapse" />
            <Expand v-else />
          </el-icon>
          <h2>{{ userStore.isAdmin ? '超级管理员工作台' : '写作者大盘' }}</h2>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link" style="cursor:pointer;display:flex;align-items:center;">
              <el-avatar :size="32" :src="$resolveImg(userStore.userInfo?.avatar) || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" style="margin-right:10px" />
              {{ userStore.userInfo?.nick_name || userStore.userInfo?.user_name || '普通用户' }}
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="home">返回前台</el-dropdown-item>
                <el-dropdown-item command="profile">个人资料</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出后台</el-dropdown-item>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { Fold, Expand, ArrowDown, DataLine, Document, Picture, Message, User, PriceTag, Promotion, Menu, ChatDotRound, ChatLineSquare, Tickets, Setting, Tools } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()
const isCollapse = ref(false)

function handleLogout() {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.replace('/login')
}

function handleCommand(command) {
  if (command === 'logout') {
    handleLogout()
  } else if (command === 'home') {
    router.push('/')
  } else if (command === 'profile') {
    router.push('/profile')
  }
}
</script>

<style scoped>
.admin-sidebar {
  background-color: #2d3a4b;
  color: #fff;
  transition: width 0.3s;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}
.sidebar-logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #2b2f3a;
  overflow: hidden;
}
.sidebar-logo h2 {
  margin: 0;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  white-space: nowrap;
}
.admin-menu {
  border-right: none;
  flex: 1;
}
/* 处理折叠后的一些 el-menu-item-group 标题溢出 */
.admin-sidebar.is-collapse :deep(.el-menu-item-group__title) {
  padding: 0;
  text-align: center;
  font-size: 0;
}
.admin-sidebar.is-collapse .sidebar-logo h2 {
  font-size: 14px;
}

.admin-header {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  box-shadow: 0 1px 4px rgba(0,21,41,0.08);
  z-index: 10;
}
.header-left {
  display: flex;
  align-items: center;
}
.header-left .toggle-btn {
  font-size: 20px;
  cursor: pointer;
  margin-right: 20px;
  color: #606266;
  transition: color 0.3s;
}
.header-left .toggle-btn:hover {
  color: var(--primary-color);
}
.header-left h2 {
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: normal;
}

.admin-main {
  padding: 24px;
  background-color: #f0f2f5;
  overflow-y: auto;
  position: relative;
}
</style>
