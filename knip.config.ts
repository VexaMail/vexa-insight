import { createKnipConfig } from '@busirocket/quality-config/knip'

// This app predates the src/ convention: actions, components, hooks and the
// rest sit at the repo root. Knip's Next preset only globs src/ and app/, so
// without these every dependency reached from those directories reads as
// unused - it reported 34 of them.
export default createKnipConfig({
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
  // its own entry point.
  entry: ['scripts/**/*.{ts,mjs}', 'test/**/*.test.ts'],
  // A system binary `check:security` shells out to, not a package.
  ignoreBinaries: ['gitleaks'],
})
