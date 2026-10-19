/** A count in the current period next to the same count one period earlier. */
export type CountComparison = {
  current: number
  /** Null when there is no previous period (all-time range). */
  previous: number | null
}
