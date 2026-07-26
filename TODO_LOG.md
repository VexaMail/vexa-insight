# TODO Log

> Searchable record of closed project work. Active work lives in `TODO.md`.

## 2026

### 2026-07

- [x] 2026-07-26 — **Security:** Apply the per-user domain allow-list to the IP views (found during this run, not previously in the backlog).
  - Result: `getAllowedDomainIds` gates 16 report services but none of the six IP services, so a `viewer`/`user` restricted to one domain saw `/ips`, `/ips/[ip]` and `/api/v1/stats/top-ips` computed over every domain -- and `getIpDomains` returned the out-of-scope domain names themselves. All six (`getIpsSummary`, `getIpDetail`, `getIpDomains`, `getIpLogs`, `getIpReports`, `getTopIpSenders`) now filter on `normalizedEvents.domainId`. `getIpDetail` puts the filter in its LEFT JOIN and returns null when a restricted caller's aggregates come back null, so an IP that never sent to their domains reads as not-found instead of a zeroed page; its `total_messages` alias was typed `sql<number>` while the LEFT JOIN can yield NULL, now `sql<number | null>`.
  - Two fail-open paths in `getAllowedDomainIds` closed at the same time: a present-but-unusable allow-list (unparseable JSON, non-array, or `[]`) returned null (= all domains) and now returns `[]`. `[]` is reachable through the API -- `updateUserInputSchema` accepts an empty array and only the modal blocks it client-side.
  - Third, opposite-direction bug found while checking the first fix: `getAllowedDomainIds` reads only the session cookie, but a valid shared `SECRET_KEY` authenticates without one. Every domain-scoped query therefore returned nothing to API-key callers -- `/api/v1/stats/by-org` was already broken this way before this change. It now mirrors `requirePermission`: no session plus a valid key resolves to unrestricted.
  - Evidence: `pnpm run check:ci` clean (type-check, lint, format, 454/454 tests, migrations). New `test/ipDomainScoping.test.ts` (5 cases, 4 fail without the service fix) and `test/getAllowedDomainIds.test.ts` (6 cases, 2 fail without the auth fix), both verified by stashing the fix and re-running.
  - Files: `services/auth/domainAccess.ts`, `services/reports/getIp{sSummary,Detail,Domains,Logs,Reports}.ts`, `services/reports/getTopIpSenders.ts`, `test/{ipDomainScoping,getAllowedDomainIds}.test.ts`, `test/setup/insertSeedIp.ts`.
  - Note: `ipAddresses.emailsSentCount` is a denormalized global per-IP counter and is still shown unscoped; tracked in `TODO.md`.

- [x] 2026-07-26 — **Testing:** Fix the empty-state ARIA of the `Command` palette.
  - Result: The fix landed in `components/ui/CommandEmpty.tsx`, not `CommandList.tsx` as the backlog assumed. cmdk hardcodes `role` _after_ the caller's prop spread in both `List` and `Empty`, so neither role can be overridden from outside. Both candidate fixes were measured with axe rather than reasoned about: dropping the listbox while the filtered count is zero only trades one violation for another (`aria-valid-attr-value`, because the input's `aria-controls` then dangles), while exposing the empty message as `role="option" aria-disabled="true"` reports zero violations. `CommandEmpty` now renders its own element instead of `Command.Empty`, keeping the `[cmdk-item]` attribute off it so arrow-key navigation still skips it.
  - Evidence: `pnpm run test:a11y` 42/42 (the two empty-state cases fail before the change); `pnpm run check:all` clean, `pnpm run test` 443/443; `pnpm run build` succeeds.
  - Files: `components/ui/CommandEmpty.tsx`, `test/a11y/Command.test.tsx`.

