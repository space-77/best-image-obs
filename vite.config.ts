import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      outputDir: 'dist/',
      staticImport: true,
      insertTypesEntry: true
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'MyLib',
      formats: ['es'],
      fileName: format => `index.js`
    },
    sourcemap: true,
    target: 'esnext',
    minify: false,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue']
    }
  },
  server: {
    proxy: {
      '/qiniu': {
        target: 'https://dn-odum9helk.qbox.me',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/qiniu/, '')
      }
    }
  }
})
