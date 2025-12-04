import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  // @ts-ignore
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() {
      console.log('SSG generation finished.');
    },
  },
  server: {
    port: 3001,
  },
});
