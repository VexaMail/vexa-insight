/** DMARC pass rate over one window of reports. */
export type ComplianceWindow = {
  readonly total: number
  readonly passed: number
  /** Percent, null when the window has no messages. */
  readonly rate: number | null
}
