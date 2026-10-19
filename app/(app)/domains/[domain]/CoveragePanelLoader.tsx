import { ReporterCoveragePanel } from '@/components/domains'
import { getReporterCoverage } from '@/services/gaps'
import type { DnsTabLoaderProps } from './DnsTabLoaderProps'

/** Receiver coverage for the Reports tab. */
export async function CoveragePanelLoader({
  domainName,
}: Readonly<DnsTabLoaderProps>) {
  return (
    <ReporterCoveragePanel coverage={await getReporterCoverage(domainName)} />
  )
}
