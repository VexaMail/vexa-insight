import type { HealthVerdict } from '@/types/ingest'

/**
 * One state for the whole of ingestion, from its four dimensions: the worst
 * one wins, and nothing configured reads as such rather than as healthy.
 */
export function overallIngestVerdict(verdicts: HealthVerdict[]): HealthVerdict {
  const tones = verdicts.map((v) => v.tone)
  const failing = tones.filter((t) => t === 'danger').length
  if (failing > 0) {
    return {
      tone: 'danger',
      label: `Unhealthy: ${String(failing)} of ${String(tones.length)} checks failing`,
    }
  }
  if (tones.includes('warning')) {
    return { tone: 'warning', label: 'Degraded: needs a look' }
  }
  if (tones.every((t) => t === 'unknown')) {
    return { tone: 'unknown', label: 'Not configured' }
  }
  const unverified = tones.filter((t) => t === 'unknown').length
  if (unverified > 0) {
    return {
      tone: 'unknown',
      label: `Unverified: ${String(unverified)} of ${String(tones.length)} checks have no data`,
    }
  }
  return { tone: 'success', label: 'Healthy: every check passes' }
}
