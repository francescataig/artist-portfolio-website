import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import optimizeImages from "./vite-plugin-optimize-images";

export default defineConfig(({ mode }) => ({
  base: '',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    optimizeImages(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
