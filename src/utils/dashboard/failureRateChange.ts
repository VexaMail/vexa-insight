import type { ChangeItem, DomainPeriodTotals } from '@/types/dashboard'
import { failRateOf } from './failRateOf'
import { formatPointChange } from './formatters/formatPointChange'
import { formatRate } from './formatters/formatRate'
import { sumPeriodTotals } from './sumPeriodTotals'

/** How the share of messages failing DMARC moved across all domains. */
export function failureRateChange(
  domains: DomainPeriodTotals[],
): ChangeItem | null {
  const current = failRateOf(sumPeriodTotals(domains.map((d) => d.current)))
  const previous = failRateOf(sumPeriodTotals(domains.map((d) => d.previous)))
  if (current === null || previous === null) return null
  const delta = current - previous
  return {
    id: 'failure-rate',
    value: formatPointChange(delta),
    title: 'Overall DMARC failure rate',
    detail: `From ${formatRate(previous)} to ${formatRate(current)} of messages`,
    direction: delta < 0 ? 'better' : delta > 0 ? 'worse' : 'neutral',
    href: null,
  }
}
