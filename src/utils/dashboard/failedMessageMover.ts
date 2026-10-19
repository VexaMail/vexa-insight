import type { ChangeItem, DomainPeriodTotals } from '@/types/dashboard'
import { domainHref } from './domainHref'
import { failedOf } from './failedOf'
import { formatCount } from './formatters/formatCount'
import { formatSignedPercent } from './formatters/formatSignedPercent'
import { percentChange } from './percentChange'

/** "Failed messages for example.com: +120%, 275 failed vs 125 previously". */
export function failedMessageMover(domain: DomainPeriodTotals): ChangeItem {
  const current = failedOf(domain.current)
  const previous = failedOf(domain.previous)
  const pct = percentChange(current, previous)
  const delta = current - previous
  return {
    id: `failed:${domain.domainName}`,
    value: pct === null ? `+${formatCount(delta)}` : formatSignedPercent(pct),
    title: `Failed messages for ${domain.domainName}`,
    detail: `${formatCount(current)} failed vs ${formatCount(previous)} previously`,
    direction: delta > 0 ? 'worse' : 'better',
    href: domainHref(domain.domainName),
    domainNames: [domain.domainName],
  }
}
