import type { DomainSource, DomainSummary } from '@/types/reports'
import type { TlsDomainSummaryRow, TlsFailureSummaryRow } from '@/types/tlsrpt'

/**
 * Combined domain detail data (summary + stats + sources + TLS reports).
 */
export type DomainDetailData = {
  summary: DomainSummary
  stats: {
    totalMessages: number
    passedCount: number
    failedCount: number
    passRatePercent: number
  }
  sources: DomainSource[]
  tls: {
    summary: TlsDomainSummaryRow[]
    failures: TlsFailureSummaryRow[]
  }
}
