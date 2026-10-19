import type { IpReputationStatus } from '@/types/ips'

/** Vexa runs no blocklist lookups; the row says so rather than guessing. */
export const DNSBL_NOT_CHECKED: IpReputationStatus = {
  value: 'Not checked',
  label: 'No lookup',
  tone: 'unknown',
}
