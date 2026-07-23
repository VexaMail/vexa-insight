# TODO Log

> Searchable record of closed project work. Active work lives in `TODO.md`.

## 2026

### 2026-07

- [x] 2026-07-23 — **Documentation:** Publish the TODO-maintenance rule through a tracked instruction source.
  - Result: Removed `CLAUDE.md` and `AGENTS.md` from `.gitignore` and committed `CLAUDE.md` with the backlog, log, and history-index rule.
  - Evidence: commit `7021f658`.
  - Files: `.gitignore`, `CLAUDE.md`.

- [x] 2026-07-23 — **Testing:** Complete the full repository quality gate over the diagnostics work.
  - Result: Ran the full Vitest suite outside the DNS-restricted sandbox; the previously failing live-DNS assertion passed.
  - Evidence: `pnpm test` — 27 files, 186/186 tests passed.
  - Files: `test/safeFetch.test.ts`.

### 2026-05

- [x] 2026-05-19 — **Infrastructure:** Add Kubernetes manifests and a Helm chart.
  - Result: Added single-replica, SQLite-safe deployment resources with probes, persistence, ingress, and hardened container settings.
  - Evidence: `e8287ee4`; validated with `helm lint`, `helm template`, and `kubectl apply -k --dry-run=client`.
  - Files: `deploy/k8s/`, `deploy/helm/vexa-insight-dashboard/`.

- [x] 2026-05-19 — **Infrastructure:** Enforce reversible database migrations in CI.
  - Result: Added the migration policy, checker, and CI gate.
  - Evidence: `8dfe7f2a`.
  - Files: `scripts/check-migrations.sh`, `.github/workflows/ci.yml`.

- [x] 2026-05-19 — **Testing:** Add DMARC parser and ingestion regression coverage.
  - Result: Added major-provider fixtures, ZIP edge cases, duplicate-report idempotency, and per-report IP deduplication tests.
  - Evidence: `c9227e17`, `7f862ffc`, `125ab20d`.
  - Files: `test/parseDmarcXmlFixtures.test.ts`, `test/zipEdgeCases.test.ts`, `test/ingestIdempotency.test.ts`, `test/ingestIpDedup.test.ts`.

- [x] 2026-05-19 — **Bugs:** Resolve absolute SQLite `file:` URL paths correctly.
  - Result: Normalized absolute database URLs without treating them as relative paths.
  - Evidence: `3b7ee4aa`; covered by `test/resolveDbFilePath.test.ts`.
  - Files: `lib/db/resolveDbFilePath.ts`, `test/resolveDbFilePath.test.ts`.

- [x] 2026-05-19 — **Bugs:** Settle DMARC archive promises on `yauzl` errors.
  - Result: Added error-event handling so failed ZIP reads no longer leave ingestion promises pending.
  - Evidence: `ee5cddc7`.
  - Files: `services/dmarc/`.

- [x] 2026-05-19 — **Refactors:** Consolidate state types under `types/stores`.
  - Result: Removed the duplicate `store/` and `stores/` locations and centralized state contracts.
  - Evidence: `c04dc957`.
  - Files: `types/stores/`, `hooks/`.

- [x] 2026-05-19 — **Refactors:** Replace wildcard database barrels with explicit exports.
  - Result: Replaced `export *` usage in the database public API with named re-exports.
  - Evidence: `d4958269`.
  - Files: `lib/db/index.ts`, `lib/db/schema/index.ts`.

- [x] 2026-05-19 — **Refactors:** Validate environment variables and migrate direct environment access.
  - Result: Added fail-fast Zod validation and moved application call sites to the validated environment module.
  - Evidence: `6e420be4`, `fd244390`.
  - Files: `lib/env.ts`, `instrumentation.ts`.

- [x] 2026-05-19 — **Performance:** Eliminate the domain-summary N+1 query.
  - Result: Replaced per-domain lookups with SQL aggregation.
  - Evidence: `cc6954f9`; covered by `test/getDomainsSummaryAll.test.ts`.
  - Files: `services/reports/getDomainsSummaryAll.ts`, `test/getDomainsSummaryAll.test.ts`.

- [x] 2026-05-19 — **Performance:** Index normalized report end dates.
  - Result: Added an index for date-range filtering on normalized events.
  - Evidence: `966ca174`.
  - Files: `drizzle/`.

