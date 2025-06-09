import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/clientes/cencosud/document-mongo',
  plugins: [react()]
})