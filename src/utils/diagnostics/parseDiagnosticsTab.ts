import { diagnosticsTabOrder } from '@/constants/diagnostics'
import type { DiagnosticsTabKey } from '@/types/diagnostics'

/** The `?tab=` value, or Findings when it is missing or unknown. */
export function parseDiagnosticsTab(
  value: string | string[] | undefined,
): DiagnosticsTabKey {
  return diagnosticsTabOrder.find((key) => key === value) ?? 'findings'
}
