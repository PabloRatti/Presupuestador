import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base relativa: el mismo build funciona en GitHub Pages (/Presupuestador/) y en cualquier preview
export default defineConfig({
  plugins: [react()],
  base: './',
});
