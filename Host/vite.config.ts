import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  base: `/host/`,
  plugins: [
    react(),
    federation({
      name: "host",
      filename: 'host.js',
      exposes: {
        './Menu': './src/components/Menu/Menu.tsx',
      },
      shared: ["react", "react-dom", "react-router-dom"],
    }),
  ],
  resolve: {
    alias: {
      '@assets': '/src/assets',
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
