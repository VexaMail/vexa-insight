import type { DiagnosticStats } from '@/types/diagnostics'

/** Derives overall risk level from diagnostic stats and DMARC policy. */
export function deriveRiskLevel(
  stats: DiagnosticStats,
  dmarcPolicy: string | null,
): 'low' | 'medium' | 'high' | 'critical' {
  const hasNoData = stats.totalEvents === 0

  if (hasNoData) return 'medium'

  const authRate =
    ((stats.totalEvents - stats.failedEvents) / stats.totalEvents) * 100
  const hasMissingDmarc = !dmarcPolicy
  const hasWeakPolicy = dmarcPolicy === 'none'

  if (authRate < 70 || hasMissingDmarc) return 'critical'
  if (authRate < 90 || hasWeakPolicy) return 'high'
  if (authRate < 95) return 'medium'
  return 'low'
}
