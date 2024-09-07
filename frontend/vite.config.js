import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import APP_URL from "./APP_URL";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: `${APP_URL}`, // Your backend server (local or production)
        changeOrigin: true,  // Ensure the host header is changed to the target
        rewrite: (path) => path.replace(/^\/api/, ""), // Optionally remove '/api' prefix from the path
        secure: false,  // Set to true if your backend is served over HTTPS
      },
    },
  },
});