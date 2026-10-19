'use client'

import { useSearchParams } from 'next/navigation'

import type { DiagnosticsTabKey } from '@/types/diagnostics'
import { parseDiagnosticsTab } from '@/utils/diagnostics'

/** The tab in the address bar, which in-page links change without a reload. */
export function useDiagnosticsActiveTab(): DiagnosticsTabKey {
  const searchParams = useSearchParams()
  return parseDiagnosticsTab(searchParams.get('tab') ?? undefined)
}
