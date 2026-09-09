import type { ReportRow, ReportsTableState } from '@/types/reports'
import { filterAndSortReports } from '@/utils/reports'
import { useMemo } from 'react'

/** The loaded page after the client-side search and sort. */
export function useFilteredReports(state: ReportsTableState): ReportRow[] {
  const { data, search, sortKey, sortDir } = state

  return useMemo(
    () =>
      data ? filterAndSortReports(data.items, search, sortKey, sortDir) : [],
    [data, search, sortKey, sortDir],
  )
}
