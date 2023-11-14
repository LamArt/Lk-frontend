import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'salary',
      filename: 'remoteEntry.js', // название файла в которое будет собрано приложение
      exposes: {
        './Salary': './src/App.tsx' // компоненты для экспорта - "путь до компонента в удаленном приложении: путь до компонента в папке самого микро-приложения"
      },
      shared: ['react', 'react-dom', 'antd', 'react-router-dom'] // библиотеки нужные для корректной работы экспортируемых компонентов
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})
