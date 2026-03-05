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

// 配置 NProgress 进度条
NProgress.configure({ showSpinner: false })

const app = createApp(App)
const pinia = createPinia()

// 注册所有 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 注册全局图片路径解析函数
app.config.globalProperties.$resolveImg = (url) => {
    if (!url) return ''
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    // 补全前端代理能够拦截的绝对路径（确保以 / 开头）
    return url.startsWith('/') ? url : `/${url}`
}

// 使用插件
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn // 中文语言包
})

app.mount('#app')
