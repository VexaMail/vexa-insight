/** Resolved filters of the latest-reports query, ready to become SQL. */
export type LatestReportsFilter = {
  allowedIds: number[] | null
  from?: Date | undefined
  to?: Date | undefined
  org?: string | undefined
  domainId?: number | undefined
}
