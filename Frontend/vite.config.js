import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  assetsInclude: ['**/*.mp4'],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three';
            if (id.includes('jspdf') || id.includes('html2canvas') || id.includes('pdfjs-dist')) return 'pdf';
            return 'vendor';
          }
        }
      }
    }
  }
})
