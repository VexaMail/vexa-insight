import { TRIAGE_MIN_VOLUME } from '@/constants/dashboard'
import { REPORT_STALE_DAYS } from '@/constants/gaps'
import type {
  ActionItem,
  DomainPeriodTotals,
  TriageWindow,
} from '@/types/dashboard'
import { domainHref } from './domainHref'
import { lastReportSeconds } from './lastReportSeconds'
import { silentLookbackDays } from './silentLookbackDays'

/**
 * Queues a domain whose aggregate reports stopped: the same rule as the daily
 * coverage check, more than `REPORT_STALE_DAYS` days since the last report.
 */
export function silentDomainAction(
  domain: DomainPeriodTotals,
  window: TriageWindow,
  todayDay: number,
): ActionItem | null {
  if (domain.lastReportDay === null) return null
  const silentDays = todayDay - domain.lastReportDay
  if (silentDays <= REPORT_STALE_DAYS) return null
  if (silentDays > silentLookbackDays(window)) return null
  const reported = domain.previous.total + domain.current.total
  // A domain that sends a handful of messages a week has natural gaps.
  if (reported < TRIAGE_MIN_VOLUME) return null
  return {
    id: `silent:${domain.domainName}`,
    severity: 'warning',
    subject: domain.domainName,
    issue: 'Reports stopped',
    detail: `No aggregate report for ${String(silentDays)} days`,
    impactMessages: reported,
    lastSeenAt: lastReportSeconds(domain),
    isNew: silentDays <= window.lengthDays,
    href: domainHref(domain.domainName),
  }
}
