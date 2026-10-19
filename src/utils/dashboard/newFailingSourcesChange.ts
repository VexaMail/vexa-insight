import type { ChangeItem, SourcePeriodRow } from '@/types/dashboard'
import { changeSubject } from './changeSubject'
import { isNewlyFailingSource } from './isNewlyFailingSource'
import { newestSeconds } from './newestSeconds'
import { pluralize } from './pluralize'

/** How many sending IPs started failing DMARC, and for how many domains. */
export function newFailingSourcesChange(
  rows: SourcePeriodRow[],
): ChangeItem | null {
  const fresh = rows.filter(isNewlyFailingSource)
  if (fresh.length === 0) return null
  const ips = [...new Set(fresh.map((r) => r.ip))]
  const domains = new Set(fresh.map((r) => r.domainName)).size
  return {
    id: 'new-failing-sources',
    value: `+${String(ips.length)}`,
    title: `New failing ${ips.length === 1 ? 'source' : 'sources'}`,
    subject: changeSubject(ips, 'source'),
    detail: `Across ${pluralize(domains, 'domain')}`,
    direction: 'worse',
    isNew: true,
    lastSeenAt: newestSeconds(fresh.map((r) => r.lastFailedAt)),
    href: '/ips',
  }
}
