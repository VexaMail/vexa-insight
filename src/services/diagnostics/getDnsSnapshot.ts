import { dnsSnapshotTtlMs } from '@/constants/diagnostics'
import type { DnsSnapshot } from '@/types/diagnostics'
import { getDomainDnsRecords } from './getDomainDnsRecords'
import { getReportedDkimSelectors } from './getReportedDkimSelectors'
import { withDiagnosticsCache } from './withDiagnosticsCache'

/** One domain's DNS run, reused for a few minutes by the diagnostics index. */
export async function getDnsSnapshot(
  domainId: number,
  domainName: string,
): Promise<DnsSnapshot> {
  return withDiagnosticsCache(
    `snapshot:${domainName}`,
    dnsSnapshotTtlMs,
    async () => {
      const checkedAt = new Date().toISOString()
      const selectors = await getReportedDkimSelectors(domainId, domainName)
      const dns = await getDomainDnsRecords(domainName, selectors)
      return { dns, checkedAt }
    },
    (snapshot) => snapshot.dns.nsRecords.length > 0,
  )
}
