import { defineConfig } from 'vite';

export default defineConfig({
  root: 'public',
  base: '',
  server: {
    port: 8080,
    open: true
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
})
