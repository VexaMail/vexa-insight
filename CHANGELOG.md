# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Outbound webhooks.** New `webhook_endpoints` table and CRUD API at
  `/api/v1/admin/webhooks` (`POST /api/v1/admin/webhooks/{id}` for a test ping).
  Payloads are signed with HMAC-SHA256 via the `X-Vexa-Signature` header when
  the endpoint has a `secret`. Supported events: `ingest.failed` (fired when an
  ingest run records errors), `unauthorized_source.detected` (fired when an
  ingested report contains events with both SPF and DKIM unaligned),
  `update.available` (fired when the daily check sees a newer upstream release),
  `test.ping`, plus `auth.fail_rate_spike` reserved for a future anomaly
  detector.
- **Prometheus metrics** at `GET /api/v1/metrics` — `vexa_dmarc_reports_total`,
  `vexa_dmarc_events_total`, `vexa_dmarc_events_by_spf_auth{result}`,
  `vexa_dmarc_events_by_disposition{disposition}`, `vexa_ingest_*`,
  `vexa_domains_total`, `vexa_ip_addresses_total`. Text exposition format, no
  extra runtime dependency.
- **OpenAPI 3.1 spec** at `GET /api/v1/openapi.json` plus a public interactive
  viewer at `/docs` (Scalar via CDN).
- **Demo seed script.** `pnpm run seed:demo` populates the database with
  realistic-looking DMARC data (7 days × 3 domains × ~15 source IPs) so the
  dashboard is not empty before a real mailbox is connected. Refuses to run with
  `NODE_ENV=production` unless `VEXA_FORCE_SEED_DEMO=1`. Only touches rows
  tagged with the `demo-` report-id prefix.
- **Structured logger** (`utils/log`). JSON output when `NODE_ENV=production` or
  `VEXA_LOG_FORMAT=json`; human-readable otherwise. Used by the self-update
  audit path.
- **Self-update audit log** at `data/self-update.audit.log` — JSON lines with
  `{ timestamp, actor, actorType, ip, ref, userAgent }` for every invocation of
  `POST /api/v1/admin/apply-update`.
- **Docker `HEALTHCHECK`** in the published image, pointing at `/api/v1/health`.
- **OSS hygiene:** `.github/dependabot.yml` (npm + docker + actions, grouped by
  library family) and `.github/FUNDING.yml` placeholder.
- **Update check system.** The dashboard now polls the GitHub Releases API once
  per day (server-side, cached in a new `update_state` SQLite table) and shows
  the latest stable release in the sidebar and on the Settings page.
  Notification only — never auto-applied. See
  [docs/UPDATING.md](docs/UPDATING.md).
- New admin API: `GET /api/v1/admin/update-check` (admin-authenticated) and
  `POST /api/v1/admin/update-check` (admin-authenticated force refresh). The
  cached state was previously returned by an unauthenticated GET; that behavior
  changed in this release — see Security below.
- Environment knobs: `VEXA_UPDATE_CHECK_ENABLED` (default on, set to
  `false`/`0`/`off` to disable for airgapped deploys) and
  `VEXA_UPDATE_REPO=owner/repo` (override the upstream repository, useful for
  forks).
- Release automation: tag-driven `.github/workflows/release.yml` that publishes
  a GitHub Release with auto-generated notes whenever a `v*` tag is pushed.
- **Multi-arch container image** published to GitHub Container Registry on every
  release tag (`linux/amd64`, `linux/arm64`):
  `ghcr.io/vexamail/vexa-insight-dashboard:{latest,vX.Y.Z,X.Y,X}`.
- **Hands-off auto-updates via Watchtower.** New `docker-compose.watchtower.yml`
  override layers a Watchtower container that polls the registry every 6 hours
  and recreates the `web` service when a new image lands — preserving your
  SQLite volume and running migrations automatically. Opt-in via
  `docker compose -f docker-compose.yml -f docker-compose.watchtower.yml up -d`.
- The Settings → Updates card now offers three upgrade paths (Watchtower
  auto-update, manual Docker pull, source rebuild) with copy-to-clipboard
  commands for each.
