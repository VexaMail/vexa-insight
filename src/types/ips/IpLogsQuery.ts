import type { IpLogsSort } from './IpLogsSort'

export type IpLogsQuery = {
  /** Substring matched against the header-from domain and the report id. */
  search: string
  /** DMARC disposition to keep, or an empty string for all of them. */
  disposition: string
  /** SPF result to keep, or an empty string for all of them. */
  spfResult: string
  /** DKIM result to keep, or an empty string for all of them. */
  dkimResult: string
  sort: IpLogsSort
}
