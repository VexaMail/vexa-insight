'use client'

import { useState } from 'react'

import { findingSeverityFilterOptions } from '@/constants/diagnostics'
import type {
  DiagnosticsFinding,
  FindingSeverityFilter,
  UseFindingsFilterReturn,
} from '@/types/diagnostics'
import { filterFindings } from '@/utils/diagnostics'

/** Client-side severity and text filter over one run's findings. */
export function useFindingsFilter(
  findings: readonly DiagnosticsFinding[],
): UseFindingsFilterReturn {
  const [severity, setSeverityState] = useState<FindingSeverityFilter>('all')
  const [search, setSearch] = useState('')

  function setSeverity(value: string) {
    setSeverityState(
      findingSeverityFilterOptions.find((option) => option === value) ?? 'all',
    )
  }

  return {
    severity,
    setSeverity,
    search,
    setSearch,
    visible: filterFindings(findings, severity, search),
  }
}
