/**
 * Reads VEXA_UPDATE_CHECK_ENABLED. Default is enabled (true).
 * Anything that explicitly looks like "off" disables the check.
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
