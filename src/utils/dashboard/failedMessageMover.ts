import type { ChangeItem, DomainPeriodTotals } from '@/types/dashboard'
import { domainHref } from './domainHref'
import { failedOf } from './failedOf'
import { formatCount } from './formatters/formatCount'
import { formatSignedPercent } from './formatters/formatSignedPercent'
import { lastReportSeconds } from './lastReportSeconds'
import { percentChange } from './percentChange'

/** "DMARC failures increased: +120%, 275 failed vs 125 previously". */
export function failedMessageMover(domain: DomainPeriodTotals): ChangeItem {
  const current = failedOf(domain.current)
  const previous = failedOf(domain.previous)
  const pct = percentChange(current, previous)
  const delta = current - previous
  return {
    id: `failed:${domain.domainName}`,
    value: pct === null ? `+${formatCount(delta)}` : formatSignedPercent(pct),
    title: delta > 0 ? 'DMARC failures increased' : 'DMARC failures decreased',
    subject: domain.domainName,
    detail: `${formatCount(current)} failed vs ${formatCount(previous)}`,
    direction: delta > 0 ? 'worse' : 'better',
    isNew: false,
    lastSeenAt: lastReportSeconds(domain),
    href: domainHref(domain.domainName),
    domainNames: [domain.domainName],
  }
}
