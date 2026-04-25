import type { DiagnosticStats } from '@/types/diagnostics'

/** Derives SPF alignment rate as percentage 0-100. */
export function deriveSpfAlignmentRate(stats: DiagnosticStats): number {
  if (stats.totalEvents === 0) return 0
  const aligned = stats.totalEvents - stats.spf_pass_unaligned
  return Math.round((aligned / stats.totalEvents) * 100)
}
