/** The envelope fields the ingest pipeline reports and stores for a message. */
export type EnvelopeSummary = {
  readonly subject: string | undefined
  readonly emailDate: string | undefined
  readonly messageId: string
}
