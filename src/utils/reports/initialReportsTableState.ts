import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/reports'
import type { ReportsTableState } from '@/types/reports'

/** The reports table state before the first fetch, seeded from the URL. */
export function initialReportsTableState(
  searchParams: Pick<URLSearchParams, 'get'>,
): ReportsTableState {
  return {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    data: null,
    loading: true,
    search: '',
    filterOrg: searchParams.get('org') ?? '',
    filterDomain: searchParams.get('domain') ?? '',
    sortKey: 'beginDate',
    sortDir: 'desc',
  }
}
