# TODO Log

> Searchable record of closed project work. Active work lives in `TODO.md`.

## 2026

### 2026-07

- [x] 2026-07-24 — **Security:** Migrate the production CSP to nonces.
  - Result: Per-request nonce with `'strict-dynamic'` for `script-src` set by the proxy (`utils/proxy/applyProdCspHeaders.ts`); `'unsafe-inline'` removed from scripts (kept for styles — Recharts/framer-motion/next-font constraints, see ADR 0006); dev CSP unchanged via static headers; all pages force-dynamic (login via a server `layout.tsx`).
  - Evidence: `pnpm run build` shows every page `ƒ` (dynamic); `test/buildProdCspDirectives.test.ts`, `test/createCspNonce.test.ts`; full suite green.
  - Files: `proxy.ts`, `utils/proxy/applyProdCspHeaders.ts`, `utils/security/`, `app/login/layout.tsx`, eight `page.tsx` files.

- [x] 2026-07-24 — **Security:** Complete the RBAC rollout across privileged and mutating routes.
  - Result: Every privileged/mutating `/api/v1` route and server action now enforces a catalog permission via `requirePermission`; API key maps to the `admin` role (`services/api/getApiKeyRole.ts`); new `reports:write` permission; closed two previously unauthenticated admin GETs (`/api/v1/admin/settings`, `/api/v1/admin/ai-settings`) that leaked masked IMAP/CORS/AI config; unauthenticated `fetchMoreIp*` server actions now require `reports:read`.
  - Correction during review: `reports:write` was initially granted only to `admin` and `operator`, which would have 403'd report upload for the legacy `user` role — the DB default, the only non-admin role the app assigns, and one that sees an ungated `/upload` page. Granted `reports:write` to `user` as well; `viewer` stays strictly read-only.
  - Evidence: `test/apiRbacSmoke.test.ts` structural gate; `pnpm run test` 328/328; inventory in the session report.
  - Files: `app/api/v1/**` (13 route files), `actions/fetchMoreIp*.ts`, `services/api/`, `services/auth/`, `types/auth/Permission.ts`, `constants/auth/rolePermissions.ts`.

- [x] 2026-07-24 — **Artificial Intelligence:** Decide missing OpenRouter model behavior — fail clearly.
  - Result: Removed the silent `PROVIDER_DEFAULTS` fallback (`openrouter/auto` et al.); `resolveEffectiveModel` now throws `NOT_CONFIGURED` with an actionable message; routes return 422 and the panels render it.
  - Evidence: `test/resolveEffectiveModel.test.ts` (7 tests); full suite green.
  - Files: `services/ai/providers/shared/resolveEffectiveModel.ts` (providerDefaults.ts deleted).

- [x] 2026-07-24 — **Refactors:** Apply Zod at route boundaries and move Drizzle queries out of `app/**`.
  - Result: All direct Drizzle access removed from `app/**` (only `runMigrations` remains, a service call) into named service functions. Zod validation applied at 22 route boundaries: 6 body-input routes (`validators/{imap,updates,geoip,ai}/`) and 16 query-param routes via a shared `validators/query/` layer. Error codes, statuses and messages preserved verbatim; `stats/trend` `period` moved from a cast to `z.enum`. Removed the now-dead `utils/api/parseDateParams.ts`, 4 route-local constant files, and `utils/validation/coerceNumber.ts`; converted `utils/validation/index.ts` off `export *`.
  - Evidence: 61 new schema tests; `pnpm run test` 420/420; `pnpm run lint` clean; `pnpm run build` succeeds.
  - Files: `app/api/**` (22 routes), `validators/query/` (13 files), `validators/{imap,updates,geoip,ai}/`, `services/{reports,geoip,notifications,ip-hostname}/`.
  - Behavior notes: malformed (never valid) input differs slightly — `z.coerce.number()` uses `Number()` not `parseInt()`, so `?days=30abc` now yields no filter instead of 30; duplicated params take the last value rather than the first.

- [x] 2026-07-24 — **Bugs:** Fix the `next/image` aspect-ratio warning for the sidebar logo.
  - Result: The logo was declared 140x32 but the artwork's viewBox is 2286.29x592.55 (~3.86), so it always rendered 123px wide — exactly one dimension differing from the attributes, which is what `next/image` warns about. Declared 123x32 with `h-8 w-auto`. The LCP warning was already gone.
  - Evidence: Captured the real dev-mode console over the Chrome DevTools Protocol: warning present before, absent after; rendered 123 vs attribute "123", `widthModified: false`. `/login`, `/reports`, `/domains`, `/upload`, `/settings` all report a clean console.
  - Files: `components/shell/VexaLogo.tsx`.

- [x] 2026-07-24 — **Diagnostics:** Verify `/diagnostics/<domain>` against real domains in a browser.
  - Result: Rendered six real domains from a production build. Both branches exercised for every protocol — BIMI present (paypal.com, cnn.com) and absent (google.com, github.com, example.com, wikipedia.org); MTA-STS and TLS-RPT present (google.com) and absent (the rest). Verdicts cross-checked against live DNS: no false positives or negatives. SPF lookup tree correct, including github.com's 8 direct includes plus 2 nested = 10 total.
  - Evidence: HTTP 200 on all six; DNS cross-check via `dns.resolveTxt`.

