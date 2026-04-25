/**
 * Raw report row as returned from DB for list/detail.
 */
export type ReportRow = {
  id: number
  reportId: string
  orgName: string
  beginDate: number
  endDate: number
  sourceEmail: string | null
  ingestedAt: Date
  relatedDomains?: { domainId: number; domainName: string }[]
}
