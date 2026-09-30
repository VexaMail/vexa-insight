import type { TlsFailureDetail } from './TlsFailureDetail'

/**
 * One `policies[]` entry of a TLS-RPT report: the policy the sender applied
 * (`sts`, `tlsa` or `no-policy-found`) and the session counts under it.
 */
export type TlsReportPolicy = {
  policyType: string
  policyDomain: string
  mxHosts: string[]
  successfulSessionCount: number
  failedSessionCount: number
  failureDetails: TlsFailureDetail[]
}
