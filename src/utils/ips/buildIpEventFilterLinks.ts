import { IP_EVENT_FILTER_LABELS } from '@/constants/ips'
import type { IpEventFilter, IpMenuItem, SearchParamsRecord } from '@/types/ips'
import { withSearchParam } from './withSearchParam'

/** One link per event filter, keeping the rest of the page's query. */
export function buildIpEventFilterLinks(
  basePath: string,
  searchParams: SearchParamsRecord,
): IpMenuItem[] {
  const filters: IpEventFilter[] = ['all', 'fail', 'pass']
  return filters.map((filter) => ({
    key: filter,
    kind: `events-${filter}`,
    label: IP_EVENT_FILTER_LABELS[filter],
    href: withSearchParam(
      basePath,
      searchParams,
      'events',
      filter === 'all' ? null : filter,
    ),
  }))
}
