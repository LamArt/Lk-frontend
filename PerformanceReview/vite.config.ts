import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'performance_review',
      filename: 'performance_review.js',
      remotes: {
        authorization: 'https://lk.lamart.site/assets/authorization.js',
        host: "https://lk.lamart.site/assets/host.js",
      },
      exposes: {
        './PerformanceReview': './src/App.tsx'
      },
      shared: ['react', 'react-dom', 'antd', 'react-router-dom', '@reduxjs/toolkit', 'react-redux', 'react-query']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
