'use client'

import { useDateFilterParams } from '@/hooks/useDateFilterParams'
import type {
  FetchReportsParams,
  UseReportsTableParams,
  UseReportsTableReturn,
} from '@/types/reports'
import { filterAndSortReports, initialReportsTableState } from '@/utils/reports'
import { useSearchParams } from 'next/navigation'
import { useMemo, useReducer } from 'react'
import { reducer } from './reportsReducer'
import { useReportsFetch } from './useReportsFetch'
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
  const {
    page,
    pageSize,
    data,
    search,
    filterOrg,
    filterDomain,
    sortKey,
    sortDir,
  } = state
  const dateFilterParams = useDateFilterParams()
  const updateUrlParams = useUrlParamUpdater()

  const fetchParams = useMemo<FetchReportsParams>(
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
  useReportsFetch(dispatch, fetchParams)

  const { orgOptions, domainOptions } = useReportsFilterOptions(
    dateFilterParams,
    domainId,
  )

  const filtered = useMemo(
    () =>
      data ? filterAndSortReports(data.items, search, sortKey, sortDir) : [],
    [data, search, sortKey, sortDir],
  )

  return {
    state,
    dispatch,
    orgOptions,
    domainOptions,
    filtered,
    updateUrlParams,
  }
}
