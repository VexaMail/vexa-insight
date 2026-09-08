import type { IpDateRange } from '@/types/filters'
import type { IpRelatedDomainRow } from '@/types/IpRelatedDomainRow'

export type IpRelatedDomainsProps = {
  readonly initialDomains: IpRelatedDomainRow[]
  readonly ip: string
  readonly dateRange: IpDateRange
}
