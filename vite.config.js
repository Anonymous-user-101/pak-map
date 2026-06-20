import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/pak-map/', // ⚠️ THIS LINE IS MANDATORY. DO NOT REMOVE IT.
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