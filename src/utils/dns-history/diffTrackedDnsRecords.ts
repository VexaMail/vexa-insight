import type { DnsRecordChange, TrackedDnsRecords } from '@/types/dns-history'

/**
 * What differs between the last stored records and a fresh lookup. A kind
 * stored before but missing now is reported as removed (null), so a DKIM
 * selector that stops answering shows up as a change.
 */
export function diffTrackedDnsRecords(
  previous: TrackedDnsRecords,
  current: TrackedDnsRecords,
): DnsRecordChange[] {
  const kinds = new Set([...Object.keys(previous), ...Object.keys(current)])
  const changes: DnsRecordChange[] = []
  for (const recordKind of [...kinds].sort()) {
    const before = Object.hasOwn(previous, recordKind)
      ? previous[recordKind]
      : undefined
    const after = current[recordKind] ?? null
    if (before === undefined && after === null) continue
    if (before !== after) {
      changes.push({ recordKind, previous: before, current: after })
    }
  }
  return changes
}
