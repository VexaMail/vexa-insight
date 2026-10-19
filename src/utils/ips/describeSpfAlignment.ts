import type { IpSummaryData } from '@/types/ips'
import { describeShare } from './describeShare'

/** Whether SPF passed for the From domain or for another one. */
export function describeSpfAlignment(data: IpSummaryData): string {
  if (data.spfUnalignedPassCount > 0) {
    return `SPF passed for a domain other than From on ${describeShare(data.spfUnalignedPassCount, data.totalMessages)}, so it does not count for DMARC there.`
  }
  if (data.spfPassCount === 0)
    return 'SPF never passed aligned with the From domain.'
  return `SPF passed aligned with From on ${describeShare(data.spfPassCount, data.totalMessages)}.`
}
