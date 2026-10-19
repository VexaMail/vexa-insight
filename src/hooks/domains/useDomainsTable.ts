'use client'

import { useListState } from '@/hooks/core'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type {
  DomainsTableProps,
  DomainsTableRow,
  UseDomainsTableReturn,
} from '@/types/domains'
import { getDomainHealth } from '@/utils/domains'
import type { Row } from '@tanstack/react-table'
import { useRouter, useSearchParams } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { useMemo, useState } from 'react'

export function useDomainsTable({
  domains,
}: DomainsTableProps): UseDomainsTableReturn {
  const router = useRouter()
  const searchParams = useSearchParams()
  const setScope = useListState((s) => s.setScope)

  const initialStatus = searchParams.get('status') || 'All'
  const [statusFilter, setStatusFilter] = useState(initialStatus)

  const filtered = useMemo(
    () =>
      statusFilter === 'All'
        ? domains
        : domains.filter((d) => getDomainHealth(d) === statusFilter),
    [domains, statusFilter],
  )

  function handleStatusChange(value: string) {
    setStatusFilter(value)
    const newParams = new URLSearchParams(searchParams.toString())
    if (value === 'All') newParams.delete('status')
    else newParams.set('status', value)
    router.replace(`?${newParams.toString()}`, { scroll: false })
  }

  function handleNavigate() {
    setScope(filtered.map((d) => d.domainName))
  }

  function handleRowClick(row: Row<typeof dataTableFeatures, DomainsTableRow>) {
    handleNavigate()
    router.push(`/domains/${row.original.domainName}`)
  }

  function handleStatusSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    handleStatusChange(event.target.value)
  }

  return {
    filtered,
    statusFilter,
    handleRowClick,
    handleStatusChange,
    handleStatusSelectChange,
    handleNavigate,
  }
}
