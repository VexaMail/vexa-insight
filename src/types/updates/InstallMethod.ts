/**
 * How the dashboard was installed on this host. Drives which auto-update
 * paths are exposed in the UI:
 *
 * - `docker`           — running inside a container (use Watchtower).
 * - `source-supervised` — git checkout + systemd/PM2 (in-app update OK).
 * - `source-bare`       — git checkout but no detected supervisor; user
 *                         must run the upgrade command manually.
 * - `unknown`           — no `.git` directory; pre-built install (rare).
 */
export type InstallMethod =
  'docker' | 'source-supervised' | 'source-bare' | 'unknown'
