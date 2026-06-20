import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/pak-map/', // ️ CRITICAL: Must match your GitHub repo name exactly
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'map-core': ['leaflet', 'react-leaflet'],
          'animations': ['framer-motion'],
        },
      },
    },
  },
  server: {
    host: true,
    port: 3000,
  },
});