import type { DnsDiagnostics } from '@/types/diagnostics'
import { getDomainDnsRecords } from './getDomainDnsRecords'
import { getReportedDkimSelectors } from './getReportedDkimSelectors'

/** Use the monitored sender's observed selectors in every private DNS view. */
export async function getMonitoredDomainDnsRecords(
  domainId: number,
  domainName: string,
): Promise<DnsDiagnostics> {
  const selectors = await getReportedDkimSelectors(domainId, domainName)
  return getDomainDnsRecords(domainName, selectors)
}
