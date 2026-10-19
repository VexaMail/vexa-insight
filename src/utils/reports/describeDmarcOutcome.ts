import type { ReportDmarcOutcome } from '@/types/reports'

/** One-line reading of a report's DMARC totals, for a tooltip or label. */
export function describeDmarcOutcome({
  totalMessages,
  failingMessages,
  partiallyAlignedMessages,
}: ReportDmarcOutcome): string {
  const total = totalMessages.toLocaleString('en-US')
  if (totalMessages === 0) return 'No messages in this report'
  if (failingMessages > 0) {
    const noun = totalMessages === 1 ? 'message' : 'messages'
    const verb = failingMessages === 1 ? 'fails' : 'fail'
    return `${failingMessages.toLocaleString('en-US')} of ${total} ${noun} ${verb} DMARC`
  }
  if (partiallyAlignedMessages > 0) {
    if (totalMessages === 1) {
      return 'The only message passes DMARC, but aligns on SPF or DKIM only'
    }
    const verb = partiallyAlignedMessages === 1 ? 'aligns' : 'align'
    return `All ${total} messages pass DMARC, but ${partiallyAlignedMessages.toLocaleString('en-US')} ${verb} on SPF or DKIM only`
  }
  return totalMessages === 1
    ? 'The only message aligns on SPF and DKIM'
    : `All ${total} messages align on SPF and DKIM`
}
