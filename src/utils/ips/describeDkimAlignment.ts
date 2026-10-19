import type { IpDkimSignature, IpSummaryData } from '@/types/ips'
import { formatSignerList } from '../../formatters/ips/formatSignerList'
import { describeForeignDkim } from './describeForeignDkim'
import { describeShare } from './describeShare'

/**
 * Whether the valid DKIM signatures belong to the From domain. "Signed by a
 * different domain" is said only when a verified, unaligned signature exists.
 */
export function describeDkimAlignment(
  data: IpSummaryData,
  signatures: readonly IpDkimSignature[],
): string {
  const foreign = signatures.filter(
    (sig) => sig.result === 'pass' && !sig.isAligned,
  )
  if (data.dkimPassCount === 0 && foreign.length > 0) {
    return `DKIM signature valid but signed by a different domain (${formatSignerList(foreign)}).`
  }
  if (data.dkimPassCount === 0)
    return 'No DKIM signature passed aligned with the From domain.'
  const aligned = signatures.filter(
    (sig) => sig.result === 'pass' && sig.isAligned,
  )
  const signer = aligned.length > 0 ? ` (${formatSignerList(aligned)})` : ''
  return `DKIM passed aligned with From${signer} on ${describeShare(data.dkimPassCount, data.totalMessages)}.${describeForeignDkim(data, foreign)}`
}
