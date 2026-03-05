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
    if (url.startsWith('http')) return url
    // 如果路径以 uploads/ 开头，我们确保它以 / 开头即可
    // 因为 Gin 的 router.StaticFS("uploads", ...) 会匹配 /uploads 并从 uploads 目录找文件
    if (url.startsWith('uploads/')) return `/${url}`
    // 如果不带 uploads/ 且不带 /，则补全 /uploads/
    if (!url.startsWith('/')) return `/uploads/${url}`
    return url
}

// 使用插件
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
    locale: zhCn // 中文语言包
})

app.mount('#app')
