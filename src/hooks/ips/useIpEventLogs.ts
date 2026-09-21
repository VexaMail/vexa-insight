'use client'

import { fetchMoreIpLogs } from '@/actions/fetchMoreIpLogs'
import { ipLogsPageSize, ipLogsQueryDefaults } from '@/constants/ips'
import type { UseIpEventLogsParams, UseIpEventLogsReturn } from '@/types/ips'
import { ipSectionFilterKey } from '@/utils/ips'
import { useIpSectionList } from './useIpSectionList'

export function useIpEventLogs({
  initialLogs,
  ip,
  dateRange,
}: UseIpEventLogsParams): UseIpEventLogsReturn {
  const { rows, ...rest } = useIpSectionList({
    initialRows: initialLogs,
    filterKey: ipSectionFilterKey(ip, dateRange),
    pageSize: ipLogsPageSize,
    defaultQuery: ipLogsQueryDefaults,
    keyOf: (row) => row.eventId,
    fetchPage: async (offset, query) =>
      fetchMoreIpLogs(ip, offset, dateRange, query),
  })

  return { logs: rows, ...rest }
}
