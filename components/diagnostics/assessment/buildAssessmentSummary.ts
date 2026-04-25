import type { DiagnosticStats } from '@/types/diagnostics'

/** Builds a deterministic 1-2 sentence assessment summary. */
export function buildAssessmentSummary(
  stats: DiagnosticStats,
  dmarcPolicy: string | null,
): string {
  const parts: string[] = []

  if (stats.totalEvents === 0) {
    return 'No DMARC report data available for this period. Unable to assess authentication health.'
  }

  const authRate = Math.round(
    ((stats.totalEvents - stats.failedEvents) / stats.totalEvents) * 100,
  )

  if (authRate >= 95) {
    parts.push(`Authentication is healthy at ${authRate}% pass rate.`)
  } else if (authRate >= 80) {
    parts.push(
      `Authentication is partially degraded with a ${authRate}% pass rate.`,
    )
  } else {
    parts.push(
      `Authentication is failing at ${authRate}% pass rate — investigation recommended.`,
    )
  }

  if (!dmarcPolicy) {
    parts.push('DMARC is not configured.')
  } else if (dmarcPolicy === 'none') {
    parts.push('DMARC is monitoring-only and will not reject failing mail.')
  } else {
    parts.push(`DMARC is enforcing with policy "${dmarcPolicy}".`)
  }

  return parts.join(' ')
}