- [x] 2026-07-26 — **Testing:** Extend a11y coverage to the settings forms.
  - Result: Four new suites (`AiSettingsSection`, `ImapAccountsSection`, `IngestionSection`, `ApiKeySection`); suites 12 -> 16, tests 26 -> 42. Three real defects found and fixed, all in the IMAP section: the collapsed account header was a `role="button"` div wrapping a real `<button>` (axe `nested-interactive`, serious/wcag2a) and is now a real `<button aria-expanded>` with the Edit/Close affordance rendered via `Button asChild` as a span; none of the five account fields were associated with their labels (`htmlFor`/`id` per row index) so every one had an empty accessible name; and `FolderPicker`'s folder `select` plus its new-folder input had no accessible name at all. The two `<label>` elements used as group captions ("Fetch Options", "Post-Processing") labelled no control and are now spans.
  - Also fixed: `components/settings/index.ts` had five dead `export *` lines. Every section in that folder is a default export, and `export *` never re-exports a default, so the barrel exported nothing for `AdvancedSection`, `ApiKeySection`, `ImapAccountsSection`, `IngestionSection`, and `SettingsConfigForm`. Rewritten with explicit named re-exports, `AiSettingsSection` added, and that component switched from a relative deep import of its hooks to the `@/hooks/settings` barrel like its siblings.
  - Note: assertions use `toBeInTheDocument` rather than `toBeVisible`. Every section is a framer-motion element starting at `opacity: 0` and jsdom never advances the animation, so `toBeVisible` fails for a reason unrelated to accessibility. axe still audits the subtree, which the `nested-interactive` finding proves — the passing suites are not vacuous.
  - Evidence: `pnpm run test:a11y` 42/42; `pnpm run check:all` clean, `pnpm run test` 443/443; `pnpm run format:check` and `pnpm run check:migrations` clean; `pnpm run build` succeeds.
  - Files: `components/settings/{ImapAccountsSection,FolderPicker,AiSettingsSection,index}.tsx|ts`, `test/a11y/{AiSettingsSection,ImapAccountsSection,IngestionSection,ApiKeySection}.test.tsx`.

- [x] 2026-07-25 — **Performance:** Remove the unused `services/imap/getImapTotalCount.ts`.
  - Result: Deleted the function, its `types/imap/GetImapTotalCountOptions.ts` type, and both barrel entries. It had no callers; wiring it into the job would have re-added the redundant full-mailbox IMAP SEARCH that ADR 0008 removed. ADR 0008's "alternatives considered" note updated to record the deletion.
  - Evidence: `grep -rn getImapTotalCount` returns only the ADR note; `pnpm run type-check`, `pnpm run lint`, `pnpm run format:check` clean; `pnpm run test` 424/424.
  - Files: `services/imap/{getImapTotalCount.ts,index.ts}`, `types/imap/{GetImapTotalCountOptions.ts,index.ts}`, `docs/adr/0008-batched-ingest-and-daily-rollups.md`.

- [x] 2026-07-25 — **Refactors:** Standardize the poll-status path-param error shape.
  - Result: `app/api/v1/job-runs/[id]/poll-status/route.ts` now uses the shared `parseIdParam` guard and returns `{ error: { code: 'BAD_REQUEST', message: 'Invalid job run id' } }` instead of the non-standard `{ error: 'Invalid Job ID' }`. This also tightens the guard: `parseInt` accepted `"12abc"` and negative ids, `parseIdParam` requires a positive integer.
  - Evidence: `pnpm run type-check`, `pnpm run lint`, `pnpm run format:check` clean; `pnpm run test` 424/424.
  - Files: `app/api/v1/job-runs/[id]/poll-status/route.ts`.

- [x] 2026-07-25 — **Refactors:** Require integer ids in the AI request bodies.
  - Result: Added `.int()` to `reportInsightsRequestSchema.reportId` and `diagnosticsInsightsRequestSchema.domainId`; both accepted fractional numbers, preserved from the pre-Zod code. Row ids are integers everywhere in the schema, so a fractional id could only ever be a client bug.
  - Evidence: existing `test/reportInsightsRequestSchema.test.ts` and `test/diagnosticsInsightsRequestSchema.test.ts` still pass (error messages unchanged); `pnpm run test` 424/424.
  - Files: `validators/ai/{reportInsightsRequestSchema,diagnosticsInsightsRequestSchema}.ts`.

