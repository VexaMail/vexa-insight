import type { IpAuthCheck, IpDkimSignature, IpSummaryData } from '@/types/ips'
import { buildIpAuthCheck } from './buildIpAuthCheck'
import { describeDkimAlignment } from './describeDkimAlignment'
import { describeDkimAuth } from './describeDkimAuth'
import { describeDmarcResult } from './describeDmarcResult'
import { describeSpfAlignment } from './describeSpfAlignment'
import { describeSpfAuth } from './describeSpfAuth'

/**
 * The five authentication facts of a source, kept apart and in this order:
 * SPF auth, DKIM auth, SPF alignment, DKIM alignment, the DMARC result.
 */
export function buildIpAuthChecks(
  data: IpSummaryData,
  signatures: readonly IpDkimSignature[],
): IpAuthCheck[] {
  const total = data.totalMessages
  return [
    buildIpAuthCheck({
      key: 'spf-auth',
      label: 'SPF authentication',
      count: data.spfAuthPassCount,
      total,
      detail: describeSpfAuth(data),
    }),
    buildIpAuthCheck({
      key: 'dkim-auth',
      label: 'DKIM authentication',
      count: data.dkimAuthPassCount,
      total,
      detail: describeDkimAuth(data, signatures),
    }),
    buildIpAuthCheck({
      key: 'spf-aligned',
      label: 'SPF alignment',
      count: data.spfPassCount,
      total,
      detail: describeSpfAlignment(data),
    }),
    buildIpAuthCheck({
      key: 'dkim-aligned',
      label: 'DKIM alignment',
      count: data.dkimPassCount,
      total,
      detail: describeDkimAlignment(data, signatures),
    }),
    buildIpAuthCheck({
      key: 'dmarc',
      label: 'Effective DMARC result',
      count: data.dmarcPassCount,
      total,
      detail: describeDmarcResult(data),
    }),
  ]
}
