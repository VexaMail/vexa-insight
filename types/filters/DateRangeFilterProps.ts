export type DateRangeFilterProps = {
  /** Current selected days (e.g. 30). Used to highlight active preset. */
  currentDays: number
  /** Base path for links (e.g. /dashboard). Query param will be ?days=N */
  basePath: string
  /** From date for custom range */
  from?: Date | undefined
  /** To date for custom range */
  to?: Date | undefined
}
