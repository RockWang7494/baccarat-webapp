import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/baccarat-webapp/', // ⚠️ 這裡要填你的 GitHub 倉庫名稱前面加上斜線
  plugins: [react()],
})

