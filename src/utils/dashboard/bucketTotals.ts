import type {
  DayRange,
  DomainDailyTotals,
  PeriodTotals,
} from '@/types/dashboard'

/** Messages and passes inside one bucket, optionally for some domains only. */
export function bucketTotals(
  rows: readonly DomainDailyTotals[],
  bucket: DayRange,
  domainIds: ReadonlySet<number> | null = null,
): PeriodTotals {
  let total = 0
  let passed = 0
  for (const row of rows) {
    if (row.day < bucket.fromDay || row.day > bucket.toDay) continue
    if (domainIds && !domainIds.has(row.domainId)) continue
    total += row.total
    passed += row.passed
  }
  return { total, passed }
}
