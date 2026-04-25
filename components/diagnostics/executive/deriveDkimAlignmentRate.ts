import type { DiagnosticStats } from '@/types/diagnostics'

/** Derives DKIM alignment rate as percentage 0-100. */
export function deriveDkimAlignmentRate(stats: DiagnosticStats): number {
  if (stats.totalEvents === 0) return 0
  const aligned = stats.totalEvents - stats.dkim_all_fail
  return Math.round((aligned / stats.totalEvents) * 100)
}
