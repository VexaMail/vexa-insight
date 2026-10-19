import type { ReportDmarcOutcome } from '@/types/reports'

/** One-line reading of a report's DMARC totals, for a tooltip or label. */
export function describeDmarcOutcome({
  totalMessages,
  failingMessages,
}: ReportDmarcOutcome): string {
  if (totalMessages === 0) return 'No messages in this report'
  if (failingMessages === 0) {
    return `All ${totalMessages.toLocaleString('en-US')} messages pass DMARC`
  }
  return `${failingMessages.toLocaleString('en-US')} of ${totalMessages.toLocaleString('en-US')} messages fail DMARC`
}
