import type { IpRelatedDomainRow } from '@/types/IpRelatedDomainRow'
import type { IpDateRange } from '@/types/filters'

export type UseIpRelatedDomainsParams = {
  initialDomains: IpRelatedDomainRow[]
  ip: string
  dateRange: IpDateRange
}
