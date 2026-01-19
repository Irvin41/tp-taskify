import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Le champ 'base' doit correspondre au nom de ton dépôt GitHub
  // Si ton dépôt s'appelle 'tp-taskify', laisse '/tp-taskify/'
  // N'oublie pas les slashes au début et à la fin !
  base: '/tp-taskify/', 
  
  plugins: [react()],
})
