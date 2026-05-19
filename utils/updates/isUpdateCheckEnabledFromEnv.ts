/**
 * Reads VEXA_UPDATE_CHECK_ENABLED. Default is enabled (true).
 * Anything that explicitly looks like "off" disables the check.
 *
 * Reads `process.env` directly (not `env` from `@/lib/env`) because tests
 * mutate this variable at runtime; `env` is frozen after boot-time Zod parse
 * so it cannot pick up post-load mutations.
 */
export function isUpdateCheckEnabledFromEnv(): boolean {
  const raw = process.env.VEXA_UPDATE_CHECK_ENABLED
  if (raw === undefined) return true
  const normalized = raw.trim().toLowerCase()
  if (
    normalized === 'false' ||
    normalized === '0' ||
    normalized === 'no' ||
    normalized === 'off'
  ) {
    return false
  }
  return true
}
