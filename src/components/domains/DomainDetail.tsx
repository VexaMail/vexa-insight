import { DispositionChartDisplay } from '@/components/charts'
import { EnforcementReadinessCard } from '@/components/enforcement'
import { ForensicReportsSection } from '@/components/forensic'
import { ReportsTable } from '@/components/reports'
import { TlsReportsSection } from '@/components/tlsrpt'
import type { DomainDetailProps } from './DomainDetailProps'
import { DomainSection } from './DomainSection'
import DomainSourcesTable from './DomainSourcesTable'
import DomainStatsCard from './DomainStatsCard'

export default function DomainDetail({
  domainId,
  domainName,
  data,
}: Readonly<DomainDetailProps>) {
  const { stats, sources, tls, forensic, enforcement } = data

  return (
    <>
      <DomainStatsCard
        totalMessages={stats.totalMessages}
        passedCount={stats.passedCount}
        failedCount={stats.failedCount}
        passRatePercent={stats.passRatePercent}
      />
      <DomainSection id="disposition" title="Pass vs fail">
        <DispositionChartDisplay
          passed={stats.passedCount}
          failed={stats.failedCount}
        />
      </DomainSection>
      <EnforcementReadinessCard readiness={enforcement} />
      <DomainSection id="sources" title="Sources (IP, count)">
        <DomainSourcesTable
          sources={sources}
          csvHref={`/api/v1/domains/${String(domainId)}/sources?format=csv`}
        />
      </DomainSection>
      <TlsReportsSection domainName={domainName} {...tls} />
      <ForensicReportsSection rows={forensic} />
      <DomainSection id="reports" title="Associated Reports">
        <ReportsTable domainId={domainId} domainName={domainName} />
      </DomainSection>
    </>
  )
}
