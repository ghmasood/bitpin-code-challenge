import react from '@vitejs/plugin-react-swc';

import path from 'path';
import { defineConfig } from 'vite';

import tsPathConfig from 'vite-tsconfig-paths';

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
