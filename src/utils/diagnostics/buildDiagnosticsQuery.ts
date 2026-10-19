import type { DiagnosticsSearchParams } from '@/types/diagnostics'

/** The date-range part of the query string, kept across tab links. */
export function buildDiagnosticsQuery(
  searchParams: DiagnosticsSearchParams,
): string {
  const params = new URLSearchParams()
  for (const key of ['days', 'from', 'to']) {
    const value = searchParams[key]
    if (typeof value === 'string') params.set(key, value)
  }
  return params.toString()
}
