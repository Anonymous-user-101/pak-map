import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext', // Optimized for flagship devices
    sourcemap: false, // No source maps in production
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
    host: true, // For local network testing
    port: 3000,
  },
});