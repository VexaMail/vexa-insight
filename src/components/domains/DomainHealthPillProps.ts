export type DomainHealthPillProps = {
  readonly totalMessages: number
  readonly passRatePercent: number
  /** Last UTC day with report data; a stale one makes the band historical. */
  readonly lastReportDay?: number | null
}
