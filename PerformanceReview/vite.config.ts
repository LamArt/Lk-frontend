import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'performance_review',
      filename: 'remoteEntry.js',
      remotes: {
        authorization: 'https://lk.lamart.site/assets/remoteEntry.js',
        host: "https://lk.lamart.site/assets/remoteEntry.js",
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