- [x] 2026-07-25 — **Refactors:** Convert `utils/api/index.ts` off `export *`.
  - Result: Replaced the wildcard barrel with an explicit `export { parseIdParam }`, matching the repo barrel policy and the `utils/validation/index.ts` conversion from 2026-07-24.
  - Evidence: `pnpm run type-check`, `pnpm run lint` clean.
  - Files: `utils/api/index.ts`.

- [x] 2026-07-25 — **Artificial Intelligence:** Require a configured model in `isAiConfigured`.
  - Result: `isAiConfigured()` now also requires a non-blank `model`, so with only provider + key saved the diagnostics and report panels render `AiNotConfiguredCta` instead of an Analyze button that always 422s. Since ADR 0007 `resolveEffectiveModel` refuses to guess a provider default, provider+key alone is not a usable configuration.
  - Evidence: new `test/isAiConfigured.test.ts` (3 cases: no provider, provider+key without a model incl. blank/whitespace, provider+key+model); `pnpm run test` 424/424.
  - Files: `services/ai/core/isAiConfigured.ts`, `test/isAiConfigured.test.ts`.
  - Note: `services/ai/contracts/AiConfigurationStatus.ts` (`AIConfigurationStatus`) has no consumers at all; left in place as pre-existing dead code, tracked in `TODO.md`.

- [x] 2026-07-25 — **Testing / Bugs:** Extend a11y coverage to the interactive surfaces, and fix an unnamed combobox it found.
  - Result: Covered the surfaces with focus management and Radix portals that the earlier static pass could not reach — `DataTable` (populated, empty, and chrome-hidden), `Select` (closed and with the listbox open), and `DateRangeFilter` (preset and custom-range).
  - Real defect found and fixed: the date-range `SelectTrigger` had no accessible name (axe `button-name`, serious). Its only text comes from `SelectValue`, which renders nothing until the matching `SelectItem` mounts, so screen readers announced an unnamed button. Added an explicit `aria-label="Date range"`, pinned by a `getByRole('combobox', { name: 'Date range' })` assertion.
  - Harness: `test/setupA11y.ts` now stubs `scrollIntoView`, the pointer-capture methods, and `ResizeObserver`. jsdom has no layout engine and Radix calls these while opening, so without them the component threw before axe could audit the portalled content. Axe checks roles, names, and relationships, none of which depend on real geometry.
  - The open-listbox audit runs against `document.body`, not the render container, because Radix portals the content out — auditing the container would have silently skipped the popover. The `region` rule is disabled for that one audit only, with the reason inline: the portal mounts as a direct child of `<body>` by design, so it fires in every correct implementation.
  - Also covered `Dialog` (closed, and open with an asserted accessible name + description) and the `Command` palette. Suites 7 -> 12, tests 15 -> 26.
  - Second real finding, not fixed: cmdk puts `role="listbox"` on `CommandList` unconditionally, so with no results the listbox has no `option` children and axe raises `aria-required-children` (wcag2a). Not silently patched — the fix changes a shared UI primitive's ARIA semantics and belongs in `components/ui/CommandList.tsx`, so it is filed in `TODO.md`. The empty-state test asserts that this is the _only_ violation, so any other empty-state regression still fails, and the test fails once the issue is fixed.
  - Evidence: `pnpm run test:a11y` 26/26 (the `DateRangeFilter` cases fail before the `aria-label` fix); `pnpm run check:ci` exit 0 (type-check, lint, format:check, 443/443 tests, migrations) from cleared `tsconfig.tsbuildinfo` and `.eslintcache`; `pnpm run build` exit 0.
  - Files: `components/filters/DateRangeFilterContent.tsx`, `test/setupA11y.ts`, `test/a11y/{DataTable,Select,DateRangeFilter,Dialog,Command}.test.tsx`.

