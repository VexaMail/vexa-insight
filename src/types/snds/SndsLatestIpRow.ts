/** The most recent stored SNDS day for one IP, as the UI shows it. */
export type SndsLatestIpRow = {
  readonly ip: string
  readonly reportDate: string
  readonly filterResult: string | null
  readonly complaintRate: number | null
  readonly trapHits: number | null
  readonly messageRecipients: number | null
}
