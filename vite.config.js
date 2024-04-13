import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://shop-managment-backend.vercel.app/',
        changeOrigin: true,
      },
    }
  },
  plugins: [react()],
})
