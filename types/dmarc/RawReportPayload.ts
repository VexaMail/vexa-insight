/**
 * Payload for inserting a raw report (no id, no ingestedAt; those are set by the store).
 */
export type RawReportPayload = {
  reportId: string
  orgName: string
  beginDate: number
  endDate: number
  rawXml: string
  sourceEmail: string | null
  sourceMessageId?: string
}
