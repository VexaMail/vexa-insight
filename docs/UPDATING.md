# Updating Vexa Mail Insight

Vexa Mail Insight is self-hosted. New versions are published as
[GitHub Releases](https://github.com/VexaMail/vexa-insight-dashboard/releases)
following [Semantic Versioning](https://semver.org/).

The dashboard checks GitHub for new releases once per day and surfaces the
result in two places:

- A subtle "Update available" link in the sidebar footer.
- An "Updates" card at the top of the Settings page with the upgrade command and
  a link to the release notes.

The check is **notification-only**. The application never restarts itself, never
pulls code, never modifies your filesystem. You stay in control.

## How the check works

| Property    | Value                                                                              |
| ----------- | ---------------------------------------------------------------------------------- |
| Endpoint    | `GET https://api.github.com/repos/VexaMail/vexa-insight-dashboard/releases/latest` |
| HTTP method | `GET` (no payload, no telemetry, no installation ID)                               |
| Headers     | `Accept`, `X-GitHub-Api-Version`, `User-Agent: vexa-insight/<version>`             |
| Cadence     | One server-side run ~60s after boot, then every 24 hours via cron                  |
| Cache       | Single-row `update_state` table in your SQLite/Postgres/MySQL                      |
| Channel     | Stable releases only (`/releases/latest` excludes drafts and pre-releases)         |

GitHub's unauthenticated rate limit is 60 requests per hour per IP. We cache the
result, so a single instance hits GitHub roughly **1 time per day**, well under
the limit even when sharing an outbound IP with other self-hosters.

## Disabling the check

Two layers of opt-out are supported:

1. **Environment variable (preferred for airgapped deploys).** Set any of
   `false`, `0`, `no`, `off` to fully disable both the cron and the manual
   "Check now" button:

   ```bash
   VEXA_UPDATE_CHECK_ENABLED=false
   ```

2. **Forking and pointing the dashboard at your own repo.** Set
   `VEXA_UPDATE_REPO` to your fork (or any GitHub repo where you cut your own
   releases). Accepts `owner/repo`, full HTTPS URLs, and `.git` URLs:

   ```bash
   VEXA_UPDATE_REPO="acme-corp/vexa-fork"
   # or
   VEXA_UPDATE_REPO="https://github.com/acme-corp/vexa-fork.git"
   ```

## Auto-updates with Watchtower (recommended)

The project ships a public, multi-architecture image to GitHub Container
Registry on every release tag (`amd64` + `arm64`):

```
ghcr.io/vexamail/vexa-insight-dashboard:latest
ghcr.io/vexamail/vexa-insight-dashboard:vX.Y.Z
ghcr.io/vexamail/vexa-insight-dashboard:X.Y
ghcr.io/vexamail/vexa-insight-dashboard:X
```

Layer the bundled Watchtower override on top of `docker-compose.yml` to get
hands-off auto-updates:

```bash
docker compose -f docker-compose.yml -f docker-compose.watchtower.yml up -d
```

What this does:

- Watchtower polls the image registry every 6 hours
  (`WATCHTOWER_POLL_INTERVAL=21600`, configurable).
- Only containers tagged `com.centurylinklabs.watchtower.enable=true` are
  touched — that's just the `web` service.
- When a new image is published, Watchtower pulls it, recreates the container,
  and prunes the old image.
- Your SQLite database lives in the `vexa-data` volume and is preserved across
  restarts. Migrations run automatically on boot.
- Old containers are gracefully stopped (`WATCHTOWER_INCLUDE_RESTARTING=true`).

**That's it.** New releases land on your server within hours of being tagged on
GitHub, without any manual command. Track a more conservative tag (e.g. pin to
`:0` for major-stable, `:0.1` for minor-stable) by overriding `VEXA_IMAGE` in
your `.env`:

```bash
VEXA_IMAGE=ghcr.io/vexamail/vexa-insight-dashboard:0.1
```

Stop auto-updates:
`docker compose -f docker-compose.yml -f docker-compose.watchtower.yml stop watchtower`.

## Manual Docker upgrade

If you don't want a watcher process, pull the new image manually whenever the
dashboard surfaces an "Update available" badge:

```bash
docker compose pull
docker compose up -d
```

The container's entrypoint runs migrations before the server starts.
Volume-mount `./data` (default) or point `DATABASE_URL` at your PostgreSQL/MySQL
instance so the database survives the restart.

## Upgrading from source

For non-Docker installs (running directly with `pnpm start`):

```bash
git fetch --tags
git checkout main           # or pin to a tag: git checkout v0.2.0
pnpm install
pnpm run build
pnpm run start
```

Migrations run automatically on boot (`instrumentation.ts`). Back up your
database (`./data/vexa.db` by default) before any major version bump.

## One-time post-upgrade steps

Migrations are automatic, but a few releases add derived tables that must be
computed once from your existing data. Migrations deliberately do not do this
work at boot (see [ADR 0004](adr/0004-reversible-migrations-policy.md) and
[ADR 0008](adr/0008-batched-ingest-and-daily-rollups.md)): recomputing millions
of rows during startup would stall a large install.

### `event_rollup_daily` backfill (from the release that introduced it)

The dashboard aggregates (`getAggregateStats`, `getDomainSummary`,
`getDomainsSummaryAll`) read the per-domain, per-day `event_rollup_daily` table
instead of scanning `normalized_events`. On an existing install that table
starts empty, so **dashboard totals stay behind your real data until you run the
backfill once**:

```bash
pnpm run backfill:rollup
```

Properties:

- **Idempotent** — a full recompute, safe to re-run at any time, and the way to
  repair suspected drift.
- **Run while ingestion is idle.** SQLite is single-writer (ADR 0003); a
  concurrent ingest and a full rebuild will contend for the write lock.
- **Only needed once per install.** After the backfill, ingestion maintains the
  rollup incrementally inside its own transaction.

Docker installs run it against the container's database:

```bash
docker compose exec web pnpm run backfill:rollup
```

Newly created installs need nothing: the rollup is maintained from the first
ingested report.

## Apply updates from the dashboard (WordPress-style)

If the app is supervised by **systemd** or **PM2**, the Settings → Updates panel
detects this and shows an **"Apply update now"** button.

What happens when you click it:

1. The dashboard's admin endpoint (`POST /api/v1/admin/apply-update`, admin auth
   required) spawns [`scripts/self-update.sh`](../scripts/self-update.sh) as a
   detached background process.
2. The script:
   - refuses if the working tree is dirty,
   - copies `data/vexa.db` to `data/vexa.db.pre-update.<timestamp>`,
   - runs `git fetch --tags --prune` + `git pull --ff-only` (or checks out a
     specific `vX.Y.Z` tag if requested),
   - runs `pnpm install --frozen-lockfile`,
   - runs `pnpm run build`,
   - sends `SIGTERM` to the Node process.
3. Your supervisor restarts the Node process against the new build. Migrations
   run on boot; the dashboard is reachable again ~30 seconds after the click.

Progress is streamed live to `data/self-update.log` and tailed in the UI so you
can watch the upgrade from the browser.

### Required setup: a process supervisor

The script terminates the Node process when the build is ready. You **must** run
the dashboard under a supervisor that restarts it automatically — otherwise the
dashboard simply dies. Examples are provided:

- **systemd** — see [`deploy/vexa.service`](../deploy/vexa.service).
  `Restart=always` does the work. Detected automatically via `INVOCATION_ID`.
- **PM2** — see [`deploy/ecosystem.config.cjs`](../deploy/ecosystem.config.cjs).
  `autorestart: true` does the work. Detected automatically via `pm_id` /
  `PM2_HOME`.
- **Other supervisors** (runit, supervisord, OpenRC, nssm, …) — set
  `VEXA_HAS_SUPERVISOR=true` in the environment to enable the button.

If no supervisor is detected, the panel hides the button and explains why
instead. You can still upgrade manually with the source-upgrade command shown in
the "Update available" card.

### Safety properties

- **Refuses to clobber local edits**: if `git diff` shows dirty files, the
  script aborts before touching anything.
- **Whitelisted refs only**: the API rejects any `ref` that is not a proper
  `vMAJOR.MINOR.PATCH` tag — no branches, hashes, or arbitrary strings. The
  script enforces the same regex as a defense-in-depth.
- **Database backed up first**: SQLite users get an automatic snapshot named
  `data/vexa.db.pre-update.<timestamp>` on every run. PostgreSQL/MySQL backups
  remain the operator's responsibility.
- **Build is atomic-ish with auto-rollback on failure**: the previous `.next/`
  build is snapshotted to `.next.pre-update` before the new build runs. If
  `git pull`, `pnpm install`, or `pnpm run build` fail, the script restores the
  previous `git HEAD` and the previous `.next/` snapshot, and exits non-zero
  **without** signalling the supervisor — the running process stays on the
  working build.
- **Runs as the same user as the Node process**: no privilege escalation
  required, and no need to give the app `sudo`.
- **Admin auth required**: `POST /api/v1/admin/apply-update` enforces the same
  `SECRET_KEY` check as every other admin endpoint.
- **Audit log**: every invocation appends a JSON line to
  `data/self-update.audit.log` with
  `{ timestamp, actor, actorType, ip, ref, userAgent }`. Ship this to your SIEM.

### Rolling back (after a "successful" update that misbehaves)

When the build succeeded but the new version misbehaves at runtime:

```bash
cd /opt/vexa-insight-dashboard          # your install dir
git checkout v0.1.0                     # the previous tag
cp data/vexa.db.pre-update.<timestamp> data/vexa.db
pnpm install
pnpm run build
sudo systemctl restart vexa             # or: pm2 restart vexa-insight
```

### Recovering from a half-applied update

If the self-update script crashed midway (host OOM, kill -9, disk full) and the
rollback path didn't run:

1. Stop the supervisor: `sudo systemctl stop vexa` (or `pm2 stop vexa-insight`).
2. Inspect the log: `tail -200 data/self-update.log` — the last line tells you
   what stage failed.
3. Reset git to the last known good tag:
   ```bash
   git fetch --tags
   git reset --hard v0.1.0      # use the tag from the audit log entry
   ```
4. If `data/vexa.db.pre-update.<timestamp>` is more recent than current
   `data/vexa.db`, restore it (rare — only if a migration ran and misbehaved):
   ```bash
   cp data/vexa.db.pre-update.<timestamp> data/vexa.db
   ```
5. Reinstall and rebuild:
   ```bash
   pnpm install --frozen-lockfile
   pnpm run build
   ```
6. Start the supervisor again: `sudo systemctl start vexa`.

If you cannot recover, open an issue with the contents of `data/self-update.log`
and the relevant entry from `data/self-update.audit.log`.

## Release cadence

- **Patch (`x.y.Z`)** — bug fixes, security patches. Safe to apply immediately.
- **Minor (`x.Y.0`)** — new features, additive schema changes. Read the release
  notes; migrations always run forward without manual steps.
- **Major (`X.0.0`)** — breaking changes. The release notes call out every
  required action.

## Verifying a release

Tags are signed when possible. Verify with:

```bash
git tag --verify v0.2.0
```

The release artifacts on GitHub include the build's commit SHA in the release
notes; cross-check with `git log` if you build from source.

## Reporting upgrade problems

Open an issue at <https://github.com/VexaMail/vexa-insight-dashboard/issues>
with the output of `pnpm run check` and the contents of your `update_state` row
(Settings → Updates → "Check now" surfaces the last error).
