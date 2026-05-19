import { env } from '@/lib/env'
import type { SupervisorKind } from '@/types/updates'
import { isRunningInDocker } from './isRunningInDocker'

/**
 * Best-effort detection of the process supervisor that owns this Node
 * process. Used to gate the in-app self-update button: applying an
 * update requires that the parent supervisor restarts the process after
 * we exit, otherwise the dashboard simply dies.
 *
 * - systemd sets `INVOCATION_ID`.
 * - PM2 sets `pm_id` (lowercase) and `PM2_HOME`.
 * - Docker is detected via `/.dockerenv` (handled by Watchtower instead).
 * - The explicit env `VEXA_HAS_SUPERVISOR=true` forces "systemd" semantics
 *   for users running under nssm, runit, supervisord, OpenRC, etc.
 */
export function detectSupervisor(): SupervisorKind {
  if (isRunningInDocker()) return 'docker'
  if (env.INVOCATION_ID) return 'systemd'
  if (env.pm_id !== undefined || env.PM2_HOME !== undefined) {
    return 'pm2'
  }
  const explicit = env.VEXA_HAS_SUPERVISOR
  if (explicit && explicit.toLowerCase() === 'true') return 'systemd'
  return 'none'
}
