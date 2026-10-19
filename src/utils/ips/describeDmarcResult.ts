import type { IpSummaryData } from '@/types/ips'
import { describeShare } from './describeShare'

/** The DMARC outcome and which identifier carried it. */
export function describeDmarcResult(data: IpSummaryData): string {
  if (data.dmarcPassCount === 0) {
    return 'Fails DMARC: neither SPF nor DKIM passed aligned with From.'
  }
  if (data.dmarcPassCount < data.totalMessages) {
    return `Passes DMARC on ${describeShare(data.dmarcPassCount, data.totalMessages)}; the rest had neither identifier aligned.`
  }
  if (data.spfPassCount === 0)
    return 'Passes DMARC on DKIM alone; SPF never aligned.'
  if (data.dkimPassCount === 0)
    return 'Passes DMARC on SPF alone; DKIM never aligned.'
  return 'Passes DMARC on every message.'
}
