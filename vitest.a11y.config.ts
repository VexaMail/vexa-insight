import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // Vite 8 transforms through Oxc, which ignores the old `esbuild` block: with
  // the shared Next tsconfig's `jsx: preserve` the parser gets raw JSX and
  // every file here fails to load.
  oxc: { jsx: { runtime: 'automatic' } },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['test/a11y/**/*.{test,spec}.tsx'],
    setupFiles: ['./test/setupA11y.ts'],
  },
})
