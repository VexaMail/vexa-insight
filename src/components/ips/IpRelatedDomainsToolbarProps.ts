import type { IpDomainsQuery } from '@/types/ips'

export type IpRelatedDomainsToolbarProps = {
  query: IpDomainsQuery
  onChange: (query: IpDomainsQuery) => void
}
