# TODO Log

> Searchable record of closed project work. Active work lives in `TODO.md`.

## 2026

### 2026-09

- [x] 2026-09-09 — **Production redeployed** from `aa9af4dc6` with the
      out-of-repo deploy script (rsync, install and build on the host,
      standalone assembly, restart). Verified on the live host: `package.json`
      0.2.0, the session-validation, install-token and font changes present,
      service active, no journal errors in the first ten minutes. From outside:
      `/`, `/settings` and `/ingest` with a forged `session` cookie answer 307
      to `/login`, `/login` serves the two self-hosted woff2 files and
      references no Google Fonts host. The previous build there dated from
      2026-08-27.
- [x] 2026-09-09 — **Diagnostics page split, first step:** the eight detail
      sections (DNS, DMARC, SPF, SPF tree, DKIM, BIMI, MTA-STS, TLS-RPT) now
      render through `CollapsibleSection` and start collapsed; the score hero
      and the protocol overview stay. Each overview row is a button that opens
      its section, focuses it and scrolls it into view
      (`useDiagnosticsSections`, `scrollToDiagnosticsSection`). Bodies stay in
      the DOM under `hidden     print:flex`, so "Download PDF" still prints
      every section. Along the way the BIMI and MTA-STS check tables, the
      overview status config and the toggle button became their own files, and
      four suppressions left the ledger. Verified on the demo dataset at
      1440x900: collapsed page, DMARC row click opens and focuses the section;
      `docs/screenshots/diagnostics.png` regenerated. Evidence:
      `pnpm run check:ci` green (93 files, 568 tests), `pnpm run test:a11y`
      green (18 files, 49 tests, new `CollapsibleSection` axe test),
      `pnpm run build` green. The remaining "Future Ideas" about the page (tabs,
      per-protocol routes) stay open.
- [x] 2026-09-09 — **Fonts for offline builds:** `app/inter.tsx` and
      `app/spaceGrotesk.tsx` load the two variable fonts through
      `next/font/local` from `app/fonts/` (latin `woff2` from
      `@fontsource-variable` 5.3.0, OFL licence files alongside, provenance in
      `app/fonts/README.md`), so `next build` no longer reaches Google Fonts.
      Evidence: `pnpm run build` green with both files emitted under
      `.next/static/media`; CSP `font-src 'self'` unchanged.
- [x] 2026-09-09 — **Open-source launch, first release:** `v0.2.0` tagged on
      `610cb8c7a` (minor bump: the Unreleased changelog was all features and
      fixes on top of a `0.1.0` that was never tagged). `release.yml` run
      34290113725 published the GitHub Release with the CycloneDX SBOM, and
      built, pushed and cosign-signed the multi-arch image
      `ghcr.io/vexamail/vexa-insight-dashboard:{latest,0,0.2,0.2.0}`. The only
      failed step was the build-provenance attestation ("Feature not available
      for the VexaMail organization"), which is a private-repo limitation; the
      step now skips while the repo is private. Local `pnpm run check:ci` before
      tagging: 91 files, 564 tests, migrations OK.
- [x] 2026-09-09 — **Open-source launch, screenshots:** the eight
      `docs/screenshots/*.png` are regenerated from the `pnpm run seed:demo`
      dataset at 1440x900 (example.com domains, documentation-range IPs, demo
      report IDs, the demo API key). Commit `5e6f48838`. The `.playwright-mcp/`
      capture directory is gitignored (`9b094791d`). The history-rewrite
      decision for the old captures stays in `TODO.md`.
- [x] 2026-09-08 — **Baseline gate debt:** Sixteenth batch of the suppression
      burn-down: five oversized view files, split by finding what two of them
      were duplicating. Ledger 215 findings in 168 files down to 204 in 163, and
      `max-lines` from 19 to 13.
  - The two dashboard ranked lists shared a card, a five-row loading skeleton,
    an empty state and a share bar written twice; those are now
    `RankedListCard`, `RankedListSkeleton`, `RankedListEmpty` and `ShareBar`,
    with `sharePercent`, `passRateTextClassName` and `passRateBarClassName` in
    `src/utils/dashboard/`. `TopDomainsTable` and `TopIpSendersTable` are the
    composition plus one row component each.
  - `IpRelatedDomains` and `IpRelatedReports` had the same hand-written
    load-more button as the event timeline, spinner SVG included.
    `IpEventLoadMoreButton` became `IpLoadMoreButton` with a `label`, all three
    now use it, and the two inline chevron SVGs became lucide's `ChevronRight`.
    Their rows are `IpRelatedDomainLink` and `IpRelatedReportLink`, and the two
    hooks are exported from `@/hooks/ips` rather than deep-imported.
  - `ProcessedEmailsTable` kept a full-screen modal inline; it is now
    `ProcessedEmailModal` over `ProcessedEmailMeta` and `ProcessedEmailContent`,
    with `ProcessedEmailsEmpty` for the pre-ingest state.
  - `processedEmailsColumns` replaced its three hand-written sort headers with
    the shared `SortableHeaderButton`.
  - Evidence: `pnpm run check:ci` green (542 tests in 87 files, migrations OK),
    `pnpm test:a11y` green (47 tests), `pnpm run check:quality` clean (knip,
    dependency-cruiser 2057 modules, type coverage 99.80%).

- [x] 2026-09-08 — **Baseline gate debt:** Fifteenth batch of the suppression
      burn-down closed `max-params`: the last eight functions taking more than
      four positional arguments now take one input object each. Ledger 223
      findings in 176 files down to 215 in 168, and the rule holds no
      suppressions at all.
  - `filterChunkUids`, `handleAlreadyProcessed`, `processUnprocessedUids`,
    `notifyProcessingRecords` and `reportBatchProgress` take
    `FilterChunkUidsInput`, `HandleAlreadyProcessedInput`,
    `ProcessUnprocessedUidsInput`, `NotifyProcessingRecordsInput` and
    `BatchProgressInput`. `UidInfo` moved from `src/services/imap/` to
    `src/types/imap/` so those types can name it without a type file importing
    the services layer.
  - `normalizeProviderModel` takes a `NormalizeProviderModelInput`; its four
    provider call sites now name the field they pass, which is what made the
    Gemini and OpenRouter calls readable.
  - `processZipEntry` takes a `ProcessZipEntryInput` and returns early on both
    skip paths. Its yauzl callback parameter is deliberately named
    `streamError`: `promise/prefer-await-to-callbacks` keys on a parameter named
    `err`, and yauzl offers no promise form here.
  - `seedReportSourcesFixture`'s inner `insertEvent` takes a `SeedEventInput`,
    with the shared pass/aligned columns spread from one `passing` object.
  - Evidence: `pnpm run check:ci` green (542 tests in 87 files, migrations OK),
    `pnpm test:a11y` green (47 tests), `pnpm run check:quality` clean (knip,
    dependency-cruiser 2027 modules, type coverage 99.80%). One earlier
    `check:ci` run reported three failures while `eslint --prune-suppressions`
    was still writing; two clean re-runs followed, so it was contention, not a
    regression.

- [x] 2026-09-08 — **Baseline gate debt:** Fourteenth batch of the suppression
      burn-down: eight service files, including the three ingest functions that
      carried the `max-params` entries. Ledger 239 findings in 184 files down to
      223 in 176, and `max-params` fell from 11 to 8.
  - `getReports` now resolves the domain through the existing
    `resolveDomainIdByName` and shares `reportsListConditions`,
    `reportListSelection` and `countDistinctReports` between its count and its
    page, so both queries can no longer drift apart.
  - `getAggregateStats` became three parallel queries — `queryDomainCount`,
    `queryScopedReportCount`, `queryRollupSums` — under `Promise.all`; the
    rollup rationale moved next to the query it explains.
  - `getMetricsSnapshot` split into `queryTableTotals`, `queryEventsBySpfAuth`,
    `queryEventsByDisposition` and `queryIngestState`, and now spreads them into
    the snapshot rather than assembling twelve fields inline.
  - `fetchLatestRelease` delegates payload narrowing to `parseGithubRelease`
    over an `isGithubReleaseShape` guard and `isNullableString`, which is what
    took its complexity from 13 to single digits; the repeated error text is
    `INVALID_RELEASE_PAYLOAD_MESSAGE`.
  - `checkForUpdates` reads as its four outcomes: `recordLatestRelease`,
    `recordNoPublishedRelease` and `recordUpdateCheckError`, the last of which
    both persists and returns the failure outcome.
  - The ingest path lost its long positional signatures: `processChunk` takes a
    `ProcessChunkInput` (was ten parameters), `processFolder` a
    `ProcessFolderInput`, and `processAccount` a `ProcessAccountInput` with its
    hooks in `accountFetchHooks` and its status line in `reportAccountStart`.
    The chunk loop now uses `yield*` for the value the drained generator
    returns, the batch size is `CHUNK_UID_COUNT`, and the reconnect-on-lock
    dance moved to `lockFolderWithReconnect`, which returns the client holding
    the lock because a reconnect replaces it.
  - Evidence: `pnpm run check:ci` green (542 tests in 87 files, migrations OK),
    `pnpm test:a11y` green (47 tests), `pnpm run check:quality` clean (knip,
    dependency-cruiser 2020 modules, type coverage 99.80%).

- [x] 2026-09-08 — **Baseline gate debt:** Thirteenth batch of the suppression
      burn-down: two view files, the IP detail page and the two remaining
      report-source services. Ledger 246 findings in 187 files down to 239
      in 184.
  - `SettingsConfigForm.tsx` became a form rendering `SettingsAccessSections`,
    `SettingsIngestionSections` and `SettingsSaveBar`, with the two new props
    types under `src/types/settings/`. Those two types import their siblings
    directly rather than the slice barrel, which is what dependency-cruiser's
    `no-circular` requires of a type that the barrel itself re-exports.
  - `app/(app)/ips/[...ip]/page.tsx` lost its date arithmetic to
    `buildIpDateRange`, which delegates the "days, explicit from, or all time"
    branch to `ipRangeFromTimestamp`, and its three panels to `IpDetailPanels`.
    The panel props are typed from `@/types/Ip*Row`, never from
    `@/services/reports`, so the component stays on the client side of the
    boundary rule.
  - `getReportSources.ts` became an orchestrator over
    `reportSources/queryReportSourceRows`, `queryOverrideTypesByIp` and
    `queryPrimaryDkimByIp`; each map-building loop moved next to the query that
    feeds it.
  - `getIpsSummary.ts` now reuses `ipDetailSelection` and `toIpSummaryData` from
    the ninth batch over a new `queryIpsSummaryRows` and `ipsSummaryFilter`, so
    the IP list and the IP detail read the same columns through one selection.
  - Evidence: `pnpm run check:ci` green (542 tests in 87 files, migrations OK),
    `pnpm test:a11y` green (47 tests), `pnpm run check:quality` clean (knip,
    dependency-cruiser 1990 modules, type coverage 99.79%).

- [x] 2026-09-08 — **Baseline gate debt:** Twelfth batch of the suppression
      burn-down: the four oversized test files split by behaviour. Ledger 258
      findings in 191 files down to 246 in 187, and `test/` no longer carries a
      `max-lines` entry.
  - `resolveSpfTree.test.ts` (320 lines) became `spfTreeStructure`,
    `spfTreeRedirect`, `spfTreeMacros`, `spfTreeLimits` and a
    `resolveSpfTree.test.ts` holding only the caching test. The repeated
    `mockResolveTxt.mockImplementation` bodies became `mockSpfZone`, a
    host-to-record map, which is what cleared `sonarjs/no-duplicate-string`.
  - `analyzeSpfRecord.test.ts` (248) split by category into `spfRecordSyntax`,
    `spfRecordConfiguration`, `spfRecordLimits` and the scope/dependencies half
    under the original name, over a shared `findSpfCheck` and `SPF_CATEGORY`.
  - `buildDiagnosticsAdminGuides.test.ts` (335) split into selection/cap, DNS
    guides and traffic thresholds, with `makeHealthyDnsDiagnostics`,
    `makeBrokenDnsDiagnostics`, `makeQuietDiagnosticStats` and `GRADE_A_SCORE`
    moved to `test/setup/`.
  - `diagnosticsAiPrompts.test.ts` (310) split into system prompt, DNS section
    and the traffic/runbook/empty-input half, over
    `makeDiagnosticsAnalysisInput` and `makeDiagnosticsDnsSummary`.
  - `.prettierignore` now skips `.worktrees/**`, which another session had
    checked out inside the repo; `eslint.config.ts` already ignored it, so the
    format step was the only one failing on a Helm chart it must not touch.
  - Evidence: `pnpm run check:ci` green (542 tests, now 87 files, migrations
    OK), `pnpm test:a11y` green (47 tests), `pnpm run check:quality` clean
    (knip, dependency-cruiser 1976 modules, type coverage 99.79%).

- [x] 2026-09-08 — **Baseline gate debt:** Eleventh batch of the suppression
      burn-down: the reports table, the user modal, the GeoIP hook and the
      upload form. Ledger 263 findings in 192 files down to 258 in 191.
  - `ReportsTable.tsx` composes `ReportsTableToolbar` (itself
    `ReportsSearchInput` plus two `ReportsFilterSelect`s), `ReportsTableLoading`
    and `ReportsTableEmpty`.
  - `UserModal.tsx` composes `UserCredentialFields`, `UserPasswordField`,
    `UserRoleField` and `UserDomainAccessFields`, with the shared dropdown
    styling in `USER_SELECT_CLASS_NAME`.
  - `useGeoIp.ts` moved its three network calls to `fetchGeoIpSettings`,
    `saveGeoIpLicenseKey` and `openGeoIpUpdateStream`, which now owns the
    single-use ticket comment and the EventSource construction.
  - `UploadForm.tsx` composes `UploadDropZone`, `UploadStatusMessage` and
    `RecentUploadsCard`.
  - Evidence: `pnpm run check:ci` green (542 tests, 76 files, migrations OK),
    `pnpm test:a11y` green (47 tests), `pnpm run check:quality` clean (knip,
    dependency-cruiser 1976 modules, type coverage 99.79%).

- [x] 2026-09-08 — **Baseline gate debt:** Tenth batch of the suppression
      burn-down: the latest-reports service, the poll trigger, the job run
      history columns, the AI settings hook, the installer form and the DNS
      records section. Ledger 272 findings in 194 files down to 263 in 192.
  - `getLatestReports` takes a `GetLatestReportsParams` object, looks the domain
    up through `resolveDomainIdByName`, joins `normalizedEvents` once instead of
    three times behind a `hasJoined` flag, and builds its conditions in
    `latestReportsConditions`.
  - `useTriggerPoll` and `useAiSettings` stopped speaking HTTP: `triggerPoll`,
    `fetchAiSettings` and `putAiSettings` return normalized results the hooks
    only store, and the cleared AI form is now `CLEARED_AI_SETTINGS_FORM`.
  - `jobRunHistoryColumns.tsx` dropped five hand-written sort headers for the
    shared `SortableHeaderButton` and moved the "is this row the running job"
    test into `isActiveJobRun`; the status pill became `JobRunStatusBadge`.
  - `InstallForm.tsx` composes `InstallTokenField`, `InstallAdminFields` (over a
    shared `InstallRequiredField`) and `InstallSecretKeyField`;
    `DnsRecordsSection.tsx` renders two `DnsRecordList`s and one `MxRecordList`,
    with deduplication moved to `uniqueMxRecords`.
  - Evidence: `pnpm run check:ci` green (542 tests, 76 files, migrations OK),
    `pnpm test:a11y` green (47 tests), `pnpm run check:quality` clean (knip,
    dependency-cruiser 1956 modules, type coverage 99.79%).

- [x] 2026-09-08 — **Baseline gate debt:** Ninth batch of the suppression
      burn-down: the GeoIP settings section, the shared data table, the IP event
      timeline, the DKIM detail section, two report services, the upload hook
      and the report sources table. Ledger 292 findings in 199 files down to 272
      in 194.
  - `GeoIpSection.tsx` composes `GeoIpLicenseKeyField` and `GeoIpDatabaseCard`,
    whose status branch became the `GeoIpDbStatus` component; `DataTable.tsx`
    composes `DataTableToolbar`, `DataTableHeaderRows` and `DataTableBodyRows`,
    with the selected-row test extracted to `isSelectedTableRow` in the new
    `src/utils/ui/` slice.
  - `IpEventLogs.tsx` renders `IpEventTimelineItem`, which reuses one
    `IpEventBadge` for the four result badges and colours SPF and DKIM through
    `authResultClassName`; `DkimDetailSection.tsx` renders one
    `DkimSelectorCard` per selector, whose five parsed checks are now a table
    over a list instead of five hand-written rows.
  - `getDomainDiagnosticsReportAggregate.ts` became an orchestrator over five
    query functions and one filter builder under
    `src/services/ai/use-cases/diagnosticsAggregate/`; `getIpDetail.ts` split
    into `queryIpDetailRow`, `ipDetailSelection`, `ipDetailEventFilter` and
    `toIpSummaryData`, with the row typed by `IpDetailRow`.
  - `useUploadForm.ts` no longer speaks HTTP: `uploadReportFile` returns an
    `UploadReportResult` the hook only stores.
  - Evidence: `pnpm run check:ci` green (542 tests, 76 files, migrations OK),
    `pnpm test:a11y` green (47 tests), `pnpm run check:quality` clean (knip,
    dependency-cruiser 1931 modules, type coverage 99.77%).

- [x] 2026-09-08 — **Baseline gate debt:** Eighth batch of the suppression
      burn-down: the settings hook, the AI settings section, the reports table
      hook, the crons section and the installer IMAP fieldset. Ledger 300
      findings in 200 files down to 292 in 199.
  - `useSettingsConfig.ts` became an orchestrator over six new
    `src/utils/settings/` helpers (`newImapAccountEntry`,
    `toImapAccountPayload`, `buildSettingsUpdatePayload`, `toSavedFormState`,
    `testImapConnection`, `saveSettings`), with its save status typed by
    `SettingsSaveStatus`.
  - `AiSettingsSection.tsx` split into header, provider select, API key field,
    actions and message; `CronsSection.tsx` into `EngineHeader`,
    `EngineStopButton` and `EngineSummary`.
  - `useReportsTable.ts` lost its duplicated option-fetch effects to a new
    `useFetchedOptions` hook, and its query building to `buildReportsQuery` /
    `filterAndSortReports`; `fetchReports` now takes a `FetchReportsParams`
    object, which is what cleared `max-params`.
  - `ImapAccountsFieldset.tsx` now maps accounts onto `ImapAccountFields`, which
    composes `ImapAccountLabelRow`, `ImapAccountServerFields` and
    `InstallTextField`. The per-field change handler moved out of the view into
    `imapAccountFieldUpdater`, so `code-policy/view-logic-separation` stays
    quiet; the shared input and label class names live in
    `src/constants/install/`.
  - Evidence: `pnpm run check:ci` green (542 tests, 76 files, migrations OK),
    `pnpm test:a11y` green (47 tests), `pnpm run check:quality` clean (knip,
    dependency-cruiser 1882 modules, type coverage 99.76%).

- [x] 2026-09-08 — **Baseline gate debt:** `max-lines-per-function` was wrongly
      enforced inside `test/**`. Ledger 337 findings in 222 files down to 300 in
      200, without touching a line of test code.
  - The shared `createCodeQualityConfig()` layer already turns the rule off for
    test files, and says why: the longest function in a test file is the
    top-level `describe` callback, so the rule measures the wrapper rather than
    any real complexity, and twenty trivial `it` cases already report a 62-line
    arrow. Test file size is governed by `max-lines` at 200 instead of 100.
  - This repository's `eslint.config.ts` promotes four rules from `warn` to
    `error` so their pre-existing debt is expressible in the ledger. That block
    matches `**/*.{js,jsx,ts,tsx,mjs,cjs}`, comes after the shared layers, and
    so silently re-enabled the rule in tests. 37 of the 337 ledger entries were
    that override, not debt.
  - Fixed by re-applying the exemption after the promotion, with the shared
    layer's own globs, and a comment saying which block it is undoing.
  - Found while sizing the four remaining oversized test files: the question
    logged earlier as needing an owner decision turned out to be a local
    configuration bug, so it is closed rather than parked.
  - Evidence: `pnpm run check:ci` green (542 tests, migrations OK).

- [x] 2026-09-08 — **Baseline gate debt:** Seventh batch of the suppression
      burn-down: the reports table, three services and the model combobox.
      Ledger 350 findings in 225 files down to 337 in 222.
  - `reportsColumns.tsx` sorts through a reducer rather than through TanStack,
    so the shared `SortableHeaderButton` did not fit. The button split in two:
    `SortHeaderButton` is presentational and takes `active`, `dir` and a click
    handler, and `SortableHeaderButton` is now a thin wrapper that reads a
    column's own sort state. The related-domains cell became three components.
  - `ingestParsedReport.ts` (174 lines) split into a raw-report insert that
    returns null on a duplicate id, an IP resolver, a per-event writer, a rollup
    upsert and the notification. The transaction callback stays synchronous,
    which is what better-sqlite3 requires, and `ReportTransaction` names the
    handle so the helpers can accept it.
  - `runIngestJob.ts` (159 lines) split into job-run open and close, poll-status
    begin and finish, the account loop and the failure notification. The totals
    are a mutable accumulator passed into the loop rather than its return value,
    because the `finally` block records partial progress when an account throws.
  - `resolveAndPersist.ts` (139 lines) gave up its retry arithmetic to a pure
    `computeLookupSchedule`, which is where the `complexity` entry lived.
  - `ModelCombobox.tsx` (196 lines) split into a trigger, a search row, a list
    and one option component shared by the default entry and the model rows.
  - A third placement rule surfaced and is now recorded in `TODO.md`:
    `code-policy/no-hidden-top-level-declarations` rejects a module-scope
    constant that is not the file's export, so the listbox id needed its own
    file.
  - Evidence: `pnpm run check:ci` green (542 tests, migrations OK),
    `pnpm test:a11y` green (47 tests), `pnpm run check:quality` green
    (dependency-cruiser 1840 modules with no violations, type coverage 99.76%).

- [x] 2026-09-08 — **Baseline gate debt:** Sixth batch of the suppression
      burn-down: the AI diagnostics panel and the ingest pipeline card. Ledger
      355 findings in 227 files down to 350 in 225.
  - `AiDiagnosticsInsightsPanel.tsx` returned six times, and every one of those
    branches repeated the same `DiagnosticsAdminRunbook` call with the same four
    props plus the same sparkle-and-title header. The runbook is now rendered
    once by the panel, and the branching moved to `AiDiagnosticsInsightsBody`,
    which picks between the not-configured call to action, an idle card, a
    loading card, a titled notice wrapping the error or empty state, and the
    results.
  - `EmailPipelineCard.tsx` (202 lines) split into a header, a progress bar, the
    wide and narrow step lists, the metadata list and the expanded details. The
    metadata component owns its own emptiness check, which is what removed the
    outer `metadataDate` guard and the `complexity` entry.
  - The header takes the overall status as the same four-value union
    `StatusPill` declares; typing it as `string` compiled in the old inline JSX
    but not across a component boundary.
  - Evidence: `pnpm run check:ci` green (542 tests, migrations OK),
    `pnpm test:a11y` green (47 tests), `pnpm run check:quality` green
    (dependency-cruiser 1791 modules with no violations, type coverage 99.75%).

- [x] 2026-09-08 — **Baseline gate debt:** Fifth batch of the suppression
      burn-down: the domains table and the IP-hostname settings section. Ledger
      359 findings in 229 files down to 355 in 227.
  - `domainsColumns.tsx` was the second file inlining the sortable-header
    button, four times. Two of those sort descending first, so
    `SortableHeaderButton` gained a `descendingFirst` prop; without it the
    Messages and Compliance columns would have started ascending. Each column
    definition moved under `components/domains/columns/`, the progress bar
    became `ComplianceBar` and the two identical icon links became
    `DomainRowAction`.
  - `IpHostnameSection.tsx` was 243 lines: six copies of the same numeric field
    and three of the same checkbox. The field and the checkbox are now one
    component each, and the six numeric settings are a constant table in
    `constants/settings/ipHostnameNumberFieldSpecs.ts`, mapped over. `step` is
    declared on every entry as `number | undefined` because
    `exactOptionalPropertyTypes` rejects reading an absent optional, and only
    the timeout field sets it, so the rendered markup is unchanged.
  - Evidence: `pnpm run check:ci` green (542 tests, migrations OK),
    `pnpm test:a11y` green (47 tests), `pnpm run check:quality` green
    (dependency-cruiser 1771 modules with no violations, type coverage 99.75%).

- [x] 2026-09-08 — **Baseline gate debt:** Fourth batch of the suppression
      burn-down: the DNS admin guides, the IP table columns and three services.
      Ledger 374 findings in 233 files down to 359 in 229.
  - `createDnsAdminGuides.ts` was 211 lines of eleven `if` blocks pushing guide
    literals, carrying `complexity`, `max-lines` and `max-lines-per-function`.
    Each guide is now its own builder under `dnsAdminGuides/`, and a
    `dnsAdminGuideRules` table pairs a predicate with a builder, so the exported
    function is a filter and a map. The MTA-STS `else if` became an explicit
    `raw !== null && !policyFileAccessible` predicate, which is the same
    condition. `test/buildDiagnosticsAdminGuides.test.ts` passes unchanged, 16
    tests.
  - `ipsColumns.tsx` was 299 lines with the same 19-line sortable-header button
    repeated five times. That button is now
    `components/ui/SortableHeaderButton`, composed from the `SortIcon` the other
    four column files already used, and each column definition moved to its own
    file under `components/ips/columns/`. The exported factory is 30 lines.
    `domainsColumns.tsx` still inlines the same button four times and is the
    obvious next user.
  - `updateSettings.ts` (130 lines) split into a scalar-field constant, an
    `app_settings` update builder, and a `syncImapAccounts` that deletes removed
    rows and upserts the rest. The eleven column assignments duplicated between
    the insert and update paths became `buildImapAccountRow`, typed as
    `Omit<typeof imapAccounts.$inferInsert, 'id' | 'password'>` so drizzle still
    checks it.
  - `processOneMessageUid.ts` (121 lines, six parameters) now takes a
    `ProcessOneMessageUidInput` and delegates the download, the post-processing
    tail and the error report to three siblings.
  - `buildDnsPromptSection.ts` lost its nine inline summarizers to
    `prompts/dnsSection/formatters/`, and the `NOT CONFIGURED` and `none found`
    literals became named constants, which is what cleared
    `sonarjs/no-duplicate-string`.
  - Two placement rules cost a round trip and are now recorded in `TODO.md`: a
    `format*` file must live in a `formatters/` directory, and an extracted
    helper still has to stay under four parameters.
  - Evidence: `pnpm run check:ci` green (542 tests, 76 files, migrations OK),
    `pnpm test:a11y` green (47 tests), `pnpm run check:quality` green (knip
    clean, dependency-cruiser 1751 modules with no violations, type coverage
    99.75%).

- [x] 2026-09-08 — **Baseline gate debt:** First batch of the suppression
      burn-down: the two worst components.
  - `ImapAccountsSection.tsx` was 386 lines carrying `max-lines`,
    `cognitive-complexity` and a 300-line render function. Split into eleven
    files, largest 76 lines: a section shell that maps accounts, a row, its
    header and toolbar, the three field groups, the two option groups, the
    move-to-folder control and the move-to-trash checkbox. The repeated
    `imap-account-${index}-${field}` id template became
    `utils/settings/imapAccountFieldId`, which is also what removed the inline
    helper `code-policy/view-logic-separation` was reporting.
  - `IpDisplay.tsx` was one function with three layouts and
    `cognitive-complexity`. Now a dispatcher plus one component per layout, with
    the stacked layout's hostname line (the only one carrying a last-lookup
    timestamp and a refresh control) extracted. The eight presentation defaults
    were about to be copied into all three layouts, so they went to
    `utils/ips/resolveIpDisplayOptions` instead - one definition, and it is what
    brought the stacked layout under the complexity ceiling.
  - Markup is unchanged in both: same elements, classes, ids and ARIA. The
    accessibility suite is the check that says so, and it asserts the header is
    a real button with `aria-expanded` and no nested button inside it.
