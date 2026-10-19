import type { DayRange, DomainDailyTotals } from '@/types/dashboard'

/** Distinct domains with reported messages inside one bucket. */
export function bucketReportingDomains(
  rows: readonly DomainDailyTotals[],
  bucket: DayRange,
): number {
  const ids = new Set<number>()
  for (const row of rows) {
    if (row.day < bucket.fromDay || row.day > bucket.toDay) continue
    if (row.total > 0) ids.add(row.domainId)
  }
  return ids.size
}
