import type { ReportStats } from '@/types/reports'
import { describeOutOf } from '@/utils/reports'
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
  const passing = describeOutOf(
    stats.dmarcPassCount,
    stats.totalMessages,
    'message',
  )
  const verb = stats.dmarcPassCount === 1 ? 'passes' : 'pass'
  const reviewCount = stats.sourcesRequiringReviewCount
  const sources = `${String(reviewCount)} source${reviewCount === 1 ? '' : 's'}`
  const parts: string[] = []

  if (status === 'healthy') {
    parts.push(`${passing} ${verb} DMARC.`)
  } else if (status === 'degraded') {
    parts.push(`${passing} ${verb} DMARC; ${sources} to review.`)
  } else {
    parts.push(`Only ${passing} ${verb} DMARC, across ${sources} to review.`)
  }

  appendFailureMode(parts, stats)
  appendDispositionNote(parts, dominantDisposition, status)

  return parts
}
