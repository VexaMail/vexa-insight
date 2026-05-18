'use client'

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constants/reports'
import { useDateFilterParams } from '@/hooks/useDateFilterParams'
import type {
  PaginatedReports,
  ReportsTableState,
  UseReportsTableParams,
  UseReportsTableReturn,
} from '@/types/reports'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import type { SortKey } from '../../types/reports/SortKey'
import { reducer } from './reportsReducer'

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

  const fetchReports = useCallback(
    async (
      p: number,
      ps: number,
      filterQs: string,
      org: string,
      domain: string,
    ) => {
      dispatch({ type: 'FETCH_START' })
      try {
        const params = new URLSearchParams(filterQs)
        params.set('page', String(p))
        params.set('pageSize', String(ps))
        if (domainId) params.set('domainId', String(domainId))
        if (org) params.set('org', org)
        if (domain) params.set('domain', domain)
        const res = await fetch(`/api/v1/reports?${params.toString()}`)
        const json = (await res.json()) as { data: PaginatedReports }
        dispatch({ type: 'FETCH_SUCCESS', payload: json.data })
      } finally {
        dispatch({ type: 'FETCH_END' })
      }
    },
    [domainId],
  )

  useEffect(() => {
    void fetchReports(page, pageSize, dateFilterParams, filterOrg, filterDomain)
  }, [page, pageSize, fetchReports, dateFilterParams, filterOrg, filterDomain])

  const [orgOptions, setOrgOptions] = useState<string[]>([])

  useEffect(() => {
    const ctrl = new AbortController()
    const run = async () => {
      try {
        const params = new URLSearchParams(dateFilterParams)
        if (domainId) params.set('domainId', String(domainId))
        const qs = params.toString()
        const url = qs
          ? `/api/v1/reports/org-options?${qs}`
          : `/api/v1/reports/org-options`
        const res = await fetch(url, { signal: ctrl.signal })
        const json = (await res.json()) as { data: string[] }
        setOrgOptions(json.data)
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') return
      }
    }
    void run()
    return () => ctrl.abort()
  }, [domainId, dateFilterParams])

  const [fetchedDomainOptions, setFetchedDomainOptions] = useState<string[]>([])
  const domainOptions = domainId ? [] : fetchedDomainOptions

  useEffect(() => {
    if (domainId) return
    const ctrl = new AbortController()
    const run = async () => {
      try {
        const qs = dateFilterParams
        const url = qs
          ? `/api/v1/reports/domain-options?${qs}`
          : `/api/v1/reports/domain-options`
        const res = await fetch(url, { signal: ctrl.signal })
        const json = (await res.json()) as { data: string[] }
        setFetchedDomainOptions(json.data)
      } catch (e) {
        if (e instanceof Error && e.name === 'AbortError') return
      }
    }
    void run()
    return () => ctrl.abort()
  }, [domainId, dateFilterParams])

  const filtered = useMemo(() => {
    if (!data) return []
    let items = data.items

    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (r) =>
          r.reportId.toLowerCase().includes(q) ||
          r.orgName.toLowerCase().includes(q),
      )
    }

    return [...items].sort((a, b) => {
      let cmp = 0
      switch (sortKey) {
        case 'reportId':
          cmp = a.reportId.localeCompare(b.reportId)
          break
        case 'orgName':
          cmp = a.orgName.localeCompare(b.orgName)
          break
        case 'beginDate':
          cmp = a.beginDate - b.beginDate
          break
      }
      return sortDir === 'desc' ? -cmp : cmp
    })
  }, [data, search, sortKey, sortDir])

  return {
    state,
    dispatch,
    orgOptions,
    domainOptions,
    filtered,
    updateUrlParams,
  }
}
