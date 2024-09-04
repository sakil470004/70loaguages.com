import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    cors: false, // Disable CORS for the Vite development server
    proxy: {
      '/api': {
        target: 'https://70loaguages-server.vercel.app/', // Replace with your actual backend server URL
        changeOrigin: true, // Needed for virtual hosted sites
        secure: false, // Set to false if you're using self-signed certificates
        configure: (proxy, options) => {
          // Called after the proxy has been initialized
          proxy.on('proxyReq', (proxyReq, req, res) => {
            // Remove origin header to disable CORS
            proxyReq.removeHeader('origin');
          });
        },
      },
    },
  },
});
