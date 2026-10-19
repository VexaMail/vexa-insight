import type { IpDetailTab, SearchParamsRecord } from '@/types/ips'
import type { TabNavItem } from '@/types/ui'
import { withSearchParam } from './withSearchParam'

/** Tabs of a source's page; each keeps the date range in its link. */
export function buildIpDetailTabs(
  basePath: string,
  searchParams: SearchParamsRecord,
): Record<IpDetailTab, TabNavItem> {
  const link = (tab: IpDetailTab, label: string): TabNavItem => ({
    key: tab,
    label,
    href: withSearchParam(
      basePath,
      searchParams,
      'tab',
      tab === 'overview' ? null : tab,
    ),
  })
  return {
    overview: link('overview', 'Overview'),
    timeline: link('timeline', 'Timeline'),
    domains: link('domains', 'Related domains'),
    reports: link('reports', 'Reports'),
  }
}
