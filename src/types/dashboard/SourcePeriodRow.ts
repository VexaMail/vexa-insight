/**
 * One sending IP for one domain: messages and DMARC failures in the current
 * period, failures in the previous one, and when it last failed.
 */
export type SourcePeriodRow = {
  ip: string
  countryCode: string | null
  domainName: string
  currentTotal: number
  currentFailed: number
  previousFailed: number
  /** Report end of the newest failing record in the current period, unix seconds. */
  lastFailedAt: number | null
}
