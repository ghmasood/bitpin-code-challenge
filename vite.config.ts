import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsPathConfig from 'vite-tsconfig-paths';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsPathConfig()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});