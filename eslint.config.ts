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
    '.claude/**',
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
            'eslint.audit.config.ts',
            'scripts/recovery.ts',
            'scripts/migrate-emails-to-jobs.ts',
            'scripts/migrate-ips.ts',
            'scripts/backfill-email-counts.ts',
            'scripts/extract-all.ts',
            'scripts/extract-pass2.ts',
            'scripts/fix-imports.ts',
            'scripts/rename-constants.ts',
            'scripts/seed-demo.ts',
            'scripts/backfill-rollup.ts',
            'scripts/run-ai-eval.ts',
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
        // checkDirectories (new default in unicorn v72) is off because Next.js
        // route directories are URL segments and must stay kebab-case.
        {
          cases: { camelCase: true, pascalCase: true },
          checkDirectories: false,
        },
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
       * Matched to the source layout under src/.
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
          policies: [
            {
              from: { element: { type: 'app' } },
              allow: {
                to: {
                  element: {
                    types: { anyOf: ['components', 'shared', 'server'] },
                  },
                },
              },
            },
            {
              from: { element: { type: 'components' } },
              allow: {
                to: { element: { types: { anyOf: ['components', 'shared'] } } },
              },
            },
            {
              from: { element: { type: 'shared' } },
              allow: { to: { element: { type: 'shared' } } },
            },
            {
              from: { element: { type: 'server' } },
              allow: {
                to: { element: { types: { anyOf: ['server', 'shared'] } } },
              },
            },
          ],
        },
      ],
    },
  },

  // Boundaries: map filesystem patterns to element types
  // Matched to the source layout under src/.
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    settings: {
      'boundaries/elements': [
        // App Router: pages and API routes
        { type: 'app', pattern: 'app/*' },
        { type: 'app', pattern: 'app/**/*' },

        // Client-safe UI components
        { type: 'components', pattern: 'src/components/*' },
        { type: 'components', pattern: 'src/components/**/*' },

        // Runtime-neutral shared code
        { type: 'shared', pattern: 'src/lib/*' },
        { type: 'shared', pattern: 'src/lib/**/*' },
        { type: 'shared', pattern: 'src/utils/*' },
        { type: 'shared', pattern: 'src/utils/**/*' },
        { type: 'shared', pattern: 'src/hooks/*' },
        { type: 'shared', pattern: 'src/hooks/**/*' },
        { type: 'shared', pattern: 'src/types/*' },
        { type: 'shared', pattern: 'src/types/**/*' },

        // Server-only code
        { type: 'server', pattern: 'src/services/*' },
        { type: 'server', pattern: 'src/services/**/*' },
        { type: 'server', pattern: 'src/actions/*' },
        { type: 'server', pattern: 'src/actions/**/*' },
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
    files: ['src/components/**/*.{ts,tsx}', 'src/hooks/**/*.{ts,tsx}'],
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/components',
              from: './src/services',
              message:
                'Components must not import server-only modules (services/). Use server actions or API routes instead.',
            },
            {
              target: './src/hooks',
              from: './src/services',
              message:
                'Hooks must not import server-only modules (services/). Keep hooks runtime-neutral or client-safe.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/services/**/*.{ts,tsx}', 'src/actions/**/*.{ts,tsx}'],
    rules: {
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            {
              target: './src/services',
              from: './src/components',
              message:
                'Server code must not import client UI components. Keep server runtime pure.',
            },
            {
              target: './src/actions',
              from: './src/components',
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
      'src/lib/db/schema/**/*.{ts,tsx}',
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
      // Scripts run standalone via tsx and deep-import specific service modules
      // to avoid pulling barrel side effects (e.g. top-level-await modules).
      'import/no-internal-modules': 'off',
    },
  },

  // Eleven modules that must reach a concrete file rather than a slice
  // barrel, because importing the barrel closes a cycle that
  // `.dependency-cruiser.cjs`'s `no-circular` rejects. A barrel aggregates
  // unrelated modules, so importing one for a single symbol drags in
  // everything it re-exports - and where two slices each need one symbol from
  // the other (`auth`/`api`/`install`, `ai/core`/`ai/settings`,
  // `types/ingest`/`utils/ingest`), that is enough to make the module graph
  // circular even though no symbol is. Deep-importing removes the artificial
  // edge; the symbols themselves were never circular. The `config`/`settings`
  // pair was resolved for real: the row readers both slices needed moved to
  // `services/settings-store`, and both former exceptions import barrels now.
  //
  // Same reasoning the `scripts/` override below already applies: reach past
  // the barrel when pulling it in costs more than it buys. Named individually
  // rather than as a glob so a new deep import somewhere else still fails.
  {
    files: [
      'src/hooks/useDateFilterParams.ts',
      'src/services/ai/core/isAiConfigured.ts',
      'src/services/ai/settings/resolveStoredApiKey.ts',
      'src/services/api/isUsableSecret.ts',
      'src/services/api/requireAdminAccess.ts',
      'src/services/auth/domainAccess.ts',
      'src/services/auth/requirePermission.ts',
      'src/services/install/completeInstall.ts',
      'src/types/dashboard/PollStatus.ts',
      'src/types/ingest/UseEmailPipelineCardReturn.ts',
      'src/utils/ingest/computeNextStoreState.ts',
    ],
    rules: {
      'import/no-internal-modules': 'off',
    },
  },

  // TanStack Table's `useReactTable()` returns functions that React Compiler
  // cannot safely memoize. The hook already carries `'use no memo'` to opt
  // out of compilation; the lint rule still detects the call site statically
  // and has no allow-list option. Until @tanstack/react-table changes its API
  // or eslint-plugin-react-hooks adds an allow-list, this rule stays off for
  // the one wrapper that consumes useReactTable.
  {
    files: ['src/hooks/ui/useDataTable.ts'],
    rules: {
      'react-hooks/incompatible-library': 'off',
    },
  },
  {
    // dependency-cruiser loads CommonJS config only, so this one file is CJS
    // in an ESM project: it reaches the shared TypeScript factory through a
    // jiti require. eslint-config-next applies no-require-imports repo-wide.
    files: ['.dependency-cruiser.cjs'],
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
])

export default config
