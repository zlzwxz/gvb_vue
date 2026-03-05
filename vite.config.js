import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 路径别名配置：修复 ESM 模式下 __dirname 未定义的问题
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    strictPort: true, // 如果 3000 被占用，直接报错而不是随机换端口
    host: true,       // 允许外部访问
    // 代理配置：将 /api 请求转发到后端
    proxy: {
      '/api': {
        target: 'http://localhost:8181',
        changeOrigin: true,
        ws: true
      },
      '/uploads': {
        target: 'http://localhost:8181',
        changeOrigin: true
      }
    }
  }
})
