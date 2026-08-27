/**
 * Convert an ISO-8601 date string to epoch seconds.
 * Returns null when the input is null or unparseable.
 */
export function isoDateToEpochSeconds(iso: string | null): number | null {
  if (!iso) return null
  const ms = Date.parse(iso)
  if (Number.isNaN(ms)) return null
  return Math.floor(ms / 1000)
}
