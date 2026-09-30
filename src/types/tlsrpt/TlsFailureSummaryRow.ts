/**
 * Failed sessions for one policy domain, grouped by failure result type and
 * receiving MX, as shown on the domain page.
 */
export type TlsFailureSummaryRow = {
  resultType: string
  receivingMxHostname: string | null
  failedSessionCount: number
  lastEndDate: number
}
