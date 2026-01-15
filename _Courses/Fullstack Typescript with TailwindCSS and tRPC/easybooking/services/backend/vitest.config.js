/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    sequence: { hooks: 'stack' },
    globalSetup: ['src/test-helpers/globalSetup.ts'],
  },
});
