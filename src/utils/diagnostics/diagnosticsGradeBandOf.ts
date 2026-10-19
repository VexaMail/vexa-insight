import type {
  DiagnosticsGradeBand,
  DiagnosticsOverviewRow,
} from '@/types/diagnostics'

/**
 * The band a domain falls in: D/F poor, C fair, A/B good, no DNS answer
 * unscored. Null while the domain has never been checked.
 */
export function diagnosticsGradeBandOf(
  row: DiagnosticsOverviewRow,
): Exclude<DiagnosticsGradeBand, 'all'> | null {
  const { check } = row
  if (!check) return null
  if (!check.resolved) return 'unscored'
  if (check.grade === 'A' || check.grade === 'B') return 'good'
  if (check.grade === 'C') return 'fair'
  return 'poor'
}
