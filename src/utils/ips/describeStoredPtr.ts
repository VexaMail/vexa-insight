import type { IpReputationStatus } from '@/types/ips'

/** Whether a PTR name was stored for the source when it was enriched. */
export function describeStoredPtr(hostname: string | null): IpReputationStatus {
  return hostname
    ? { value: hostname, label: 'Present', tone: 'success' }
    : { value: 'None', label: 'Missing', tone: 'warning' }
}
