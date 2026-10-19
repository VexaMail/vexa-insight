import type { ReportAlignmentCounts } from './ReportAlignmentCounts'

/**
 * Authentication statistics scoped to a single raw report.
 *
 * A message passes DMARC when SPF or DKIM is aligned, so `complianceRate`
 * counts either; `fullyAlignedRate` is the stricter share aligned on both.
 * All rates are pre-computed server-side as whole percentages (0-100) of
 * `totalMessages`.
 */
export type ReportStats = ReportAlignmentCounts & {
  /** Distinct source IPs where SPF or DKIM fails alignment. Label: "sources requiring review". */
  sourcesRequiringReviewCount: number
  /** dmarcPassCount / totalMessages * 100: the DMARC pass rate. */
  complianceRate: number
  /** bothAlignedCount / totalMessages * 100 */
  fullyAlignedRate: number
  /** spfAlignedCount / totalMessages * 100 */
  spfAlignedRate: number
  /** dkimAlignedCount / totalMessages * 100 */
  dkimAlignedRate: number
}
