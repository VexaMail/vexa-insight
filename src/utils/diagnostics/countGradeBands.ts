import type {
  DiagnosticsOverviewRow,
  GradeBandCounts,
} from '@/types/diagnostics'
import { diagnosticsGradeBandOf } from './diagnosticsGradeBandOf'

/**
 * Domains per grade band: poor (D, F), fair (C), good (A, B), no answer, and
 * those not checked yet.
 */
export function countGradeBands(
  rows: readonly DiagnosticsOverviewRow[],
): GradeBandCounts {
  const counts = { poor: 0, fair: 0, good: 0, unscored: 0, pending: 0 }
  for (const row of rows) {
    counts[diagnosticsGradeBandOf(row) ?? 'pending'] += 1
  }
  return {
    total: rows.length,
    poor: counts.poor,
    fair: counts.fair,
    good: counts.good,
    unresolved: counts.unscored,
    pending: counts.pending,
  }
}
