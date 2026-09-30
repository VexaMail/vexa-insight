import type { TlsDomainSummaryRow, TlsFailureSummaryRow } from '@/types/tlsrpt'

export type TlsReportsSectionProps = {
  readonly domainName: string
  readonly summary: TlsDomainSummaryRow[]
  readonly failures: TlsFailureSummaryRow[]
}
