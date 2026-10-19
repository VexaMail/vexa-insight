import type { ReportDmarcOutcome, ReportOutcomeLabel } from '@/types/reports'

/**
 * Pill for a report's DMARC outcome, led by the DMARC result: failing when any
 * message fails, otherwise a pass. DMARC needs only one aligned identifier, so
 * a message aligned on SPF or DKIM alone still passes; the label says "partly
 * aligned" so that gap stays visible without reading as a warning.
 */
export function reportOutcomeLabel(
  outcome: ReportDmarcOutcome | undefined,
): ReportOutcomeLabel {
  if (!outcome || outcome.totalMessages === 0) {
    return { tone: 'unknown', label: 'No data' }
  }
  if (outcome.failingMessages > 0) {
    return { tone: 'danger', label: 'DMARC fail' }
  }
  if (outcome.partiallyAlignedMessages > 0) {
    return { tone: 'success', label: 'DMARC pass · partly aligned' }
  }
  return { tone: 'success', label: 'DMARC pass' }
}
