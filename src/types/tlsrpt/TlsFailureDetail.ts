/**
 * One `failure-details[]` entry of a TLS-RPT policy (RFC 8460 section 4.4):
 * a class of failed sessions between one sending MTA and one receiving MX.
 */
export type TlsFailureDetail = {
  resultType: string
  sendingMtaIp: string | null
  receivingMxHostname: string | null
  receivingIp: string | null
  failedSessionCount: number
  failureReasonCode: string | null
}
