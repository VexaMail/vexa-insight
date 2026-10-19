import type { IpDkimSignature, IpSummaryData } from '@/types/ips'
import { formatSignerList } from '../../formatters/ips/formatSignerList'
import { describeShare } from './describeShare'

/**
 * The trailing sentence for messages whose only valid DKIM signature came
 * from a domain other than From, or an empty string when there are none.
 */
export function describeForeignDkim(
  data: IpSummaryData,
  foreign: readonly IpDkimSignature[],
): string {
  if (data.dkimUnalignedPassCount === 0 || foreign.length === 0) return ''
  const share = describeShare(data.dkimUnalignedPassCount, data.totalMessages)
  return ` On ${share} the valid signature was from a different domain (${formatSignerList(foreign)}).`
}
