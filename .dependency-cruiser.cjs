// dependency-cruiser loads CommonJS config; the shared factory is TypeScript,
// so jiti (a direct devDependency for exactly this purpose) transpiles it on
// the fly.
//
// `tsConfigPath` is what makes path aliases resolve: without it every aliased
// import comes back unresolved and the graph is mostly empty.
const { createJiti } = require('jiti')

const jiti = createJiti(__filename)
const { createDepCruiserConfig } = jiti(
  '@busirocket/quality-config/dependency-cruiser',
)

const baseline = createDepCruiserConfig({
  tsConfigPath: './tsconfig.json',
  orphanExemptions: [
    // Test runners collect these by glob; no module imports a test file.
    '\\.test\\.(ts|tsx)$',
    // Hand-run maintenance scripts, invoked by path from the shell.
    '(^|/)scripts/',
    // Dead on arrival: no module imports them. Exempted rather than deleted -
    // see "Baseline gate debt" in the repo backlog.
    '(^|/)components/ui/NavigatorProps\\.ts$',
    '(^|/)components/shell/Theme\\.ts$',
  ],
})

// Every cycle in this repo runs through a slice's own `index.ts`: a module
// imports the barrel that re-exports it. `viaNot` narrows the rule to cycles
// that do NOT pass through a barrel, so a genuine module-to-module cycle still
// fails the gate while the barrel-mediated ones stay reported as debt. Same
// root cause as the unused re-exports knip lists - see "Baseline gate debt" in
// the repo backlog.
module.exports = {
  ...baseline,
  forbidden: baseline.forbidden.map((rule) =>
    rule.name === 'no-circular'
      ? { ...rule, to: { ...rule.to, viaNot: '(^|/)index\\.ts$' } }
      : rule,
  ),
}
