/** Filters of the dashboard's latest-reports query. */
export type GetLatestReportsParams = {
  limit?: number
  from?: Date | undefined
  to?: Date | undefined
  org?: string | undefined
  domain?: string | undefined
}
