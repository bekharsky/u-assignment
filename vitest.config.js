import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
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
      __mocks__: path.resolve(__dirname, './src/__mocks__'),
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
