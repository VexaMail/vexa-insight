'use client'

import { useInPageDiagnosticsLinks } from '@/hooks/diagnostics'

/** Switches tabs and anchors on the page without a new diagnostics run. */
export function DiagnosticsInPageLinks() {
  useInPageDiagnosticsLinks()
  return null
}
