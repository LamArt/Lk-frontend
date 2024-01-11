import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "host",
      remotes: {
        performanceReview: "https://lk.lamart.site/assets/remoteEntry.js",
        authorization: 'https://lk.lamart.site/assets/remoteEntry.js',
        planning: "https://lk.lamart.site/assets/remoteEntry.js",
        salary: "https://lk.lamart.site/assets/remoteEntry.js",
      },
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