- [x] 2026-07-25 — **Security:** Add an `ai:invoke` permission for per-role AI cost control.
  - Result: AI insight generation spends the operator's paid provider quota but was gated only by `reports:read`, so any role that could look at a report could spend money. Added `ai:invoke` to the permission union and switched both `/api/v1/ai/report-insights` and `/api/v1/ai/diagnostics-insights` to require it. Mechanism only, no policy change: `ai:invoke` is granted to exactly the roles that hold `reports:read` today (admin, operator, viewer, user), so nobody's access changed. Revoking AI spend from `viewer`/`user` is now a one-line edit in `constants/auth/rolePermissions.ts`. The 10/min/IP rate limit is unchanged. Who _should_ hold it is the owner's call and stays open in `TODO.md`.
  - Evidence: new case in `test/hasPermission.test.ts` asserting `ai:invoke` matches `reports:read` for every role (so the no-op-today property is pinned and a future change is deliberate); `test/apiRbacSmoke.test.ts` still green; `pnpm run test` 443/443, `pnpm run test:a11y` 15/15, cold type-check/lint clean, `pnpm run build` exit 0.
  - Files: `types/auth/Permission.ts`, `constants/auth/rolePermissions.ts`, `app/api/v1/ai/{report-insights,diagnostics-insights}/route.ts`, `test/hasPermission.test.ts`.

- [x] 2026-07-25 — **Refactors:** Delete the dead `formatters/index.ts` aggregator barrel.
  - Result: The TODO asked to convert its 14 `export *` lines to explicit re-exports. It turned out to have zero importers: its own header says "Import from '@/utils'", but no `utils/index.ts` exists and `@/*` maps straight to the repo root, so that entrypoint was never resolvable. Deleted rather than converted — the barrel-policy violation and ~80 symbols of re-export churn both disappear. The real formatters are still reached directly (`@/formatters/metrics`, `utils/format/index.ts`).
  - Evidence: `grep` for `@/formatters`, `@/utils`, and relative `../formatters` imports found only `@/formatters/metrics` (a different file); cold `pnpm run type-check` and `pnpm run lint` clean; `pnpm run test` 442/442; `pnpm run build` exit 0.
  - Files: `formatters/index.ts` (deleted).

- [x] 2026-07-25 — **Artificial Intelligence:** Remove the dead `AIConfigurationStatus` type.
  - Result: `services/ai/contracts/AiConfigurationStatus.ts` had no consumers anywhere; the panels take a boolean `isAiConfigured`. Deleted with its barrel entry.
  - Evidence: cold `pnpm run type-check` clean; `pnpm run test` 442/442.
  - Files: `services/ai/contracts/{AiConfigurationStatus.ts,index.ts}`.

- [x] 2026-07-25 — **Testing:** Deduplicate the `makeDns` DNS fixture.
  - Result: `test/computeDomainScore.test.ts` carried its own 30-line copy. The two fixtures were not interchangeable — the shared `makeDnsDiagnostics` defaults to a healthy domain, the scoring one to a fully unconfigured domain — so rather than force one on the other, added `makeEmptyDnsDiagnostics`, which derives the unconfigured baseline from the shared fixture. Intent stays explicit at both call sites.
  - Evidence: `test/computeDomainScore.test.ts` 15/15 unchanged assertions; `pnpm run test` 442/442.
  - Files: `test/setup/makeEmptyDnsDiagnostics.ts`, `test/computeDomainScore.test.ts`.

