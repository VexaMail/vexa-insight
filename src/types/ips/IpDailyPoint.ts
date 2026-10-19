/** One UTC day of a source's mail: volume and the passing message counts. */
export type IpDailyPoint = {
  /** `floor(reportEndDate / 86400)`, the UTC day index. */
  readonly day: number
  readonly total: number
  readonly spfAuthPass: number
  readonly dkimAuthPass: number
  readonly dmarcPass: number
}
