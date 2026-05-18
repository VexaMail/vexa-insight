# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Outbound webhooks.** New `webhook_endpoints` table and CRUD API at
  `/api/v1/admin/webhooks` (`POST /api/v1/admin/webhooks/{id}` for a test
  ping). Payloads are signed with HMAC-SHA256 via the `X-Vexa-Signature`
  header when the endpoint has a `secret`. Supported events:
  `ingest.failed` (fired when an ingest run records errors),
  `unauthorized_source.detected` (fired when an ingested report contains
  events with both SPF and DKIM unaligned), `update.available` (fired
  when the daily check sees a newer upstream release), `test.ping`,
  plus `auth.fail_rate_spike` reserved for a future anomaly detector.
- **Prometheus metrics** at `GET /api/v1/metrics` — `vexa_dmarc_reports_total`,
  `vexa_dmarc_events_total`, `vexa_dmarc_events_by_spf_auth{result}`,
  `vexa_dmarc_events_by_disposition{disposition}`, `vexa_ingest_*`,
  `vexa_domains_total`, `vexa_ip_addresses_total`. Text exposition
  format, no extra runtime dependency.
- **OpenAPI 3.1 spec** at `GET /api/v1/openapi.json` plus a public
  interactive viewer at `/docs` (Scalar via CDN).
- **Demo seed script.** `pnpm run seed:demo` populates the database with
  realistic-looking DMARC data (7 days × 3 domains × ~15 source IPs)
  so the dashboard is not empty before a real mailbox is connected.
  Refuses to run with `NODE_ENV=production` unless
  `VEXA_FORCE_SEED_DEMO=1`. Only touches rows tagged with the `demo-`
  report-id prefix.
- **Structured logger** (`utils/log`). JSON output when `NODE_ENV=production`
  or `VEXA_LOG_FORMAT=json`; human-readable otherwise. Used by the
  self-update audit path.
- **Self-update audit log** at `data/self-update.audit.log` — JSON lines
  with `{ timestamp, actor, actorType, ip, ref, userAgent }` for every
  invocation of `POST /api/v1/admin/apply-update`.
- **Docker `HEALTHCHECK`** in the published image, pointing at
  `/api/v1/health`.
- **OSS hygiene:** `.github/dependabot.yml` (npm + docker + actions,
  grouped by library family) and `.github/FUNDING.yml` placeholder.
- **Update check system.** The dashboard now polls the GitHub Releases API
  once per day (server-side, cached in a new `update_state` SQLite table)
  and shows the latest stable release in the sidebar and on the Settings
  page. Notification only — never auto-applied. See [docs/UPDATING.md](docs/UPDATING.md).
- New admin API: `GET /api/v1/admin/update-check` (admin-authenticated)
  and `POST /api/v1/admin/update-check` (admin-authenticated force
  refresh). The cached state was previously returned by an
  unauthenticated GET; that behavior changed in this release — see
  Security below.
- Environment knobs: `VEXA_UPDATE_CHECK_ENABLED` (default on, set to
  `false`/`0`/`off` to disable for airgapped deploys) and
  `VEXA_UPDATE_REPO=owner/repo` (override the upstream repository, useful
  for forks).
- Release automation: tag-driven `.github/workflows/release.yml` that
  publishes a GitHub Release with auto-generated notes whenever a `v*` tag
  is pushed.
- **Multi-arch container image** published to GitHub Container Registry on
  every release tag (`linux/amd64`, `linux/arm64`):
  `ghcr.io/vexamail/vexa-insight-dashboard:{latest,vX.Y.Z,X.Y,X}`.
- **Hands-off auto-updates via Watchtower.** New `docker-compose.watchtower.yml`
  override layers a Watchtower container that polls the registry every 6
  hours and recreates the `web` service when a new image lands — preserving
  your SQLite volume and running migrations automatically. Opt-in via
  `docker compose -f docker-compose.yml -f docker-compose.watchtower.yml up -d`.
- The Settings → Updates card now offers three upgrade paths
  (Watchtower auto-update, manual Docker pull, source rebuild) with
  copy-to-clipboard commands for each.
