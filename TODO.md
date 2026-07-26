# TODO

> Consolidated from the accessible Claude, Codex, and Antigravity project
> history. Last reviewed: 2026-07-26. History coverage: Partial.
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

- [ ] Consider per-user API keys with real role mapping to replace the single shared `SECRET_KEY` (see ADR 0001, which states finer-grained keys need their own ADR). Less urgent since 2026-07-26, when the shared key stopped mapping to `admin` and got the fixed `API_KEY_PERMISSIONS` set instead, but the remaining gaps are unchanged: one secret for every client, no per-client attribution, no revocation without rotating for everyone. Needs product decisions before implementation: key scoping model, rotation and revocation UX, whether the existing shared `SECRET_KEY` keeps working during migration, and where hashed keys live in the schema. (User decision, then a sizeable change.)

## Artificial Intelligence

- [!] Verify the diagnostics AI rollout plan against a live provider call (implemented 2026-07-24 with prompt+parser tests only; no end-to-end AI call was run). Blocked: needs a real provider API key and spends paid model quota, which this run has no authorization for. Smallest unblock: the user names the provider/key and authorizes one metered call.

## Infrastructure

- [!] Re-upgrade `typescript` to a plain spec once typescript-eslint supports TS >= 7.1 (their issue #10940). Until then the repo uses the dual-alias interop: `typescript` -> `@typescript/typescript6` (JS API for eslint/Next/prettier plugins) and `typescript-7` -> native `tsc` used by `type-check`. The `typescript-eslint` overrides in `pnpm-workspace.yaml` exist because `eslint-config-next` pins 8.59.x. Re-checked 2026-07-26: unchanged — 8.65.0 is still `latest` and both it and the 8.65.1-alpha.7 canary declare `typescript >=4.8.4 <6.1.0`. See ADR 0005.

## Performance

- [ ] Revisit rollup-style pre-aggregation for `getTopIpSenders` once the dataset justifies it. Measured 2026-07-26 against the local dev DB (6,901 `normalized_events`, 2,178 `raw_reports`, 899 IPs, 51 domains): the query returns in ~20ms, most of it `sqlite3` CLI overhead, so a rollup table would be speculative complexity today. The 2026-07-26 domain-scoping change also improved the restricted-user path from `SCAN normalized_events` to `SEARCH ... USING INDEX event_domain_end_count_idx`. Reconsider when `normalized_events` reaches the "millions of rows" the `event_rollup_daily` doc comment describes; the rollup would need `domain_id` in its key to stay compatible with the allow-list filter, plus a migration, ingest-transaction maintenance, a backfill path, and an ADR 0008-style consistency test.

## Pending Decisions

- [!] Match the domain score to PowerDMARC's output exactly. Decided 2026-07-26: parity is the goal, so any divergence in the SPF/DKIM/DMARC/BIMI/MTA-STS/TLS-RPT weights is a bug, not a design choice. Blocked on reference data this run cannot obtain: PowerDMARC's scores are behind their account, and scraping or signing up for a third-party service is not something to do unattended. Smallest unblock: the user supplies a handful of domains with PowerDMARC's reported score for each (a spread of good/partial/broken configurations is worth more than many similar ones); then `computeDomainScore` can be diffed against them and the weights tuned, with the reference set pinned as a test. Note 2026-07-24: the DKIM key-length estimator fix changed reported bit values, so any reference capture must post-date it.

## Future Ideas

Product/design work, deliberately not started autonomously: each one changes what
the diagnostics page _is_, so it wants a brief on the intended reading order and
information hierarchy before any code.

- [ ] Redesign the diagnostics page as one editorial narrative instead of stacked cards.
- [ ] Add expand/collapse controls to each protocol section.
- [ ] Generate copy-ready DNS examples from the inspected domain's real values instead of generic placeholders.