- **WordPress-style in-app self-update for source installs.** When the dashboard
  runs under **systemd** (detected via `INVOCATION_ID`) or **PM2** (detected via
  `pm_id` / `PM2_HOME`), the Settings → Updates panel exposes an **"Apply update
  now"** button that:
  - backs up `data/vexa.db` to `data/vexa.db.pre-update.<timestamp>`,
  - snapshots `.next/` to `.next.pre-update` before any change,
  - runs `git pull` (or checks out a whitelisted `vX.Y.Z` tag),
  - runs `pnpm install --frozen-lockfile && pnpm run build`,
  - **rolls back** git HEAD and `.next/` if any step fails — the supervisor
    signal is only sent on full success,
  - sends `SIGTERM` to the Node process so the supervisor restarts the new
    build. Live log streamed to the UI from `data/self-update.log`. New
    endpoint: `GET/POST /api/v1/admin/apply-update`. New script:
    `scripts/self-update.sh`. New env opt-in: `VEXA_HAS_SUPERVISOR=true` for
    non-systemd/non-PM2 supervisors. New deploy examples: `deploy/vexa.service`
    (systemd unit) and `deploy/ecosystem.config.cjs` (PM2).

### Changed

- **Ingestion always uses a bounded window.** `ingestion_days_back` no longer
  accepts `0` ("no limit"): every scheduled run now searches from `today - days`
  instead of walking the whole mailbox each time. Migration
  `0030_ingestion_days_back_floor` moves existing `0` settings to the 30-day
  default, `rowToConfig` floors whatever the row holds so a restored or
  hand-edited database cannot reintroduce the unbounded scan, and
  `INGESTION_DAYS_BACK` is validated the same way when it seeds a fresh install.
  The unbounded pass is still available on demand: **Full rescan** on the ingest
  page (confirmation dialog explaining the cost), backed by
  `POST /api/v1/admin/trigger-poll` with `{"fullRescan": true}`. Messages
  already ingested stay deduplicated by Message-ID.
- `GET /api/v1/admin/update-check` and `GET /api/v1/admin/apply-update` now
  require authentication (session cookie or admin API key). Previously they were
  public.
- Default for `SECRET_KEY` in `docker-compose.yml` is now literally `CHANGE_ME`
  instead of `change-me-min-32-chars`. The previous default was harmless
  (rejected by the install flow because of the length check) but misleading.
  With this change `isInstalled()` detects the placeholder via the canonical
  sentinel.
- README quickstart now binds the published image to `127.0.0.1:3000` by default
  and documents the new install-token flow, the `VEXA_ALLOW_REMOTE_INSTALL` env
  var, and `VEXA_ALLOWED_ORIGINS`.

### Changed

- **The import graph is acyclic.** All 77 cycles ran through a slice `index.ts`:
  either a module importing its own barrel to reach a sibling, or two slices
  each reaching the other through one. Sibling imports now name the sibling and
  cycle-closing imports name the concrete module, so dependency-cruiser's
  `no-circular` runs without the `viaNot` narrowing that used to exempt them.
  `components/ui/KpiCard` no longer imports from the `diagnostics` feature
  slice: the metric style maps moved to `constants/metrics/`, and the status
  union they key on is a single `MetricStatus` in `types/metrics/` rather than
  three copies.

### Removed

- **60 unreachable modules**, together with nine dependencies nothing imported
  (`@radix-ui/react-collapsible`, `-label`, `-progress`, `-separator`,
  `-switch`, `-toggle`, `-toggle-group`, `mailparser` and `ts-morph`). Each
  deleted module was reachable only from a slice `index.ts` whose own re-export
  no consumer went through. Four were duplicate definitions of a type that also
  lives elsewhere; one of those, `components/domains/DomainRow.ts`, declared a
  `DomainRow` that collided by name with an unrelated `DomainRow` in
  `types/reports/`. No public API changed: nothing outside the barrels
  referenced any of them.

### Fixed

- **The systemd unit no longer reports every restart as a crash.** Next.js runs
  its graceful shutdown on `SIGTERM` and then exits `143` deliberately, so Node
  reports a signal termination rather than a normal exit. `deploy/vexa.service`
  did not declare that as success, so every `systemctl stop`, every restart and
  every dashboard-triggered update left the unit in
  `Failed with result 'exit-code'` — misleading in `systemctl status` and a
  false alarm for anything monitoring unit state. Added `SuccessExitStatus=143`.
- **"Move to trash after process" now moves the message to the trash.** The
  handler called ImapFlow's `messageDelete()`, which issues `EXPUNGE`, so the
  message was destroyed rather than moved and the trash folder stayed empty. It
  now issues `messageMove()` to the mailbox flagged `\Trash`, resolved from the
  server's mailbox list. A server with no such mailbox leaves the message in
  place and logs the failure instead of falling back to the destructive path.
  **Operators who enabled this setting were losing the processed mail; after
  this release it accumulates in the trash instead, so the trash may need
  emptying.**
