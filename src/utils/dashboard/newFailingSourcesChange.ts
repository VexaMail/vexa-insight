import type { ChangeItem, SourcePeriodRow } from '@/types/dashboard'
import { isNewlyFailingSource } from './isNewlyFailingSource'
import { pluralize } from './pluralize'

/** How many sending IPs started failing DMARC, and for how many domains. */
export function newFailingSourcesChange(
  rows: SourcePeriodRow[],
): ChangeItem | null {
  const fresh = rows.filter(isNewlyFailingSource)
  if (fresh.length === 0) return null
  const ips = new Set(fresh.map((r) => r.ip)).size
  const domains = new Set(fresh.map((r) => r.domainName)).size
  return {
    id: 'new-failing-sources',
    value: `+${String(ips)}`,
    title: `New failing ${ips === 1 ? 'source' : 'sources'}`,
    detail: `Across ${pluralize(domains, 'domain')}`,
    direction: 'worse',
    href: '/ips',
  }
}
