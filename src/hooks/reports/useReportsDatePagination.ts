'use client'

import type { ReportsTableAction } from '@/types/reports'
import { useState, type Dispatch } from 'react'

/** Reset pagination before effects can fetch a newly selected date range. */
export function useReportsDatePagination(
  dateFilterParams: string,
  dispatch: Dispatch<ReportsTableAction>,
): void {
  const [previousDates, setPreviousDates] = useState(dateFilterParams)
  if (previousDates !== dateFilterParams) {
    setPreviousDates(dateFilterParams)
    dispatch({ type: 'SET_PAGE', payload: 1 })
  }
}
