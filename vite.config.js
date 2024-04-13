import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://shop-managment-backend.vercel.app',
        changeOrigin: true,
      },
    }
  },
  build: {
    proxy: {
      '/api': {
        target: 'https://shop-managment-backend.vercel.app',
        changeOrigin: true,
      },
    }
  },
})
