import type { DiagnosticStats } from '@/types/diagnostics'

/** Derives authentication health percentage and status from stats. */
export function deriveAuthenticationHealth(stats: DiagnosticStats): {
  percentage: number
  status: 'healthy' | 'degraded' | 'critical'
} {
  if (stats.totalEvents === 0) {
    return { percentage: 0, status: 'critical' }
  }

  const passedEvents = stats.totalEvents - stats.failedEvents
  const percentage = Math.round((passedEvents / stats.totalEvents) * 100)

  if (percentage >= 95) return { percentage, status: 'healthy' }
  if (percentage >= 80) return { percentage, status: 'degraded' }
  return { percentage, status: 'critical' }
}
