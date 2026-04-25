/**
 * One point in the pass/fail trend time series.
 */
export type TrendDataPoint = {
  date: string
  passed: number
  failed: number
}
