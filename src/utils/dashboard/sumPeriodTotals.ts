import type { PeriodTotals } from '@/types/dashboard'

/** Adds up period totals, e.g. every domain's current period. */
export function sumPeriodTotals(list: PeriodTotals[]): PeriodTotals {
  let total = 0
  let passed = 0
  for (const item of list) {
    total += item.total
    passed += item.passed
  }
  return { total, passed }
}
