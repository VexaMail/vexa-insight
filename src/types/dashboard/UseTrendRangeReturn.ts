/** The trend chart's own range picker, kept in `?trend=`. */
export type UseTrendRangeReturn = {
  value: string
  select: (value: string) => void
}
