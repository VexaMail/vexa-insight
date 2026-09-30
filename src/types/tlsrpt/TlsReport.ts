import type { TlsReportPolicy } from './TlsReportPolicy'

/**
 * A parsed SMTP TLS report (RFC 8460). Dates are Unix seconds, like the
 * aggregate reports, so both kinds sort and filter the same way.
 */
export type TlsReport = {
  reportId: string
  orgName: string
  contactInfo: string | null
  beginDate: number
  endDate: number
  policies: TlsReportPolicy[]
  rawJson: string
  sourceMessageId?: string | null
}
