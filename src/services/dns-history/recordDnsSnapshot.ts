import { dnsSnapshots, getDb } from '@/lib/db'
import { getDomainDnsRecords } from '@/services/diagnostics'
import { fireAndForgetDispatch } from '@/services/notifications'
import type { DnsRecordChange, DnsSnapshotSource } from '@/types/dns-history'
import {
  diffTrackedDnsRecords,
  flattenTrackedDnsRecords,
} from '@/utils/dns-history'
import { getLatestDnsRecords } from './getLatestDnsRecords'

/**
 * Looks the domain up, stores every record that differs from the last stored
 * value, and announces `dns.record_changed` for each one that had a previous
 * value. The first snapshot of a domain is a baseline and announces nothing.
 */
export async function recordDnsSnapshot(
  domainName: string,
  source: DnsSnapshotSource,
  nowMs = Date.now(),
): Promise<DnsRecordChange[]> {
  const current = flattenTrackedDnsRecords(
    await getDomainDnsRecords(domainName),
  )
  const changes = diffTrackedDnsRecords(
    await getLatestDnsRecords(domainName),
    current,
  )
  if (changes.length === 0) return []
  const observedAt = Math.floor(nowMs / 1000)
  await getDb()
    .insert(dnsSnapshots)
    .values(
      changes.map((change) => ({
        domainName,
        recordKind: change.recordKind,
        value: change.current,
        observedAt,
        source,
      })),
    )
  for (const change of changes) {
    if (change.previous === undefined) continue
    fireAndForgetDispatch('dns.record_changed', {
      domain: domainName,
      record: change.recordKind,
      previous: change.previous,
      current: change.current,
    })
  }
  return changes
}
