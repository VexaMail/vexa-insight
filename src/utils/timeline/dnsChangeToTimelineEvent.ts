import type { DnsHistoryEntry } from '@/types/dns-history'
import type { TimelineEvent } from '@/types/timeline'
import { describeDnsRecordKind } from './describeDnsRecordKind'

/** A stored DNS change as a timeline entry linking to the diagnostics. */
export function dnsChangeToTimelineEvent(
  entry: DnsHistoryEntry,
  domainName: string,
): TimelineEvent {
  const label = describeDnsRecordKind(entry.recordKind)
  return {
    at: entry.observedAt,
    kind: 'dns_change',
    title:
      entry.value === null
        ? `${label} record removed`
        : `${label} record changed`,
    detail: entry.value,
    href: `/diagnostics/${encodeURIComponent(domainName)}`,
  }
}
