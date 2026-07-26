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

- [ ] Decide who should hold the new `ai:invoke` permission. It was added 2026-07-25 granted to exactly the roles holding `reports:read` (admin, operator, viewer, user), so behavior is unchanged; the point of the permission is that AI spend can now be revoked per role in `constants/auth/rolePermissions.ts`. Whether `viewer` and `user` should be able to spend provider quota is a policy call. (User decision.)
- [ ] Decide whether the shared API key should be excluded from `users:write` (it now maps to the `admin` role via `services/api/getApiKeyRole.ts`, expanding it onto user management and audit-log reads). Note 2026-07-26: `getAllowedDomainIds` now also treats a valid shared key as unrestricted, because otherwise every domain-scoped query returned nothing to API callers — so the key's blast radius is one more reason to settle this. (User decision.)
- [ ] Consider per-user API keys with real role mapping to replace the single shared `SECRET_KEY` (see ADR 0001, which states finer-grained keys need their own ADR). Needs product decisions before implementation: key scoping model, rotation and revocation UX, whether the existing shared `SECRET_KEY` keeps working during migration, and where hashed keys live in the schema. (User decision, then a sizeable change.)

## Artificial Intelligence

- [!] Verify the diagnostics AI rollout plan against a live provider call (implemented 2026-07-24 with prompt+parser tests only; no end-to-end AI call was run). Blocked: needs a real provider API key and spends paid model quota, which this run has no authorization for. Smallest unblock: the user names the provider/key and authorizes one metered call.

## Infrastructure

- [!] Re-upgrade `typescript` to a plain spec once typescript-eslint supports TS >= 7.1 (their issue #10940). Until then the repo uses the dual-alias interop: `typescript` -> `@typescript/typescript6` (JS API for eslint/Next/prettier plugins) and `typescript-7` -> native `tsc` used by `type-check`. The `typescript-eslint` overrides in `pnpm-workspace.yaml` exist because `eslint-config-next` pins 8.59.x. Re-checked 2026-07-26: unchanged — 8.65.0 is still `latest` and both it and the 8.65.1-alpha.7 canary declare `typescript >=4.8.4 <6.1.0`. See ADR 0005.

## Performance

- [ ] Revisit rollup-style pre-aggregation for `getTopIpSenders` once the dataset justifies it. Measured 2026-07-26 against the local dev DB (6,901 `normalized_events`, 2,178 `raw_reports`, 899 IPs, 51 domains): the query returns in ~20ms, most of it `sqlite3` CLI overhead, so a rollup table would be speculative complexity today. The 2026-07-26 domain-scoping change also improved the restricted-user path from `SCAN normalized_events` to `SEARCH ... USING INDEX event_domain_end_count_idx`. Reconsider when `normalized_events` reaches the "millions of rows" the `event_rollup_daily` doc comment describes; the rollup would need `domain_id` in its key to stay compatible with the allow-list filter, plus a migration, ingest-transaction maintenance, a backfill path, and an ADR 0008-style consistency test.
- [!] Decide how a pre-aggregated `getVolumeByOrg` should count reports. A rollup is not a drop-in here: the query is `count(distinct raw_reports.id)`, and a distinct count cannot be pre-aggregated over a dimension that is filtered later — a per-`(org, domain, day)` rollup double-counts any report whose events span more than one allowed domain, so summing buckets does not reproduce the live number. Blocked on a product call between three options: accept an approximate count, add a `report_domains` bridge table and keep the distinct count live over a much smaller relation, or leave the query live (measured at ~35ms on the dev DB, so this is the current default). Smallest unblock: pick one of the three.

## Pending Decisions

- [ ] Decide whether experimental OIDC SSO is production-ready. `docs/SSO.md` documents liberal JIT provisioning, no SCIM or group sync, and no session revocation. (User decision.)
- [ ] Confirm whether the domain score must match PowerDMARC exactly or remain only inspired by it. The current SPF/DKIM/DMARC/BIMI/MTA-STS/TLS-RPT weights were never checked for output parity. (User decision; note 2026-07-24: the DKIM key-length estimator fix changed reported bit values.)

## Future Ideas

Product/design work, deliberately not started autonomously: each one changes what
the diagnostics page _is_, so it wants a brief on the intended reading order and
information hierarchy before any code.

- [ ] Redesign the diagnostics page as one editorial narrative instead of stacked cards.
- [ ] Add expand/collapse controls to each protocol section.
- [ ] Generate copy-ready DNS examples from the inspected domain's real values instead of generic placeholders.