- [x] 2026-07-25 — **Infrastructure:** Unblock and re-upgrade `@radix-ui/react-slot` past the 1.2.x pin.
  - Result: Blocker resolved upstream. Bumped `~1.2.4` -> `^1.3.3`. The 1.3.0/1.3.1 failure was a module-scope `SlotContext` (`React.createContext`) shipped without a `"use client"` directive, which crashed `next build` page-data collection with `e.createContext is not a function`; 1.3.3's dist contains no `createContext` at all, so the failure mode is gone.
  - Evidence: `pnpm run build` exit 0, "Compiled successfully", 49/49 static pages generated, no `createContext` error; `grep createContext node_modules/@radix-ui/react-slot/dist/` returns nothing. Cold `pnpm run type-check` and `pnpm run lint` clean; `pnpm run test` 442/442; `pnpm run test:a11y` 15/15. Lockfile diff is additive (slot 1.3.3 + its `react-compose-refs@1.1.5`), no unrelated version moves.
  - Files: `package.json`, `pnpm-lock.yaml`.
  - Note: 1.4.0 remains RC-only; 1.3.3 is the current stable and is sufficient. The standing lesson is unchanged and still worth keeping: Radix bumps must be verified with `pnpm run build`, since type-check, lint, and vitest were all green while the RSC build was broken.

- [x] 2026-07-25 — **Diagnostics:** Handle SPF macro targets and conditional `redirect=` in the lookup tree.
  - Result: Two real misreports fixed. (1) A macro target (`include:%{d}...`, `exists:%{ir}.%{v}...`) was fed to DNS literally; the query always failed, so the tree rendered a child badged "No SPF record" — a misconfiguration warning for a perfectly valid record. Macro mechanisms are now counted as lookups but not expanded, and surfaced as `macroMechanisms` with a "not expanded (resolved per sender)" line. (2) A `redirect=` in a record that also has an `all` was followed and its whole subtree rolled into `lookupCount`, though RFC 7208 6.1 requires receivers to ignore it "regardless of the relative ordering of the terms". It is now excluded from `mechanisms`, not followed, not counted, and reported as `ignoredRedirect` with an explanation of why the redirect is dead. A redirect with no `all` is unchanged.
  - Deviation from the original note: the TODO assumed an ignored redirect still consumes its lookup. It does not — an ignored term is never evaluated, so it issues no DNS query. Counted as 0, which also means `exceedsLookupLimit` no longer fires on lookups the receiver will never perform.
  - Evidence: 5 new cases in `test/resolveSpfTree.test.ts` (redirect ignored with `all`; redirect honored without `all`; redirect ignored when written before a `~all`; macro counted but not queried, asserting no DNS call contains `%{`; macro include not rendered as a missing record) and 2 in `test/SpfLookupTreeSection.test.ts`. `pnpm run test` 442/442, `pnpm run test:a11y` 15/15, `pnpm run check:migrations` OK, cold `pnpm run type-check` and `pnpm run lint` clean.
  - Files: `services/diagnostics/{hasSpfAllMechanism,containsSpfMacro,extractSpfEffectiveLookupMechanisms,extractSpfIgnoredRedirect,extractSpfMacroMechanisms,extractSpfChildDomains,buildSpfTreeNode}.ts`, `types/diagnostics/SpfTreeNode.ts`, `components/diagnostics/spf/SpfLookupTreeNodeItem.tsx`, `test/{resolveSpfTree,SpfLookupTreeSection}.test.ts`.
  - Process note: an earlier "type-check clean" in this run was a stale `tsconfig.tsbuildinfo`; adding two required fields to `SpfTreeNode` only surfaced after deleting the incremental cache. Final verification ran cold.

