import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // The shared Next tsconfig sets `jsx: preserve`, which is what Next itself
  // documents: SWC does the transform at build time. Vitest runs through
  // esbuild instead and would hand raw JSX to the parser, so the transform is
  // named here rather than weakening the tsconfig for the whole app.
  oxc: { jsx: { runtime: 'automatic' } },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  test: {
    environment: 'node',
    globals: true,
    include: ['test/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['test/a11y/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: [
        'src/actions/**',
        'src/formatters/**',
        'src/lib/**',
        'src/mappers/**',
        'src/services/**',
        'src/utils/**',
        'src/validators/**',
      ],
      exclude: [
        '**/index.ts',
        '**/*.d.ts',
        'src/**/types/**',
        'node_modules/**',
        '.next/**',
      ],
    },
  },
})
