import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from 'postcss-pxtorem'
import autoprefixer from 'autoprefixer'
// import './src/style/custom.scss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // base: process.env.NODE_ENV === 'production' ? './' : '/',
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: ['Android 4.1', 'iOS 7.1', 'Chrome > 31', 'ff > 31', 'ie >= 8'],
        }),
        postCssPxToRem({
          // 自适应，px>rem转换
          rootValue: 37.5, // 75表示750设计稿，37.5表示375设计稿
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
          unitPrecision: 6, //  转换成rem后保留的小数点位数
          selectorBlackList: ['vant-'], // 要忽略的选择器
          replace: true,
          mediaQuery: false,
          minPixelValue: 1,
          exclude: /node_modules/i
        }),
      ],
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/style/custom.scss";`
      }
    }
  }
})

