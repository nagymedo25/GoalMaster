import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/GoalMaster/', // تم تحديث اسم المشروع
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
