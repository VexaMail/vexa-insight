import { RDNS_STATUS_LABELS } from '@/constants/ips'
import type { ForwardConfirmedRdns } from '@/types/ip-network'

/** Whether the PTR name resolves back to the address, in a few words. */
export function describeRdnsStatus(rdns: ForwardConfirmedRdns): string {
  if (rdns.status === 'confirmed' && rdns.confirmedName) {
    return `Confirmed, ${rdns.confirmedName}`
  }
  return RDNS_STATUS_LABELS[rdns.status]
}