- [x] 2026-07-25 — **Security:** Move the `update-db-stream` admin key out of the URL query string.
  - Result: The GeoIP update SSE stream no longer takes `?apiKey=<SECRET_KEY>`. New `POST /api/v1/admin/geoip/update-db-ticket` authenticates the normal header way (`requireAdminAuth`) and mints a 24-byte random ticket; the stream takes `?ticket=` and redeems it through `consumeStreamTicket`, which deletes it on first read and rejects anything past `STREAM_TICKET_TTL_MS` (30s). What lands in proxy logs and browser history is now a spent, short-lived value instead of the long-lived admin secret. Ticket store is in-process, which matches the single-replica topology (ADR 0003). ADR 0001 records the SSE exception.
  - Evidence: new `test/streamTicket.test.ts` (single-use, unknown/empty/undefined rejected, 48-hex distinctness over 50 mints, TTL expiry); `test/apiAuthSmoke.test.ts` extended with a per-file allowlist that still requires the route to call `consumeStreamTicket`; `pnpm run test` 435/435, `pnpm run test:a11y` 15/15, `pnpm run type-check`, `pnpm run lint`, `pnpm run format:check` clean, `pnpm run build` exit 0.
  - Files: `app/api/v1/admin/geoip/{update-db-ticket,update-db-stream}/route.ts`, `services/api/{issueStreamTicket,consumeStreamTicket,streamTicketStorePrivate,index}.ts`, `constants/api/`, `utils/settings/{fetchGeoIpStreamTicket,attachGeoIpStreamHandlers}.ts`, `types/settings/GeoIpStreamHandlers.ts`, `hooks/settings/useGeoIp.ts`, `test/{streamTicket,apiAuthSmoke}.test.ts`, `docs/adr/0001-default-deny-api-surface.md`.
  - Behavior note: a mid-stream transport drop can no longer silently reconnect on the same URL (the ticket is spent) — the client surfaces the error and the operator restarts the update. That is the intended trade for non-replayable URLs.

