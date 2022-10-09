import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 打包配置
  build: {
    target: 'modules',
    outDir: 'dist', //指定输出路径
    assetsDir: 'static/vue-content', // 指定生成静态资源的存放路径
    minify: 'terser', // 混淆器，terser构建后文件体积更小
  },
  resolve: {
    alias: {
      // 配置项目路径，引入 @ ，参考 https://www.cnblogs.com/wang715100018066/p/16593957.html
      '@': path.resolve(__dirname, 'src')
    }
  },
  // 本地运行配置，及反向代理配置
  server: {
    cors: true, // 默认启用并允许任何源
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法
    // proxy: {
    //   '/api': {
    //     target: 'http://127.0.0.1:8000', //代理接口
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
  },
})