- **WordPress-style in-app self-update for source installs.** When the
  dashboard runs under **systemd** (detected via `INVOCATION_ID`) or
  **PM2** (detected via `pm_id` / `PM2_HOME`), the Settings → Updates
  panel exposes an **"Apply update now"** button that:
  - backs up `data/vexa.db` to `data/vexa.db.pre-update.<timestamp>`,
  - snapshots `.next/` to `.next.pre-update` before any change,
  - runs `git pull` (or checks out a whitelisted `vX.Y.Z` tag),
  - runs `pnpm install --frozen-lockfile && pnpm run build`,
  - **rolls back** git HEAD and `.next/` if any step fails — the
    supervisor signal is only sent on full success,
  - sends `SIGTERM` to the Node process so the supervisor restarts the
    new build.
    Live log streamed to the UI from `data/self-update.log`. New
    endpoint: `GET/POST /api/v1/admin/apply-update`. New script:
    `scripts/self-update.sh`. New env opt-in: `VEXA_HAS_SUPERVISOR=true`
    for non-systemd/non-PM2 supervisors. New deploy examples:
    `deploy/vexa.service` (systemd unit) and `deploy/ecosystem.config.cjs`
    (PM2).

### Changed

- `GET /api/v1/admin/update-check` and `GET /api/v1/admin/apply-update`
  now require authentication (session cookie or admin API key).
  Previously they were public.
- Default for `SECRET_KEY` in `docker-compose.yml` is now literally
  `CHANGE_ME` instead of `change-me-min-32-chars`. The previous default
  was harmless (rejected by the install flow because of the length
  check) but misleading. With this change `isInstalled()` detects the
  placeholder via the canonical sentinel.

### Security

- **Timing-safe API key comparison.** `requireAdminAuth` now hashes
  both the presented token and the configured `SECRET_KEY` with
  SHA-256 and compares the digests via `crypto.timingSafeEqual`,
  eliminating the byte-by-byte timing leak in the previous strict
  `!==` comparison.
- **`SECRET_KEY` placeholder rejected.** Admin API auth returns
  `503 SECRET_KEY_NOT_CONFIGURED` when the configured value is
  `CHANGE_ME` or shorter than 32 characters, regardless of what the
  caller sends.
- **Admin GET endpoints gated.** New `requireAdminAccess` accepts
  either a valid admin session cookie or a valid admin API key, and
  protects the GET sides of `apply-update`, `update-check`, the new
  `metrics` endpoint, and the webhooks API. Prevents recon of current
  version, target version, and update log.
- **Login rate-limit.** `actions/login.ts` enforces 5 failed attempts
  per IP per 60s window (re-uses the existing `utils/rateLimit` store).
- **HTTP security headers.** `next.config.ts` now emits
  `Content-Security-Policy`, `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy` (camera/microphone/geolocation/payment denied),
  and disables `X-Powered-By`.
- **Audit log for self-update.** Every `POST /api/v1/admin/apply-update`
  now appends a JSON line to `data/self-update.audit.log` with the
  invoker, source IP, target ref, and User-Agent.
- **Webhook payload signing.** Outbound webhooks attach an HMAC-SHA256
  signature in the `X-Vexa-Signature` header when the endpoint has a
  configured `secret`.

## [0.1.0] - 2026-04-26

### Added

- Initial public open-source release of Vexa Mail Insight.
- IMAP ingestion of DMARC aggregate reports (RUA) with `.zip` and `.gz` support.
- Idempotent processing keyed on `report_id`.
- Three-layer data model: `RawReport`, `NormalizedEvent`, optional `AggregatedMetric`.
- Drizzle ORM with SQLite default; PostgreSQL/MySQL via `DATABASE_URL`.
- Dashboard with KPI cards, authentication trends, SPF/DKIM breakdown,
  disposition metrics, top sending IPs, and ingestion health.
- Domains and Reports drill-down views.
- Settings UI for project name, API key, IMAP accounts, and ingestion tuning.
- First-run web installer at `/install` with superadmin creation.
- CLI recovery script (`scripts/recovery.ts`) for password reset and admin creation.
- In-process scheduler (node-cron) plus external trigger via `POST /api/v1/admin/trigger-poll`.
- Docker and `docker-compose` support.

### Security

- Apache 2.0 license with explicit patent grant.
- `/api/v1/admin/*` protected by `SECRET_KEY` (HTTP header `X-API-Key` or `Authorization: Bearer`).
- `/install` permanently locked after the first user exists.

[Unreleased]: https://github.com/VexaMail/vexa-insight-dashboard/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/VexaMail/vexa-insight-dashboard/releases/tag/v0.1.0
