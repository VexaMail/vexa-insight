import type { IpRelatedDomainRow } from '@/types/IpRelatedDomainRow'
import type { IpDomainsQuery } from './IpDomainsQuery'

export type UseIpRelatedDomainsReturn = {
  domains: IpRelatedDomainRow[]
  query: IpDomainsQuery
  isLoading: boolean
  hasMore: boolean
  handleQueryChange: (query: IpDomainsQuery) => void
  handleLoadMore: () => Promise<void>
}