- [x] 2026-05-19 — **Performance:** Lazy-load Monaco on the ingest route.
  - Result: Removed roughly 3 MB of eager editor code from the route bundle.
  - Evidence: `55e45cea`.
  - Files: `components/ingest/`.

- [x] 2026-05-19 — **Documentation:** Add operations, proxy, SSO, and migration guidance.
  - Result: Documented troubleshooting, reverse-proxy deployment, experimental SSO, and migration policy.
  - Evidence: `650522a5`, `8dfe7f2a`, `94b548ad`.
  - Files: `docs/TROUBLESHOOTING.md`, `docs/DEPLOY-BEHIND-PROXY.md`, `docs/SSO.md`, `docs/MIGRATIONS.md`.

- [x] 2026-05-18 — **Security:** Default-deny `/api/v1/**`.
  - Result: Wrapped API routes with `withApiAuth` and added a structural smoke test for route coverage.
  - Evidence: `d11cb99d`, `dc0a0845`; covered by `test/apiAuthSmoke.test.ts` and `test/withApiAuth.test.ts`.
  - Files: `services/api/withApiAuth.ts`, `test/apiAuthSmoke.test.ts`.

- [x] 2026-05-18 — **Security:** Protect outbound webhook and MTA-STS requests from SSRF.
  - Result: Added private-address rejection and routed outbound requests through `safeFetch`.
  - Evidence: `9c4351fe`, `e6a15ac7`, `21ef01a3`; covered by `test/isPrivateIp.test.ts` and `test/safeFetch.test.ts`.
  - Files: `services/security/safeFetch.ts`, `services/notifications/`, `services/diagnostics/resolveMtaSts.ts`.

- [x] 2026-05-18 — **Security:** Encrypt IMAP credentials at rest.
  - Result: Added AES-256-GCM encryption derived from `SECRET_KEY` and migration-compatible reads.
  - Evidence: `38f3e71c`; covered by `test/encryptSecret.test.ts`.
  - Files: `services/crypto/`, `services/settings/`.

- [x] 2026-05-18 — **Security:** Enforce same-origin checks on session-authenticated mutations.
  - Result: Added CSRF validation while preserving API-key automation.
  - Evidence: `87d3aef4`, `dc0a0845`; covered by `test/requireSameOrigin.test.ts`.
  - Files: `services/security/requireSameOrigin.ts`, `services/api/withApiAuth.ts`.

- [x] 2026-05-18 — **Security:** Harden DMARC parsing against hostile archives and XML.
  - Result: Added XXE, ZIP-bomb, ZIP-slip, and archive-boundary protections.
  - Evidence: `9e15f07f`; later regression coverage in `c9227e17` and `125ab20d`.
  - Files: `services/dmarc/`, `test/dmarcParserHardening.test.ts`.

- [x] 2026-05-18 — **Security:** Tighten AI rate limits, password hashing, and local MCP handling.
  - Result: Limited AI endpoints to 10 requests per minute per IP, increased scrypt cost, and ignored token-bearing local MCP configuration.
  - Evidence: `3e6c1308`, `47ca0a35`; covered by `test/scryptBackcompat.test.ts`.
  - Files: `utils/rateLimit/`, `services/auth/`, `.gitignore`.

- [x] 2026-05-18 — **Infrastructure:** Harden CI and release provenance.
  - Result: Added least-privilege tokens, frozen installs, SHA-pinned actions, CodeQL, SBOMs, SLSA provenance, and keyless image signing.
  - Evidence: `d452230c`, `e0157a8f`, `dfe655f2`.
  - Files: `.github/workflows/`.

### 2026-04

- [x] 2026-04-22 — **Diagnostics:** Add the domain security score.
  - Result: Added letter grades and percentages with protocol-specific scoring functions coordinated by `computeDomainScore`.
  - Evidence: Historical Codex type-check and focused ESLint passed; repository baseline `a9848a44`.
  - Files: `services/diagnostics/computeDomainScore.ts`, `services/diagnostics/score*.ts`.

