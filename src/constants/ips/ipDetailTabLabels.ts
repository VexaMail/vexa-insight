import type { IpDetailTab } from '@/types/ips'

/** The label of each tab of a source page. */
export const IP_DETAIL_TAB_LABELS: Record<IpDetailTab, string> = {
  overview: 'Overview',
  timeline: 'Timeline',
  domains: 'Related domains',
  reports: 'Reports',
  dns: 'DNS',
  raw: 'Raw data',
}
