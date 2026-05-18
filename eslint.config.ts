import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'
import boundaries from 'eslint-plugin-boundaries'
import codePolicy from 'eslint-plugin-code-policy'
import promise from 'eslint-plugin-promise'
import security from 'eslint-plugin-security'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import unusedImports from 'eslint-plugin-unused-imports'
import { defineConfig, globalIgnores } from 'eslint/config'

// eslint-config-next already registers: react, react-hooks, import, jsx-a11y, @next/next, @typescript-eslint
// Extract the 'import' plugin instance from Next's config to avoid "Cannot redefine plugin" errors.
// We must use the SAME instance when adding import/* rules in subsequent config blocks.
type PluginRecord = Record<string, unknown>

const allNextConfigs = [...nextVitals, ...nextTs].flat(Infinity as 10)
const importPlugin = allNextConfigs.flatMap((c) => {
  if (c && typeof c === 'object' && 'plugins' in c) {
    const plugins = (c as { plugins?: PluginRecord }).plugins
    if (plugins && typeof plugins === 'object' && 'import' in plugins) {
      return [plugins['import']]
    }
  }
  return []
})[0] as PluginRecord | undefined

const sonarRecommended = sonarjs.configs?.['recommended']
const sonarRules: Record<string, unknown> =
  sonarRecommended &&
  !Array.isArray(sonarRecommended) &&
  'rules' in sonarRecommended
    ? (sonarRecommended.rules as Record<string, unknown>)
    : {}