- [x] 2026-07-25 — **Performance:** Aggregate `getReportSources` in SQL instead of a JS join.
  - Result: Dropped the two extra per-report event-id scans and the `IN (...)` list of every event id in the report (unbounded — SQLite's parameter/expression limits were a real ceiling on large reports), plus the O(sources x events) JS join. Override types are now a `GROUP BY ip, type` in SQL, and the primary DKIM identity comes from one ordered join taking the first row per IP. Five queries down to three, all scoped by `rawReportId` and served by `event_raw_report_idx`. Per-IP (not per-group) resolution semantics preserved exactly, and DKIM selection is now deterministically ordered by event id rather than relying on unordered scan order.
  - Evidence: new `test/getReportSources.test.ts` (5 cases) written against the _old_ implementation first and passing unchanged after the rewrite — grouping/collapse + volume ordering, hostname enrichment vs null, per-IP override union, first-DKIM-wins, empty report. `pnpm run test` 435/435.
  - Files: `services/reports/getReportSources.ts`, `test/getReportSources.test.ts`, `test/setup/{seedReportSourcesFixture,SeedReportSourcesResult,requireInsertedId,resetDmarcDb}.ts`.
  - Note: `resetDmarcDb` now also clears `ip_hostname_enrichments`; it was leaking rows across tests in the same file.
  - Not done: the same TODO named `getReportStats` and `getReportEventSummaries`. Inspected both — `getReportStats` is already two SQL aggregates over the indexed predicate, and `getReportEventSummaries` intentionally returns row-level detail for the AI prompt, so neither has a GROUP BY to move to.

- [x] 2026-07-25 — **Testing:** Extend a11y coverage beyond the first three suites.
  - Result: Unblocked the import path by re-exporting `ProtocolExplainer`, `RecordDisplay`, and `SectionHeader` from `components/diagnostics/index.ts`, so consumers no longer have to reach into `./shared/*` (which `import/no-internal-modules` forbids) or dodge the rule with a relative import. Added four a11y suites: the three shared primitives plus the real `SpfDetailSection` / `DmarcDetailSection` in both healthy and missing-record states. Suites 3 -> 7, tests 5 -> 15.
  - Evidence: `pnpm run test:a11y` 15/15 with zero axe violations; `pnpm run test` 435/435.
  - Files: `components/diagnostics/index.ts`, `test/a11y/{ProtocolExplainer,RecordDisplay,SectionHeader,DiagnosticsDetailSections}.test.tsx`, `test/setup/makeDnsDiagnostics.ts`, `test/ProtocolExplainer.test.ts`.
  - Note: the `makeDns` fixture exported from `test/ProtocolExplainer.test.ts` moved to `test/setup/makeDnsDiagnostics.ts`. A second copy still lives inside `test/computeDomainScore.test.ts`; left alone as unrelated churn.

- [x] 2026-07-25 — **Infrastructure:** Declare `tsx` as a devDependency.
  - Result: `seed:demo` and `backfill:rollup` both shell out to `tsx`, but it was only present transitively (`drizzle-kit` -> `tsx@4.22.1`) and hoisted into `node_modules/.bin`. A drizzle-kit bump that drops or replaces it would have silently broken both documented scripts. Declared `tsx: ^4.22.1`, resolving to the version already in the lockfile.
  - Evidence: `pnpm-lock.yaml` diff is 3 additive lines in the importer block, no dependency versions changed; `pnpm exec tsx --version` -> `tsx v4.22.1`; `pnpm install --lockfile-only` reports the lockfile up to date. Found 2026-07-25 while documenting the backfill step.
  - Files: `package.json`, `pnpm-lock.yaml`.

- [x] 2026-07-25 — **Performance:** Document the one-time `pnpm run backfill:rollup` upgrade step.
  - Result: Added a "One-time post-upgrade steps" section to `docs/UPDATING.md` explaining that `event_rollup_daily` starts empty on existing installs, so dashboard totals lag until the backfill runs; documents idempotency, the ingestion-idle requirement (single-writer SQLite, ADR 0003), the Docker `docker compose exec web` form, and that new installs need nothing. README's Updating section links to it.
  - Evidence: `pnpm run format:check` clean; ADR links resolve to real files under `docs/adr/`.
  - Files: `docs/UPDATING.md`, `README.md`.

- [x] 2026-07-24 — **Performance:** Batched ingestion and daily rollups for large-volume DMARC data (ADR 0008).
  - Result: Replaced per-email writes and full-table dashboard scans that made large ingests stall for minutes/hours with no visible progress. WAL + `synchronous=NORMAL` + `busy_timeout` (`lib/db/applyConnectionPragmas.ts`); a `poll_status` coalescer flushing at most every ~500 ms / ~500 events (`createPollStatusCoalescer`); buffered multi-row `job_poll_events` inserts (`createJobEventBuffer`); set-based IP resolution (`upsertIpsBatch`) replacing the per-IP loop. New `event_rollup_daily` (per domain, per UTC day) maintained inside the ingest transaction; `getAggregateStats`, `getDomainSummary`, `getDomainsSummaryAll` now read the rollup instead of scanning `normalized_events`. Added indexes on `normalized_events(raw_report_id)`, `(ip_address_id)`, and covering `(domain_id, report_end_date, count)`. Idempotent backfill `pnpm run backfill:rollup`.
  - Correction during review: initially set `PRAGMA foreign_keys = ON`, which would have broken `resetDmarcDb`/other delete paths (FK enforcement was never on); removed it. The generated migration `0029` also re-created `audit_log` (drizzle snapshot lagged behind the hand-authored `0028`); trimmed it to only the rollup table + indexes.
  - Evidence: `test/eventRollup.test.ts` (ingest-vs-rollup consistency + idempotent rebuild); `pnpm run type-check`, `pnpm run lint`, `pnpm run format:check`, `pnpm run check:migrations` clean; `pnpm run test` 421/421.
  - Files: `lib/db/{applyConnectionPragmas,client}.ts`, `lib/db/schema/{event-rollup-daily,normalized-event}.ts`, `drizzle/0029_silent_wrecking_crew.sql`, `services/job/{createPollStatusCoalescer,createJobEventBuffer,setPollStatusInDb,processAccount,runIngestJob}.ts`, `services/geoip/upsertIpsBatch.ts`, `services/reports/{ingestParsedReport,getAggregateStats,getDomainSummary,getDomainsSummaryAll,rebuildEventRollup}.ts`, `utils/{reports/computeDailyRollupDeltas,geoip/normalizeIp,dates/daySeconds}.ts`, `scripts/backfill-rollup.ts`, ADR 0008.
  - Note: date filtering on the rollup is day-granular (DMARC reports are day-aligned). Existing installs must run `backfill:rollup` once after upgrading.

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
