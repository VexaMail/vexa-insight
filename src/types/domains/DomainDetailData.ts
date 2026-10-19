import type { EnforcementReadiness } from '@/types/enforcement'
import type { ForensicReportRow } from '@/types/forensic'
import type { DomainSummary } from '@/types/reports'
import type { TlsDomainSummaryRow, TlsFailureSummaryRow } from '@/types/tlsrpt'
import type { ComplianceTrend } from './ComplianceTrend'
import type { DomainInsights } from './DomainInsights'
import type { DomainSourceRow } from './DomainSourceRow'
import type { PublishedDmarcPolicy } from './PublishedDmarcPolicy'

/**
 * Everything the domain page shows: totals, policy, readiness, sources with
 * their auth results, and the TLS and failure reports.
 */
export type DomainDetailData = {
  summary: DomainSummary
  policy: PublishedDmarcPolicy | null
  trend: ComplianceTrend
  insights: DomainInsights
  /** Sources over the window the sources tab asked for. */
  sources: DomainSourceRow[]
  /** The sources tab window in days, undefined for all reports. */
  sourceDays: number | undefined
  tls: {
    summary: TlsDomainSummaryRow[]
    failures: TlsFailureSummaryRow[]
  }
  forensic: ForensicReportRow[]
  enforcement: EnforcementReadiness
}
