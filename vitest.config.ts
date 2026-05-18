import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '.'),
    },
  },
  test: {
    environment: 'node',
    globals: true,
    include: ['test/**/*.{test,spec}.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: [
        'actions/**',
        'formatters/**',
        'lib/**',
        'mappers/**',
        'services/**',
        'utils/**',
        'validators/**',
      ],
      exclude: [
        '**/index.ts',
        '**/*.d.ts',
        '**/types/**',
        'node_modules/**',
        '.next/**',
      ],
    },
  },
})
