import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'salary',
      filename: 'salary.js',
      remotes: {
        authorization: 'https://localhost:3001/assets/authorization.js',
        host: "https://localhost:3000/assets/host.js",
      },
      exposes: {
        './Salary': './src/App.tsx',
        './JiraPopup': './src/components/JiraPopup/JiraPopup.tsx'
      },
      shared: ['react', 'react-dom', 'antd', 'react-router-dom', '@reduxjs/toolkit', 'react-redux']
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  }
})
