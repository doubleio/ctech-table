import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  rollupOptions: {
    output: {
      manualChunks: false,
      inlineDynamicImports: true,
      entryFileNames: '[name].js',   // currently does not work for the legacy bundle
      assetFileNames: '[name].[ext]', // currently does not work for images
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            ">0.3%",
            "not ie 11",
            "not dead",
            "not op_mini all",
            "last 3 version",
            "Chrome >= 35",
            "Firefox >= 38",
            "Edge >= 10",
            "Explorer >= 10",
            "ie >= 10",
            "iOS >= 8",
            "Safari >= 8",
            "Android 2.3",
            "Android >= 4",
            "Opera >= 12"
          ]
        })
      ]
    }
  }
})
