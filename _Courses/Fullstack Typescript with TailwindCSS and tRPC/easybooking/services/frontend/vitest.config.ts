/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    sequence: {
      hooks: 'stack',
    },
    setupFiles: ['src/test-helpers/setup.ts'],
    environment: 'jsdom',
  },
});
