export type ReportTransportSecurityPrimerProps = {
  /**
   * Domain names present in this aggregate report (informational only).
   * Used to remind operators to align MTA-STS MX entries with live MX hostnames.
   */
  readonly domainHints?: readonly string[]
}
