import type { DomainPeriodTotals } from '@/types/dashboard'
import { dayToUnixSeconds } from './dayToUnixSeconds'

/** Start of the domain's last report day, unix seconds; null without reports. */
export function lastReportSeconds(domain: DomainPeriodTotals): number | null {
  return domain.lastReportDay === null
    ? null
    : dayToUnixSeconds(domain.lastReportDay)
}
