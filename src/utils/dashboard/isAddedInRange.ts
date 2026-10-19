import type { DayRange, DomainPeriodTotals } from '@/types/dashboard'
import { DAY_SECONDS } from '@/utils/dates'

/** Whether the domain was first seen inside the given days. */
export function isAddedInRange(
  domain: DomainPeriodTotals,
  range: DayRange,
): boolean {
  const day = Math.floor(domain.createdAtMs / 1000 / DAY_SECONDS)
  return day >= range.fromDay && day <= range.toDay
}
