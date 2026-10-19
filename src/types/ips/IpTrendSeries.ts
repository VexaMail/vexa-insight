/** Daily series of a source for the KPI sparklines, oldest first. */
export type IpTrendSeries = {
  readonly volume: readonly number[]
  /** Daily pass rates in percent; 0 on a day without mail. */
  readonly spfAuth: readonly number[]
  readonly dkimAuth: readonly number[]
  readonly dmarc: readonly number[]
}
