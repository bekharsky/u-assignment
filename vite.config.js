import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  resolve: {
    alias: {
      app: path.resolve(__dirname, './src/app'),
      components: path.resolve(__dirname, './src/components'),
      contexts: path.resolve(__dirname, './src/contexts'),
      formatters: path.resolve(__dirname, './src/formatters'),
      hooks: path.resolve(__dirname, './src/hooks'),
      reducers: path.resolve(__dirname, './src/reducers'),
      withRoot: path.resolve(__dirname, './src/withRoot.js'),
      serviceWorker: path.resolve(__dirname, './src/serviceWorker.js'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
