'use client'

import type {
  DiagnosticsGradeBand,
  DiagnosticsOverviewRow,
  UseDiagnosticsOverviewTableReturn,
} from '@/types/diagnostics'
import { countGradeBands, filterDiagnosticsRows } from '@/utils/diagnostics'
import { useMemo, useState } from 'react'

/** The grade-band quick filter of the diagnostics index and the rows it keeps. */
export function useDiagnosticsOverviewTable(
  rows: readonly DiagnosticsOverviewRow[],
): UseDiagnosticsOverviewTableReturn {
  const [band, setBand] = useState<DiagnosticsGradeBand>('all')
  const filtered = useMemo(
    () => filterDiagnosticsRows(rows, band),
    [rows, band],
  )
  const counts = useMemo(() => countGradeBands(rows), [rows])
  return { band, counts, filtered, handleBandChange: setBand }
}