const config = defineConfig([
  ...nextVitals,
  ...nextTs,
  codePolicy.configs.next,

  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'coverage/**',
    'next-env.d.ts',
  ]),

  {
    settings: {
      react: { version: '19.0' },
    },
  },

  // Type-aware linting for TS files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            'eslint.config.ts',
            'scripts/recovery.ts',
            'scripts/migrate-emails-to-jobs.ts',
            'scripts/migrate-ips.ts',
            'scripts/backfill-email-counts.ts',
            'scripts/extract-all.ts',
            'scripts/extract-pass2.ts',
            'scripts/fix-imports.ts',
            'scripts/rename-constants.ts',
            'scripts/seed-demo.ts',
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      } as any,
    },
    rules: {
      // Hard bans / high-signal correctness
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',

      // Promise correctness
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-floating-promises': 'error',

      // Maintainability
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/prefer-readonly': 'warn',
    },
  },

  // Import hygiene rules - re-use the exact same 'import' plugin instance from eslint-config-next
  ...(importPlugin
    ? [
        {
          files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'] as [string],
          plugins: { import: importPlugin },
          settings: {
            'import/resolver': { typescript: true },
          },
          rules: {
            'import/first': 'error' as const,
            'import/newline-after-import': 'error' as const,
            'import/no-duplicates': 'error' as const,
            'import/no-cycle': ['error', { maxDepth: 1 }] as [
              'error',
              { maxDepth: number },
            ],
            'import/no-self-import': 'error' as const,

            /**
             * "Public API only" enforcement.
             * Each module directory must expose its contract via index.ts.
             * Deep imports (e.g. @/services/auth/password) are forbidden.
             * Only index files, styles, and co-located assets are allowed through.
             */
            'import/no-internal-modules': [
              'error',
              { forbid: ['@/*/*/**'] },
            ] as ['error', { forbid: string[] }],
          },
        },
      ]
    : []),

  // Unused imports/vars + unicorn + sonarjs + boundaries
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    plugins: {
      'unused-imports': unusedImports,
      unicorn,
      sonarjs,
      boundaries,
      promise,
      security,
    },
    rules: {
      /**
       * Unused imports/vars (hard fail)
       */
      'unused-imports/no-unused-imports': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-vars': [
        'error',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      /**
       * Unicorn: modern correctness / guardrails
       */
      'unicorn/no-abusive-eslint-disable': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-optional-catch-binding': 'error',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/filename-case': [
        'error',
        { cases: { camelCase: true, pascalCase: true } },
      ],

      /**
       * Promise / security hygiene
       */
      'promise/prefer-await-to-then': 'warn',
      'promise/no-nesting': 'warn',
      'promise/no-return-wrap': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-object-injection': 'off',

      /**
       * SonarJS: bug patterns with high signal
       */
      ...sonarRules,
      // Downgrade noisy / opinionated SonarJS rules
      'sonarjs/prefer-read-only-props': 'warn',
      'sonarjs/no-nested-conditional': 'warn',
      'sonarjs/cognitive-complexity': 'warn',
      'sonarjs/pseudo-random': 'warn',
      'sonarjs/deprecation': 'warn',
      'sonarjs/slow-regex': 'warn',
      'sonarjs/no-nested-functions': 'warn',
      'sonarjs/no-duplicate-string': 'off',

      /**
       * Architecture boundaries (folder-level dependency governance)
       * Matched to actual project layout (root-level directories).
       *
       * Types:
       *   app       → Next.js App Router pages & API routes
       *   components → Client-safe UI components
       *   shared    → Runtime-neutral shared code (lib, utils, hooks, types)
       *   server    → Server-only code (services, actions)
       *
       * Dependency rules:
       *   - app can import everything (it's the composition root)
       *   - components can only import from shared (no server deps)
       *   - server can only import from shared (no client UI deps)
       *   - shared stays runtime-neutral
       */
      'boundaries/dependencies': [
        'error',
        {
          default: 'disallow',
          rules: [
            {
              from: [{ type: 'app' }],
              allow: [
                { to: { type: 'components' } },
                { to: { type: 'shared' } },
                { to: { type: 'server' } },
              ],
            },
            {
              from: [{ type: 'components' }],
              allow: [
                { to: { type: 'components' } },
                { to: { type: 'shared' } },
              ],
            },
            {
              from: [{ type: 'shared' }],
              allow: [{ to: { type: 'shared' } }],
            },
            {
              from: [{ type: 'server' }],
              allow: [{ to: { type: 'server' } }, { to: { type: 'shared' } }],
            },
          ],
        },
      ],
    },
  },

  // Boundaries: map filesystem patterns to element types
  // Matched to actual project layout (root-level, no src/ prefix)
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    settings: {
      'boundaries/elements': [
        // App Router: pages and API routes
        { type: 'app', pattern: 'app/*' },
        { type: 'app', pattern: 'app/**/*' },

        // Client-safe UI components
        { type: 'components', pattern: 'components/*' },
        { type: 'components', pattern: 'components/**/*' },

        // Runtime-neutral shared code
        { type: 'shared', pattern: 'lib/*' },
        { type: 'shared', pattern: 'lib/**/*' },
        { type: 'shared', pattern: 'utils/*' },
        { type: 'shared', pattern: 'utils/**/*' },
        { type: 'shared', pattern: 'hooks/*' },
        { type: 'shared', pattern: 'hooks/**/*' },
        { type: 'shared', pattern: 'types/*' },
        { type: 'shared', pattern: 'types/**/*' },

        // Server-only code
        { type: 'server', pattern: 'services/*' },
        { type: 'server', pattern: 'services/**/*' },
        { type: 'server', pattern: 'actions/*' },
        { type: 'server', pattern: 'actions/**/*' },
      ],
    },
  },

  /**
   * Runtime boundary enforcement (server ↔ client)
   *
   * Prevents the classic "imported server secrets into client bundle" failure:
   * - Client/component code must NEVER import from services/ (server-only)
   * - Server code must NOT import from components/ (client UI)
   *
   * Uses import/no-restricted-paths for path-based zone enforcement.
   */
  {
    files: ['components/**/*.{ts,tsx}', 'hooks/**/*.{ts,tsx}'],
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './components',
              from: './services',
              message:
                'Components must not import server-only modules (services/). Use server actions or API routes instead.',
            },
            {
              target: './hooks',
              from: './services',
              message:
                'Hooks must not import server-only modules (services/). Keep hooks runtime-neutral or client-safe.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['services/**/*.{ts,tsx}', 'actions/**/*.{ts,tsx}'],
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './services',
              from: './components',
              message:
                'Server code must not import client UI components. Keep server runtime pure.',
            },
            {
              target: './actions',
              from: './components',
              message: 'Server actions must not import client UI components.',
            },
          ],
        },
      ],
    },
  },

  // Prettier last (formatting conflicts off)
  prettier,

  // Allow overrides: db schema files and script files can use kebab-case
  {
    files: [
      'lib/db/schema/**/*.{ts,tsx}',
      'scripts/**/*.{js,mjs,cjs,ts}',
      'drizzle/**/*.{js,ts}',
    ],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },

  // Allow eslint.config.ts and scripts without project-service type checking
  {
    files: ['eslint.config.ts', 'scripts/**/*.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },

  // TanStack Table's `useReactTable()` returns functions that React Compiler
  // cannot safely memoize. The hook already carries `'use no memo'` to opt
  // out of compilation; the lint rule still detects the call site statically
  // and has no allow-list option. Until @tanstack/react-table changes its API
  // or eslint-plugin-react-hooks adds an allow-list, this rule stays off for
  // the one wrapper that consumes useReactTable.
  {
    files: ['hooks/ui/useDataTable.ts'],
    rules: {
      'react-hooks/incompatible-library': 'off',
    },
  },
])

export default config
