# TODO

> Known work that is not yet done, with enough context to pick each item up
> cold. Last reviewed: 2026-09-11. Bug reports and feature requests belong in
> GitHub Issues; this file tracks work the maintainers have already scoped.
>
> States: `[ ]` pending · `[~]` partial or unverified · `[!]` blocked · `[x]`
> verified complete · `[-]` obsolete or superseded. Closed work moves to
> `TODO_LOG.md`.

## Open-source launch

Public since 2026-09-09 (`v0.2.1`, image on GHCR pullable anonymously). The
audit, the fixes, the launch steps and the 2026-09-10 purge of the pre-rewrite
history are logged in `TODO_LOG.md`, along with the 2026-09-10 readiness audit
that closed seven pull requests. Nothing launch-related is pending; the
follow-ups it produced live as GitHub issues #25 to #29. Reopened 2026-09-11: an
X-launch readiness pass found the blockers below. The launch plan itself is
private, at `career/launches/vexa-insight/plan.md` in the portfolio repo.

- [ ] README overclaims against its own egress table. `README.md:23` promises
      "install in 30 seconds, no third party touches your data"; the table at
      `README.md:89` lists MaxMind GeoIP lookups, outbound webhooks and hostname
      resolution. The 30-second figure is unmeasured. Found 2026-09-11 while
      auditing launch claims. Smallest next step: drop both claims and describe
      the real network behaviour in the lede.

- [ ] No trial path without a real mailbox. `README.md:28` sends Docker users
      straight to connecting an IMAP account, while sample data needs a source
      checkout (`scripts/seed-demo.ts`). Anyone evaluating this in five minutes
      has no DMARC mailbox ready. Found 2026-09-11. Smallest next step: a tested
      synthetic-data path for the advertised Docker install — a verified
      synthetic report upload is enough.

- [ ] Bug template invites reporters to leak their own DMARC data.
      `.github/ISSUE_TEMPLATE/bug_report.md` asks for screenshots with no
      redaction guidance, so reporters will paste real domains and sender IPs
      into a public tracker. Found 2026-09-11. Smallest next step: require
      synthetic reproductions and explicitly prohibit raw reports, credentials,
      monitored domains and sender addresses.

