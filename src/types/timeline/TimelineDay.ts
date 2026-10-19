/** One UTC day of a domain's DMARC results. */
export type TimelineDay = {
  /** UTC day index, `floor(unixSeconds / 86400)`. */
  readonly day: number
  readonly total: number
  /** Messages aligned on SPF or DKIM. */
  readonly aligned: number
}
