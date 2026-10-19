import type { ForwardConfirmedRdns } from '@/types/ip-network'
import type { IpReputationStatus } from '@/types/ips'

/** Whether the PTR name resolves back to the address, as a context signal. */
export function describeFcrdns(
  rdns: ForwardConfirmedRdns | null,
): IpReputationStatus {
  if (!rdns)
    return { value: 'Not looked up', label: 'Unknown', tone: 'unknown' }
  if (rdns.status === 'confirmed')
    return { value: 'Yes', label: 'Matches', tone: 'success' }
  if (rdns.status === 'mismatch')
    return { value: 'No', label: 'Mismatch', tone: 'danger' }
  if (rdns.status === 'no_ptr')
    return { value: 'No PTR', label: 'Missing', tone: 'warning' }
  return { value: 'Lookup failed', label: 'Unknown', tone: 'unknown' }
}
