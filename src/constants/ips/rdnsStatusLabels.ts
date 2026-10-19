import type { ForwardConfirmedRdns } from '@/types/ip-network'

/** What a failed forward-confirmed PTR check means, by status. */
export const RDNS_STATUS_LABELS: Record<
  ForwardConfirmedRdns['status'],
  string
> = {
  confirmed: 'Yes',
  mismatch: 'No: the PTR name does not resolve back',
  no_ptr: 'No PTR record',
  error: 'Lookup failed',
}
