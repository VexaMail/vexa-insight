'use client'

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/reports'
import { useDateFilterParams } from '@/hooks/useDateFilterParams'
import type {
  FetchReportsParams,
  PaginatedReports,
  ReportsTableState,
  SortKey,
  UseReportsTableParams,
  UseReportsTableReturn,
} from '@/types/reports'
import { buildReportsQuery, filterAndSortReports } from '@/utils/reports'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useReducer } from 'react'
import { reducer } from './reportsReducer'
import { useFetchedOptions } from './useFetchedOptions'

export function useReportsTable({
  domainId,
}: UseReportsTableParams): UseReportsTableReturn {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [state, dispatch] = useReducer(reducer, {
    page: DEFAULT_PAGE,
    pageSize: DEFAULT_PAGE_SIZE,
    data: null,
    loading: true,
    search: '',
    filterOrg: searchParams.get('org') ?? '',
    filterDomain: searchParams.get('domain') ?? '',
    sortKey: 'beginDate' as SortKey,
    sortDir: 'desc',
  } satisfies ReportsTableState)

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

  const updateUrlParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) params.set(key, value)
      else params.delete(key)
      router.replace(`?${params.toString()}`, { scroll: false })
    },
    [searchParams, router],
  )

  const fetchReports = useCallback(async (params: FetchReportsParams) => {
    dispatch({ type: 'FETCH_START' })
    try {
      const res = await fetch(`/api/v1/reports?${buildReportsQuery(params)}`)
      const json = (await res.json()) as { data: PaginatedReports }
      dispatch({ type: 'FETCH_SUCCESS', payload: json.data })
    } finally {
      dispatch({ type: 'FETCH_END' })
    }
  }, [])

  useEffect(() => {
    void fetchReports({
      page,
      pageSize,
      dateFilterParams,
      org: filterOrg,
      domain: filterDomain,
      domainId,
    })
  }, [
    page,
    pageSize,
    fetchReports,
    dateFilterParams,
    filterOrg,
    filterDomain,
    domainId,
  ])

  const orgOptionsQuery = useMemo(() => {
    const params = new URLSearchParams(dateFilterParams)
    if (domainId) params.set('domainId', String(domainId))
    return params.toString()
  }, [dateFilterParams, domainId])

  const orgOptions = useFetchedOptions(
    '/api/v1/reports/org-options',
    orgOptionsQuery,
    true,
  )
  const fetchedDomainOptions = useFetchedOptions(
    '/api/v1/reports/domain-options',
    dateFilterParams,
    !domainId,
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
    domainOptions: domainId ? [] : fetchedDomainOptions,
    filtered,
    updateUrlParams,
  }
}
