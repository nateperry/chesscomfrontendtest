import {defineConfig, } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    plugins: [vue()],
    publicPath: process.env.NODE_ENV === "production" ? "/chesscomfrontendtest/" : "/",
    define: {
      __APP_ENV__: process.env.NODE_ENV,
    },
  };
})
