import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '/public': path.resolve(__dirname, 'public'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env': {},
    'process.env.PUBLIC_URL': JSON.stringify(''),
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'build',
  },
});
