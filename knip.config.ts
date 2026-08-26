import { createKnipConfig } from '@busirocket/quality-config/knip'

// This app predates the src/ convention: actions, components, hooks and the
// rest sit at the repo root. Knip's Next preset only globs src/ and app/, so
// without these every dependency reached from those directories reads as
// unused - it reported 34 of them. Declared here rather than moved: moving
// them is a diff of its own, tracked under "Baseline gate debt" in the repo backlog.
const baseline = createKnipConfig({
  framework: 'nextjs',
  project: [
    '{actions,components,constants,contexts,data,formatters,hooks,lib,mappers,services,types,utils,validators}/**/*.{ts,tsx}',
    'scripts/**/*.{ts,mjs}',
    'test/**/*.ts',
    // Tailwind is reached only from `@import 'tailwindcss'` in globals.css and
    // from postcss.config.mjs; without CSS in the project it reads as unused.
    'app/**/*.css',
  ],
  // Hand-run from the shell and from vitest, so nothing imports them: each is
  // its own entry point. Declaring them beats ignoring them - ignored, the
  // dependencies they alone use (ts-morph, mailparser) read as unused.
  entry: ['scripts/**/*.{ts,mjs}', 'test/**/*.test.ts', 'evals/**/*.ts'],
  // Generated migration output, not source.
  //
  // The rest of this list is frozen debt, not exemption: every file below is
  // dead code knip found the moment the project globs above made it visible,
  // and each is named individually so a new one cannot hide behind a wildcard.
  // Deleting them is its own diff - see "Baseline gate debt" in the repo backlog.
  ignore: [
    'drizzle/**',
    'components/dashboard/DomainsSummaryPayload.ts',
    'components/index.ts',
    'components/ingest/IngestActions.ts',
    'components/ingest/IngestState.tsx',
    'components/ingest/IngestStore.ts',
    'components/ingest/IngestStoreProviderProps.ts',
    'components/ingest/IngestTab.tsx',
    'components/ingest/createIngestStore.tsx',
    'components/shell/Theme.ts',
    'components/ui/DataTableProps.ts',
    'components/ui/NavigatorProps.ts',
    'hooks/index.ts',
    'lib/ai/deriveToneFromSeverity.ts',
    'lib/ai/index.ts',
    'lib/index.ts',
    'services/ai/evals/index.ts',
    'services/ai/mappers/deriveToneFromSeverity.ts',
    'services/ai/mappers/mapDiagnosticsInsightToRenderable.ts',
    'services/index.ts',
    'services/job/pollStatus.ts',
    'types/PollStatus.ts',
    'types/index.ts',
    'utils/cli/index.ts',
  ],
  // Frozen debt: nothing imports these any more. Removing them from
  // package.json is a diff of its own, tracked in the repo backlog.
  ignoreDependencies: [
    '@radix-ui/react-collapsible',
    '@radix-ui/react-label',
    '@radix-ui/react-progress',
    '@radix-ui/react-separator',
    '@radix-ui/react-switch',
    '@radix-ui/react-toggle',
    '@radix-ui/react-toggle-group',
    'mailparser',
    'ts-morph',
  ],
  // A system binary `check:security` shells out to, not a package.
  ignoreBinaries: ['gitleaks'],
})

// 124 pre-existing findings: 83 unused exports and 41 unused types. Nearly all
// are re-exports from `index.ts` barrels that no consumer goes through - the
// repo imports concrete paths instead - plus one dead export each in 33 files.
// Every other knip rule stays at `error`, so unused files, dependencies and
// undeclared imports still fail the gate; only these two are reporting rather
// than blocking, until the barrels are either used or deleted. The count is
// the debt: see "Baseline gate debt" in the repo backlog.
const config = {
  ...baseline,
  rules: { ...baseline.rules, exports: 'warn', types: 'warn' },
}

export default config