- [x] 2026-07-24 — **Diagnostics:** Implement PDF export for the domain report.
  - Result: Print-first export (`ExportPdfButton` + `@media print` styles), no new dependency. Verified by generating a real PDF through the browser's own print pipeline: **22 pages**, so the fixed-height shell no longer clips the report to one page (`html`/`body`/`main` all resolve to `overflow: visible` under print media, sidebar hidden). A dark-themed session prints white-on-black-free: body forced to `rgb(255,255,255)` with `rgb(13,13,13)` text.
  - Correction during review: the grade badge was white text on a gradient, which disappears when "Background graphics" is off (confirmed: backgrounds are dropped, ~131 KB smaller PDF). In print the circle now renders as a 4px colored ring with grade-colored text — both print as foreground. Screen appearance unchanged (white on gradient).
  - Files: `components/diagnostics/ExportPdfButton.tsx`, `components/diagnostics/score/DomainScoreBadge.tsx`, `components/shell/`, `components/ai/`, `app/globals.css`.

- [x] 2026-07-24 — **Diagnostics:** Implement the SPF lookup-tree visualization.
  - Result: Recursive include/redirect tree resolver (`services/diagnostics/resolveSpfTree.ts` + single-purpose helpers) with RFC 7208 lookup counting, cycle detection, depth 10 / 30-node budgets, 5-minute cache; rendered as an accessible nested list after the SPF detail section in `DiagnosticsView`.
  - Evidence: `test/resolveSpfTree.test.ts` (9 tests), `test/SpfLookupTreeSection.test.ts` (4 tests); full suite 347/347.
  - Files: `services/diagnostics/` (10 new files), `components/diagnostics/spf/` (4 new files), `types/diagnostics/SpfTreeNode.ts`, `getDomainDnsRecords.ts`, `DiagnosticsView.tsx`.

- [x] 2026-07-24 — **Artificial Intelligence:** Expose an explicit rollout plan in the diagnostics AI response.
  - Result: Response schema extended to `{"insights":[...],"rolloutPlan":[...]}` (protocol-tagged, highest-impact first, max 5 steps); parsed defensively (missing/malformed -> `[]`) and rendered as a numbered Rollout Plan card after the insight sections.
  - Evidence: `test/diagnosticsAiPrompts.test.ts`, `test/parseDiagnosticsRolloutPlanFromContent.test.ts`; full suite 334/334. Live-provider call not exercised (follow-up in TODO).
  - Files: `services/ai/prompts/diagnosticsAnalysisSystem.ts`, `services/ai/use-cases/`, `components/ai/DiagnosticsRolloutPlanCard.tsx`, `types/ai/DiagnosticsAnalysisResult.ts`.

- [x] 2026-07-24 — **Diagnostics:** Remove the unrendered legacy diagnostics chain.
  - Result: Deleted 46 unreachable files (DnsDiagnosticsPanel/DnsRecordsLoader chain, dns card set, assessment/, executive summary, useDnsDiagnostics hook stack, entire lib/diagnostics) and trimmed 4 barrels; live `METRIC_*` style constants and `DnsRecordsSection` preserved.
  - Evidence: grep unreachability audit + `tsc` + knip; full suite green.
  - Files: `components/diagnostics/`, `hooks/diagnostics/`, `lib/`.

- [x] 2026-07-24 — **Bugs:** Fix the DKIM key-length estimator.
  - Result: Base64 padding-aware byte count, RSA SPKI DER overhead subtracted and rounded to the nearest 256 bits (real 2048-bit keys now report 2048, not 2352); standard 32-byte Ed25519 keys are no longer flagged weak.
  - Evidence: `test/parseDkimRecord.test.ts` (13 tests, updated expectations).
  - Files: `services/diagnostics/assessDkimKeyStrength.ts`, `decodeBase64ByteLength.ts`, `parseDkimRecord.ts`, `types/diagnostics/DkimKeyAssessment.ts`.

- [x] 2026-07-24 — **Bugs:** Fix SPF third-party include filter and lookup counting.
  - Result: All `include:` mechanisms are listed as third-party dependencies (the old condition inverted its own intent); `analyzeLimits` now counts qualified (`-a`), CIDR (`a/24`), and record-final `a`/`mx` mechanisms.
  - Evidence: `test/analyzeSpfRecord.test.ts` (18 tests incl. new counting regression).
  - Files: `services/diagnostics/analyzeDependencies.ts`, `analyzeLimits.ts`.

- [x] 2026-07-24 — **Testing:** Add direct unit tests for the diagnostics scoring and parsers.
  - Result: 57 tests covering `computeDomainScore` grade boundaries, `parseDmarcTags`, `parseDkimRecord`, `analyzeSpfRecord` edge cases; they surfaced the two bugs fixed above.
  - Evidence: `pnpm run test` green.
  - Files: `test/computeDomainScore.test.ts`, `test/parseDmarcTags.test.ts`, `test/parseDkimRecord.test.ts`, `test/analyzeSpfRecord.test.ts`.