- [x] 2026-09-08 — **Baseline gate debt:** Split the OpenAPI document builder.
  - `buildOpenApiDocument.ts` was 309 lines: five schema literals, a wrapper
    helper and seven path definitions all inside one function. The schemas, the
    `{ data }` wrapper and the shared error response are now their own files
    under `services/api/openapi/`, and the paths are three groups by audience:
    the unauthenticated health and metrics probes, the admin job and self-update
    endpoints, and the webhook CRUD. The builder is a 42-line assembler that
    spreads the three groups.
  - Evidence: the served document is unchanged, proved rather than assumed. A
    scratch test dumped `buildOpenApiDocument()` to JSON on the split code and
    again on the pre-split code recovered from HEAD: both are 13,441 bytes and
    compare equal, with the same seven paths. The scratch test was removed
    afterwards. `pnpm run check:ci` green, `pnpm run check:quality` green once
    the unused internal barrel was deleted - `openapi/` is internal to the api
    slice, so it is reached relatively and has no public entrypoint.

  - Evidence: ledger 384 findings / 235 files before, 376 / 234 after, with
    `sonarjs/cognitive-complexity` now at zero. `pnpm run check:ci` green (76
    files / 542 tests), `pnpm test:a11y` 17 files / 47 tests,
    `pnpm run check:quality` green with no dependency violations over 1,692
    modules.

- [-] 2026-08-26 — **Performance:** Stop re-fetching envelopes for folders that
  never carry DMARC mail.
  - Resolution: superseded by the owner draining the noisy folder at source.
    With `ingestion_include_all_folders` on, `processFolder` runs one IMAP
    `SEARCH SINCE` per folder and bulk-fetches the envelope of every UID it
    returns, because both the DMARC subject test and the `processed_messages`
    de-duplication need the envelope. Measured on the the production host
    mailbox: a `.Logs` folder held 5,038 messages of which 5,037 fell inside the
    30-day window, so every hourly run pulled ~5,000 envelopes to discard all of
    them while the run's real work was 1-22 reports. The 30-day window does not
    help, because the noise folder is entirely recent. Moving that log mail to a
    separate processor removes the cost at source and is cheaper than a folder
    allow-list plus its migration and UI. Still true on 2026-09-08: the folder
    holds 8,456 messages and the flag is still on. Reopen only if a mailbox
    shows the same cost with no way to drain the noisy folder.

- [x] 2026-09-08 — **Baseline gate debt:** Refine the remaining eleven
      deep-import exceptions.
  - Result: all eleven gone, `import/no-internal-modules` now runs with no
    per-file exception anywhere. Four were never cross-slice at all and became
    relative imports, which the rule does not match and which the layout
    convention already prefers inside a domain: `resolveStoredApiKey` and
    `PollStatus` import their own folder, `isAiConfigured` reaches `../settings`
    exactly as its sibling `resolveProvider` already did, and
    `useDateFilterParams` reaches `./dashboard`. The `types/ingest` /
    `utils/ingest` pair was one misplaced file: `OverallResult` is a type and
    now lives in `types/ingest`, so the edge runs one way. The
    `auth`/`api`/`install` triangle was cut by extracting what all three shared:
    `hasValidApiKey`, `isUsableSecret` and `timingSafeTokenEqual` moved to a new
    `services/credentials` slice, and `PLACEHOLDER_SECRET` plus
    `MIN_SECRET_LENGTH` moved to `constants/auth`. Both remaining edges (api to
    auth, install to auth) are one-directional and import barrels.
  - Found on the way: `MIN_SECRET_LENGTH = 32` existed twice, in
    `services/api/minSecretLength.ts` and `utils/install/minSecretLength.ts`,
    with the install UI reading one and the API key check the other. Same value,
    so no behaviour changed, but the two could have drifted apart silently.
    Consolidated into the single `constants/auth` definition both now read.
  - Evidence: `pnpm run check:ci` green (type-check, lint with no suppression
    for these files, format, 76 files / 542 tests, migrations);
    `pnpm run check:quality` reports no dependency violations over 1,666 modules
    and 3,693 dependencies, which is what proves no cycle was reintroduced;
    `pnpm test:a11y` 17 files / 47 tests.

- [x] 2026-09-08 — **Baseline gate debt:** Adopt the `@busirocket/eslint-config`
      factories.
  - Result: `eslint.config.ts` composes base, nextjs, code-quality and
    accessibility from `@busirocket/eslint-config@0.8.0` plus the project's own
    layers (unicorn file hygiene, public-API-only imports with the eleven named
    deep-import exceptions, server/client `no-restricted-paths` zones, the
    audited fs-path files, console policy for a server whose stdout is its
    journal). `eslint.audit.config.ts` deleted with its tsconfig exclude;
    `scripts/` got its own `tsconfig.json` so the project service types the
    scripts instead of the default-project cap; `eslint-config-next` dropped as
    a direct dependency (ADR 0005 updated). The four rules the factories leave
    at `warn` are raised to `error` here so the debt is expressible in the
    suppressions ledger rather than invisible to `pnpm lint`.
  - Source fixes surfaced by the swap, all at the source: 70
    `promise-function-async` (autofix), 39
    `no-unnecessary-boolean-literal- compare` (the 2026-08-28 `=== true` guards
    became ternaries; one checkbox `checked` expression needed a boolean
    fallback to type-check), 13 `vitest/no-conditional-expect` (array `toEqual`,
    `toMatchObject`, a throw guard, one `it` split), 3 unused regexp capture
    groups, 3 regexp classes, 4 `consistent-type-imports`, 2 `console.log` in
    the seed service, the drop zone's drag handlers moved off the `<label>` onto
    a presentational wrapper, one `querySelector` in an a11y test replaced by
    `within`, one stale `eslint-disable` removed. Rule configuration with a
    reason, not per-line disables: `react/prop-types` off for `.tsx` (cannot see
    through `forwardRef`), cmdk's bare attributes allow-listed for two files,
    the timing-attack rule off for the placeholder-secret comparison.
  - Not fixed, recorded: 384 structural findings in 235 files
    (`max-lines-per-function` 210, `complexity` 74, `max-lines` 59,
    `no-duplicate-string` 25, `max-params` 14, `cognitive-complexity` 2) went to
    `eslint-suppressions.json`; the burn-down is the new TODO item. The TODO's
    "zero new errors" estimate was wrong: the 2026-08-28 hardening covered a11y,
    leaked-render and `no-unsafe-*`, not the strict type-checked set or the size
    rules.
  - Evidence: bare-factory run before any fix: 220 errors, 319 warnings, 8
    fatals; after: `pnpm run check:ci` green (type-check, lint, format, 76 files
    / 542 tests, migrations), `pnpm test:a11y` 17 files / 47 tests,
    `pnpm run check:quality` green (no dependency violations over 1,666 modules;
    type coverage 99.75%).

