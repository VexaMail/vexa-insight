'use client'

import { fetchMoreIpDomains } from '@/actions/fetchMoreIpDomains'
import { ipDomainsPageSize, ipDomainsQueryDefaults } from '@/constants/ips'
import type {
  UseIpRelatedDomainsParams,
  UseIpRelatedDomainsReturn,
} from '@/types/ips'
import { ipSectionFilterKey } from '@/utils/ips'
import { useIpSectionList } from './useIpSectionList'

export function useIpRelatedDomains({
  initialDomains,
  ip,
  dateRange,
}: UseIpRelatedDomainsParams): UseIpRelatedDomainsReturn {
  const { rows, ...rest } = useIpSectionList({
    initialRows: initialDomains,
    filterKey: ipSectionFilterKey(ip, dateRange),
    pageSize: ipDomainsPageSize,
    defaultQuery: ipDomainsQueryDefaults,
    keyOf: (row) => row.domainId,
    fetchPage: async (offset, query) =>
      fetchMoreIpDomains(ip, offset, dateRange, query),
  })

  return { domains: rows, ...rest }
}
