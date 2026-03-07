// `src/main.js` 是整个 Vue 前端真正的启动入口。
// 你可以把它理解成“总装配文件”：
// 1. 创建 Vue 应用实例；
// 2. 挂载全局状态管理 Pinia；
// 3. 挂载路由系统；
// 4. 接入 Element Plus 组件库；
// 5. 注册全局图标、全局样式、全局工具函数；
// 6. 最后把应用挂到 `index.html` 里的 `#app` 节点。
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import App from './App.vue'
import router from './router'
import './assets/styles/main.css'
import { resolveResourceUrl } from './utils/url'

// NProgress 负责在“页面跳转”和“异步加载”时显示顶部进度条。
// 这里把默认的小转圈关掉，只保留更简洁的顶部细条。
NProgress.configure({ showSpinner: false })

// 创建 Vue 应用实例。`App.vue` 会作为最外层根组件。
const app = createApp(App)
// Pinia 是 Vue 3 官方推荐的状态管理库，用来保存“当前登录用户”“社交状态”等跨页面共享的数据。
const pinia = createPinia()

// Element Plus 图标是按组件名注册的。
// 注册完成后，模板里就可以直接写 `<User />`、`<Search />` 这一类图标组件，
// 不需要在每个页面里反复手动 import。
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册一个全局工具函数 `$resolveImg`。
// 后端经常返回相对路径，比如：
// - `/uploads/file/u_1/demo.png`
// - `uploads/avatar/default.jpeg`
// 页面里统一通过 `$resolveImg(xxx)` 转成浏览器可直接访问的最终地址。
app.config.globalProperties.$resolveImg = (url) => {
  return resolveResourceUrl(url)
}

// 按顺序把核心能力挂到应用上。
// 这几行可以理解为“把插件装进 Vue 应用”。
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  // 整个 Element Plus 组件库使用中文界面文案。
  locale: zhCn
})

// 真正把前端应用渲染到页面上。
app.mount('#app')
