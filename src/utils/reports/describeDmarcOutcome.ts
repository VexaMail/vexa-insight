import type { ReportDmarcOutcome } from '@/types/reports'

/** One-line reading of a report's DMARC totals, for a tooltip or label. */
export function describeDmarcOutcome({
  totalMessages,
  failingMessages,
}: ReportDmarcOutcome): string {
  const total = totalMessages.toLocaleString('en-US')
  if (totalMessages === 0) return 'No messages in this report'
  if (failingMessages === 0) {
    return totalMessages === 1
      ? 'The only message passes DMARC'
      : `All ${total} messages pass DMARC`
  }
  const noun = totalMessages === 1 ? 'message' : 'messages'
  const verb = failingMessages === 1 ? 'fails' : 'fail'
  return `${failingMessages.toLocaleString('en-US')} of ${total} ${noun} ${verb} DMARC`
}