- **`job_runs` now records a real duration.** The completion update rewrote
  `run_at` with the finish time alongside `completed_at`, so every row read back
  as a zero-length run and the ingest history showed the wrong start time. The
  update no longer touches `run_at`.
- **A repository with no releases is no longer reported as a failed update
  check.** GitHub answers 404 for `releases/latest` until the first release is
  tagged; that 404 was persisted as `last_error` and surfaced in the UI, and
  logged as `[update-check] failed` on every scheduled run. It is now a normal
  outcome that records the check and clears any stale error.
- **Published Docker image now boots.** The Dockerfile CMD referenced
  `scripts/run-migrations.cjs` which never existed. Migrations are already
  executed by `instrumentation.ts:register()` before traffic is accepted, so the
  CMD now simply runs `node server.js`.
- **Docker build succeeds on pnpm 11.** Surfaced two pre-existing failures once
  the missing CMD script was removed:
  `ERR_PNPM_ABORTED_REMOVE_MODULES_DIR_NO_TTY` (fixed by `ENV CI=true` in the
  Dockerfile) and `ERR_PNPM_IGNORED_BUILDS` for native deps (fixed by writing
  the proper `allowBuilds: { … : true }` block in `pnpm-workspace.yaml` — the
  previous file contained a placeholder with literal
  `"set this to true or false"` values that left install scripts ignored for
  `better-sqlite3`, `esbuild`, `sharp`, and `unrs-resolver`).
- Removed the dead `config.ts` at the repo root. The live `matcher` has always
  lived in `proxy.ts`.

### Tooling

- `pnpm smoke` (`scripts/smoke.sh`) builds the Docker image and asserts the
  launch-blocker invariants end-to-end: `/api/v1/health` serves,
  `/api/v1/reports` and `/api/v1/ai/report-insights` reject unauthenticated
  callers, and `/api/install` rejects no-token, non-loopback, or
  already-installed POSTs.
- `pnpm test:coverage` runs the suite with v8 coverage; text/lcov/html reports
  under `coverage/`. No thresholds enforced — informational only.

### Security

- **IMAP protocol traces no longer reach the logs by default.** ImapFlow's
  debug/info output (subjects, envelopes, addresses, Message-IDs of every
  scanned message) was written to stdout on every run and ended up in
  journald/container logs. Only warnings and errors are logged now; set
  `VEXA_IMAP_DEBUG=true` to restore the full trace while diagnosing.
- **Default-deny auth on `/api/v1/**`.** Every route handler is now wrapped by
  `withApiAuth`(delegates to`requireAdminAccess`— session
  OR`x-api-key`/`Authorization: Bearer`). Explicit public allowlist:
  `/api/v1/health`, `/api/v1/openapi.json`. A structural test
  (`test/apiAuthSmoke.test.ts`) fails the build if any new route is added
  without auth.
- **AI endpoints rate-limited.** `POST /api/v1/ai/report-insights` and
  `/api/v1/ai/diagnostics-insights` enforce 10/min/IP on top of auth so an
  authenticated-but-runaway client cannot drain the operator's LLM provider
  credits.
- **Install endpoint hardened.** One-time install token printed to server logs
  on first boot, required as `x-install-token` header or `installToken` body
  field. Loopback-only by default; set `VEXA_ALLOW_REMOTE_INSTALL=1` to allow
  remote install. Closes the bootstrap-race window where any reachable network
  caller could register the first admin user before the operator opened the UI.
- **IMAP credentials encrypted at rest.** AES-256-GCM with a key derived from
  `SECRET_KEY` via HKDF (SHA-256, salt `vexa-imap-pwd-v1`). Random IV per
  ciphertext, GCM auth tag, `v1:` blob prefix. Legacy plaintext rows are
  migrated automatically on first boot after upgrade.
- **SSRF-safe outbound dispatch.** New `services/security/safeFetch` resolves
  DNS and blocks loopback / link-local / private (RFC 1918) / CGNAT
  (100.64.0.0/10) / metadata (169.254.169.254) / multicast IPv4 + the IPv6
  equivalents. Wired into `deliverWebhook` and `resolveMtaSts`. Webhook URL
  schema also tightened to `http(s)` only.
