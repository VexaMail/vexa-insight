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
- [ ] Decide whether the shared API key should be excluded from `users:write` (it now maps to the `admin` role via `services/api/getApiKeyRole.ts`, expanding it onto user management and audit-log reads). (User decision.)
- [ ] Consider per-user API keys with real role mapping to replace the single shared `SECRET_KEY` (see ADR 0001, which states finer-grained keys need their own ADR). Needs product decisions before implementation: key scoping model, rotation and revocation UX, whether the existing shared `SECRET_KEY` keeps working during migration, and where hashed keys live in the schema. (User decision, then a sizeable change.)

## Artificial Intelligence

- [!] Verify the diagnostics AI rollout plan against a live provider call (implemented 2026-07-24 with prompt+parser tests only; no end-to-end AI call was run). Blocked: needs a real provider API key and spends paid model quota, which this run has no authorization for. Smallest unblock: the user names the provider/key and authorizes one metered call.

## Testing

- [ ] Give the IMAP account checkbox groups real grouping semantics. `ImapAccountsSection` renders "Fetch Options" and "Post-Processing" as plain spans above loose checkboxes; a `fieldset`/`legend` per group is the correct markup and would let AT announce which group a checkbox belongs to. Not done 2026-07-26 with the rest of the a11y pass because axe does not flag it and the change is a visual risk that cannot be verified from jsdom — it needs a look at the real settings page.

## Infrastructure

- [!] Re-upgrade `typescript` to a plain spec once typescript-eslint supports TS >= 7.1 (their issue #10940). Until then the repo uses the dual-alias interop: `typescript` -> `@typescript/typescript6` (JS API for eslint/Next/prettier plugins) and `typescript-7` -> native `tsc` used by `type-check`. The `typescript-eslint` overrides in `pnpm-workspace.yaml` exist because `eslint-config-next` pins 8.59.x. Re-checked 2026-07-25: 8.65.0 is still latest and both it and the 8.65.1 canary declare `typescript >=4.8.4 <6.1.0`. See ADR 0005.

## Performance

- [ ] Consider rollup-style pre-aggregation for `getTopIpSenders` and `getVolumeByOrg`; they benefit from the new `ip_address_id` index but still GROUP BY over `normalized_events`. Not attempted 2026-07-25: unlike the `getReportSources` rewrite this is not a query-shape change but new derived state — a new rollup table plus a migration, incremental maintenance inside the ingest transaction, a backfill path, and an ADR 0008-style consistency test. Worth its own session, and it should follow the same "rollup is derived state" invariant ADR 0008 established.

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
