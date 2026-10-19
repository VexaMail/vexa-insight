import type { PublishedDmarcPolicy } from '@/types/domains'

export type DomainDetailHeaderProps = {
  readonly domainName: string
  readonly policy: PublishedDmarcPolicy | null
  readonly totalMessages: number
  /** Messages per UTC day over the last 30 days, oldest first. */
  readonly dailyVolume: readonly number[]
  readonly reportsHref: string
}
