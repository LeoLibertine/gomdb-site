import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',        // <-- quitas el sub‐path
  plugins: [react()],
})