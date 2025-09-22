// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: '/notaris-rina/',
  server: {
    host: "::",
    port: 8080,
    // Izinkan domain tertentu dan seluruh subdomain
    allowedHosts: [
      "5796f19aa9e8.ngrok-free.app"
    ],
  },
  preview: {
    // Terapkan juga pada vite preview
    allowedHosts: [
      "5796f19aa9e8.ngrok-free.app"
    ],
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
