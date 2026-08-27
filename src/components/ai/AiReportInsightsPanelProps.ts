export type AiReportInsightsPanelProps = {
  reportId: number
  isAiConfigured: boolean
  /** Gate: do not auto-trigger AI when the report has zero events. */
  hasEvents: boolean
}
