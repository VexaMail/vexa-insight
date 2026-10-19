/** What ingesting the attachments of one message produced. */
export type MessageIngestOutcome = {
  ingested: number
  skipped: number
  errors: string[]
}
