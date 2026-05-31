import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-router-dom")) return "router-vendor";
          if (id.includes("react-dom") || id.includes("react")) return "react-vendor";
          if (id.includes("@radix-ui") || id.includes("lucide-react") || id.includes("framer-motion")) {
            return "ui-vendor";
          }
          if (id.includes("@supabase") || id.includes("@tanstack")) return "data-vendor";
          return "vendor";
        },
      },
    },
  },
}));
