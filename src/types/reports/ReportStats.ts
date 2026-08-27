/**
 * Authentication statistics scoped to a single raw report.
 *
 * complianceRate = bothAlignedCount / totalMessages.
 * A message is "compliant" only when BOTH SPF and DKIM pass alignment.
 * This is stricter than "authenticated" (where either passing suffices).
 *
 * All rates are pre-computed server-side as percentages (0-100).
 */
export type ReportStats = {
  totalMessages: number
  spfAlignedCount: number
  dkimAlignedCount: number
  bothAlignedCount: number
  /** Distinct source IPs where SPF or DKIM fails alignment. Label: "sources requiring review". */
  sourcesRequiringReviewCount: number
  /** bothAlignedCount / totalMessages * 100. Strict dual-alignment compliance. */
  complianceRate: number
  /** spfAlignedCount / totalMessages * 100 */
  spfAlignedRate: number
  /** dkimAlignedCount / totalMessages * 100 */
  dkimAlignedRate: number
}
