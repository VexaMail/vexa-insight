'use client'

import type {
  FetchReportsParams,
  PaginatedReports,
  ReportsTableAction,
} from '@/types/reports'
import { buildReportsQuery } from '@/utils/reports'
import { useEffect, type Dispatch } from 'react'

/** Fetches a page of reports into the reducer whenever the query changes. */
export function useReportsFetch(
  dispatch: Dispatch<ReportsTableAction>,
  params: FetchReportsParams,
): void {
  useEffect(() => {
    const run = async () => {
      dispatch({ type: 'FETCH_START' })
      try {
        const res = await fetch(`/api/v1/reports?${buildReportsQuery(params)}`)
        const json = (await res.json()) as { data: PaginatedReports }
        dispatch({ type: 'FETCH_SUCCESS', payload: json.data })
      } finally {
        dispatch({ type: 'FETCH_END' })
      }
    }
    void run()
  }, [dispatch, params])
}
