'use client'

import { useDateFilterParams } from '@/hooks/useDateFilterParams'
import type {
  UseReportsTableParams,
  UseReportsTableReturn,
} from '@/types/reports'
import { initialReportsTableState } from '@/utils/reports'
import { useSearchParams } from 'next/navigation'
import { useReducer } from 'react'
import { reducer } from './reportsReducer'
import { useFilteredReports } from './useFilteredReports'
import { useReportsFetch } from './useReportsFetch'
import { useReportsFetchParams } from './useReportsFetchParams'
import { useReportsFilterOptions } from './useReportsFilterOptions'
import { useUrlParamUpdater } from './useUrlParamUpdater'

export function useReportsTable({
  domainId,
}: UseReportsTableParams): UseReportsTableReturn {
  const searchParams = useSearchParams()
  const [state, dispatch] = useReducer(
    reducer,
    searchParams,
    initialReportsTableState,
  )
  const dateFilterParams = useDateFilterParams()
  const updateUrlParams = useUrlParamUpdater()

  const fetchParams = useReportsFetchParams(state, dateFilterParams, domainId)
  useReportsFetch(dispatch, fetchParams)

  const { orgOptions, domainOptions } = useReportsFilterOptions(
    dateFilterParams,
    domainId,
  )

  const filtered = useFilteredReports(state)

  return {
    state,
    dispatch,
    orgOptions,
    domainOptions,
    filtered,
    updateUrlParams,
  }
}
