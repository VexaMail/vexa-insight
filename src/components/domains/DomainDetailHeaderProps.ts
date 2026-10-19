import type { PublishedDmarcPolicy } from '@/types/domains'
import type { DomainSummary } from '@/types/reports'

export type DomainDetailHeaderProps = {
  readonly domainId: number
  readonly domainName: string
  readonly policy: PublishedDmarcPolicy | null
  /** Totals and last report day, for the status pill beside the name. */
  readonly summary: DomainSummary
}
