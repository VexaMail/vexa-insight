/**
 * A parsed DMARC failure report (RFC 6591 ARF with the RFC 7489 section 7.3
 * extensions). Only identifiers are kept: addresses are reduced to their
 * domain, and neither the subject nor the body of the reported message is
 * stored, because they belong to third parties.
 */
export type ForensicReport = {
  reportedDomain: string
  feedbackType: string
  authFailure: string | null
  sourceIp: string | null
  reportingMta: string | null
  arrivalDate: number
  headerFromDomain: string | null
  envelopeFromDomain: string | null
  dkimDomain: string | null
  dkimSelector: string | null
  spfResult: string | null
  dkimResult: string | null
  dmarcResult: string | null
  originalMessageId: string | null
  listId: string | null
  sourceMessageId?: string | null
}
