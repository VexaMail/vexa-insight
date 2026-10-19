import type { PublishedDmarcPolicy } from '@/types/domains'

export type DomainDetailHeaderProps = {
  readonly domainId: number
  readonly domainName: string
  readonly policy: PublishedDmarcPolicy | null
}
