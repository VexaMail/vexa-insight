import type { IpDkimSignature, IpSummaryData } from '@/types/ips'
import { formatSignerList } from '../../formatters/ips/formatSignerList'
import { describeShare } from './describeShare'

/** Which DKIM signers were seen and whether their signatures verified. */
export function describeDkimAuth(
  data: IpSummaryData,
  signatures: readonly IpDkimSignature[],
): string {
  if (signatures.length === 0)
    return 'Receivers reported no DKIM signature for this source.'
  const valid = signatures.filter((sig) => sig.result === 'pass')
  if (valid.length === 0) {
    return `Signatures from ${formatSignerList(signatures)} did not verify.`
  }
  return `Valid signature from ${formatSignerList(valid)} on ${describeShare(data.dkimAuthPassCount, data.totalMessages)}.`
}
