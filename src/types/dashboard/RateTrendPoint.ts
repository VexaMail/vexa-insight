/** DMARC pass and fail share of one report day; null on a day without data. */
export type RateTrendPoint = {
  date: string
  passRate: number | null
  failRate: number | null
  total: number
}
