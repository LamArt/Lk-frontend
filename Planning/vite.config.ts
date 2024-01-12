import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        federation({
            name: 'planning',
            filename: 'remoteEntry.js',
            remotes: {
                authorization: 'http://localhost:5002/assets/remoteEntry.js',
                host: 'http://localhost:4173/assets/remoteEntry.js',
                salary: 'http://localhost:5004/assets/remoteEntry.js',
            },
            exposes: { './Planning': './src/App.tsx' },
            shared: [
                'react',
                'react-dom',
                'antd',
                'react-router-dom',
                '@reduxjs/toolkit',
                'react-redux',
                'react-query',
            ],
        }),
    ],
    build: {
        modulePreload: false,
        target: 'esnext',
        minify: false,
        cssCodeSplit: false,
    },
});
