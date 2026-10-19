import type { ReportDmarcOutcome, ReportOutcomeLabel } from '@/types/reports'

/**
 * Pill for a report's DMARC outcome, led by the DMARC result: failing when any
 * message fails, a pass that is partly aligned when every message passes but
 * some on SPF or DKIM only, a plain pass when every message aligns on both.
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
    return { tone: 'warning', label: 'DMARC pass · partly aligned' }
  }
  return { tone: 'success', label: 'DMARC pass' }
}
