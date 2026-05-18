export type MetricsSnapshot = {
  domainsTotal: number
  ipAddressesTotal: number
  rawReportsTotal: number
  normalizedEventsTotal: number
  eventsBySpfAuth: Record<string, number>
  eventsByDisposition: Record<string, number>
  ingestLastRunTimestampSeconds: number | null
  ingestIsRunning: number
  ingestLastSuccessTotal: number
  ingestLastErrorCount: number
}
