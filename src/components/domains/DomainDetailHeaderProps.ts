import type { PublishedDmarcPolicy } from '@/types/domains'

export type DomainDetailHeaderProps = {
  readonly domainName: string
  readonly policy: PublishedDmarcPolicy | null
  readonly totalMessages: number
  readonly reportsHref: string
}
