'use client'

import { useListState } from '@/hooks/core'
import type { dataTableFeatures } from '@/lib/dataTableFeatures'
import type { ReportRow } from '@/types/reports'
import type { Row } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

/** Scopes the detail navigator to the visible rows, then opens the report. */
export function useOpenReport(
  filtered: ReportRow[],
): (row: Row<typeof dataTableFeatures, ReportRow>) => void {
  const router = useRouter()
  const setScope = useListState((s) => s.setScope)

  return (row: Row<typeof dataTableFeatures, ReportRow>) => {
    setScope(filtered.map((r: ReportRow) => r.id.toString()))
    router.push(`/reports/${String(row.original.id)}`)
  }
}
