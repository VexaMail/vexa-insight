/**
 * Message totals of one report against DMARC. A message fails when neither
 * SPF nor DKIM is aligned, and passes only partially when exactly one is.
 */
export type ReportDmarcOutcome = {
  totalMessages: number
  failingMessages: number
  partiallyAlignedMessages: number
}
