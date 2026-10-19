import type { DiagnosticsOverviewCheck } from '@/types/diagnostics'
import { buildDiagnosticsOverviewCheck } from './buildDiagnosticsOverviewCheck'
import { getDomainDnsRecords } from './getDomainDnsRecords'
import { getReportedDkimSelectors } from './getReportedDkimSelectors'
import { storeDiagnosticsOverviewCheck } from './storeDiagnosticsOverviewCheck'

/** Runs one domain's DNS checks now and stores the outcome for the index. */
export async function runDiagnosticsOverviewCheck(
  domainId: number,
  domainName: string,
): Promise<DiagnosticsOverviewCheck> {
  const checkedAt = new Date().toISOString()
  const selectors = await getReportedDkimSelectors(domainId, domainName)
  const dns = await getDomainDnsRecords(domainName, selectors)
  const check = buildDiagnosticsOverviewCheck({ dns, checkedAt })
  await storeDiagnosticsOverviewCheck(domainId, check)
  return check
}
