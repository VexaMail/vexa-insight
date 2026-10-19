/** How many domains of the diagnostics index fall in each grade band. */
export type GradeBandCounts = {
  readonly total: number
  /** Grades D and F. */
  readonly poor: number
  /** Grade C. */
  readonly fair: number
  /** Grades A and B. */
  readonly good: number
  /** The NS lookup returned nothing, so there is no grade. */
  readonly unresolved: number
  /** Never checked yet, so there is nothing to grade. */
  readonly pending: number
}
