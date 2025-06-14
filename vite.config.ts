import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: '.', // ou './src' se seu index.html estiver em src
  plugins: [react()],
  build: {
    outDir: 'dist'
  }
});