- [x] 2026-09-08 — **Baseline gate debt:** Fix the a11y Vitest config alias.
  - Cause: `vitest.a11y.config.ts` mapped `@` to the repository root; the source
    moved under `src/` on 2026-08-27 and the main config was updated, the a11y
    one was not, so every a11y test failed to resolve `@/components/...`.
  - Result: alias points at `./src`, matching `vitest.config.mts`.
  - Evidence: `pnpm test:a11y` before: 17 files failed, no tests; after: 17
    files, 47 tests passed.
  - Files: `vitest.a11y.config.ts`.

- [x] 2026-09-02 — **Infrastructure:** Live instance unreachable for 29 hours
      while the app stayed healthy; no external uptime check.
  - Cause: the nightly `cloudflared` rpm upgrade (2026.8.2 to 2026.8.3) removed
    the `/usr/local/bin/cloudflared` symlink the tunnel unit's `ExecStart` used
    (the old package's `postuninstall` runs after the new one's `postinstall`),
    so the unit crash-looped with `status=203/EXEC` while the loopback
    `/api/v1/health` stayed green.
  - Result: tunnel units repointed to `/usr/bin/cloudflared`; a systemd timer on
    the host now probes the public hostname every 5 minutes through Cloudflare,
    restarts the tunnel unit on the first failure and mails root on failure and
    recovery (mail delivery verified in the exim log);
    `docs/DEPLOY-BEHIND-PROXY.md` tells operators to monitor the public hostname
    and to reference the package path.
  - Evidence: public health endpoint 200 through the tunnel; probe run exits 0;
    timer listed by `systemctl list-timers`.

### 2026-08

- [x] 2026-08-28 — **Baseline gate debt:** Finish the ESLint hardening source
      fixes (the last 193 of 886).
  - Result: 52 `jsx-a11y` (sortable header divs became real buttons with
    identical rendering, labels got htmlFor/id, redundant roles and an invalid
    anchor fixed), 85 `react/jsx-no-leaked-render` (type-matched comparisons),
    31 `no-unsafe-*` (typed `JSON.parse`/`res.json()` boundaries, shared
    `parseAllowedDomains`), and the 21 `detect-non-literal-fs-filename` audited
    as false positives (constant/env/journal paths only) to be resolved as rule
    configuration at factory adoption. No rule disabled, no `eslint-disable`
    added.
  - Delegation: three Codex batches with explicit 11/17/17-file lists, run
    detached via nohup (the harness background wrapper hangs codex exec); every
    batch verified here against `eslint.audit.config.ts` before commit.
  - Evidence: repo-wide audit run reports only the 21 documented fs findings;
    `check:ci` green (76 files, 542 tests, migrations OK); `check` green.
  - Commits:
    `fix(a11y): make sortable headers real buttons and wire labels to controls`,
    `fix(lint): give leaked-render guards explicit comparisons, first half` and
    `second half`,
    `fix: type the untyped boundaries behind 31 no-unsafe-* lint findings`,
    `chore(lint): add the scratch audit config for the remaining hardening`.
- [x] 2026-08-28 — **Artificial Intelligence:** Confirm whether OpenAI's
      reasoning models accept `response_format: { type: 'json_object' }`.
  - Result: they do not, on chat completions. OpenAI support (quoted in the
    o4-mini structured-output community thread) states JSON object/schema
    response formats are "not compatible with these models"; users get
    `'response_format' of type 'json_schema' is not supported` and equivalent
    failures, and the models are steered to the Responses API. JSON mode now
    rides the same legacy-model branch as `max_tokens`/`temperature` in
    `createOpenAiAdapter`, so reasoning models stop failing with HTTP 400; the
    prompts already demand raw JSON and the parser strips fences.
  - Evidence: `test/createOpenAiAdapter.test.ts` asserts JSON mode present for
    `gpt-4o` and absent for `gpt-5`; 2/2 pass. No metered call was spent.
    Commit: `fix(ai): stop sending JSON mode to OpenAI reasoning models`.
