/** What the job-run log says about one configured IMAP mailbox. */
export type MailboxHealth = {
  readonly id: number
  /** The account label, or its server when it has none. */
  readonly name: string
  /** Last poll event without an error. */
  readonly lastSuccessAt: Date | null
  readonly lastErrorAt: Date | null
  readonly lastError: string | null
}
