import {
  COMPLIANCE_DROP_POINTS,
  COMPLIANT_PASS_RATE,
  CRITICAL_PASS_RATE,
} from '@/constants/dashboard'
import type { ActionItem, DomainPeriodTotals } from '@/types/dashboard'
import { complianceActionDetail } from './complianceActionDetail'
import { domainHref } from './domainHref'
import { judgedPassRate } from './judgedPassRate'
import { lastReportSeconds } from './lastReportSeconds'

/**
 * Queues a domain whose pass rate fell by `COMPLIANCE_DROP_POINTS` or more
 * (a regression), or that sits below the compliant band with enough volume to
 * judge. Only a regression or a domain without a judged baseline counts as new.
 */
export function domainComplianceAction(
  domain: DomainPeriodTotals,
  hasPrevious: boolean,
): ActionItem | null {
  const rate = judgedPassRate(domain.current)
  if (rate === null) return null
  const previousRate = judgedPassRate(domain.previous)
  const dropped =
    previousRate !== null && previousRate - rate >= COMPLIANCE_DROP_POINTS
  if (!dropped && rate >= COMPLIANT_PASS_RATE) return null
  return {
    id: `compliance:${domain.domainName}`,
    severity: rate < CRITICAL_PASS_RATE ? 'critical' : 'warning',
    subject: domain.domainName,
    issue: dropped ? 'DMARC compliance dropped' : 'Low DMARC compliance',
    detail: complianceActionDetail(
      rate,
      dropped ? previousRate : null,
      domain.current.total,
    ),
    impactMessages: domain.current.total - domain.current.passed,
    lastSeenAt: lastReportSeconds(domain),
    isNew: dropped || (hasPrevious && previousRate === null),
    href: domainHref(domain.domainName),
  }
}