- [x] 2026-07-24 — **Testing:** Add tests for admin guides, AI prompt builders, and protocol explainers.
  - Result: 34 tests covering guide severity ordering/caps/thresholds, prompt section content and runbook-non-repetition instructions, and server-rendered explainer output.
  - Evidence: `pnpm run test` green.
  - Files: `test/buildDiagnosticsAdminGuides.test.ts`, `test/diagnosticsAiPrompts.test.ts`, `test/ProtocolExplainer.test.ts`.

- [x] 2026-07-24 — **Testing:** Enable `.test.tsx` in the unit Vitest config.
  - Result: `vitest.config.ts` now includes `test/**/*.{test,spec}.{ts,tsx}` (a11y dir excluded to keep it under its own jsdom config); DOM-dependent tests can opt in via the `@vitest-environment jsdom` pragma.
  - Evidence: full suite green; a11y suite unaffected.
  - Files: `vitest.config.ts`.

- [x] 2026-07-24 — **Testing:** Make `pnpm run test:a11y` pass by adding the first a11y suites.
  - Result: axe-based tests for `InstallForm` (full + partial), `UnifiedPagination`, and `EmptyState`; zero violations found; `vitest-axe`'s broken `extend-expect` bypassed by asserting `results.violations` directly.
  - Evidence: `pnpm run test:a11y` exit 0 (3 files, 5 tests).
  - Files: `test/a11y/`.

- [-] 2026-07-24 — **Testing:** Consider upgrading or replacing `vitest-axe`.
  - Resolution: No upgrade exists — `vitest-axe` latest stable is still 0.1.0 (1.0.0 is prerelease `1.0.0-pre.5` only), and its `extend-expect` is a 0-byte no-op under Vitest 4. The a11y suites assert `results.violations` directly, which is fully typed, needs no setup, and still prints complete violation objects on failure. Revisit only if 1.0.0 ships stable.

- [x] 2026-07-24 — **Testing:** Benchmark and improve full-repository lint performance.
  - Result: Cold `eslint .` is 75.6 s (dominated by type-aware linting); enabled `--cache` in the lint scripts, warm runs now 5.4 s (14x). CI stays effectively cold (no cache file in fresh checkouts). Caveat: cache skips unchanged files even when a dependency's types changed; run a cold lint (`rm .eslintcache`) before releases.
  - Evidence: timed runs 2026-07-24.
  - Files: `package.json`, `.gitignore`.

- [x] 2026-07-24 — **Infrastructure:** Migrate `boundaries/dependencies` to eslint-plugin-boundaries v7 syntax.
  - Result: `rules` -> `policies` and 4 legacy selectors converted to object-based selectors; policy matrix unchanged; deprecation warnings gone; rule still enforcing (verified via debug run).
  - Evidence: `pnpm run lint` exit 0 with zero boundaries warnings.
  - Files: `eslint.config.ts`.

- [x] 2026-07-24 — **Infrastructure:** Decide per-process `withDiagnosticsCache` is sufficient — documented in ADR 0003.
  - Resolution: Deployment is deliberately single-replica (SQLite, RWO PVC, replicas=1 in k8s/Helm); per-replica DNS resolution only matters multi-replica. Revisit together with any multi-replica move.

- [x] 2026-07-24 — **Documentation:** Write the architecture decision records.
  - Result: 7 ADRs + index under `docs/adr/` (default-deny API, encrypted IMAP credentials, SQLite single-replica, reversible migrations, TS7 dual-alias interop, nonce CSP, explicit AI model), linked from `docs/README.md`; claims verified against code (notably: the "API key" is the shared `SECRET_KEY` admin token, not per-user keys).
  - Evidence: `docs/adr/README.md`; prettier clean.
  - Files: `docs/adr/`.

- [x] 2026-07-24 — **Pending Decisions:** Expand the DKIM selector probe list.
  - Resolution: Expanded from 9 to 28 documented, stable provider selectors (Google, M365, SendGrid, Mailgun, Zoho, Postmark legacy, Fastmail, Proton, iCloud, Constant Contact, Zendesk, Mailchimp/Mandrill); providers with per-account selectors (SES, HubSpot) cannot be probed with a fixed list. Each entry costs one parallel TXT lookup per uncached run.
  - Files: `services/diagnostics/knownSelectors.ts`.

- [x] 2026-07-23 — **Security:** Add the one-time install token field to the install UI.
  - Result: The install form now collects the token and submits it as `installToken`, so first-run web installs can pass the API's token gate.
  - Evidence: `pnpm exec tsc --noEmit`, ESLint, Prettier, and `pnpm test` (186/186) passed.
  - Files: `components/install/InstallForm.tsx`, `hooks/install/useInstallForm.ts`, `utils/install/installReducer.ts`, `types/install/InstallState.ts`, `types/install/InstallAction.ts`.

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
