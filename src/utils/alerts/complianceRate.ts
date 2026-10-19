import type { DomainComplianceTotals } from '@/types/alerts'

/** DMARC pass rate in percent, one decimal; 0 for an empty window. */
export function complianceRate(totals: DomainComplianceTotals): number {
  if (totals.total === 0) return 0
  return Math.round((totals.aligned / totals.total) * 1000) / 10
}
