import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React runtime
          'vendor-react': ['react', 'react-dom'],
          // Animation library
          'vendor-motion': ['framer-motion'],
          // Icon libraries (large — split into own chunk)
          'vendor-icons': ['react-icons'],
        },
      },
    },
  },
})
