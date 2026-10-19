import type {
  DiagnosticsOverviewRow,
  GradeBandCounts,
} from '@/types/diagnostics'

/** Domains per grade band: poor (D, F), fair (C), good (A, B), no answer. */
export function countGradeBands(
  rows: readonly DiagnosticsOverviewRow[],
): GradeBandCounts {
  const resolved = rows.filter((row) => row.resolved)
  const count = (grades: string) =>
    resolved.filter((row) => grades.includes(row.score.grade)).length
  return {
    total: rows.length,
    poor: count('DF'),
    fair: count('C'),
    good: count('AB'),
    unresolved: rows.length - resolved.length,
  }
}
