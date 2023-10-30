# Lk-frontend

Гайд по созданию микро-приложения:

1. Создать приложение с помощью Vite.
2. Установить плагин vite-plugin-federation - npm install @originjs/vite-plugin-federation -D
3. Написать конфигурацию плагина в файле vite.config.ts:
    federation({
      name: 'performance_review', // название приложения
      filename: 'remoteEntry.js', // название файла в которое будет собрано приложение
      exposes: {
        './PerformanceReview': './src/App.tsx' // компоненты для экспорта - "путь до компонента в удаленном приложении: путь до компонента в папке самого микро-приложения"
      },
      shared: ['react', 'react-dom', 'antd', 'react-router-dom'] // библиотеки нужные для корректной работы экспортируемых компонентов
    })
5. В package.json обновить скрипты:
  "scripts": {
    "dev": "vite --port 5001 --strictPort", // запуск строго на определенном порте (порт должен быть уникальным в рамках всего приложения) 
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview --port 5001 --strictPort", // запуск строго на определенном порте (порт должен быть уникальным в рамках всего приложения) 
    "serve": "vite preview --port 5001 --strictPort" // запуск строго на определенном порте (порт должен быть уникальным в рамках всего приложения) 
  },
4. Написать конфигурацию сборки: 
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false
    }
5. Собрать микро-приложение: npm run build и убедиться что все настроено корректно: npm run preview.
6. В хост-приложении импортировать удаленное микро-приложение: 
    federation({
      name: 'host',
      remotes: {
        performanceReview: 'http://localhost:5001/assets/remoteEntry.js' // вот здесь
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
7. В файле modules.d.ts объявить модуль: declare module 'название приложения/путь до компонента'
8. В App.tsx своего микро-приложения прописать props {isMicroApp}: {isMicroApp?: boolean} (это нужно для роутинга, чтобы приложение понимало запущено оно в    
   контексте хоста или самостоятельно)
9. В App.tsx хост-приложения импортировать и внести своего микро-приложение с прокинутым props - <PerformanceReview isMicroApp={true}/>
10. Настроить роутинг в контексте своего микро-приложения.

Гайд по сборке и запуску всего приложения: 

1. Первый раз нужно установить все зависимости во всех прилоежниях npm i, собрать все микро-приложения npm run build и запустить npm run preview (далее можно просто запускать все приложения)
2. Собрать и запустить хост приложение.
3. Далее если что-то изменилось в вашем микро-приложении и хочется посмотреть как это будет выглядеть в контексте всего приложения заново собрать и запустить 
   своё микро приложение. Вести разработку в dev режиме - npm run dev.
  