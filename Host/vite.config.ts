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
        performanceReview: "http://localhost:5001/assets/remoteEntry.js",
        authorization: 'http://localhost:5002/assets/remoteEntry.js',
        planning: "http://localhost:5003/assets/remoteEntry.js",
        salary: "http://localhost:5004/assets/remoteEntry.js",
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
