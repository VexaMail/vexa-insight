/**
 * Session totals for one policy domain, grouped by reporting organisation
 * and policy type, as shown on the domain page.
 */
export type TlsDomainSummaryRow = {
  orgName: string
  policyType: string
  reportCount: number
  successfulSessionCount: number
  failedSessionCount: number
  lastEndDate: number
}