- [ ] Cut a release carrying the security fixes before promoting the project. 18
      commits sit between `v0.2.2` (published 2026-09-10, the tag the README
      quick start resolves to) and HEAD, including the OIDC-subject binding
      (#18), the key-rotation secret carry (#21) and migration-integrity
      verification (#22). A visitor running the advertised image today gets none
      of them. Found 2026-09-11. Smallest next step: tag a release, then record
      its image and chart digests and source SHA wherever the launch links to
      them.

- [ ] Make the domain score discriminate. Every domain with SPF + DKIM + DMARC
      `p=none` scores exactly 55 (20 + 20 + 15; BIMI, MTA-STS and TLS-RPT are
      rarely present), which is 11 of the 12 domains sampled on 2026-09-09; the
      twelfth had `p=quarantine` and scored 65. The scorer in
      `src/services/diagnostics/score*.ts` has six coarse buckets and ignores
      DMARC `rua`, `pct`, alignment, DKIM key strength and SPF lookup count, all
      of which the page already computes. Blocked in spirit by the PowerDMARC
      parity decision under Pending Decisions: either supply the reference
      scores or drop parity and design our own rubric. Either way pin the rubric
      in `test/computeDomainScore.test.ts`.

## Security

- [ ] The encryption root key ships inside the database it protects. ADR 0002
      claims "a leaked database file no longer exposes mailbox credentials
      unless `SECRET_KEY` leaks with it", but the AES key is derived from
      `settings.secretKey`, read from the `app_settings.secret_key` column
      (`src/services/settings-store/getImapAccountsRow.ts:21`). The environment
      variable only seeds that row once, while it still holds `CHANGE_ME`
      (`src/services/settings-store/seedSettingsFromEnv.ts:14`). Key and
      ciphertext therefore live in the same `vexa.db`, so anyone who copies the
      file recovers the IMAP passwords and the ADR's stated protection does not
      hold. Found 2026-09-11 while auditing launch claims. Smallest next step:
      decide whether the key moves out of the database (env-only, refusing to
      boot without it) or the ADR's Consequences section is rewritten to the
      real threat model. Do not advertise at-rest protection stronger than what
      ships.

- [ ] Documented recovery step destroys every stored IMAP credential.
      `docs/TROUBLESHOOTING.md:146` tells operators to run
      `DELETE FROM app_settings; DELETE FROM users;` to regenerate a lost
      install token, with no backup step and no warning. That row holds
      `secret_key`, so the delete irreversibly destroys the key for every
      encrypted password still in `imap_accounts`. Found 2026-09-11. Smallest
      next step: replace it with the supported recovery path and verify restore
      against a disposable database.

- [!] Purge the pre-rewrite history from the laptop's clone. `main` was
  rewritten and force-pushed on 2026-09-10 to strip client screenshots and
  assistant trailers, and the remote repository was recreated, but the clone on
  the laptop was offline through the whole operation, so it may still hold the
  old objects. This Mac and the Mac mini were both cleaned. Blocked on reaching
  the machine: it answers ping but refuses SSH on port 22, so Remote Login is
  off. Smallest unblock: enable Remote Login there, or run this in a local
  terminal on it:
  `git fetch --prune --prune-tags --force && git reset --hard origin/main &&     git reflog expire --expire=now --all && git gc --prune=now`.

- [!] Consider per-user API keys with real role mapping to replace the single
  shared `SECRET_KEY` (see ADR 0001, which states finer-grained keys need their
  own ADR). Less urgent since 2026-07-26, when the shared key stopped mapping to
  `admin` and got the fixed `API_KEY_PERMISSIONS` set instead, but the remaining
  gaps are unchanged: one secret for every client, no per-client attribution, no
  revocation without rotating for everyone. Needs product decisions before
  implementation: key scoping model, rotation and revocation UX, whether the
  existing shared `SECRET_KEY` keeps working during migration, and where hashed
  keys live in the schema. Blocked on those four answers, not on effort: an
  implementation that guesses them is worse than none. Smallest unblock: the
  owner picks a scoping model and a revocation story, ideally as an ADR
  alongside 0001, and the schema plus migration follow from it.

## Artificial Intelligence

- [ ] Decide whether the diagnostics prompt should stop the model emitting
      markdown fences. The rewritten prompt still says "No markdown fences", and
      the parser strips them (`parseError` was null on all 10 eval runs), but 2
      of 6 runs on the new wording wrapped the JSON in a ```json fence where 0
      of 2 baseline runs did. Two baseline samples cannot establish that as a
      regression, and nothing breaks today. Smallest next step: 4 more baseline
      runs to see whether the rates actually differ before touching the wording;
      each run spends model quota, so it wants the owner's go-ahead like the
      blocked item below. `test/parseDiagnosticsInsightsFromContent.test.ts` (5
      cases, on `main` since 2026-09-10) pins today's behaviour either way: the
      parser accepts fenced and unfenced JSON, so the wording can change without
      breaking the pipeline.
- [!] Verify the diagnostics AI rollout plan against a live provider call
  (implemented 2026-07-24 with prompt+parser tests only; no end-to-end AI call
  was run). Blocked: needs a real provider API key and spends paid model quota,
  which this run has no authorization for. Smallest unblock: the user names the
  provider/key and authorizes one metered call.

## Agent Access

- [ ] Build a machine-first access surface so agents can query the instance
      without driving the UI (owner request, 2026-08-18). Concrete first
      consumer: the hosting-estate sessions, where an agent answered "is the
      estate clean enough to raise p=none -> quarantine?" by SSH-ing into the
      mail server and parsing 979 RUA reports with ad-hoc scripts — everything
      it needed (per-domain pass/fail, failing sources, alignment detail for
      own-server mail) already exists behind the dashboard, but only as rendered
      pages. Wants a product decision on shape before code: (a) a documented
      read-only REST surface over the existing queries (domains, top senders,
      per-domain alignment breakdown, ingestion health) returning JSON; (b) a
      CLI wrapper on top of that; (c) an MCP server exposing the same queries as
      tools, which is the shape agents consume natively. These are layers, not
      alternatives — (a) is the foundation either way. Auth is the real
      coupling: today the only key is the shared `SECRET_KEY` with fixed
      `API_KEY_PERMISSIONS`, so a read-only agent key ties directly into the
      blocked per-user API-key item above (ADR 0001) — an agent surface is
      exactly the client that wants a scoped, revocable key rather than the
      master secret. Smallest next step: pick the endpoint list from the queries
      the 2026-08-18 hosting-estate session actually ran (they are the demand,
      written down in that repo's `scripts/dmarc-report-summary.sh` and
      `TODO_LOG.md`), and decide whether the agent key rides the existing
      shared-key model or waits for ADR 0001's successor.

## Infrastructure

- [!] Re-upgrade `typescript` to a plain spec once typescript-eslint supports
  TS >= 7.1 (their issue #10940). Until then the repo uses the dual-alias
  interop: `typescript` -> `@typescript/typescript6` (JS API for
  eslint/Next/prettier plugins) and `typescript-7` -> native `tsc` used by
  `type-check`. The `typescript-eslint` overrides in `pnpm-workspace.yaml` exist
  because `eslint-config-next` pins 8.59.x. Re-checked 2026-07-26: unchanged —
  8.65.0 is still `latest` and both it and the 8.65.1-alpha.7 canary declare
  `typescript >=4.8.4 <6.1.0`. See ADR 0005.

## Performance

- [ ] Revisit rollup-style pre-aggregation for `getTopIpSenders` once the
      dataset justifies it. Measured 2026-07-26 against the local dev DB (6,901
      `normalized_events`, 2,178 `raw_reports`, 899 IPs, 51 domains): the query
      returns in ~20ms, most of it `sqlite3` CLI overhead, so a rollup table
      would be speculative complexity today. The 2026-07-26 domain-scoping
      change also improved the restricted-user path from
      `SCAN normalized_events` to
      `SEARCH ... USING INDEX event_domain_end_count_idx`. Reconsider when
      `normalized_events` reaches the "millions of rows" the
      `event_rollup_daily` doc comment describes; the rollup would need
      `domain_id` in its key to stay compatible with the allow-list filter, plus
      a migration, ingest-transaction maintenance, a backfill path, and an ADR
      0008-style consistency test.

## Pending Decisions

- [!] Decide whether ingested DMARC mail should be deleted outright or keep the
  current "move to Trash" behaviour. Verified 2026-09-08 against the production
  mailbox: there is no bug. The account has `move_to_trash_after_process` on,
  `handleMoveToTrash` issues `messageMove` to the `\Trash` mailbox (the
  2026-08-26 decision to honour the label rather than expunge), zero
  post-process failures in 30 days of journal, and the Trash held 540 messages
  dated from the moment that fix was deployed. The INBOX leftovers are all
  non-DMARC alerts. Actual deletion happens outside the app: a daily cron on the
  mail server expunges Trash older than 30 days, so the effective retention is
  30 days. Owner's call, two options: shorten that retention on the server (one
  number in the cron), or add an explicit `delete` post-process option in the
  app alongside "move to trash". Do not change either without the answer. Side
  note from the same check: `fetch_include_all_folders` is on, so every hourly
  run also scans the ~8,400-message log folder; the Performance entry above
  already records that as accepted cost.

- [!] Match the domain score to PowerDMARC's output exactly. Decided 2026-07-26:
  parity is the goal, so any divergence in the
  SPF/DKIM/DMARC/BIMI/MTA-STS/TLS-RPT weights is a bug, not a design choice.
  Blocked on reference data this run cannot obtain: PowerDMARC's scores are
  behind their account, and scraping or signing up for a third-party service is
  not something to do unattended. Smallest unblock: the user supplies a handful
  of domains with PowerDMARC's reported score for each (a spread of
  good/partial/broken configurations is worth more than many similar ones); then
  `computeDomainScore` can be diffed against them and the weights tuned, with
  the reference set pinned as a test. Note 2026-07-24: the DKIM key-length
  estimator fix changed reported bit values, so any reference capture must
  post-date it.

## Future Ideas

Product/design work, deliberately not started autonomously: each one changes
what the diagnostics page _is_, so it wants a brief on the intended reading
order and information hierarchy before any code.

- [ ] Redesign the diagnostics page as one editorial narrative instead of
      stacked cards.
- [ ] Add expand/collapse controls to each protocol section.
- [ ] Generate copy-ready DNS examples from the inspected domain's real values
      instead of generic placeholders.

## Baseline gate debt

Frozen when the repo adopted the shared `@busirocket/*` toolchain. Every gate
passes today; each entry below is a pre-existing finding held in place by a
named exemption rather than a wildcard, so new violations of the same rule still
fail.

Most of this is gone as of 2026-08-27. The knip exemptions went first: the 23
dead files, the 124 unused exports and the nine unused dependencies were deleted
rather than ignored, so `knip.config.ts` carries no `ignore` list, no
`ignoreDependencies` and no rule override. The dependency-cruiser exemptions
followed: all 77 barrel-mediated cycles are gone, so `no-circular` runs
unnarrowed and the two stale orphan exemptions are deleted. The
`eslint-suppressions.json` ledger opened on 2026-09-08 at 384 findings and was
emptied on 2026-09-09 (see `TODO_LOG.md`); the file stays, empty, so
`lint:prune` keeps a target and any new suppression shows up in review. What
remains below is what those passes did not reach.

- [ ] Re-check `extract-zip`: the advisory names `>=2.0.2` and no such release
      exists. Closed here by overriding `@puppeteer/browsers` to `^3.2.1`, which
      dropped the dependency for `modern-tar`. Drop the override if `@lhci/cli`
      ever ships a version that no longer needs it. Re-checked 2026-09-10:
      unchanged — `@lhci/cli` latest is still 0.15.1, pinning
      `lighthouse@12.6.1`; the override stays.
