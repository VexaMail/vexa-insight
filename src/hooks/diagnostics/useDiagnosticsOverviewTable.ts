'use client'

import { diagnosticsOverviewPhonePageSize } from '@/constants/diagnostics'
import type {
  DiagnosticsGradeBand,
  DiagnosticsOverviewRow,
  UseDiagnosticsOverviewTableReturn,
} from '@/types/diagnostics'
import { countGradeBands, filterDiagnosticsRows } from '@/utils/diagnostics'
import { useCallback, useMemo, useState } from 'react'

/**
 * The grade-band quick filter of the diagnostics index, the rows it keeps,
 * and the first page of them the phone list renders.
 */
export function useDiagnosticsOverviewTable(
  rows: readonly DiagnosticsOverviewRow[],
): UseDiagnosticsOverviewTableReturn {
  const [band, setBand] = useState<DiagnosticsGradeBand>('all')
  const [phoneLimit, setPhoneLimit] = useState(diagnosticsOverviewPhonePageSize)
  const filtered = useMemo(
    () => filterDiagnosticsRows(rows, band),
    [rows, band],
  )
  const counts = useMemo(() => countGradeBands(rows), [rows])
  const phoneRows = useMemo(
    () => filtered.slice(0, phoneLimit),
    [filtered, phoneLimit],
  )
  const showMore = useCallback(() => {
    setPhoneLimit((limit) => limit + diagnosticsOverviewPhonePageSize)
  }, [])
  return {
    band,
    counts,
    filtered,
    phoneRows,
    handleBandChange: setBand,
    showMore,
  }
}
