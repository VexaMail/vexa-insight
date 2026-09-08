/** Query inputs for one page of GET /api/v1/reports. */
export type FetchReportsParams = {
  page: number
  pageSize: number
  /** Already-encoded date filter query string. */
  dateFilterParams: string
  org: string
  domain: string
  domainId: number | undefined
}
