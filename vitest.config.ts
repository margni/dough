/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reportsDirectory: '../coverage',
    },
    environment: 'jsdom',
    root: './src',
    setupFiles: './src/setup-tests.ts',
  },
});
