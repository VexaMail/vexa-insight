import type { ReportDmarcOutcome, ReportOutcomeLabel } from '@/types/reports'

/**
 * Pill for a report's DMARC outcome: failing when any message fails, partly
 * aligned when every message passes but some on one mechanism only.
 */
export function reportOutcomeLabel(
  outcome: ReportDmarcOutcome | undefined,
): ReportOutcomeLabel {
  if (!outcome || outcome.totalMessages === 0) {
    return { tone: 'unknown', label: 'No data' }
  }
  if (outcome.failingMessages > 0) {
    return { tone: 'danger', label: 'Failing' }
  }
  if (outcome.partiallyAlignedMessages > 0) {
    return { tone: 'warning', label: 'Partly aligned' }
  }
  return { tone: 'success', label: 'Aligned' }
}
