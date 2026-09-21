'use client'

import type {
  UseIpSectionListParams,
  UseIpSectionListReturn,
} from '@/types/ips'
import { appendUniqueRows } from '@/utils/ips'
import { useState } from 'react'

/**
 * Paging, searching and sorting of one IP detail list. Every query change
 * refetches from the server, because the filters apply to the whole dataset and
 * not only to the rows already loaded.
 */
export function useIpSectionList<Row, Query>({
  initialRows,
  filterKey,
  pageSize,
  defaultQuery,
  keyOf,
  fetchPage,
}: UseIpSectionListParams<Row, Query>): UseIpSectionListReturn<Row, Query> {
  const [prevFilterKey, setPrevFilterKey] = useState(filterKey)
  const [rows, setRows] = useState<Row[]>(initialRows)
  const [query, setQuery] = useState<Query>(defaultQuery)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialRows.length === pageSize)

  if (prevFilterKey !== filterKey) {
    setPrevFilterKey(filterKey)
    setRows(initialRows)
    setQuery(defaultQuery)
    setHasMore(initialRows.length === pageSize)
  }

  const handleQueryChange = (next: Query): void => {
    setQuery(next)
    void reload(next)
  }

  async function reload(next: Query): Promise<void> {
    setIsLoading(true)
    try {
      const page = await fetchPage(0, next)
      setRows(page)
      setHasMore(page.length === pageSize)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadMore = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const more = await fetchPage(rows.length, query)
      setRows((prev) => appendUniqueRows(prev, more, keyOf))
      if (more.length < pageSize) setHasMore(false)
    } finally {
      setIsLoading(false)
    }
  }

  return { rows, query, isLoading, hasMore, handleQueryChange, handleLoadMore }
}
