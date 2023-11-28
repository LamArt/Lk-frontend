import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'authorization',
      filename: 'remoteEntry.js',
      exposes: {
        './Authorization': './src/App.tsx'
      },
      shared: ['react', 'react-dom', 'antd', 'react-router-dom']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false }
})
