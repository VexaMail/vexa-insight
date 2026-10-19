import type { DomainSummary } from '@/types/reports'
import type { PublishedDmarcPolicy } from './PublishedDmarcPolicy'

/** One row of the domains list: totals plus the published policy. */
export type DomainListRow = DomainSummary & {
  readonly policy: PublishedDmarcPolicy | null
}
