import type { ReportStats } from '@/types/reports'
import type { AuthSummaryNarrative } from './AuthSummaryNarrative'
import { buildNarrativeParts } from './buildNarrativeParts'
import { computeNarrativeStatus } from './computeNarrativeStatus'

/**
 * Generates a deterministic one-line diagnostic narrative from report stats.
 * No AI dependency — works server-side from precomputed values.
 */
export function deriveAuthSummaryNarrative(
  stats: ReportStats,
  dominantDisposition: string,
): AuthSummaryNarrative {
  if (stats.totalMessages === 0) {
    return {
      text: 'No message data available for this report.',
      status: 'degraded',
    }
  }

  const status = computeNarrativeStatus(stats.complianceRate)
  const parts = buildNarrativeParts(stats, dominantDisposition, status)

  return { text: parts.join(' '), status }
}
