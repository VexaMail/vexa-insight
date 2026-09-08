/** ISO calendar day (YYYY-MM-DD) of a Unix timestamp in seconds. */
export function toIsoDayFromUnixSeconds(seconds: number | null): string | null {
  if (seconds === null) return null
  return new Date(seconds * 1000).toISOString().slice(0, 10)
}
