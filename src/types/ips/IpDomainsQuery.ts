import type { IpDomainsSort } from './IpDomainsSort'

export type IpDomainsQuery = {
  /** Substring matched against the domain name; empty means no filter. */
  search: string
  sort: IpDomainsSort
}
