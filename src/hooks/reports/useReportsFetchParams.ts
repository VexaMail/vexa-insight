import type { FetchReportsParams, ReportsTableState } from '@/types/reports'
import { useMemo } from 'react'

/** The memoised query for the current page, filters and date range. */
export function useReportsFetchParams(
  state: ReportsTableState,
  dateFilterParams: string,
  domainId: number | undefined,
): FetchReportsParams {
  const { page, pageSize, filterOrg, filterDomain } = state

  return useMemo<FetchReportsParams>(
    () => ({
      page,
      pageSize,
      dateFilterParams,
      org: filterOrg,
      domain: filterDomain,
      domainId,
    }),
    [page, pageSize, dateFilterParams, filterOrg, filterDomain, domainId],
  )
}
