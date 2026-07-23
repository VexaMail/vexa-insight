# TODO

> Consolidated from the accessible Claude, Codex, and Antigravity project
> history. Last reviewed: 2026-07-23. History coverage: Partial.
>
> Accessible historical conversations were fully reviewed. One deleted Claude
> transcript remains available only as a WakaTime stub, and the active
> Claude/Codex audit handoff is indexed as partial. No Antigravity conversation
> belongs to this repository. Project-scoped MemPalace search was inaccessible
> because its database is read-only in this sandbox.
>
> States: `[ ]` pending · `[~]` partial or unverified · `[!]` blocked ·
> `[x]` verified complete · `[-]` obsolete or superseded. Closed work moves to
> `TODO_LOG.md`.

## Security

- [ ] Migrate the production CSP to nonces. `utils/security/prodCspDirectives.ts` still permits `'unsafe-inline'` for scripts and styles; the launch-security plan deferred the middleware changes.
- [~] Complete the RBAC rollout and verify every privileged or mutating route enforces the intended permission. The scaffold in `services/auth/requirePermission.ts` is currently used only by the audit-log route.

## Diagnostics

- [~] Manually verify `/diagnostics/<domain>` in a browser against real domains with and without BIMI, MTA-STS, and TLS-RPT. Historical validation covered type-checking and focused linting, not the real UI flow.
- [ ] Remove or update the unrendered legacy diagnostics chain: `components/diagnostics/DnsDiagnosticsPanel.tsx`, `DnsRecordsLoader.tsx`, `dns/DkimCard.tsx`, `assessment/DiagnosticsOverallAssessment.tsx`, and `executive/DiagnosticsExecutiveSummary.tsx`.
- [ ] Implement PDF export for the domain report.
- [ ] Implement the SPF lookup-tree visualization.

## Artificial Intelligence

- [ ] Decide how missing OpenRouter model configuration should behave. Development logs fall back to `openrouter/auto`; either select an explicit default or fail clearly.
- [ ] Make the diagnostics AI response expose an explicit rollout plan or ordered next-steps section instead of leaving sequencing implicit.

## Testing

- [ ] Add direct unit tests for `computeDomainScore`, `parseDmarcTags`, `parseDkimRecord`, and `analyzeSpfRecord`.
- [ ] Add tests for `buildDiagnosticsAdminGuides`, the diagnostics AI prompt builders, and the protocol explainers.
- [ ] Decide whether Vitest should include `.test.tsx`; `vitest.config.ts` currently matches only TypeScript test files, so JSX regression tests must avoid JSX syntax.
- [ ] Benchmark and improve full-repository lint performance; historical sessions repeatedly abandoned `eslint .` because it ran much longer than type-checking.
- [ ] `pnpm run test:a11y` exits 1 because `test/a11y/` has no test files; either add the first a11y test or drop the script.

## Bugs

- [~] Confirm in a browser that the `next/image` LCP and aspect-ratio warnings for `/vexa-insight-logo.svg` are gone after the two historical `components/shell/VexaLogo.tsx` changes.

## Infrastructure

- [ ] Decide whether the per-process `withDiagnosticsCache` is sufficient for future multi-replica deployments or replace it with shared caching. Each replica currently resolves DNS independently.
- [!] Re-upgrade `@radix-ui/react-slot` past 1.2.x once a release ships the module-scope `SlotContext` behind a `"use client"` directive (or an RSC-safe build). 1.3.x calls `React.createContext` at module scope with no directive, which crashes `next build` page-data collection (`e.createContext is not a function`) for every server page importing UI components that use Slot. Smallest unblock: test the next 1.4.x stable release with `pnpm run build`.
- [ ] Re-upgrade `typescript` to a plain spec once typescript-eslint supports TS >= 7.1 (their issue #10940). Until then the repo uses the dual-alias interop: `typescript` -> `@typescript/typescript6` (JS API for eslint/Next/prettier plugins) and `typescript-7` -> native `tsc` used by `type-check`. The `typescript-eslint` overrides in `pnpm-workspace.yaml` exist because `eslint-config-next` pins 8.59.x.
- [ ] Migrate `boundaries/dependencies` config in `eslint.config.ts` to eslint-plugin-boundaries v7 syntax: rename `rules` to `policies` and replace the 4 legacy selectors with object-based selectors. Currently only deprecation warnings.

## Refactors

- [ ] Apply Zod validation consistently at route boundaries and move remaining Drizzle queries from `app/**` into services, as deferred by the launch-security plan.

## Documentation

- [ ] Write the architecture decision records listed as a post-launch follow-up.

## Pending Decisions

- [ ] Decide whether experimental OIDC SSO is production-ready. `docs/SSO.md` documents liberal JIT provisioning, no SCIM or group sync, and no session revocation.
- [ ] Confirm whether the domain score must match PowerDMARC exactly or remain only inspired by it. The current SPF/DKIM/DMARC/BIMI/MTA-STS/TLS-RPT weights were never checked for output parity.
- [ ] Decide whether to expand the DKIM selector probe list in `services/diagnostics/knownSelectors.ts`.

## Future Ideas

- [ ] Redesign the diagnostics page as one editorial narrative instead of stacked cards.
- [ ] Add expand/collapse controls to each protocol section.
- [ ] Generate copy-ready DNS examples from the inspected domain's real values instead of generic placeholders.
