import type { ReportAlignmentCounts, ReportStats } from '@/types/reports'
import { percentOf } from './percentOf'

/**
 * Turns one report's alignment counts into its rates. DMARC compliance is the
 * share aligned on SPF or DKIM, never the share aligned on both: a message
 * with only DKIM aligned passes DMARC.
 */
export function computeReportStats(
  counts: ReportAlignmentCounts,
  sourcesRequiringReviewCount: number,
): ReportStats {
  const total = counts.totalMessages
  return {
    ...counts,
    sourcesRequiringReviewCount,
    complianceRate: percentOf(counts.dmarcPassCount, total),
    fullyAlignedRate: percentOf(counts.bothAlignedCount, total),
    spfAlignedRate: percentOf(counts.spfAlignedCount, total),
    dkimAlignedRate: percentOf(counts.dkimAlignedCount, total),
  }
}
