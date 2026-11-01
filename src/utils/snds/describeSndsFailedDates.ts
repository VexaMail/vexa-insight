/**
 * The warning recorded when some days could not be fetched, or null when every
 * day went through. Those days stay missing and are retried on the next sync.
 */
export function describeSndsFailedDates(
  failedDates: readonly string[],
): string | null {
  if (failedDates.length === 0) return null
  return `SNDS failed for ${String(failedDates.length)} day(s), retried on the next sync: ${failedDates.join(', ')}`
}
