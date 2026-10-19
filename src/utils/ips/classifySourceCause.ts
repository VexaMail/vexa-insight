import { SOURCE_CAUSE_FAIL_RATE, SOURCE_CAUSE_PASS_RATE } from '@/constants/ips'
import type { IpSummaryData, SourceCause } from '@/types/ips'

/**
 * Classifies a source by why it passes or fails DMARC. Only stored results
 * are used: aligned SPF and DKIM from the policy evaluation, raw SPF from the
 * auth results. A pass resting on DKIM alone is split by whether SPF failed
 * (forwarding) or passed for another domain.
 */
export function classifySourceCause(ip: IpSummaryData): SourceCause {
  if (ip.totalMessages === 0) return 'unknown'
  if (ip.dmarcPassRate <= SOURCE_CAUSE_FAIL_RATE) return 'failing'
  if (ip.dmarcPassRate < SOURCE_CAUSE_PASS_RATE) return 'unknown'
  const restsOnDkim =
    ip.dkimPassRate >= SOURCE_CAUSE_PASS_RATE &&
    ip.spfPassRate < SOURCE_CAUSE_PASS_RATE
  if (!restsOnDkim) return 'dmarc-pass'
  return ip.spfAuthPassRate < 50 ? 'forwarding' : 'spf-unaligned'
}
