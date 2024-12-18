import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsPathConfig from 'vite-tsconfig-paths';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsPathConfig(), svgr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
