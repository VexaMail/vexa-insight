/** Paging and filters of the date-filtered reports list. */
export type GetReportsInDateRangeParams = {
  page: number
  pageSize: number
  from?: Date | undefined
  to?: Date | undefined
  org?: string | undefined
  domain?: string | undefined
}