- **CSRF same-origin guard.** Mutating routes wrapped by `withApiAuth` reject
  cross-origin or missing-origin requests (Sec-Fetch-Site / Origin check) before
  the auth gate runs. API-key (`x-api-key` / `Authorization: Bearer`) callers
  are exempt — CSRF only matters for cookie-bearing sessions.
- **Server actions** honor `VEXA_ALLOWED_ORIGINS` via
  `experimental.serverActions.allowedOrigins` for deployments behind a reverse
  proxy with a different public hostname.
- **DMARC parser hardened against XXE / zip-bomb / zip-slip.** `gunzipSync` now
  caps decompressed output at `MAX_UNCOMPRESSED_SIZE` (100 MB); `XMLParser` runs
  with `processEntities: false` and `parseDmarcXml` rejects any input containing
  `<!DOCTYPE` or `<!ENTITY` before parsing; `processZipEntry` rejects entries
  with parent traversal, absolute paths, control characters, or normalized names
  that differ from the raw name.
- **Scrypt cost upgraded** to `N=131072, r=8, p=1` (maxmem 256 MB). New hashes
  use a self-describing `scrypt$N$r$p$salt$hex` format; legacy `salt:hash`
  records continue to verify with their historical `N=16384` so existing logins
  do not break.
- **`.mcp.json` now gitignored** to prevent accidental commit of MCP server
  tokens. Ships `.mcp.example.json` as a neutral placeholder.
- **Timing-safe API key comparison.** `requireAdminAuth` now hashes both the
  presented token and the configured `SECRET_KEY` with SHA-256 and compares the
  digests via `crypto.timingSafeEqual`, eliminating the byte-by-byte timing leak
  in the previous strict `!==` comparison.
- **`SECRET_KEY` placeholder rejected.** Admin API auth returns
  `503 SECRET_KEY_NOT_CONFIGURED` when the configured value is `CHANGE_ME` or
  shorter than 32 characters, regardless of what the caller sends.
- **Admin GET endpoints gated.** New `requireAdminAccess` accepts either a valid
  admin session cookie or a valid admin API key, and protects the GET sides of
  `apply-update`, `update-check`, the new `metrics` endpoint, and the webhooks
  API. Prevents recon of current version, target version, and update log.
- **Login rate-limit.** `actions/login.ts` enforces 5 failed attempts per IP per
  60s window (re-uses the existing `utils/rateLimit` store).
- **HTTP security headers.** `next.config.ts` now emits
  `Content-Security-Policy`, `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`
  (camera/microphone/geolocation/payment denied), and disables `X-Powered-By`.
- **Audit log for self-update.** Every `POST /api/v1/admin/apply-update` now
  appends a JSON line to `data/self-update.audit.log` with the invoker, source
  IP, target ref, and User-Agent.
- **Webhook payload signing.** Outbound webhooks attach an HMAC-SHA256 signature
  in the `X-Vexa-Signature` header when the endpoint has a configured `secret`.

## [0.1.0] - 2026-04-26

### Added

- Initial public open-source release of Vexa Mail Insight.
- IMAP ingestion of DMARC aggregate reports (RUA) with `.zip` and `.gz` support.
- Idempotent processing keyed on `report_id`.
- Three-layer data model: `RawReport`, `NormalizedEvent`, optional
  `AggregatedMetric`.
- Drizzle ORM with SQLite default; PostgreSQL/MySQL via `DATABASE_URL`.
- Dashboard with KPI cards, authentication trends, SPF/DKIM breakdown,
  disposition metrics, top sending IPs, and ingestion health.
- Domains and Reports drill-down views.
- Settings UI for project name, API key, IMAP accounts, and ingestion tuning.
- First-run web installer at `/install` with superadmin creation.
- CLI recovery script (`scripts/recovery.ts`) for password reset and admin
  creation.
- In-process scheduler (node-cron) plus external trigger via
  `POST /api/v1/admin/trigger-poll`.
- Docker and `docker-compose` support.

### Security

- Apache 2.0 license with explicit patent grant.
- `/api/v1/admin/*` protected by `SECRET_KEY` (HTTP header `X-API-Key` or
  `Authorization: Bearer`).
- `/install` permanently locked after the first user exists.

[Unreleased]:
  https://github.com/VexaMail/vexa-insight-dashboard/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/VexaMail/vexa-insight-dashboard/releases/tag/v0.1.0
