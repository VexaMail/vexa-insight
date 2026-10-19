import type { IpSummaryData } from '@/types/ips'
import { describeShare } from './describeShare'

/** What the raw SPF results of a source show. */
export function describeSpfAuth(data: IpSummaryData): string {
  if (data.spfAuthPassCount === 0) {
    return 'SPF did not pass for any message: the envelope domain does not authorize this IP, or the check errored.'
  }
  return `SPF passed for ${describeShare(data.spfAuthPassCount, data.totalMessages)}, aligned or not.`
}
