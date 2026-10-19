import type { BuildIpAuthCheckParams, IpAuthCheck } from '@/types/ips'
import { computeRate } from './computeRate'
import { rateVerdict } from './rateVerdict'

/** One authentication fact with its rate and verdict. */
export function buildIpAuthCheck({
  key,
  label,
  count,
  total,
  detail,
}: BuildIpAuthCheckParams): IpAuthCheck {
  const rate = computeRate(count, total)
  return {
    key,
    label,
    count,
    rate,
    verdict: rateVerdict(rate, total),
    detail:
      total === 0 ? 'No messages from this source in the window.' : detail,
  }
}
