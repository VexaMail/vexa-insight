import type { DomainHealthInput } from '@/types/domains'
import { getDomainStatus } from './getDomainStatus'

/** The status filter value of a domain: no mail at all reads as no data. */
export function getDomainHealth(row: DomainHealthInput): string {
  return row.totalMessages === 0
    ? 'No data'
    : getDomainStatus(row.passRatePercent)
}