- [x] 2026-04-22 — **Diagnostics:** Resolve the expanded protocol and DNS dataset with caching.
  - Result: Added BIMI, MTA-STS, TLS-RPT, A, and NS resolution plus a five-minute in-memory TTL cache.
  - Evidence: Historical Codex type-check and focused ESLint passed; repository baseline `a9848a44`.
  - Files: `services/diagnostics/getDomainDnsRecords.ts`, `services/diagnostics/withDiagnosticsCache.ts`.

- [x] 2026-04-22 — **Diagnostics:** Feed all domain TXT records into SPF analysis.
  - Result: Restored duplicate and conflict detection by passing the resolved TXT set to `analyzeSpfRecord`.
  - Evidence: Historical Codex type-check and focused ESLint passed; current integration coverage in `test/getDomainDnsRecords.test.ts`.
  - Files: `services/diagnostics/getDomainDnsRecords.ts`.

- [x] 2026-04-22 — **Diagnostics:** Add a deterministic administrator runbook.
  - Result: Added why-it-matters, remediation, and verification guidance derived from DNS, score, and report data.
  - Evidence: Historical Codex type-check and focused ESLint passed; repository baseline `a9848a44`.
  - Files: `services/diagnostics/buildDiagnosticsAdminGuides.ts`, `components/ai/DiagnosticsAdminRunbook.tsx`.

- [x] 2026-04-22 — **Diagnostics:** Reclassify valid SPF `~all` guidance.
  - Result: Changed soft-fail guidance from a high-severity correction to a low-priority hardening suggestion.
  - Evidence: Historical Codex type-check and focused ESLint passed; repository baseline `a9848a44`.
  - Files: `services/diagnostics/`.

- [x] 2026-04-22 — **Diagnostics:** Add contextual protocol help and examples.
  - Result: Added tooltips and protocol explainers with example DNS hosts and values.
  - Evidence: Historical Codex type-check and focused ESLint passed; repository baseline `a9848a44`.
  - Files: `components/diagnostics/shared/InfoTooltip.tsx`, `components/diagnostics/shared/ProtocolExplainer.tsx`.

- [x] 2026-04-22 — **Diagnostics:** Remove duplicate legacy blocks from the active diagnostics view.
  - Result: Removed the old DNS panel, executive summary, assessment, and authentication breakdown from `DiagnosticsView`.
  - Evidence: Historical Codex type-check and focused ESLint passed; repository baseline `a9848a44`.
  - Files: `components/diagnostics/DiagnosticsView.tsx`.

- [x] 2026-04-22 — **Diagnostics:** Restore English-only report copy.
  - Result: Reverted an accidental Spanish/English mix while retaining the functional guidance changes.
  - Evidence: Historical Codex type-check and focused ESLint passed; repository baseline `a9848a44`.
  - Files: `components/diagnostics/`, `services/diagnostics/`.

- [x] 2026-04-22 — **Artificial Intelligence:** Expand diagnostics analysis context.
  - Result: Included score, deterministic guides, SPF checks, DMARC tags, DKIM details, A/NS, BIMI, MTA-STS, TLS-RPT, statistics, and aggregate report data while asking the model not to repeat the runbook.
  - Evidence: Historical Codex type-check and focused ESLint passed; repository baseline `a9848a44`.
  - Files: `services/ai/prompts/`, `services/ai/use-cases/`, `components/ai/`.

- [x] 2026-04-22 — **Testing:** Add regression tests for report-detail rendering failures.
  - Result: Added server-render checks for the IP link and deterministic country-flag markup.
  - Evidence: Historical targeted Vitest and type-check passed; repository baseline `a9848a44`.
  - Files: `test/IpAddressLink.test.ts`, `test/IpFlag.test.ts`.

- [x] 2026-04-22 — **Bugs:** Fix the report-detail server/client boundary crash.
  - Result: Removed the server-side click handler passed into `next/link`.
  - Evidence: Historical `pnpm test -- test/IpAddressLink.test.ts` and `pnpm type-check` passed.
  - Files: `components/ips/IpAddressLink.tsx`, `test/IpAddressLink.test.ts`.

- [x] 2026-04-22 — **Bugs:** Fix the report sources hydration mismatch.
  - Result: Replaced the unstable Radix tooltip wrapper around the IP flag with deterministic markup.
  - Evidence: Historical targeted Vitest and type-check passed.
  - Files: `components/ips/IpFlag.tsx`, `test/IpFlag.test.ts`.
