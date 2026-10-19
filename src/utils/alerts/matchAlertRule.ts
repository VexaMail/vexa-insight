import type {
  AlertMatch,
  AlertRule,
  DomainComplianceTotals,
} from '@/types/alerts'
import { complianceRate } from './complianceRate'

/**
 * The domains a rule fires for, given each domain's totals in the last window
 * and the one before it. A domain under `minMessages` in a window it needs is
 * skipped: a handful of forwarded messages is not a trend.
 */
export function matchAlertRule(
  rule: AlertRule,
  current: ReadonlyMap<string, DomainComplianceTotals>,
  previous: ReadonlyMap<string, DomainComplianceTotals>,
): AlertMatch[] {
  const matches: AlertMatch[] = []
  for (const [domain, now] of current) {
    if (rule.domainName !== null && rule.domainName !== domain) continue
    if (now.total < rule.minMessages) continue
    const currentRate = complianceRate(now)
    if (rule.kind === 'compliance_below') {
      if (currentRate < rule.threshold) {
        matches.push({
          domain,
          currentRate,
          previousRate: null,
          messages: now.total,
        })
      }
      continue
    }
    const before = previous.get(domain)
    if (!before || before.total < rule.minMessages) continue
    const previousRate = complianceRate(before)
    if (previousRate - currentRate >= rule.threshold) {
      matches.push({ domain, currentRate, previousRate, messages: now.total })
    }
  }
  return matches
}
