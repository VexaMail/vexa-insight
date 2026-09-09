import type { DiagnosticsQueryWindow } from '@/types/diagnostics'

/**
 * Explicit from/to win; otherwise the last `days` days up to now, unless
 * `days` is the all-time sentinel, which leaves both bounds open.
 */
export function resolveDiagnosticsQueryWindow(
  days: number,
  fromDate: Date | undefined,
  toDate: Date | undefined,
): DiagnosticsQueryWindow {
  if (fromDate || toDate || days >= 9999) {
    return { queryFromDate: fromDate, queryToDate: toDate }
  }
  const now = new Date()
  const queryFromDate = new Date(now)
  queryFromDate.setDate(queryFromDate.getDate() - days)
  return { queryFromDate, queryToDate: now }
}
