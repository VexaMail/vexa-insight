/** Daily (or bucketed) values behind each KPI sparkline, oldest first. */
export type KpiSeries = {
  messages: number[]
  passRate: number[]
  reportingDomains: number[]
  reports: number[]
}
