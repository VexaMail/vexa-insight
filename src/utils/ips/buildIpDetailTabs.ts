import {
  IP_DETAIL_TAB_ICONS,
  IP_DETAIL_TAB_LABELS,
  IP_DETAIL_TABS,
} from '@/constants/ips'
import type { IpDetailTab, SearchParamsRecord } from '@/types/ips'
import type { TabNavItem } from '@/types/ui'
import { withSearchParam } from './withSearchParam'

/** Tabs of a source's page; each keeps the date range in its link. */
export function buildIpDetailTabs(
  basePath: string,
  searchParams: SearchParamsRecord,
): Record<IpDetailTab, TabNavItem> {
  const entries = IP_DETAIL_TABS.map((tab): [IpDetailTab, TabNavItem] => [
    tab,
    {
      key: tab,
      label: IP_DETAIL_TAB_LABELS[tab],
      icon: IP_DETAIL_TAB_ICONS[tab],
      href: withSearchParam(
        basePath,
        searchParams,
        'tab',
        tab === 'overview' ? null : tab,
      ),
    },
  ])
  return Object.fromEntries(entries) as Record<IpDetailTab, TabNavItem>
}
