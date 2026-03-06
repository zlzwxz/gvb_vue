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

// NProgress 只保留顶部细条，不显示默认小转圈。
NProgress.configure({ showSpinner: false })

const app = createApp(App)
const pinia = createPinia()

// Element Plus 图标是按组件名注册的。
// 注册完成后，模板里就可以直接写 <User />、<Search /> 这一类图标组件。
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册一个全局工具函数，把后端返回的相对图片路径转成前端可直接访问的 URL。
app.config.globalProperties.$resolveImg = (url) => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  if (url.startsWith('uploads/')) return `/${url}`
  if (!url.startsWith('/')) return `/uploads/${url}`
  return url
}

app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
