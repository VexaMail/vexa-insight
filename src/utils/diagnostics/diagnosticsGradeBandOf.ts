import type {
  DiagnosticsGradeBand,
  DiagnosticsOverviewRow,
} from '@/types/diagnostics'

/** The band a domain falls in: D/F poor, C fair, A/B good, no DNS answer unscored. */
export function diagnosticsGradeBandOf(
  row: DiagnosticsOverviewRow,
): Exclude<DiagnosticsGradeBand, 'all'> {
  if (!row.resolved) return 'unscored'
  if (row.score.grade === 'A' || row.score.grade === 'B') return 'good'
  if (row.score.grade === 'C') return 'fair'
  return 'poor'
}
