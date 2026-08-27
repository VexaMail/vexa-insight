import type { ReportStats } from '@/types/reports'
import type { AuthSummaryNarrative } from './AuthSummaryNarrative'
import { appendDispositionNote } from './appendDispositionNote'
import { appendFailureMode } from './appendFailureMode'

/**
 * Builds the array of narrative parts from stats, disposition, and status.
 */
export function buildNarrativeParts(
  stats: ReportStats,
  dominantDisposition: string,
  status: AuthSummaryNarrative['status'],
): string[] {
  const parts: string[] = []
  const reviewCount = stats.sourcesRequiringReviewCount
  const sourcePlural = reviewCount === 1 ? '' : 's'
  const sourceVerb = reviewCount === 1 ? 's' : ''

  if (status === 'healthy') {
    parts.push('All traffic is fully aligned.')
  } else if (status === 'degraded') {
    parts.push(
      `Most traffic is authenticated, but ${String(reviewCount)} source${sourcePlural} require${sourceVerb} review.`,
    )
  } else {
    parts.push(
      `Significant alignment failures detected across ${String(reviewCount)} source${sourcePlural}.`,
    )
  }

  appendFailureMode(parts, stats)
  appendDispositionNote(parts, dominantDisposition, status)

  return parts
}
