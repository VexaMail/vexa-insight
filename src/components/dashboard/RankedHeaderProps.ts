export type RankedHeaderProps = {
  /** One label per column; an empty string leaves the column unlabelled. */
  readonly labels: readonly string[]
  /** Indexes of the numeric columns, which are right-aligned. */
  readonly rightAligned: readonly number[]
  /** Column template; must match the rows below it. */
  readonly gridClassName: string
}
