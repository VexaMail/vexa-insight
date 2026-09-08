import { createAccessibilityConfig } from '@busirocket/eslint-config/accessibility'
import { createBaseConfig } from '@busirocket/eslint-config/base'
import { createCodeQualityConfig } from '@busirocket/eslint-config/code-quality'
import { createNextjsConfig } from '@busirocket/eslint-config/nextjs'
import sonarjs from 'eslint-plugin-sonarjs'
import unicorn from 'eslint-plugin-unicorn'
import { defineConfig, globalIgnores } from 'eslint/config'

// Layer order: base -> framework -> code-quality -> accessibility, then the
// project's own architecture and the named exceptions below.
const config = defineConfig([
  ...createBaseConfig({ tsconfigRootDir: import.meta.dirname }),
  ...createNextjsConfig({ tsconfigRootDir: import.meta.dirname }),
  ...createCodeQualityConfig(),
  ...createAccessibilityConfig(),

  globalIgnores([
    // Agent scratch space and git worktrees checked out inside the repo.
    '.claude/**',
    '.worktrees/**',
  ]),

  // Repository-wide file and module hygiene on top of the shared layers.
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    plugins: { unicorn },
    rules: {
      'unicorn/no-abusive-eslint-disable': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-optional-catch-binding': 'error',
      'unicorn/filename-case': [
        'error',
        // checkDirectories is off because Next.js route directories are URL
        // segments and must stay kebab-case.
        {
          cases: { camelCase: true, pascalCase: true },
          checkDirectories: false,
        },
      ],

      /**
       * "Public API only" enforcement.
       * Each module directory must expose its contract via index.ts.
       * Deep imports (e.g. @/services/auth/password) are forbidden.
       */
      'import/no-internal-modules': ['error', { forbid: ['@/*/*/**'] }],
    },
  },

  // Warnings that would otherwise be invisible to the gate. `pnpm lint` runs
  // without --max-warnings 0 and ESLint's bulk suppressions only record
  // errors, so a rule left at `warn` is either ignored by CI or blocks every
  // commit that touches a file it flags (the pre-commit hook does use
  // --max-warnings 0). At `error` the pre-existing debt is expressible in
  // `eslint-suppressions.json` - a ledger review can see and `lint:prune`
  // can only shrink - while new violations still fail.
  {
    files: ['**/*.{js,jsx,ts,tsx,mjs,cjs}'],
    plugins: { sonarjs },
    rules: {
      'max-lines-per-function': [
        'error',
        { max: 50, skipBlankLines: true, skipComments: true, IIFEs: true },
      ],
      complexity: ['error', { max: 10 }],
      'max-params': ['error', { max: 4 }],
      'sonarjs/no-duplicate-string': ['error', { threshold: 4 }],
    },
  },
  {
    // The promotion above is repository-wide, so it also re-enabled
    // `max-lines-per-function` inside test files, which the shared
    // code-quality layer deliberately turns off: the longest function in a
    // test file is the top-level `describe` callback, so the rule measures the
    // wrapper rather than any real complexity, and twenty trivial `it` cases
    // already report a 62-line arrow. File size in tests is governed by
    // `max-lines` at 200 instead. Globs match the shared layer's.
    files: [
      '**/*.{test,spec}.{ts,tsx}',
      '**/__tests__/**/*.{ts,tsx}',
      '**/tests/**/*.{ts,tsx}',
      '**/test/**/*.{ts,tsx}',
    ],
    rules: {
      'max-lines-per-function': 'off',
    },
  },

  // This is a self-hosted server whose stdout is its journal: the scheduler,
  // the ingestion job and the AI use-cases report what they did through
  // `console.info`, and operators grep those lines. `console.log` and
  // `console.debug` stay banned as debugging leftovers; the two logging
  // primitives are the only files allowed to reach them.
  {
    files: ['src/services/**/*.ts', 'instrumentation.ts'],
    rules: { 'no-console': ['error', { allow: ['warn', 'error', 'info'] }] },
  },
  {
    files: ['src/utils/log/emit.ts', 'src/utils/imap/createImapLogger.ts'],
    rules: { 'no-console': 'off' },
  },

  // Runtime boundary enforcement (server <-> client), stricter than the
  // shared boundaries layer, which lets shared code reach services.
  //
  // Prevents the classic "imported server secrets into client bundle" failure:
  // - Client/component code must NEVER import from services/ (server-only)
  // - Server code must NOT import from components/ (client UI)
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

  // Allow overrides: db schema files, script files and the Next.js
  // `not-found` convention file can use kebab-case
  {
    files: [
      'app/**/not-found.tsx',
      'src/lib/db/schema/**/*.{ts,tsx}',
      'scripts/**/*.{js,mjs,cjs,ts}',
      'drizzle/**/*.{js,ts}',
    ],
    rules: {
      'unicorn/filename-case': 'off',
    },
  },

  // Scripts run standalone via tsx: their stdout is their output, and they
  // deep-import specific service modules to avoid pulling barrel side effects
  // (e.g. top-level-await modules).
  {
    files: ['scripts/**/*.ts'],
    rules: {
      'no-console': 'off',
      'import/no-internal-modules': 'off',
    },
  },

  // Every path these files build comes from constants, `process.cwd()`, env,
  // or drizzle's own migration journal - none is reachable from request
  // input. Audited one by one on 2026-08-28; listed by name so a new fs call
  // on a caller-supplied path elsewhere still reports.
  {
    files: [
      'src/lib/db/applySqlFile.ts',
      'src/lib/db/runMigrations.ts',
      'src/services/ai/evals/writeEvalArtifact.ts',
      'src/services/geoip/updateDb.ts',
      'src/services/updates/internals/isGitCheckout.ts',
      'src/services/updates/readSelfUpdateLog.ts',
      'src/services/updates/writeSelfUpdateAuditEntry.ts',
    ],
    rules: {
      'security/detect-non-literal-fs-filename': 'off',
    },
  },
  {
    // A test process reads fixture paths it builds itself from repository
    // constants, which is the untrusted-input case the rule exists to catch
    // inverted.
    files: ['test/**/*.{ts,tsx}'],
    rules: {
      'security/detect-non-literal-fs-filename': 'off',
    },
  },

  {
    // `isUsableSecret` compares the configured secret against the public
    // installer placeholder to refuse an unconfigured instance; nothing
    // secret is on either side of that `===`, so there is no timing to leak.
    files: ['src/services/credentials/isUsableSecret.ts'],
    rules: {
      'security/detect-possible-timing-attacks': 'off',
    },
  },
  {
    // TypeScript's prop types are the validation. `react/prop-types` cannot
    // see through `forwardRef`'s generic, so it reports the destructured props
    // of every ref-forwarding primitive as unvalidated.
    files: ['**/*.tsx'],
    rules: {
      'react/prop-types': 'off',
    },
  },
  {
    // cmdk styles its parts through bare `cmdk-*` attributes and its own
    // selectors expect them verbatim; `data-` prefixes would not match.
    files: [
      'src/components/ui/CommandEmpty.tsx',
      'src/components/ui/CommandInput.tsx',
    ],
    rules: {
      'react/no-unknown-property': [
        'error',
        { ignore: ['cmdk-empty', 'cmdk-input-wrapper'] },
      ],
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
])

export default config