- [x] 2026-08-28 — **Artificial Intelligence:** Check whether the Gemini and
      OpenRouter adapters need the sampling-parameter gate.
  - Result: Gemini yes, OpenRouter no. Google's Gemini 3 developer guide says to
    keep `temperature` at its default 1.0 ("may lead to unexpected behavior,
    such as looping or degraded performance" below 1.0) — the field is accepted,
    not rejected, so this is an output-quality gate: `createGeminiAdapter` now
    sends `temperature` only to the `gemini-1`/ `gemini-2` families.
    OpenRouter's API reference states unsupported parameters "are ignored", and
    its `/api/v1/models` metadata confirms it: `supported_parameters` omits
    `temperature` for `anthropic/claude-*-5`, `openai/o3`/`gpt-5.6-*` while
    listing it for `google/gemini-3.7-flash` — so the pass-through is already
    safe and no deny-list is needed.
  - Evidence: `test/createGeminiAdapter.test.ts` (2/2), type-check clean.
    Commit: `fix(ai): keep temperature off Gemini 3 requests`.
- [x] 2026-08-28 — **Security:** Add a `.dockerignore`, and make the Docker
      build actually work.
  - Result: `.dockerignore` covers `data/`, `.env*`, `.next/`, `node_modules/`,
    `coverage/`, `evals/results/`, `.git/` and friends. While validating, the
    Docker build itself turned out broken on alpine/arm64: `better-sqlite3` has
    no musl/arm64 prebuilt and node-gyp failed with `gyp ERR! find Python`; the
    build stage now installs `python3 make g++`.
  - Evidence: `docker build` exit 0; `docker run --rm <img> ls -la /app/data`
    shows an empty directory and no `.env*` in `/app`, with 261 MB of local
    `data/` present in the build context.
  - Commits:
    `fix(security): keep local data and env files out of the docker image`,
    `fix(docker): install the node-gyp toolchain in the build stage`.
- [x] 2026-08-28 — **Security:** Keep the live database out of the build
      artifact.
  - Result: `outputFileTracingExcludes: { '*': ['data/**'] }` in
    `next.config.ts`.
  - Evidence: fresh-clone `pnpm run build` exit 0 with `.next/standalone/data`
    absent. Commit: `fix(build): keep data/ out of the standalone output`.
- [x] 2026-08-28 — **Infrastructure:** Make a clean checkout build.
  - Result: the top-level `await import('geoip-lite')` in the geoip service
    became a memoized `getGeoip()` resolved on first lookup, so collecting page
    data no longer opens the MaxMind `.dat` files that only exist after a
    download.
  - Evidence: `git clone` into a scratch dir with no `data/`,
    `pnpm install && pnpm run build` exit 0. Commit:
    `fix(build): load geoip-lite lazily so a clean checkout builds`.
- [x] 2026-08-28 — **Infrastructure:** Make `VEXA_ALLOWED_ORIGINS` a runtime
      value.
  - Result: `proxy.ts` reads the variable per request; when a POST's Origin host
    is allow-listed but does not match the forwarded host it rewrites
    `X-Forwarded-Host` so Next's own CSRF comparison passes. Docs and
    `.env.example` describe it as runtime config; the build-time bake stays as a
    fallback. Also documented that a proxy forwarding the public hostname in
    `Host`/`X-Forwarded-Host` needs no list at all.
  - Evidence: type-check and lint clean; `ƒ Proxy (Middleware)` present in the
    fresh-clone build output. Not yet exercised against a live proxy — the
    production host still works via the build-time path, so the runtime path
    gets its live proof on the next image-based deploy. Commit:
    `feat(deploy): read the Server Actions origin allow-list at request time`.
- [x] 2026-08-28 — **Infrastructure:** Fix `deploy/vexa.service`.
  - Result: `ExecStart=node .next/standalone/server.js`,
    `Environment=HOSTNAME=127.0.0.1`, and the standalone assembly steps
    (`public/`, `.next/static/`, `drizzle/`) documented in the unit header.
  - Evidence: config change only, validated by reading `next start`'s standalone
    rejection and the standalone server's `HOSTNAME` default; not run under a
    live systemd. Commit:
    `fix(deploy): run the standalone server from the systemd unit`.
- [x] 2026-08-28 — **Documentation:** Stop advertising PostgreSQL and MySQL.
  - Result: claim deleted from `README.md` (four spots), `docs/UPDATING.md` and
    `.env.example`; SQLite documented as the only supported database. Commit:
    `docs: stop advertising PostgreSQL/MySQL support that does not exist`.
- [x] 2026-08-28 — **Documentation:** Correct the health endpoint in
      `docs/DEPLOY-BEHIND-PROXY.md`.
  - Result: `/api/health` -> `/api/v1/health` and the real
    `{ "data": { "status": "ok" } }` body in the nginx snippet, k8s probes and
    smoke test. Commit:
    `docs(deploy): correct the health endpoint path and response shape`.
- [x] 2026-08-28 — **Limpieza de ramas:** the 15 `dependabot/*` branches on
      origin were deleted in one `git push origin --delete` batch, as decided;
      Dependabot regenerates any update that still applies.
- [x] 2026-08-28 — **Baseline gate debt:** Resolve the `config`/`settings`
      deep-import pair (2 of the 13 exceptions).
  - Result: `getSettingsRow`, `getImapAccountsRow`, `seedSettingsFromEnv`,
    `SETTINGS_ID` and the `ImapAccountRow` type moved to a new
    `services/settings-store` slice; `getConfig` and `updateSettings` import
    slice barrels; exception list down to eleven.
  - Evidence: type-check clean, `depcruise` no-circular clean (1664 modules),
    knip exit 0. Commit:
    `refactor: extract the settings row readers into services/settings-store`.

- [x] 2026-08-27 — **Baseline gate debt:** Move the root-level source
      directories under `src/`.
  - Context: `actions/`, `components/`, `constants/`, `contexts/`,
    `formatters/`, `hooks/`, `lib/`, `mappers/`, `services/`, `types/`, `utils/`
    and `validators/` sat at the repo root, so `knip.config.ts`,
    `.dependency-cruiser.cjs` and `package.json`'s `deps:graph` each restated
    the same list, and knip's Next preset — which globs `src/` and `app/` —
    could not see the code at all without the restatement.
  - Result: 1,518 files moved as renames. `deps:graph` is now
    `depcruise app src scripts` instead of fourteen positional directories;
    `knip.config.ts` keeps only the globs the preset does not cover (`scripts`,
    `test`, the Tailwind CSS entry); `tsconfig.json` maps `@/*` to `./src/*`.
    One knip configuration hint disappeared on its own — the preset's `src/**`
    pattern now matches something, so the count went 7 to 6.
  - Two things needed a human decision the mechanical move got wrong.
    `constants/app/appVersion.ts` imported `@/package.json`, which after the
    alias change would resolve inside `src/`; it now uses an explicit relative
    path to the repository root. And `data/` was in the move list because the
    backlog entry listed it, but its only tracked file was a `.gitkeep` marking
    the runtime SQLite directory — `DATABASE_URL=file:./data/vexa.db` resolves
    against the working directory, not the source root. Moving it would have
    left a misleading empty `src/data/`; the placeholder is back at the root
    where the database actually lives.
  - Delegated to Codex CLI, which reported honestly that it could not run the
    production build inside its sandbox (no DNS for Google Fonts, and its
    Turbopack worker port was blocked). That gap was closed here: the build runs
    clean outside the sandbox.
  - Evidence: `check:ci` 0 (540 tests), `check:quality` 0 (knip 0 findings,
    dependency-cruiser 0 violations across 1,648 modules with `no-circular`
    unnarrowed, type-coverage 99.60%), `check:security` 0, `pnpm run build` 0.
    Git reports 1,518 renames, one content change, no file added or deleted.
  - Files: every source directory, plus `tsconfig.json`, `knip.config.ts`,
    `package.json`, `vitest.config.mts`, `next.config.ts`, `eslint.config.ts`,
    `.github/CODEOWNERS` and the docs that name code locations.

- [x] 2026-08-27 — **Baseline gate debt:** Remove the barrel-mediated cycles and
      run `no-circular` unnarrowed.
  - Context: `.dependency-cruiser.cjs` narrowed `no-circular` with
    `viaNot: '(^|/)index\\.ts$'`, so a cycle passing through a slice barrel did
    not fail the gate. Measured with the narrowing removed: 77 cycles.
  - Cause, in two kinds. 31 were a module importing its own slice barrel —
    `types/install/AccountWithId.ts` reaching `@/types/install` for a sibling,
    which re-exports the file itself. The rest were mutual slice dependencies
    routed through barrels: `auth`/`api`/`install`, `config`/`settings`,
    `ai/core`/`ai/settings`, `types/ingest`/`utils/ingest`, and a
    `ui`/`diagnostics` pair. No symbol was circular; only the route to it. A
    barrel aggregates unrelated modules, so importing one for a single symbol
    drags in everything it re-exports.
  - Result: cycles are 0 with the rule unnarrowed. Sibling imports point at the
    sibling; cycle-closing barrel imports point at the concrete module. One was
    an architecture fix rather than an import rewrite:
    `components/ui/KpiCard.tsx`, a UI primitive, imported style maps from the
    `diagnostics` feature barrel. Those maps moved to `constants/metrics/`, and
    the status union they key on — duplicated verbatim as `KpiStatus` in
    `components/ui` and inline in `ExecutiveMetricCardProps` — is now one
    `types/metrics/MetricStatus`.
  - Cost, stated plainly: 13 modules now deep-import past a barrel, which
    `import/no-internal-modules` forbids. They are listed by name in
    `eslint.config.ts` with the reason, not waved through by a glob, so a new
    deep import elsewhere still fails. This mirrors the `scripts/` override that
    was already there for the same reason.
  - Three tests mocked a barrel (`@/services/api`, `@/services/ai/settings`)
    that the code under test no longer imports, so the mocks stopped
    intercepting. They now mock the concrete module, which is what the code
    actually imports.
  - Evidence: `pnpm run check:ci` green (540 tests), `pnpm run build` green,
    `check:quality` and `check:security` exit 0, dependency-cruiser reports no
    violations across 1,648 modules with no `viaNot` and no stale orphan
    exemptions, knip reports zero unused files, exports and dependencies.
  - Files: `.dependency-cruiser.cjs`, `eslint.config.ts`, `constants/metrics/*`,
    `types/metrics/MetricStatus.ts`, 45 import rewrites, 3 test files.

- [x] 2026-08-27 — **Baseline gate debt:** Delete the dead code the knip
      exemptions were holding in place, and raise the rules back to `error`.
  - Context: adopting the shared toolchain surfaced 124 unused exports, 23
    unused files and nine unused dependencies. They were parked — `exports` and
    `types` set to `warn`, the files and dependencies named in `ignore` and
    `ignoreDependencies` — so the gate went green without the findings being
    addressed. A quality gate that reports 124 findings and passes is not gating
    anything.
  - Result: 60 files deleted, 1,351 lines net. The 33 concrete dead files were
    each reachable only from their own slice barrel, and the barrel entry was
    itself unreferenced — a dead chain, not a public API. Four were duplicate
    definitions of a live type elsewhere, and `components/domains/DomainRow.ts`
    was worse than dead: a `DomainRow` aliasing `DomainsTableRow`, colliding by
    name with the unrelated `{ id, name }` in `types/reports/DomainRow.ts`.
    `knip.config.ts` now carries no `ignore` list, no `ignoreDependencies` and
    no rule override; the nine dependencies came out of `package.json` along
    with the orphaned `types/mailparser.d.ts` shim.
  - Also fixed: `deps:graph` cruised every source directory except `scripts`, so
    the three modules `scripts/run-ai-eval.ts` alone imports read as orphans the
    moment their barrel was deleted. Adding `scripts` to the cruise list closed
    that blind spot rather than the files being wrongly deleted.
  - Evidence: `pnpm run check:ci` green (540 tests, 75 files), `pnpm run build`
    green, `pnpm run check:quality` and `pnpm run check:security` both exit 0
    with knip at `error` on every rule. Knip reports zero unused files, exports
    and dependencies; dependency-cruiser zero violations across 1,649 modules;
    type-coverage 99.61%.
  - Not closed: the seven remaining knip configuration hints come from
    `@busirocket/quality-config`, whose own source documents them and states "Do
    not filter the list consumer-side to silence it". They are the shared
    package's trade-off, not this repo's.
  - Files: `knip.config.ts`, `package.json`, plus the 60 deleted modules.

- [x] 2026-08-27 — **Infrastructure:** Stop the systemd unit reporting every
      restart as a crash.
  - Symptom seen on the production host: each restart logged
    `vexa.service: Main process exited, code=exited, status=143/n/a` followed by
    `Failed with result 'exit-code'`, so the unit sat in a failed state after a
    perfectly normal stop.
  - Cause: not an application bug. `next/dist/server/lib/start-server.js`
    finishes its cleanup and then calls `process.exit(143)` for `SIGTERM` on
    purpose, "so that Node.js treats this as a signal termination, not a normal
    exit". `deploy/vexa.service` set `KillSignal=SIGTERM` without declaring that
    exit code as success. Adding an app-level signal handler would have been the
    wrong fix: it would race Next's own graceful shutdown.
  - Result: `SuccessExitStatus=143` added to `deploy/vexa.service` and to the
    live unit on the production host.
  - Evidence: after `daemon-reload` and `systemctl restart vexa`, the journal
    shows only `Stopped` / `Started` with no `Failed` line, and `systemctl show`
    reports `Result=success`, `ActiveState=active`. Health endpoint,
    loopback-only bind and public `/login` (200) all re-checked.
  - Files: `deploy/vexa.service`, plus `/etc/systemd/system/vexa.service` on the
    production host (backed up alongside as `.bak-20260827`).

- [x] 2026-08-26 — **Ingestion:** Make "move to trash after process" actually
      move the message to the trash.
  - Symptom found while checking the the production host mailbox:
    `handleMoveToTrash` called ImapFlow's `client.messageDelete()`, which is
    `EXPUNGE` — the message was destroyed on the server, not moved. The trash
    folder held 0 messages after 3,141 ingested reports, while the setting name,
    the UI label, the `moving_to_trash` progress step and the
    `move_to_trash_after_process` column all promised something recoverable.
  - Result: the handler now issues `client.messageMove()` to the mailbox flagged
    `\Trash`, resolved by `fetchAttachments` from the server's mailbox list and
    threaded to both post-process call sites. A server with no `\Trash` mailbox
    raises instead of falling back to the destructive path, so the message is
    left in place and the failure is logged; a message already in the trash is
    skipped. Decision recorded 2026-08-26: honour the label rather than rename
    the setting to `delete`, because the safe direction for an ambiguous promise
    is the non-destructive one.
  - Evidence: `pnpm run check:ci` green in a clean worktree (540 tests). New
    `test/moveToTrashIsAMove.test.ts` asserts the move, asserts `messageDelete`
    is never called, and asserts the message survives a failed move. Confirmed
    on the production host after deploy that the server advertises `INBOX.Trash`
    with `specialUse="\Trash"`, so `getTrashPath` resolves and the
    non-destructive path is the one that runs.
  - Files: `utils/imap/handleMoveToTrash.ts`,
    `utils/imap/HandlePostProcessParams.ts`,
    `types/imap/FetchAttachmentsOptions.ts`,
    `services/imap/fetchAttachments.ts`,
    `services/imap/processOneMessageUid.ts`,
    `services/imap/handleAlreadyProcessed.ts`.

- [x] 2026-08-26 — **Bugs:** Track the Select component under its PascalCase
      filename.
  - Symptom: git tracked `components/ui/select.tsx` while
    `components/ui/index.ts` re-exports `'./Select'`. Invisible on macOS
    (case-insensitive APFS) and invisible on the production host too, because
    `vexa-deploy` rsyncs the working tree, whose directory entry reads
    `Select.tsx`. Any fresh clone on a case-sensitive filesystem fails
    type-check with `TS1261 ... differs from file name ... only in casing`.
  - Result: renamed the tracked file to `Select.tsx`, matching every sibling
    (`SelectContent`, `SelectItem`, `SelectTrigger`) and the convention that a
    component file is named after its exported symbol.
  - Evidence: surfaced by running `pnpm run check:ci` in a clean worktree, which
    is also what proved the fix — 540 tests green there afterwards.
  - Files: `components/ui/Select.tsx`.

- [-] 2026-08-26 — **Performance:** Stop re-fetching envelopes for folders that
  never carry DMARC mail.
  - Superseded by an owner decision, not by code. Measured on the the production
    host mailbox: a `.Logs` folder holds 5,038 messages of which 5,037 fall
    inside the 30-day window, so every hourly run bulk-fetches ~5,000 envelopes
    and discards them against 1-22 real reports. The envelope fetch is
    unavoidable — both the DMARC subject test and the `processed_messages`
    de-duplication need it — so the only levers were a folder allow-list or a
    narrower server-side SEARCH.
  - Result: the owner is moving that log mail to a separate processor, which
    removes the cost at source. No folder allow-list, no migration, no UI.
    Reopen only if a mailbox shows the same cost with no way to drain the noisy
    folder.

- [x] 2026-08-25 — **Ingestion:** Bound the scheduled ingest window and keep the
      full-mailbox pass as an explicit action.
  - Symptom found while auditing the the production host deployment:
    `ingestion_days_back` was `0`, and `getSinceDate` maps `0` to the year 2000,
    so every hourly run searched the whole mailbox (`poll_status.total_emails`
    = 4962) instead of a window. Nothing was broken, but each run re-enumerated
    the entire INBOX.
  - Result: `ingestion_days_back` is now floored at 1 (default 30) in
    `parseIngestionDaysBack`, in `settingsUpdateSchema`, and in both numeric
    inputs; migration `0030_ingestion_days_back_floor` moves stored `0` values
    to 30. The invariant is enforced on the read path too (`rowToConfig`), so a
    restored database, a hand-edited row or `INGESTION_DAYS_BACK=0` in the
    environment cannot bring the unbounded scan back; the Drizzle column default
    moved from 0 to 30. The unbounded pass survives as a one-off: **Full
    rescan** on the ingest page opens a confirmation dialog explaining the cost,
    and posts `{"fullRescan": true}` to `/api/v1/admin/trigger-poll`, which
    forwards it to `runIngestJob({ fullRescan })`. Dedup by Message-ID is
    untouched, so a rescan cannot duplicate reports.
  - Evidence on the production host after deploy:
    `app_settings.ingestion_days_back` = 30 and `__app_migrations` holds
    `0030_ingestion_days_back_floor`; a normal trigger recorded `total_emails` =
    4957 (30-day window) and a `fullRescan` trigger recorded 4962 (whole
    mailbox), both HTTP 202 with `error_count` 0. `pnpm run check:ci` clean,
    530/530 tests across 72 files including the new
    `test/ingestionWindow.test.ts` and
    `test/rowToConfigIngestionWindow.test.ts`; `pnpm run test:a11y` 47/47 with
    `test/a11y/FullRescanDialog.test.tsx` covering the warning, the confirm and
    the cancel path.
  - Files: `utils/install/parseIngestionDaysBack.ts`,
    `utils/validation/settingsUpdateSchema.ts`,
    `components/settings/IngestionSection.tsx`,
    `components/install/AdvancedSettingsFieldset.tsx`,
    `drizzle/0030_ingestion_days_back_floor.sql`,
    `services/job/runIngestJob.ts`, `services/job/RunIngestJobOptions.ts`,
    `app/api/v1/admin/trigger-poll/{route,parseFullRescanFlag}.ts`,
    `components/ingest/FullRescanDialog.tsx`,
    `hooks/ingest/{useTriggerPoll,useFullRescanDialog}.ts`,
    `lib/config/rowToConfig.ts`, `services/settings/seedSettingsFromEnv.ts`,
    `lib/db/schema/app-settings.ts`,
    `test/{ingestionWindow,rowToConfigIngestionWindow}.test.ts`,
    `test/a11y/FullRescanDialog.test.tsx`.

- [x] 2026-08-25 — **Security:** Stop writing the IMAP protocol trace to the
      production logs.
  - Symptom: `createClient` passed no `logger` to ImapFlow, so its default pino
    instance wrote every protocol line to stdout. On the production host that
    meant journald held the subject, envelope, sender, recipient and Message-ID
    of all 4962 scanned messages on each hourly run — mailbox content sitting in
    the system log with no retention control.
  - Result: `createImapLogger` drops debug and info, forwards warn and error to
    the console, and restores the full trace only when `VEXA_IMAP_DEBUG` is
    `true`/`1`. Documented in `.env.example` and the README env table.
  - Evidence: after the deploy, `journalctl -u vexa` across two ingest runs
    contains zero `imap-connection` lines (9 log lines total since restart, all
    startup and systemd), while ingest still completed with `error_count` 0.
  - Files: `services/imap/createClient.ts`, `utils/imap/createImapLogger.ts`,
    `utils/imap/isImapDebugEnabled.ts`, `lib/env.ts`,
    `test/imapLogging.test.ts`, `.env.example`, `README.md`,
    `docker-compose.yml`, `deploy/k8s/configmap.yaml`,
    `deploy/helm/vexa-insight-dashboard/values.yaml`.

- [x] 2026-08-25 — **Infrastructure:** Fix the install check so an installed
      instance stops redirecting to `/install` behind a reverse proxy.
  - Symptom: a first production deployment behind a TLS-terminating proxy
    answered `307 -> /install` on every route, while `/install` bounced back to
    the dashboard — an infinite redirect loop (`curl` exit 47).
    `GET /api/install/check` on the loopback returned `{"installed":true}`
    throughout, so the database was never the problem.
  - Two independent defects in `checkInstall`, both in the self-fetch it uses to
    reach that endpoint. First, it passed `headers: request.headers`, forwarding
    the incoming `cf-connecting-ip`; Cloudflare answers 403 to any request
    carrying that header from outside its own network, and `res.json()` then
    threw on the HTML error body. The route reads no headers at all, so
    forwarding them was never needed. Second, and the one that actually bricked
    this deploy: `new URL(INSTALL_CHECK, request.url)` inherits the forwarded
    `https` scheme while the host stays the local listener, producing
    `https://localhost:3002/...` — TLS spoken to a plaintext port,
    `ERR_SSL_PACKET_LENGTH_TOO_LONG`.
  - Result: the self-fetch sends no headers, and downgrades the scheme to `http`
    when the target hostname is the loopback
    (`utils/proxy/isLoopbackHostname.ts`). The silent `catch` now logs the
    failing URL and error before falling back — a failed check sends every route
    to `/install`, which is indistinguishable from a genuinely uninstalled app,
    and it did so here without a single log line.
  - Evidence: before, `curl https://<host>/login` returned `307 -> /install` and
    the journal showed
    `[install-check] https://localhost:3002/api/install/check failed: [TypeError: fetch failed] ... ERR_SSL_PACKET_LENGTH_TOO_LONG`;
    after, `/login` returns 200 and `/` returns `307 -> /login`.
    `pnpm run check` clean, `pnpm run test` 508/508 across 69 files, including
    four new cases in `test/checkInstall.test.ts` covering both properties and
    the redirect fallback.
  - Files: `services/install/checkInstall.ts`,
    `utils/proxy/isLoopbackHostname.ts`, `test/checkInstall.test.ts`.
  - The same deployment surfaced five further defects that are not fixed here
    and are tracked in `TODO.md`: the missing `.dockerignore`, the live database
    copied into `.next/standalone`, the clean-checkout build failure on GeoIP
    data, `VEXA_ALLOWED_ORIGINS` being baked at build time, and the broken
    `deploy/vexa.service` example.

### 2026-07

- [x] 2026-07-26 — **Artificial Intelligence:** Restructure the diagnostics
      system prompt around the 2026 model prompting guidance.
  - Context: Anthropic's per-model guides (Opus 5, Fable 5) and OpenAI's GPT-5.6
    guidance now agree that prompts written for older models reduce quality on
    current ones, and that most of the work is deletion.
    `DIAGNOSTICS_ANALYSIS_SYSTEM` was 64 numbered rules;
    `REPORT_ANALYSIS_SYSTEM` was already lean and was left alone.
  - Result: named sections instead of the numbered list, 12,897 -> 10,025 system
    characters (-22%), with every enum, required and optional field,
    severity/tone/evidenceStrength definition, correlation rule, recommendation
    constraint, and example preserved.
  - The first attempt was a measured regression, caught by the eval harness
    rather than by reading: promoting "prefer fewer, higher-confidence insights"
    into the opening paragraph cost the `policy` enforcement finding in 2 of 2
    runs, which took `tone: improvement` from 2/9 insights to 0/6 — and with it
    every insight eligible for `recordValue`/`verifyCommand`, since those
    require that tone. Moving the sentence back into NOISE REDUCTION and naming
    enforcement posture as a first-class finding restored it.
  - Evidence: `pnpm run eval:ai diagnostics` on the free Max lane, same domain
    and model (`claude-sonnet-5`) across all arms. Baseline 2 runs: 9 insights,
    2 improvement-tone, 2 verifyCommand, ~11,486 tokens. First rewrite 2 runs: 6
    / 0 / 1, ~9,993 tokens. Corrected 6 runs: improvement-tone present in 6/6,
    `rolloutPlan` 5 well-formed `[PROTOCOL]`-prefixed steps every run,
    `parseError` null on all 10 runs, ~10,755 tokens (-6% against baseline).
    `pnpm run check:ci` clean (504/504, migrations OK).
  - Files: `services/ai/prompts/diagnosticsAnalysisSystem.ts`,
    `test/diagnosticsAiPrompts.test.ts`, `test/isAiConfigured.test.ts`.
  - Two assertions in `diagnosticsAiPrompts.test.ts` pinned prompt prose
    (`'Do NOT simply restate it'`, `'ROLLOUT PLAN RULES'`) and were reworded to
    the new phrasing; the instructions they guard are unchanged.
    `isAiConfigured.test.ts` got an explicit 30s timeout: it imports the whole
    `@/services/ai` barrel and began failing reproducibly under `check:ci`,
    where vitest starts on a cold transform cache after type-check and lint.
  - Open: 2 of 6 runs on the new wording wrapped the JSON in a markdown fence
    where 0 of 2 baseline runs did. The parser strips them and nothing breaks;
    too few baseline samples to call it a regression, so it is tracked in
    `TODO.md` rather than fixed blind.

- [x] 2026-07-26 — **Artificial Intelligence:** Stop sending `temperature` to
      Claude 5 models on the metered Anthropic path.
  - Decision: gate the field on the model rather than dropping it everywhere. A
    blanket drop would silently move the older Claude models from
    `temperature: 0.2` to the API default of 1.0, which is a real loss for
    prompts whose output is parsed as JSON. Anthropic removed the sampling
    parameters starting with Opus 4.7, so the split is by model generation, not
    by provider.
  - Result: `utils/ai/supportsAnthropicTemperature.ts` matches the configured
    model against `TEMPERATURE_CAPABLE_CLAUDE_MODEL_PREFIXES` (Claude 2/3, Opus
    4.0/4.1/4.5/4.6, Sonnet 4.0/4.5/4.6, Haiku 4.5) as prefixes, so dated ids
    resolve too; `createAnthropicAdapter` spreads `temperature` into the body
    only when that returns true. The list is an allow-list of the older families
    on purpose: an unrecognised id is far more likely to be newer than this code
    than older, and losing the field is recoverable where an HTTP 400 is not.
    The Max OAuth lane still strips the field in `applyMaxOAuthRequestShape` and
    is unchanged.
  - Evidence: `pnpm run check:ci` clean (type-check, lint, format, 488/488
    tests, migrations OK). New `test/createAnthropicAdapter.test.ts` asserts the
    request body over a stubbed `fetch` — `temperature` present for
    `claude-sonnet-4-6`, absent for `claude-opus-5`;
    `test/supportsAnthropicTemperature.test.ts` (4 cases) pins both model sets,
    the unknown-model default, and the casing/whitespace handling. No live
    provider call was made, so the HTTP 400 itself is still only reproduced from
    the 2026-07-26 Max OAuth session.
  - Files: `constants/ai/temperatureCapableClaudeModelPrefixes.ts`,
    `utils/ai/supportsAnthropicTemperature.ts`,
    `services/ai/providers/anthropic/createAnthropicAdapter.ts`,
    `test/{createAnthropicAdapter,supportsAnthropicTemperature}.test.ts`.
  - Left open: the Gemini and OpenRouter adapters send `temperature`
    unconditionally and were not examined; tracked in `TODO.md`.

- [x] 2026-07-26 — **Artificial Intelligence:** Check whether the OpenAI adapter
      has the same `temperature` problem the Anthropic one had.
  - Result: it does, and it came with a second half. OpenAI's reasoning families
    (`o1`/`o3`/`o4`, `gpt-5`) reject a non-default `temperature`
    (`Unsupported value: 'temperature' does not support 0.2 with this model. Only the default (1) value is supported.`)
    **and** `max_tokens`, which has to be `max_completion_tokens` there. Either
    one is an HTTP 400, so gating only the temperature would have left those
    models exactly as unusable. `utils/ai/usesLegacyOpenAiChatParams.ts` picks
    one shape or the other from `LEGACY_OPENAI_CHAT_MODEL_PREFIXES` (`gpt-3.5`,
    `gpt-4*`, `chatgpt-4o`): legacy models keep `max_tokens` + `temperature`,
    everything else gets `max_completion_tokens` and no sampling controls.
    `gpt-5-chat` is deliberately excluded — reports disagree on whether the
    non-reasoning chat variant accepts `temperature`, and the modern shape is
    the harmless side of that.
  - Evidence: `pnpm run check:ci` clean (type-check, lint, format, 504/504
    tests, migrations OK). New `test/createOpenAiAdapter.test.ts` asserts the
    whole request body over a stubbed `fetch` — `max_tokens` + `temperature` and
    no `max_completion_tokens` for `gpt-4o`, the inverse for `gpt-5`;
    `test/usesLegacyOpenAiChatParams.test.ts` (4 cases) pins both model sets,
    the unknown-model default, and casing. The 400s come from published reports
    and Microsoft's Azure OpenAI reasoning docs, not from a call made here:
    `platform.openai.com` returned 403 to an unauthenticated fetch, so no
    primary-doc quote was captured and no metered call was made.
  - Files: `constants/ai/legacyOpenAiChatModelPrefixes.ts`,
    `utils/ai/usesLegacyOpenAiChatParams.ts`,
    `services/ai/providers/openai/createOpenAiAdapter.ts`,
    `test/{createOpenAiAdapter,usesLegacyOpenAiChatParams}.test.ts`.
  - Still unverified: whether those models accept
    `response_format: { type: 'json_object' }`, which the adapter sends
    unconditionally and every prompt here relies on. Left in `TODO.md` rather
    than guessed at.

- [x] 2026-07-26 — **Artificial Intelligence:** Run the LLM prompts on the
      Claude Max subscription so prompt work costs nothing.
  - Result: two entry points sharing one auth layer. `pnpm run dev:max`
    (`LLM_BACKEND=max-oauth next dev`) reroutes the running app's Anthropic
    calls onto the Claude Code OAuth token in the macOS Keychain;
    `pnpm run eval:ai <report|diagnostics> ...` runs a production prompt N times
    offline against real local rows and writes one artifact per invocation to
    `evals/results/`. Neither path sends the stored API key.
  - The lane only serves requests that look like Claude Code: the
    `oauth-2025-04-20,claude-code-20250219` betas, `x-app: cli`, the CLI user
    agent, and the identity line as a distinct FIRST `system` block are all
    load-bearing — without them the answer is a `rate_limit_error` unrelated to
    quota.
  - Two findings while wiring it up. Claude 5 models reject `temperature` (HTTP
    400), so `applyMaxOAuthRequestShape` strips it; the metered path still sends
    it and stays broken for those models, left open in `TODO.md`. And the
    harness cannot call `getReportById`, whose domain scoping resolves through
    `getSession()` and needs request cookies — `loadEvalReport` reads the row
    unscoped instead, which is right for a run served for nobody.
  - Safety: `isMaxOAuthBackendEnabled` requires the flag AND
    `NODE_ENV === 'development'`, failing closed on staging/test/unset. Verified
    by probe: flag on in development returned `OK` with a dummy API key; flag
    off returned `invalid x-api-key`; flag on with `NODE_ENV=production` also
    returned `invalid x-api-key`.
  - Evidence: `pnpm run check:ci` clean (474/474, migrations OK). Both harness
    targets were also run live against a local development database: the report
    target returned 5 parsed insights per sample at ~2.5k tokens, the
    diagnostics target 4 parsed insights at ~11.5k tokens. Artifacts are
    gitignored, since they embed whatever report and domain rows the local
    database holds.
  - Files: `services/ai/maxOAuth/*` (9), `services/ai/evals/*` (10),
    `services/ai/contracts/{AnthropicMessagesRequest,MaxOAuthCredentials,AiEval*}.ts`,
    `services/ai/use-cases/buildDiagnosticsAnalysisInput.ts`,
    `services/ai/providers/anthropic/createAnthropicAdapter.ts`,
    `scripts/run-ai-eval.ts`, `utils/{cli,errors}/*`,
    `test/{isMaxOAuthBackendEnabled,applyMaxOAuthRequestShape}.test.ts`,
    `docs/ai-max-oauth-backend.md`, `eslint.config.ts`, `package.json`.
  - Note: `buildDiagnosticsAnalysisInput` was extracted out of
    `generateDiagnosticsInsights` so the runtime and the harness assemble the
    diagnostics prompt from one place. Behavior unchanged — same sources, same
    graceful degradation, same `INSUFFICIENT_DATA` throw.

- [x] 2026-07-26 — **Security:** Revoke a user's sessions when their password
      changes.
  - Result: `updateUser` rewrote `passwordHash` without touching `sessions`, so
    a stolen cookie outlived the reset meant to kill it. New
    `services/auth/revokeUserSessions.ts` deletes every session row for the
    user; `updateUser` calls it only on a password change and records one
    `auth.sessions.revoked` audit event with the target and the number of
    cookies killed. Per the 2026-07-26 decision this is unconditional: an admin
    who changes their own password is signed out too. The actor is read from the
    session before the delete, otherwise a self-reset would erase its own
    attribution.
  - The two neighbouring revocation paths were already covered and needed no
    change: deleting a user cascades to `sessions` (FK `onDelete: 'cascade'`),
    and `getSession` joins `users` per request, so role and allow-list changes
    apply on the next request rather than at expiry.
  - Evidence: `pnpm run check:ci` clean (466/466, migrations OK). New
    `test/revokeUserSessions.test.ts` (4 cases); 2 of them fail with the
    `updateUser` change stashed, verified by re-running against the stash.
  - Files: `services/auth/revokeUserSessions.ts`,
    `services/users/updateUser.ts`, `types/audit/AuditAction.ts`,
    `test/revokeUserSessions.test.ts`.

- [x] 2026-07-26 — **Security:** Decide whether the shared API key should be
      excluded from `users:write`.
  - Decision: yes. The shared `SECRET_KEY` no longer maps to the `admin` role;
    it now carries the fixed set `API_KEY_PERMISSIONS` = `reports:read`,
    `reports:write`, `settings:read`, `ai:invoke`. One secret shared by every
    automation client must not be able to create users, change roles, or read
    the audit log — that is the difference between a leaked key and account
    takeover.
  - Result: `services/api/getApiKeyRole.ts` (returned `'admin'`) replaced by
    `services/api/hasValidApiKey.ts` (returns a boolean); `requirePermission`
    checks a session against its user's role and a keyed request against
    `API_KEY_PERMISSIONS`, keeping 401-vs-403 semantics. `getAllowedDomainIds`
    still treats a valid key as unrestricted, otherwise every domain-scoped
    query returns nothing to API callers.
  - Behavior change to know about: `/api/v1/users/**`
    (`users:read`/`users:write`) and `/api/v1/audit-log` (`audit:read`) now
    answer 403 to the shared key, and so do the webhook writes on
    `/api/v1/admin/webhooks*` (`settings:write`), which were not part of the
    original question. Routes gated by `requireAdminAuth` (IMAP, GeoIP, admin
    settings, poll control) check the raw key directly and are unaffected.
  - Evidence: `pnpm run check:ci` clean (type-check, lint, format, 462/462
    tests, migrations OK). New `test/requirePermission.test.ts` (5 cases) pins
    the grant set, the 403s, the 401-without-credentials path, and that an admin
    session still holds what the key does not.
  - Files: `constants/auth/apiKeyPermissions.ts`,
    `services/api/hasValidApiKey.ts`,
    `services/auth/{requirePermission,domainAccess}.ts`,
    `test/requirePermission.test.ts`,
    `docs/adr/0001-default-deny-api-surface.md`, `README.md`.

- [x] 2026-07-26 — **Security:** Decide who should hold the `ai:invoke`
      permission.
  - Decision: keep it as-is on all four roles (admin, operator, viewer, user),
    i.e. exactly the roles holding `reports:read`. AI spend stays governed by
    the 10/min/IP rate limit rather than by role. No code change;
    `constants/auth/rolePermissions.ts` already documents that revoking it from
    `viewer`/`user` is a one-line edit if that changes.
  - Evidence: `test/hasPermission.test.ts` already pins `ai:invoke` to the
    `reports:read` role set, so the decision is enforced by an existing test.

- [-] 2026-07-26 — **Performance:** Decide how a pre-aggregated `getVolumeByOrg`
  should count reports.
  - Resolution: dropped in favor of leaving the query live. It measures ~35ms on
    the dev DB, and no rollup reproduces its `count(distinct raw_reports.id)`
    exactly once a domain filter is applied later — a per-`(org, domain, day)`
    bucket double-counts any report whose events span more than one allowed
    domain. The two alternatives (an approximate count, or a `report_domains`
    bridge table) both cost correctness or a migration for no measured gain.
    Reconsider only if the query becomes slow; the bridge table is the option
    that keeps the count exact.

- [x] 2026-07-26 — **Pending Decisions:** Decide whether experimental OIDC SSO
      is production-ready.
  - Decision: no, it stays experimental, with session revocation named as the
    condition to revisit. `docs/SSO.md` keeps its experimental banner and
    known-gaps list.
  - Finding while scoping the condition: two of the three gaps the backlog
    attributed to SSO are already covered — deleting a user cascades to
    `sessions` (FK `onDelete: 'cascade'`), and `getSession` joins `users` on
    every request, so a role or allow-list change applies on the next request
    rather than at session expiry. The real gap is that a password change leaves
    existing sessions alive; that is now a concrete `[ ]` item in `TODO.md`
    rather than an open-ended decision.

- [x] 2026-07-26 — **Security:** Apply the per-user domain allow-list to the IP
      views (found during this run, not previously in the backlog).
  - Result: `getAllowedDomainIds` gates 16 report services but none of the six
    IP services, so a `viewer`/`user` restricted to one domain saw `/ips`,
    `/ips/[ip]` and `/api/v1/stats/top-ips` computed over every domain -- and
    `getIpDomains` returned the out-of-scope domain names themselves. All six
    (`getIpsSummary`, `getIpDetail`, `getIpDomains`, `getIpLogs`,
    `getIpReports`, `getTopIpSenders`) now filter on
    `normalizedEvents.domainId`. `getIpDetail` puts the filter in its LEFT JOIN
    and returns null when a restricted caller's aggregates come back null, so an
    IP that never sent to their domains reads as not-found instead of a zeroed
    page; its `total_messages` alias was typed `sql<number>` while the LEFT JOIN
    can yield NULL, now `sql<number | null>`.
  - Two fail-open paths in `getAllowedDomainIds` closed at the same time: a
    present-but-unusable allow-list (unparseable JSON, non-array, or `[]`)
    returned null (= all domains) and now returns `[]`. `[]` is reachable
    through the API -- `updateUserInputSchema` accepts an empty array and only
    the modal blocks it client-side.
  - Third, opposite-direction bug found while checking the first fix:
    `getAllowedDomainIds` reads only the session cookie, but a valid shared
    `SECRET_KEY` authenticates without one. Every domain-scoped query therefore
    returned nothing to API-key callers -- `/api/v1/stats/by-org` was already
    broken this way before this change. It now mirrors `requirePermission`: no
    session plus a valid key resolves to unrestricted.
  - Evidence: `pnpm run check:ci` clean (type-check, lint, format, 454/454
    tests, migrations). New `test/ipDomainScoping.test.ts` (5 cases, 4 fail
    without the service fix) and `test/getAllowedDomainIds.test.ts` (6 cases, 2
    fail without the auth fix), both verified by stashing the fix and
    re-running.
  - Files: `services/auth/domainAccess.ts`,
    `services/reports/getIp{sSummary,Detail,Domains,Logs,Reports}.ts`,
    `services/reports/getTopIpSenders.ts`,
    `test/{ipDomainScoping,getAllowedDomainIds}.test.ts`,
    `test/setup/insertSeedIp.ts`.
  - Note: `ipAddresses.emailsSentCount` is a denormalized global per-IP counter
    and is still shown unscoped; tracked in `TODO.md`.

- [x] 2026-07-26 — **Security:** Reject an empty `allowedDomains` array at the
      API boundary (found while fixing the IP scoping leak above).
  - Result: `createUserInputSchema` and `updateUserInputSchema` now require
    `.min(1)` on `allowedDomains`. The field was
    `z.array(z.string()).optional()`, so `POST/PUT /api/v1/users` could store
    `"[]"` while only the modal blocked it client-side. Since
    `getAllowedDomainIds` now reads an empty list as deny-all, that was a way to
    create a user who silently sees nothing; omitting the field (or sending
    null) remains the way to express "all domains". Both routes already
    `safeParse`, so this surfaces as a 400 `VALIDATION_ERROR`, not a 500.
  - Evidence: `pnpm run check:ci` clean (457/457, migrations OK); new
    `test/userInputSchemas.test.ts`.
  - Files: `validators/users/{create,update}UserInputSchema.ts`,
    `test/userInputSchemas.test.ts`.

- [x] 2026-07-26 — **Testing:** Give the IMAP account checkbox groups real
      grouping semantics.
  - Result: Both captions in `ImapAccountsSection` now name a `role="group"` via
    `aria-labelledby`, with per-row-index ids like the other fields, so AT
    announces which group a checkbox belongs to. Landed as ARIA rather than the
    `fieldset`/`legend` the backlog asked for: the visual risk the entry flagged
    is real and was measured, not guessed. The two markups were rendered side by
    side against the app's own compiled CSS and their boxes compared in a real
    browser -- native `fieldset`/`legend` pushes every row down 4px and grows
    each group 4px, because a legend is laid out by the fieldset's rendering
    rules (adding `inline` does not change it), while Tailwind v4's `space-y-3`
    sets `margin-block-end` on all but the last child, which is inert on today's
    inline span. `role="group"` measured pixel-identical to the current markup
    and is equivalent to AT.
  - Evidence: `pnpm run test:a11y` 44/44 (the two new grouping cases fail before
    the change, verified by stashing it); `pnpm run check:ci` clean (454/454,
    migrations OK).
  - Files: `components/settings/ImapAccountsSection.tsx`,
    `test/a11y/ImapAccountsSection.test.tsx`.

- [x] 2026-07-26 — **Testing:** Fix the empty-state ARIA of the `Command`
      palette.
  - Result: The fix landed in `components/ui/CommandEmpty.tsx`, not
    `CommandList.tsx` as the backlog assumed. cmdk hardcodes `role` _after_ the
    caller's prop spread in both `List` and `Empty`, so neither role can be
    overridden from outside. Both candidate fixes were measured with axe rather
    than reasoned about: dropping the listbox while the filtered count is zero
    only trades one violation for another (`aria-valid-attr-value`, because the
    input's `aria-controls` then dangles), while exposing the empty message as
    `role="option" aria-disabled="true"` reports zero violations. `CommandEmpty`
    now renders its own element instead of `Command.Empty`, keeping the
    `[cmdk-item]` attribute off it so arrow-key navigation still skips it.
  - Evidence: `pnpm run test:a11y` 42/42 (the two empty-state cases fail before
    the change); `pnpm run check:all` clean, `pnpm run test` 443/443;
    `pnpm run build` succeeds.
  - Files: `components/ui/CommandEmpty.tsx`, `test/a11y/Command.test.tsx`.

- [x] 2026-07-26 — **Testing:** Extend a11y coverage to the settings forms.
  - Result: Four new suites (`AiSettingsSection`, `ImapAccountsSection`,
    `IngestionSection`, `ApiKeySection`); suites 12 -> 16, tests 26 -> 42. Three
    real defects found and fixed, all in the IMAP section: the collapsed account
    header was a `role="button"` div wrapping a real `<button>` (axe
    `nested-interactive`, serious/wcag2a) and is now a real
    `<button aria-expanded>` with the Edit/Close affordance rendered via
    `Button asChild` as a span; none of the five account fields were associated
    with their labels (`htmlFor`/`id` per row index) so every one had an empty
    accessible name; and `FolderPicker`'s folder `select` plus its new-folder
    input had no accessible name at all. The two `<label>` elements used as
    group captions ("Fetch Options", "Post-Processing") labelled no control and
    are now spans.
  - Also fixed: `components/settings/index.ts` had five dead `export *` lines.
    Every section in that folder is a default export, and `export *` never
    re-exports a default, so the barrel exported nothing for `AdvancedSection`,
    `ApiKeySection`, `ImapAccountsSection`, `IngestionSection`, and
    `SettingsConfigForm`. Rewritten with explicit named re-exports,
    `AiSettingsSection` added, and that component switched from a relative deep
    import of its hooks to the `@/hooks/settings` barrel like its siblings.
  - Note: assertions use `toBeInTheDocument` rather than `toBeVisible`. Every
    section is a framer-motion element starting at `opacity: 0` and jsdom never
    advances the animation, so `toBeVisible` fails for a reason unrelated to
    accessibility. axe still audits the subtree, which the `nested-interactive`
    finding proves — the passing suites are not vacuous.
  - Evidence: `pnpm run test:a11y` 42/42; `pnpm run check:all` clean,
    `pnpm run test` 443/443; `pnpm run format:check` and
    `pnpm run check:migrations` clean; `pnpm run build` succeeds.
  - Files:
    `components/settings/{ImapAccountsSection,FolderPicker,AiSettingsSection,index}.tsx|ts`,
    `test/a11y/{AiSettingsSection,ImapAccountsSection,IngestionSection,ApiKeySection}.test.tsx`.

- [x] 2026-07-25 — **Performance:** Remove the unused
      `services/imap/getImapTotalCount.ts`.
  - Result: Deleted the function, its `types/imap/GetImapTotalCountOptions.ts`
    type, and both barrel entries. It had no callers; wiring it into the job
    would have re-added the redundant full-mailbox IMAP SEARCH that ADR 0008
    removed. ADR 0008's "alternatives considered" note updated to record the
    deletion.
  - Evidence: `grep -rn getImapTotalCount` returns only the ADR note;
    `pnpm run type-check`, `pnpm run lint`, `pnpm run format:check` clean;
    `pnpm run test` 424/424.
  - Files: `services/imap/{getImapTotalCount.ts,index.ts}`,
    `types/imap/{GetImapTotalCountOptions.ts,index.ts}`,
    `docs/adr/0008-batched-ingest-and-daily-rollups.md`.

- [x] 2026-07-25 — **Refactors:** Standardize the poll-status path-param error
      shape.
  - Result: `app/api/v1/job-runs/[id]/poll-status/route.ts` now uses the shared
    `parseIdParam` guard and returns
    `{ error: { code: 'BAD_REQUEST', message: 'Invalid job run id' } }` instead
    of the non-standard `{ error: 'Invalid Job ID' }`. This also tightens the
    guard: `parseInt` accepted `"12abc"` and negative ids, `parseIdParam`
    requires a positive integer.
  - Evidence: `pnpm run type-check`, `pnpm run lint`, `pnpm run format:check`
    clean; `pnpm run test` 424/424.
  - Files: `app/api/v1/job-runs/[id]/poll-status/route.ts`.

- [x] 2026-07-25 — **Refactors:** Require integer ids in the AI request bodies.
  - Result: Added `.int()` to `reportInsightsRequestSchema.reportId` and
    `diagnosticsInsightsRequestSchema.domainId`; both accepted fractional
    numbers, preserved from the pre-Zod code. Row ids are integers everywhere in
    the schema, so a fractional id could only ever be a client bug.
  - Evidence: existing `test/reportInsightsRequestSchema.test.ts` and
    `test/diagnosticsInsightsRequestSchema.test.ts` still pass (error messages
    unchanged); `pnpm run test` 424/424.
  - Files:
    `validators/ai/{reportInsightsRequestSchema,diagnosticsInsightsRequestSchema}.ts`.

- [x] 2026-07-25 — **Refactors:** Convert `utils/api/index.ts` off `export *`.
  - Result: Replaced the wildcard barrel with an explicit
    `export { parseIdParam }`, matching the repo barrel policy and the
    `utils/validation/index.ts` conversion from 2026-07-24.
  - Evidence: `pnpm run type-check`, `pnpm run lint` clean.
  - Files: `utils/api/index.ts`.

- [x] 2026-07-25 — **Artificial Intelligence:** Require a configured model in
      `isAiConfigured`.
  - Result: `isAiConfigured()` now also requires a non-blank `model`, so with
    only provider + key saved the diagnostics and report panels render
    `AiNotConfiguredCta` instead of an Analyze button that always 422s. Since
    ADR 0007 `resolveEffectiveModel` refuses to guess a provider default,
    provider+key alone is not a usable configuration.
  - Evidence: new `test/isAiConfigured.test.ts` (3 cases: no provider,
    provider+key without a model incl. blank/whitespace, provider+key+model);
    `pnpm run test` 424/424.
  - Files: `services/ai/core/isAiConfigured.ts`, `test/isAiConfigured.test.ts`.
  - Note: `services/ai/contracts/AiConfigurationStatus.ts`
    (`AIConfigurationStatus`) has no consumers at all; left in place as
    pre-existing dead code, tracked in `TODO.md`.

- [x] 2026-07-25 — **Testing / Bugs:** Extend a11y coverage to the interactive
      surfaces, and fix an unnamed combobox it found.
  - Result: Covered the surfaces with focus management and Radix portals that
    the earlier static pass could not reach — `DataTable` (populated, empty, and
    chrome-hidden), `Select` (closed and with the listbox open), and
    `DateRangeFilter` (preset and custom-range).
  - Real defect found and fixed: the date-range `SelectTrigger` had no
    accessible name (axe `button-name`, serious). Its only text comes from
    `SelectValue`, which renders nothing until the matching `SelectItem` mounts,
    so screen readers announced an unnamed button. Added an explicit
    `aria-label="Date range"`, pinned by a
    `getByRole('combobox', { name: 'Date range' })` assertion.
  - Harness: `test/setupA11y.ts` now stubs `scrollIntoView`, the pointer-capture
    methods, and `ResizeObserver`. jsdom has no layout engine and Radix calls
    these while opening, so without them the component threw before axe could
    audit the portalled content. Axe checks roles, names, and relationships,
    none of which depend on real geometry.
  - The open-listbox audit runs against `document.body`, not the render
    container, because Radix portals the content out — auditing the container
    would have silently skipped the popover. The `region` rule is disabled for
    that one audit only, with the reason inline: the portal mounts as a direct
    child of `<body>` by design, so it fires in every correct implementation.
  - Also covered `Dialog` (closed, and open with an asserted accessible name +
    description) and the `Command` palette. Suites 7 -> 12, tests 15 -> 26.
  - Second real finding, not fixed: cmdk puts `role="listbox"` on `CommandList`
    unconditionally, so with no results the listbox has no `option` children and
    axe raises `aria-required-children` (wcag2a). Not silently patched — the fix
    changes a shared UI primitive's ARIA semantics and belongs in
    `components/ui/CommandList.tsx`, so it is filed in `TODO.md`. The
    empty-state test asserts that this is the _only_ violation, so any other
    empty-state regression still fails, and the test fails once the issue is
    fixed.
  - Evidence: `pnpm run test:a11y` 26/26 (the `DateRangeFilter` cases fail
    before the `aria-label` fix); `pnpm run check:ci` exit 0 (type-check, lint,
    format:check, 443/443 tests, migrations) from cleared `tsconfig.tsbuildinfo`
    and `.eslintcache`; `pnpm run build` exit 0.
  - Files: `components/filters/DateRangeFilterContent.tsx`, `test/setupA11y.ts`,
    `test/a11y/{DataTable,Select,DateRangeFilter,Dialog,Command}.test.tsx`.

- [x] 2026-07-25 — **Security:** Add an `ai:invoke` permission for per-role AI
      cost control.
  - Result: AI insight generation spends the operator's paid provider quota but
    was gated only by `reports:read`, so any role that could look at a report
    could spend money. Added `ai:invoke` to the permission union and switched
    both `/api/v1/ai/report-insights` and `/api/v1/ai/diagnostics-insights` to
    require it. Mechanism only, no policy change: `ai:invoke` is granted to
    exactly the roles that hold `reports:read` today (admin, operator, viewer,
    user), so nobody's access changed. Revoking AI spend from `viewer`/`user` is
    now a one-line edit in `constants/auth/rolePermissions.ts`. The 10/min/IP
    rate limit is unchanged. Who _should_ hold it is the owner's call and stays
    open in `TODO.md`.
  - Evidence: new case in `test/hasPermission.test.ts` asserting `ai:invoke`
    matches `reports:read` for every role (so the no-op-today property is pinned
    and a future change is deliberate); `test/apiRbacSmoke.test.ts` still green;
    `pnpm run test` 443/443, `pnpm run test:a11y` 15/15, cold type-check/lint
    clean, `pnpm run build` exit 0.
  - Files: `types/auth/Permission.ts`, `constants/auth/rolePermissions.ts`,
    `app/api/v1/ai/{report-insights,diagnostics-insights}/route.ts`,
    `test/hasPermission.test.ts`.

- [x] 2026-07-25 — **Refactors:** Delete the dead `formatters/index.ts`
      aggregator barrel.
  - Result: The TODO asked to convert its 14 `export *` lines to explicit
    re-exports. It turned out to have zero importers: its own header says
    "Import from '@/utils'", but no `utils/index.ts` exists and `@/*` maps
    straight to the repo root, so that entrypoint was never resolvable. Deleted
    rather than converted — the barrel-policy violation and ~80 symbols of
    re-export churn both disappear. The real formatters are still reached
    directly (`@/formatters/metrics`, `utils/format/index.ts`).
  - Evidence: `grep` for `@/formatters`, `@/utils`, and relative `../formatters`
    imports found only `@/formatters/metrics` (a different file); cold
    `pnpm run type-check` and `pnpm run lint` clean; `pnpm run test` 442/442;
    `pnpm run build` exit 0.
  - Files: `formatters/index.ts` (deleted).

- [x] 2026-07-25 — **Artificial Intelligence:** Remove the dead
      `AIConfigurationStatus` type.
  - Result: `services/ai/contracts/AiConfigurationStatus.ts` had no consumers
    anywhere; the panels take a boolean `isAiConfigured`. Deleted with its
    barrel entry.
  - Evidence: cold `pnpm run type-check` clean; `pnpm run test` 442/442.
  - Files: `services/ai/contracts/{AiConfigurationStatus.ts,index.ts}`.

- [x] 2026-07-25 — **Testing:** Deduplicate the `makeDns` DNS fixture.
  - Result: `test/computeDomainScore.test.ts` carried its own 30-line copy. The
    two fixtures were not interchangeable — the shared `makeDnsDiagnostics`
    defaults to a healthy domain, the scoring one to a fully unconfigured domain
    — so rather than force one on the other, added `makeEmptyDnsDiagnostics`,
    which derives the unconfigured baseline from the shared fixture. Intent
    stays explicit at both call sites.
  - Evidence: `test/computeDomainScore.test.ts` 15/15 unchanged assertions;
    `pnpm run test` 442/442.
  - Files: `test/setup/makeEmptyDnsDiagnostics.ts`,
    `test/computeDomainScore.test.ts`.

- [x] 2026-07-25 — **Infrastructure:** Unblock and re-upgrade
      `@radix-ui/react-slot` past the 1.2.x pin.
  - Result: Blocker resolved upstream. Bumped `~1.2.4` -> `^1.3.3`. The
    1.3.0/1.3.1 failure was a module-scope `SlotContext` (`React.createContext`)
    shipped without a `"use client"` directive, which crashed `next build`
    page-data collection with `e.createContext is not a function`; 1.3.3's dist
    contains no `createContext` at all, so the failure mode is gone.
  - Evidence: `pnpm run build` exit 0, "Compiled successfully", 49/49 static
    pages generated, no `createContext` error;
    `grep createContext node_modules/@radix-ui/react-slot/dist/` returns
    nothing. Cold `pnpm run type-check` and `pnpm run lint` clean;
    `pnpm run test` 442/442; `pnpm run test:a11y` 15/15. Lockfile diff is
    additive (slot 1.3.3 + its `react-compose-refs@1.1.5`), no unrelated version
    moves.
  - Files: `package.json`, `pnpm-lock.yaml`.
  - Note: 1.4.0 remains RC-only; 1.3.3 is the current stable and is sufficient.
    The standing lesson is unchanged and still worth keeping: Radix bumps must
    be verified with `pnpm run build`, since type-check, lint, and vitest were
    all green while the RSC build was broken.

- [x] 2026-07-25 — **Diagnostics:** Handle SPF macro targets and conditional
      `redirect=` in the lookup tree.
  - Result: Two real misreports fixed. (1) A macro target (`include:%{d}...`,
    `exists:%{ir}.%{v}...`) was fed to DNS literally; the query always failed,
    so the tree rendered a child badged "No SPF record" — a misconfiguration
    warning for a perfectly valid record. Macro mechanisms are now counted as
    lookups but not expanded, and surfaced as `macroMechanisms` with a "not
    expanded (resolved per sender)" line. (2) A `redirect=` in a record that
    also has an `all` was followed and its whole subtree rolled into
    `lookupCount`, though RFC 7208 6.1 requires receivers to ignore it
    "regardless of the relative ordering of the terms". It is now excluded from
    `mechanisms`, not followed, not counted, and reported as `ignoredRedirect`
    with an explanation of why the redirect is dead. A redirect with no `all` is
    unchanged.
  - Deviation from the original note: the TODO assumed an ignored redirect still
    consumes its lookup. It does not — an ignored term is never evaluated, so it
    issues no DNS query. Counted as 0, which also means `exceedsLookupLimit` no
    longer fires on lookups the receiver will never perform.
  - Evidence: 5 new cases in `test/resolveSpfTree.test.ts` (redirect ignored
    with `all`; redirect honored without `all`; redirect ignored when written
    before a `~all`; macro counted but not queried, asserting no DNS call
    contains `%{`; macro include not rendered as a missing record) and 2 in
    `test/SpfLookupTreeSection.test.ts`. `pnpm run test` 442/442,
    `pnpm run test:a11y` 15/15, `pnpm run check:migrations` OK, cold
    `pnpm run type-check` and `pnpm run lint` clean.
  - Files:
    `services/diagnostics/{hasSpfAllMechanism,containsSpfMacro,extractSpfEffectiveLookupMechanisms,extractSpfIgnoredRedirect,extractSpfMacroMechanisms,extractSpfChildDomains,buildSpfTreeNode}.ts`,
    `types/diagnostics/SpfTreeNode.ts`,
    `components/diagnostics/spf/SpfLookupTreeNodeItem.tsx`,
    `test/{resolveSpfTree,SpfLookupTreeSection}.test.ts`.
  - Process note: an earlier "type-check clean" in this run was a stale
    `tsconfig.tsbuildinfo`; adding two required fields to `SpfTreeNode` only
    surfaced after deleting the incremental cache. Final verification ran cold.

- [x] 2026-07-25 — **Security:** Move the `update-db-stream` admin key out of
      the URL query string.
  - Result: The GeoIP update SSE stream no longer takes `?apiKey=<SECRET_KEY>`.
    New `POST /api/v1/admin/geoip/update-db-ticket` authenticates the normal
    header way (`requireAdminAuth`) and mints a 24-byte random ticket; the
    stream takes `?ticket=` and redeems it through `consumeStreamTicket`, which
    deletes it on first read and rejects anything past `STREAM_TICKET_TTL_MS`
    (30s). What lands in proxy logs and browser history is now a spent,
    short-lived value instead of the long-lived admin secret. Ticket store is
    in-process, which matches the single-replica topology (ADR 0003). ADR 0001
    records the SSE exception.
  - Evidence: new `test/streamTicket.test.ts` (single-use,
    unknown/empty/undefined rejected, 48-hex distinctness over 50 mints, TTL
    expiry); `test/apiAuthSmoke.test.ts` extended with a per-file allowlist that
    still requires the route to call `consumeStreamTicket`; `pnpm run test`
    435/435, `pnpm run test:a11y` 15/15, `pnpm run type-check`, `pnpm run lint`,
    `pnpm run format:check` clean, `pnpm run build` exit 0.
  - Files:
    `app/api/v1/admin/geoip/{update-db-ticket,update-db-stream}/route.ts`,
    `services/api/{issueStreamTicket,consumeStreamTicket,streamTicketStorePrivate,index}.ts`,
    `constants/api/`,
    `utils/settings/{fetchGeoIpStreamTicket,attachGeoIpStreamHandlers}.ts`,
    `types/settings/GeoIpStreamHandlers.ts`, `hooks/settings/useGeoIp.ts`,
    `test/{streamTicket,apiAuthSmoke}.test.ts`,
    `docs/adr/0001-default-deny-api-surface.md`.
  - Behavior note: a mid-stream transport drop can no longer silently reconnect
    on the same URL (the ticket is spent) — the client surfaces the error and
    the operator restarts the update. That is the intended trade for
    non-replayable URLs.

- [x] 2026-07-25 — **Performance:** Aggregate `getReportSources` in SQL instead
      of a JS join.
  - Result: Dropped the two extra per-report event-id scans and the `IN (...)`
    list of every event id in the report (unbounded — SQLite's
    parameter/expression limits were a real ceiling on large reports), plus the
    O(sources x events) JS join. Override types are now a `GROUP BY ip, type` in
    SQL, and the primary DKIM identity comes from one ordered join taking the
    first row per IP. Five queries down to three, all scoped by `rawReportId`
    and served by `event_raw_report_idx`. Per-IP (not per-group) resolution
    semantics preserved exactly, and DKIM selection is now deterministically
    ordered by event id rather than relying on unordered scan order.
  - Evidence: new `test/getReportSources.test.ts` (5 cases) written against the
    _old_ implementation first and passing unchanged after the rewrite —
    grouping/collapse + volume ordering, hostname enrichment vs null, per-IP
    override union, first-DKIM-wins, empty report. `pnpm run test` 435/435.
  - Files: `services/reports/getReportSources.ts`,
    `test/getReportSources.test.ts`,
    `test/setup/{seedReportSourcesFixture,SeedReportSourcesResult,requireInsertedId,resetDmarcDb}.ts`.
  - Note: `resetDmarcDb` now also clears `ip_hostname_enrichments`; it was
    leaking rows across tests in the same file.
  - Not done: the same TODO named `getReportStats` and
    `getReportEventSummaries`. Inspected both — `getReportStats` is already two
    SQL aggregates over the indexed predicate, and `getReportEventSummaries`
    intentionally returns row-level detail for the AI prompt, so neither has a
    GROUP BY to move to.

- [x] 2026-07-25 — **Testing:** Extend a11y coverage beyond the first three
      suites.
  - Result: Unblocked the import path by re-exporting `ProtocolExplainer`,
    `RecordDisplay`, and `SectionHeader` from `components/diagnostics/index.ts`,
    so consumers no longer have to reach into `./shared/*` (which
    `import/no-internal-modules` forbids) or dodge the rule with a relative
    import. Added four a11y suites: the three shared primitives plus the real
    `SpfDetailSection` / `DmarcDetailSection` in both healthy and missing-record
    states. Suites 3 -> 7, tests 5 -> 15.
  - Evidence: `pnpm run test:a11y` 15/15 with zero axe violations;
    `pnpm run test` 435/435.
  - Files: `components/diagnostics/index.ts`,
    `test/a11y/{ProtocolExplainer,RecordDisplay,SectionHeader,DiagnosticsDetailSections}.test.tsx`,
    `test/setup/makeDnsDiagnostics.ts`, `test/ProtocolExplainer.test.ts`.
  - Note: the `makeDns` fixture exported from `test/ProtocolExplainer.test.ts`
    moved to `test/setup/makeDnsDiagnostics.ts`. A second copy still lives
    inside `test/computeDomainScore.test.ts`; left alone as unrelated churn.

- [x] 2026-07-25 — **Infrastructure:** Declare `tsx` as a devDependency.
  - Result: `seed:demo` and `backfill:rollup` both shell out to `tsx`, but it
    was only present transitively (`drizzle-kit` -> `tsx@4.22.1`) and hoisted
    into `node_modules/.bin`. A drizzle-kit bump that drops or replaces it would
    have silently broken both documented scripts. Declared `tsx: ^4.22.1`,
    resolving to the version already in the lockfile.
  - Evidence: `pnpm-lock.yaml` diff is 3 additive lines in the importer block,
    no dependency versions changed; `pnpm exec tsx --version` -> `tsx v4.22.1`;
    `pnpm install --lockfile-only` reports the lockfile up to date. Found
    2026-07-25 while documenting the backfill step.
  - Files: `package.json`, `pnpm-lock.yaml`.

- [x] 2026-07-25 — **Performance:** Document the one-time
      `pnpm run backfill:rollup` upgrade step.
  - Result: Added a "One-time post-upgrade steps" section to `docs/UPDATING.md`
    explaining that `event_rollup_daily` starts empty on existing installs, so
    dashboard totals lag until the backfill runs; documents idempotency, the
    ingestion-idle requirement (single-writer SQLite, ADR 0003), the Docker
    `docker compose exec web` form, and that new installs need nothing. README's
    Updating section links to it.
  - Evidence: `pnpm run format:check` clean; ADR links resolve to real files
    under `docs/adr/`.
  - Files: `docs/UPDATING.md`, `README.md`.

- [x] 2026-07-24 — **Performance:** Batched ingestion and daily rollups for
      large-volume DMARC data (ADR 0008).
  - Result: Replaced per-email writes and full-table dashboard scans that made
    large ingests stall for minutes/hours with no visible progress. WAL +
    `synchronous=NORMAL` + `busy_timeout` (`lib/db/applyConnectionPragmas.ts`);
    a `poll_status` coalescer flushing at most every ~500 ms / ~500 events
    (`createPollStatusCoalescer`); buffered multi-row `job_poll_events` inserts
    (`createJobEventBuffer`); set-based IP resolution (`upsertIpsBatch`)
    replacing the per-IP loop. New `event_rollup_daily` (per domain, per UTC
    day) maintained inside the ingest transaction; `getAggregateStats`,
    `getDomainSummary`, `getDomainsSummaryAll` now read the rollup instead of
    scanning `normalized_events`. Added indexes on
    `normalized_events(raw_report_id)`, `(ip_address_id)`, and covering
    `(domain_id, report_end_date, count)`. Idempotent backfill
    `pnpm run backfill:rollup`.
  - Correction during review: initially set `PRAGMA foreign_keys = ON`, which
    would have broken `resetDmarcDb`/other delete paths (FK enforcement was
    never on); removed it. The generated migration `0029` also re-created
    `audit_log` (drizzle snapshot lagged behind the hand-authored `0028`);
    trimmed it to only the rollup table + indexes.
  - Evidence: `test/eventRollup.test.ts` (ingest-vs-rollup consistency +
    idempotent rebuild); `pnpm run type-check`, `pnpm run lint`,
    `pnpm run format:check`, `pnpm run check:migrations` clean; `pnpm run test`
    421/421.
  - Files: `lib/db/{applyConnectionPragmas,client}.ts`,
    `lib/db/schema/{event-rollup-daily,normalized-event}.ts`,
    `drizzle/0029_silent_wrecking_crew.sql`,
    `services/job/{createPollStatusCoalescer,createJobEventBuffer,setPollStatusInDb,processAccount,runIngestJob}.ts`,
    `services/geoip/upsertIpsBatch.ts`,
    `services/reports/{ingestParsedReport,getAggregateStats,getDomainSummary,getDomainsSummaryAll,rebuildEventRollup}.ts`,
    `utils/{reports/computeDailyRollupDeltas,geoip/normalizeIp,dates/daySeconds}.ts`,
    `scripts/backfill-rollup.ts`, ADR 0008.
  - Note: date filtering on the rollup is day-granular (DMARC reports are
    day-aligned). Existing installs must run `backfill:rollup` once after
    upgrading.

- [x] 2026-07-24 — **Security:** Migrate the production CSP to nonces.
  - Result: Per-request nonce with `'strict-dynamic'` for `script-src` set by
    the proxy (`utils/proxy/applyProdCspHeaders.ts`); `'unsafe-inline'` removed
    from scripts (kept for styles — Recharts/framer-motion/next-font
    constraints, see ADR 0006); dev CSP unchanged via static headers; all pages
    force-dynamic (login via a server `layout.tsx`).
  - Evidence: `pnpm run build` shows every page `ƒ` (dynamic);
    `test/buildProdCspDirectives.test.ts`, `test/createCspNonce.test.ts`; full
    suite green.
  - Files: `proxy.ts`, `utils/proxy/applyProdCspHeaders.ts`, `utils/security/`,
    `app/login/layout.tsx`, eight `page.tsx` files.

- [x] 2026-07-24 — **Security:** Complete the RBAC rollout across privileged and
      mutating routes.
  - Result: Every privileged/mutating `/api/v1` route and server action now
    enforces a catalog permission via `requirePermission`; API key maps to the
    `admin` role (`services/api/getApiKeyRole.ts`); new `reports:write`
    permission; closed two previously unauthenticated admin GETs
    (`/api/v1/admin/settings`, `/api/v1/admin/ai-settings`) that leaked masked
    IMAP/CORS/AI config; unauthenticated `fetchMoreIp*` server actions now
    require `reports:read`.
  - Correction during review: `reports:write` was initially granted only to
    `admin` and `operator`, which would have 403'd report upload for the legacy
    `user` role — the DB default, the only non-admin role the app assigns, and
    one that sees an ungated `/upload` page. Granted `reports:write` to `user`
    as well; `viewer` stays strictly read-only.
  - Evidence: `test/apiRbacSmoke.test.ts` structural gate; `pnpm run test`
    328/328; inventory in the session report.
  - Files: `app/api/v1/**` (13 route files), `actions/fetchMoreIp*.ts`,
    `services/api/`, `services/auth/`, `types/auth/Permission.ts`,
    `constants/auth/rolePermissions.ts`.

- [x] 2026-07-24 — **Artificial Intelligence:** Decide missing OpenRouter model
      behavior — fail clearly.
  - Result: Removed the silent `PROVIDER_DEFAULTS` fallback (`openrouter/auto`
    et al.); `resolveEffectiveModel` now throws `NOT_CONFIGURED` with an
    actionable message; routes return 422 and the panels render it.
  - Evidence: `test/resolveEffectiveModel.test.ts` (7 tests); full suite green.
  - Files: `services/ai/providers/shared/resolveEffectiveModel.ts`
    (providerDefaults.ts deleted).

- [x] 2026-07-24 — **Refactors:** Apply Zod at route boundaries and move Drizzle
      queries out of `app/**`.
  - Result: All direct Drizzle access removed from `app/**` (only
    `runMigrations` remains, a service call) into named service functions. Zod
    validation applied at 22 route boundaries: 6 body-input routes
    (`validators/{imap,updates,geoip,ai}/`) and 16 query-param routes via a
    shared `validators/query/` layer. Error codes, statuses and messages
    preserved verbatim; `stats/trend` `period` moved from a cast to `z.enum`.
    Removed the now-dead `utils/api/parseDateParams.ts`, 4 route-local constant
    files, and `utils/validation/coerceNumber.ts`; converted
    `utils/validation/index.ts` off `export *`.
  - Evidence: 61 new schema tests; `pnpm run test` 420/420; `pnpm run lint`
    clean; `pnpm run build` succeeds.
  - Files: `app/api/**` (22 routes), `validators/query/` (13 files),
    `validators/{imap,updates,geoip,ai}/`,
    `services/{reports,geoip,notifications,ip-hostname}/`.
  - Behavior notes: malformed (never valid) input differs slightly —
    `z.coerce.number()` uses `Number()` not `parseInt()`, so `?days=30abc` now
    yields no filter instead of 30; duplicated params take the last value rather
    than the first.

- [x] 2026-07-24 — **Bugs:** Fix the `next/image` aspect-ratio warning for the
      sidebar logo.
  - Result: The logo was declared 140x32 but the artwork's viewBox is
    2286.29x592.55 (~3.86), so it always rendered 123px wide — exactly one
    dimension differing from the attributes, which is what `next/image` warns
    about. Declared 123x32 with `h-8 w-auto`. The LCP warning was already gone.
  - Evidence: Captured the real dev-mode console over the Chrome DevTools
    Protocol: warning present before, absent after; rendered 123 vs attribute
    "123", `widthModified: false`. `/login`, `/reports`, `/domains`, `/upload`,
    `/settings` all report a clean console.
  - Files: `components/shell/VexaLogo.tsx`.

- [x] 2026-07-24 — **Diagnostics:** Verify `/diagnostics/<domain>` against real
      domains in a browser.
  - Result: Rendered six real domains from a production build. Both branches
    exercised for every protocol — BIMI present (paypal.com, cnn.com) and absent
    (google.com, github.com, example.com, wikipedia.org); MTA-STS and TLS-RPT
    present (google.com) and absent (the rest). Verdicts cross-checked against
    live DNS: no false positives or negatives. SPF lookup tree correct,
    including github.com's 8 direct includes plus 2 nested = 10 total.
  - Evidence: HTTP 200 on all six; DNS cross-check via `dns.resolveTxt`.

- [x] 2026-07-24 — **Diagnostics:** Implement PDF export for the domain report.
  - Result: Print-first export (`ExportPdfButton` + `@media print` styles), no
    new dependency. Verified by generating a real PDF through the browser's own
    print pipeline: **22 pages**, so the fixed-height shell no longer clips the
    report to one page (`html`/`body`/`main` all resolve to `overflow: visible`
    under print media, sidebar hidden). A dark-themed session prints
    white-on-black-free: body forced to `rgb(255,255,255)` with `rgb(13,13,13)`
    text.
  - Correction during review: the grade badge was white text on a gradient,
    which disappears when "Background graphics" is off (confirmed: backgrounds
    are dropped, ~131 KB smaller PDF). In print the circle now renders as a 4px
    colored ring with grade-colored text — both print as foreground. Screen
    appearance unchanged (white on gradient).
  - Files: `components/diagnostics/ExportPdfButton.tsx`,
    `components/diagnostics/score/DomainScoreBadge.tsx`, `components/shell/`,
    `components/ai/`, `app/globals.css`.

- [x] 2026-07-24 — **Diagnostics:** Implement the SPF lookup-tree visualization.
  - Result: Recursive include/redirect tree resolver
    (`services/diagnostics/resolveSpfTree.ts` + single-purpose helpers) with RFC
    7208 lookup counting, cycle detection, depth 10 / 30-node budgets, 5-minute
    cache; rendered as an accessible nested list after the SPF detail section in
    `DiagnosticsView`.
  - Evidence: `test/resolveSpfTree.test.ts` (9 tests),
    `test/SpfLookupTreeSection.test.ts` (4 tests); full suite 347/347.
  - Files: `services/diagnostics/` (10 new files), `components/diagnostics/spf/`
    (4 new files), `types/diagnostics/SpfTreeNode.ts`, `getDomainDnsRecords.ts`,
    `DiagnosticsView.tsx`.

- [x] 2026-07-24 — **Artificial Intelligence:** Expose an explicit rollout plan
      in the diagnostics AI response.
  - Result: Response schema extended to `{"insights":[...],"rolloutPlan":[...]}`
    (protocol-tagged, highest-impact first, max 5 steps); parsed defensively
    (missing/malformed -> `[]`) and rendered as a numbered Rollout Plan card
    after the insight sections.
  - Evidence: `test/diagnosticsAiPrompts.test.ts`,
    `test/parseDiagnosticsRolloutPlanFromContent.test.ts`; full suite 334/334.
    Live-provider call not exercised (follow-up in TODO).
  - Files: `services/ai/prompts/diagnosticsAnalysisSystem.ts`,
    `services/ai/use-cases/`, `components/ai/DiagnosticsRolloutPlanCard.tsx`,
    `types/ai/DiagnosticsAnalysisResult.ts`.

- [x] 2026-07-24 — **Diagnostics:** Remove the unrendered legacy diagnostics
      chain.
  - Result: Deleted 46 unreachable files (DnsDiagnosticsPanel/DnsRecordsLoader
    chain, dns card set, assessment/, executive summary, useDnsDiagnostics hook
    stack, entire lib/diagnostics) and trimmed 4 barrels; live `METRIC_*` style
    constants and `DnsRecordsSection` preserved.
  - Evidence: grep unreachability audit + `tsc` + knip; full suite green.
  - Files: `components/diagnostics/`, `hooks/diagnostics/`, `lib/`.

- [x] 2026-07-24 — **Bugs:** Fix the DKIM key-length estimator.
  - Result: Base64 padding-aware byte count, RSA SPKI DER overhead subtracted
    and rounded to the nearest 256 bits (real 2048-bit keys now report 2048, not
    2352); standard 32-byte Ed25519 keys are no longer flagged weak.
  - Evidence: `test/parseDkimRecord.test.ts` (13 tests, updated expectations).
  - Files: `services/diagnostics/assessDkimKeyStrength.ts`,
    `decodeBase64ByteLength.ts`, `parseDkimRecord.ts`,
    `types/diagnostics/DkimKeyAssessment.ts`.

- [x] 2026-07-24 — **Bugs:** Fix SPF third-party include filter and lookup
      counting.
  - Result: All `include:` mechanisms are listed as third-party dependencies
    (the old condition inverted its own intent); `analyzeLimits` now counts
    qualified (`-a`), CIDR (`a/24`), and record-final `a`/`mx` mechanisms.
  - Evidence: `test/analyzeSpfRecord.test.ts` (18 tests incl. new counting
    regression).
  - Files: `services/diagnostics/analyzeDependencies.ts`, `analyzeLimits.ts`.

- [x] 2026-07-24 — **Testing:** Add direct unit tests for the diagnostics
      scoring and parsers.
  - Result: 57 tests covering `computeDomainScore` grade boundaries,
    `parseDmarcTags`, `parseDkimRecord`, `analyzeSpfRecord` edge cases; they
    surfaced the two bugs fixed above.
  - Evidence: `pnpm run test` green.
  - Files: `test/computeDomainScore.test.ts`, `test/parseDmarcTags.test.ts`,
    `test/parseDkimRecord.test.ts`, `test/analyzeSpfRecord.test.ts`.

- [x] 2026-07-24 — **Testing:** Add tests for admin guides, AI prompt builders,
      and protocol explainers.
  - Result: 34 tests covering guide severity ordering/caps/thresholds, prompt
    section content and runbook-non-repetition instructions, and server-rendered
    explainer output.
  - Evidence: `pnpm run test` green.
  - Files: `test/buildDiagnosticsAdminGuides.test.ts`,
    `test/diagnosticsAiPrompts.test.ts`, `test/ProtocolExplainer.test.ts`.

- [x] 2026-07-24 — **Testing:** Enable `.test.tsx` in the unit Vitest config.
  - Result: `vitest.config.ts` now includes `test/**/*.{test,spec}.{ts,tsx}`
    (a11y dir excluded to keep it under its own jsdom config); DOM-dependent
    tests can opt in via the `@vitest-environment jsdom` pragma.
  - Evidence: full suite green; a11y suite unaffected.
  - Files: `vitest.config.ts`.

- [x] 2026-07-24 — **Testing:** Make `pnpm run test:a11y` pass by adding the
      first a11y suites.
  - Result: axe-based tests for `InstallForm` (full + partial),
    `UnifiedPagination`, and `EmptyState`; zero violations found; `vitest-axe`'s
    broken `extend-expect` bypassed by asserting `results.violations` directly.
  - Evidence: `pnpm run test:a11y` exit 0 (3 files, 5 tests).
  - Files: `test/a11y/`.

- [-] 2026-07-24 — **Testing:** Consider upgrading or replacing `vitest-axe`.
  - Resolution: No upgrade exists — `vitest-axe` latest stable is still 0.1.0
    (1.0.0 is prerelease `1.0.0-pre.5` only), and its `extend-expect` is a
    0-byte no-op under Vitest 4. The a11y suites assert `results.violations`
    directly, which is fully typed, needs no setup, and still prints complete
    violation objects on failure. Revisit only if 1.0.0 ships stable.

- [x] 2026-07-24 — **Testing:** Benchmark and improve full-repository lint
      performance.
  - Result: Cold `eslint .` is 75.6 s (dominated by type-aware linting); enabled
    `--cache` in the lint scripts, warm runs now 5.4 s (14x). CI stays
    effectively cold (no cache file in fresh checkouts). Caveat: cache skips
    unchanged files even when a dependency's types changed; run a cold lint
    (`rm .eslintcache`) before releases.
  - Evidence: timed runs 2026-07-24.
  - Files: `package.json`, `.gitignore`.

- [x] 2026-07-24 — **Infrastructure:** Migrate `boundaries/dependencies` to
      eslint-plugin-boundaries v7 syntax.
  - Result: `rules` -> `policies` and 4 legacy selectors converted to
    object-based selectors; policy matrix unchanged; deprecation warnings gone;
    rule still enforcing (verified via debug run).
  - Evidence: `pnpm run lint` exit 0 with zero boundaries warnings.
  - Files: `eslint.config.ts`.

- [x] 2026-07-24 — **Infrastructure:** Decide per-process `withDiagnosticsCache`
      is sufficient — documented in ADR 0003.
  - Resolution: Deployment is deliberately single-replica (SQLite, RWO PVC,
    replicas=1 in k8s/Helm); per-replica DNS resolution only matters
    multi-replica. Revisit together with any multi-replica move.

- [x] 2026-07-24 — **Documentation:** Write the architecture decision records.
  - Result: 7 ADRs + index under `docs/adr/` (default-deny API, encrypted IMAP
    credentials, SQLite single-replica, reversible migrations, TS7 dual-alias
    interop, nonce CSP, explicit AI model), linked from `docs/README.md`; claims
    verified against code (notably: the "API key" is the shared `SECRET_KEY`
    admin token, not per-user keys).
  - Evidence: `docs/adr/README.md`; prettier clean.
  - Files: `docs/adr/`.

- [x] 2026-07-24 — **Pending Decisions:** Expand the DKIM selector probe list.
  - Resolution: Expanded from 9 to 28 documented, stable provider selectors
    (Google, M365, SendGrid, Mailgun, Zoho, Postmark legacy, Fastmail, Proton,
    iCloud, Constant Contact, Zendesk, Mailchimp/Mandrill); providers with
    per-account selectors (SES, HubSpot) cannot be probed with a fixed list.
    Each entry costs one parallel TXT lookup per uncached run.
  - Files: `services/diagnostics/knownSelectors.ts`.

- [x] 2026-07-23 — **Security:** Add the one-time install token field to the
      install UI.
  - Result: The install form now collects the token and submits it as
    `installToken`, so first-run web installs can pass the API's token gate.
  - Evidence: `pnpm exec tsc --noEmit`, ESLint, Prettier, and `pnpm test`
    (186/186) passed.
  - Files: `components/install/InstallForm.tsx`,
    `hooks/install/useInstallForm.ts`, `utils/install/installReducer.ts`,
    `types/install/InstallState.ts`, `types/install/InstallAction.ts`.

- [x] 2026-07-23 — **Documentation:** Publish the TODO-maintenance rule through
      a tracked instruction source.
  - Result: Removed `CLAUDE.md` and `AGENTS.md` from `.gitignore` and committed
    `CLAUDE.md` with the backlog and work-log conventions.
  - Evidence: commit `7021f658`.
  - Files: `.gitignore`, `CLAUDE.md`.

- [x] 2026-07-23 — **Testing:** Complete the full repository quality gate over
      the diagnostics work.
  - Result: Ran the full Vitest suite with outbound DNS available; the
    previously failing live-DNS assertion passed.
  - Evidence: `pnpm test` — 27 files, 186/186 tests passed.
  - Files: `test/safeFetch.test.ts`.

### 2026-05

- [x] 2026-05-19 — **Infrastructure:** Add Kubernetes manifests and a Helm
      chart.
  - Result: Added single-replica, SQLite-safe deployment resources with probes,
    persistence, ingress, and hardened container settings.
  - Evidence: `e8287ee4`; validated with `helm lint`, `helm template`, and
    `kubectl apply -k --dry-run=client`.
  - Files: `deploy/k8s/`, `deploy/helm/vexa-insight-dashboard/`.

- [x] 2026-05-19 — **Infrastructure:** Enforce reversible database migrations in
      CI.
  - Result: Added the migration policy, checker, and CI gate.
  - Evidence: `8dfe7f2a`.
  - Files: `scripts/check-migrations.sh`, `.github/workflows/ci.yml`.

- [x] 2026-05-19 — **Testing:** Add DMARC parser and ingestion regression
      coverage.
  - Result: Added major-provider fixtures, ZIP edge cases, duplicate-report
    idempotency, and per-report IP deduplication tests.
  - Evidence: `c9227e17`, `7f862ffc`, `125ab20d`.
  - Files: `test/parseDmarcXmlFixtures.test.ts`, `test/zipEdgeCases.test.ts`,
    `test/ingestIdempotency.test.ts`, `test/ingestIpDedup.test.ts`.

- [x] 2026-05-19 — **Bugs:** Resolve absolute SQLite `file:` URL paths
      correctly.
  - Result: Normalized absolute database URLs without treating them as relative
    paths.
  - Evidence: `3b7ee4aa`; covered by `test/resolveDbFilePath.test.ts`.
  - Files: `lib/db/resolveDbFilePath.ts`, `test/resolveDbFilePath.test.ts`.

- [x] 2026-05-19 — **Bugs:** Settle DMARC archive promises on `yauzl` errors.
  - Result: Added error-event handling so failed ZIP reads no longer leave
    ingestion promises pending.
  - Evidence: `ee5cddc7`.
  - Files: `services/dmarc/`.

- [x] 2026-05-19 — **Refactors:** Consolidate state types under `types/stores`.
  - Result: Removed the duplicate `store/` and `stores/` locations and
    centralized state contracts.
  - Evidence: `c04dc957`.
  - Files: `types/stores/`, `hooks/`.

- [x] 2026-05-19 — **Refactors:** Replace wildcard database barrels with
      explicit exports.
  - Result: Replaced `export *` usage in the database public API with named
    re-exports.
  - Evidence: `d4958269`.
  - Files: `lib/db/index.ts`, `lib/db/schema/index.ts`.

- [x] 2026-05-19 — **Refactors:** Validate environment variables and migrate
      direct environment access.
  - Result: Added fail-fast Zod validation and moved application call sites to
    the validated environment module.
  - Evidence: `6e420be4`, `fd244390`.
  - Files: `lib/env.ts`, `instrumentation.ts`.

- [x] 2026-05-19 — **Performance:** Eliminate the domain-summary N+1 query.
  - Result: Replaced per-domain lookups with SQL aggregation.
  - Evidence: `cc6954f9`; covered by `test/getDomainsSummaryAll.test.ts`.
  - Files: `services/reports/getDomainsSummaryAll.ts`,
    `test/getDomainsSummaryAll.test.ts`.

- [x] 2026-05-19 — **Performance:** Index normalized report end dates.
  - Result: Added an index for date-range filtering on normalized events.
  - Evidence: `966ca174`.
  - Files: `drizzle/`.

- [x] 2026-05-19 — **Performance:** Lazy-load Monaco on the ingest route.
  - Result: Removed roughly 3 MB of eager editor code from the route bundle.
  - Evidence: `55e45cea`.
  - Files: `components/ingest/`.

- [x] 2026-05-19 — **Documentation:** Add operations, proxy, SSO, and migration
      guidance.
  - Result: Documented troubleshooting, reverse-proxy deployment, experimental
    SSO, and migration policy.
  - Evidence: `650522a5`, `8dfe7f2a`, `94b548ad`.
  - Files: `docs/TROUBLESHOOTING.md`, `docs/DEPLOY-BEHIND-PROXY.md`,
    `docs/SSO.md`, `docs/MIGRATIONS.md`.

- [x] 2026-05-18 — **Security:** Default-deny `/api/v1/**`.
  - Result: Wrapped API routes with `withApiAuth` and added a structural smoke
    test for route coverage.
  - Evidence: `d11cb99d`, `dc0a0845`; covered by `test/apiAuthSmoke.test.ts` and
    `test/withApiAuth.test.ts`.
  - Files: `services/api/withApiAuth.ts`, `test/apiAuthSmoke.test.ts`.

- [x] 2026-05-18 — **Security:** Protect outbound webhook and MTA-STS requests
      from SSRF.
  - Result: Added private-address rejection and routed outbound requests through
    `safeFetch`.
  - Evidence: `9c4351fe`, `e6a15ac7`, `21ef01a3`; covered by
    `test/isPrivateIp.test.ts` and `test/safeFetch.test.ts`.
  - Files: `services/security/safeFetch.ts`, `services/notifications/`,
    `services/diagnostics/resolveMtaSts.ts`.

- [x] 2026-05-18 — **Security:** Encrypt IMAP credentials at rest.
  - Result: Added AES-256-GCM encryption derived from `SECRET_KEY` and
    migration-compatible reads.
  - Evidence: `38f3e71c`; covered by `test/encryptSecret.test.ts`.
  - Files: `services/crypto/`, `services/settings/`.

- [x] 2026-05-18 — **Security:** Enforce same-origin checks on
      session-authenticated mutations.
  - Result: Added CSRF validation while preserving API-key automation.
  - Evidence: `87d3aef4`, `dc0a0845`; covered by
    `test/requireSameOrigin.test.ts`.
  - Files: `services/security/requireSameOrigin.ts`,
    `services/api/withApiAuth.ts`.

- [x] 2026-05-18 — **Security:** Harden DMARC parsing against hostile archives
      and XML.
  - Result: Added XXE, ZIP-bomb, ZIP-slip, and archive-boundary protections.
  - Evidence: `9e15f07f`; later regression coverage in `c9227e17` and
    `125ab20d`.
  - Files: `services/dmarc/`, `test/dmarcParserHardening.test.ts`.

- [x] 2026-05-18 — **Security:** Tighten AI rate limits, password hashing, and
      local MCP handling.
  - Result: Limited AI endpoints to 10 requests per minute per IP, increased
    scrypt cost, and ignored token-bearing local MCP configuration.
  - Evidence: `3e6c1308`, `47ca0a35`; covered by
    `test/scryptBackcompat.test.ts`.
  - Files: `utils/rateLimit/`, `services/auth/`, `.gitignore`.

- [x] 2026-05-18 — **Infrastructure:** Harden CI and release provenance.
  - Result: Added least-privilege tokens, frozen installs, SHA-pinned actions,
    CodeQL, SBOMs, SLSA provenance, and keyless image signing.
  - Evidence: `d452230c`, `e0157a8f`, `dfe655f2`.
  - Files: `.github/workflows/`.

### 2026-04

- [x] 2026-04-22 — **Diagnostics:** Add the domain security score.
  - Result: Added letter grades and percentages with protocol-specific scoring
    functions coordinated by `computeDomainScore`.
  - Evidence: Type-check and focused ESLint passed; repository baseline
    `a9848a44`.
  - Files: `services/diagnostics/computeDomainScore.ts`,
    `services/diagnostics/score*.ts`.

- [x] 2026-04-22 — **Diagnostics:** Resolve the expanded protocol and DNS
      dataset with caching.
  - Result: Added BIMI, MTA-STS, TLS-RPT, A, and NS resolution plus a
    five-minute in-memory TTL cache.
  - Evidence: Type-check and focused ESLint passed; repository baseline
    `a9848a44`.
  - Files: `services/diagnostics/getDomainDnsRecords.ts`,
    `services/diagnostics/withDiagnosticsCache.ts`.

- [x] 2026-04-22 — **Diagnostics:** Feed all domain TXT records into SPF
      analysis.
  - Result: Restored duplicate and conflict detection by passing the resolved
    TXT set to `analyzeSpfRecord`.
  - Evidence: Type-check and focused ESLint passed; current integration coverage
    in `test/getDomainDnsRecords.test.ts`.
  - Files: `services/diagnostics/getDomainDnsRecords.ts`.

- [x] 2026-04-22 — **Diagnostics:** Add a deterministic administrator runbook.
  - Result: Added why-it-matters, remediation, and verification guidance derived
    from DNS, score, and report data.
  - Evidence: Type-check and focused ESLint passed; repository baseline
    `a9848a44`.
  - Files: `services/diagnostics/buildDiagnosticsAdminGuides.ts`,
    `components/ai/DiagnosticsAdminRunbook.tsx`.

- [x] 2026-04-22 — **Diagnostics:** Reclassify valid SPF `~all` guidance.
  - Result: Changed soft-fail guidance from a high-severity correction to a
    low-priority hardening suggestion.
  - Evidence: Type-check and focused ESLint passed; repository baseline
    `a9848a44`.
  - Files: `services/diagnostics/`.

- [x] 2026-04-22 — **Diagnostics:** Add contextual protocol help and examples.
  - Result: Added tooltips and protocol explainers with example DNS hosts and
    values.
  - Evidence: Type-check and focused ESLint passed; repository baseline
    `a9848a44`.
  - Files: `components/diagnostics/shared/InfoTooltip.tsx`,
    `components/diagnostics/shared/ProtocolExplainer.tsx`.

- [x] 2026-04-22 — **Diagnostics:** Remove duplicate legacy blocks from the
      active diagnostics view.
  - Result: Removed the old DNS panel, executive summary, assessment, and
    authentication breakdown from `DiagnosticsView`.
  - Evidence: Type-check and focused ESLint passed; repository baseline
    `a9848a44`.
  - Files: `components/diagnostics/DiagnosticsView.tsx`.

- [x] 2026-04-22 — **Diagnostics:** Restore English-only report copy.
  - Result: Reverted an accidental Spanish/English mix while retaining the
    functional guidance changes.
  - Evidence: Type-check and focused ESLint passed; repository baseline
    `a9848a44`.
  - Files: `components/diagnostics/`, `services/diagnostics/`.

- [x] 2026-04-22 — **Artificial Intelligence:** Expand diagnostics analysis
      context.
  - Result: Included score, deterministic guides, SPF checks, DMARC tags, DKIM
    details, A/NS, BIMI, MTA-STS, TLS-RPT, statistics, and aggregate report data
    while asking the model not to repeat the runbook.
  - Evidence: Type-check and focused ESLint passed; repository baseline
    `a9848a44`.
  - Files: `services/ai/prompts/`, `services/ai/use-cases/`, `components/ai/`.

- [x] 2026-04-22 — **Testing:** Add regression tests for report-detail rendering
      failures.
  - Result: Added server-render checks for the IP link and deterministic
    country-flag markup.
  - Evidence: Historical targeted Vitest and type-check passed; repository
    baseline `a9848a44`.
  - Files: `test/IpAddressLink.test.ts`, `test/IpFlag.test.ts`.

- [x] 2026-04-22 — **Bugs:** Fix the report-detail server/client boundary crash.
  - Result: Removed the server-side click handler passed into `next/link`.
  - Evidence: Historical `pnpm test -- test/IpAddressLink.test.ts` and
    `pnpm type-check` passed.
  - Files: `components/ips/IpAddressLink.tsx`, `test/IpAddressLink.test.ts`.

- [x] 2026-04-22 — **Bugs:** Fix the report sources hydration mismatch.
  - Result: Replaced the unstable Radix tooltip wrapper around the IP flag with
    deterministic markup.
  - Evidence: Historical targeted Vitest and type-check passed.
  - Files: `components/ips/IpFlag.tsx`, `test/IpFlag.test.ts`.
