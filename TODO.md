# TODO

> Consolidated from the accessible Claude, Codex, and Antigravity project
> history. Last reviewed: 2026-07-24. History coverage: Partial.
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

- [ ] Decide whether the shared API key should be excluded from `users:write` (it now maps to the `admin` role via `services/api/getApiKeyRole.ts`, expanding it onto user management and audit-log reads).
- [ ] Consider an `ai:invoke` permission for per-role AI cost control; AI insights currently require only `reports:read` (rate-limited 10/min/IP).
- [ ] Move the `update-db-stream` admin key out of the URL query string (proxies can log it); EventSource cannot set headers, so this needs a short-lived token or cookie.
- [ ] Consider per-user API keys with real role mapping to replace the single shared `SECRET_KEY` (see ADR 0001).

## Diagnostics

- [ ] SPF tree follow-up (low priority): consider macro-domain (`%{...}`) handling and conditional `redirect=` semantics (redirect is only honored without `all`, but the lookup is still consumed).

## Artificial Intelligence

- [ ] Verify the diagnostics AI rollout plan against a live provider call (implemented 2026-07-24 with prompt+parser tests only; no end-to-end AI call was run).
- [ ] Consider requiring a configured model in `isAiConfigured`/`AiConfigurationStatus` so the panels show the setup prompt instead of a 422 error when only provider and key are saved.

## Testing

- [ ] Extend a11y coverage beyond the first three suites (diagnostics components need a public export or lint-sanctioned import path for `ProtocolExplainer`).

## Infrastructure

- [!] Re-upgrade `@radix-ui/react-slot` past 1.2.x once a release ships the module-scope `SlotContext` behind a `"use client"` directive (or an RSC-safe build). 1.3.x calls `React.createContext` at module scope with no directive, which crashes `next build` page-data collection (`e.createContext is not a function`) for every server page importing UI components that use Slot. Smallest unblock: test the next 1.4.x stable release with `pnpm run build` (checked 2026-07-24: latest stable is still 1.3.1; 1.4.0 only has RCs).
- [!] Re-upgrade `typescript` to a plain spec once typescript-eslint supports TS >= 7.1 (their issue #10940). Until then the repo uses the dual-alias interop: `typescript` -> `@typescript/typescript6` (JS API for eslint/Next/prettier plugins) and `typescript-7` -> native `tsc` used by `type-check`. The `typescript-eslint` overrides in `pnpm-workspace.yaml` exist because `eslint-config-next` pins 8.59.x. Checked 2026-07-24: typescript-eslint@8.65.0 still declares `typescript >=4.8.4 <6.1.0`. See ADR 0005.

## Performance

- [ ] Remove the unused `services/imap/getImapTotalCount.ts` (dead code; no callers). If wired into the job it would add a redundant full-mailbox IMAP SEARCH on top of the one `processFolder` already runs. Flagged during the ADR 0008 batched-ingest work.
- [ ] Document the one-time `pnpm run backfill:rollup` step in the upgrade/deploy notes. On existing installs the dashboard aggregates read `event_rollup_daily`, which lags `normalized_events` until the backfill runs (ADR 0008).
- [ ] `getReportSources` still builds an `IN (...)` of every event id for a report and does an O(sources x events) JS join; `getReportStats` and `getReportEventSummaries` scan per report. These now use the new `raw_report_id` index but could move to a GROUP BY. (Explore flag, 2026-07-24.)
- [ ] Consider rollup-style pre-aggregation for `getTopIpSenders` and `getVolumeByOrg`; they benefit from the new `ip_address_id` index but still GROUP BY over `normalized_events`.

## Refactors

- [ ] `app/api/v1/job-runs/[id]/poll-status/route.ts` returns the non-standard `{ error: 'Invalid Job ID' }` for a bad path segment instead of `{ error: { code, message } }`. Path params were out of scope for the boundary-validation pass.
- [ ] Decide whether `reportId` / `domainId` request bodies should be `.int()`; they currently accept fractional numbers, preserved from the pre-Zod code.
- [ ] `utils/api/index.ts` still uses `export *`, against the repo barrel policy (`utils/validation/index.ts` was converted 2026-07-24).

## Pending Decisions

- [ ] Decide whether experimental OIDC SSO is production-ready. `docs/SSO.md` documents liberal JIT provisioning, no SCIM or group sync, and no session revocation. (User decision.)
- [ ] Confirm whether the domain score must match PowerDMARC exactly or remain only inspired by it. The current SPF/DKIM/DMARC/BIMI/MTA-STS/TLS-RPT weights were never checked for output parity. (User decision; note 2026-07-24: the DKIM key-length estimator fix changed reported bit values.)

## Future Ideas

- [ ] Redesign the diagnostics page as one editorial narrative instead of stacked cards.
- [ ] Add expand/collapse controls to each protocol section.
- [ ] Generate copy-ready DNS examples from the inspected domain's real values instead of generic placeholders.
