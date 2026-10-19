import { EnforcementStageTrack } from '@/components/enforcement'
import { deriveEnforcementStages } from '@/utils/domains'
import { DomainDecisionRow } from './DomainDecisionRow'
import type { DomainDetailProps } from './DomainDetailProps'
import { DomainDetailTabs } from './DomainDetailTabs'
import { DomainReportsTab } from './DomainReportsTab'
import { DomainSourcesTab } from './DomainSourcesTab'
import { DomainTransportTab } from './DomainTransportTab'

export default function DomainDetail({
  domainId,
  domainName,
  data,
  tab,
  dnsSlot,
  coverageSlot,
  historySlot,
}: Readonly<DomainDetailProps>) {
  const stages = deriveEnforcementStages(data.policy, data.enforcement.verdict)
  return (
    <>
      <DomainDecisionRow domainName={domainName} data={data} />
      <EnforcementStageTrack stages={stages} />
      <div className="space-y-4">
        <DomainDetailTabs
          domainName={domainName}
          active={tab}
          sourceCount={data.sources.length}
          sourceDays={data.sourceDays}
        />
        {tab === 'sources' ? (
          <DomainSourcesTab domainId={domainId} data={data} />
        ) : null}
        {tab === 'dns' ? dnsSlot : null}
        {tab === 'reports' ? coverageSlot : null}
        {tab === 'history' ? historySlot : null}
        {tab === 'reports' ? (
          <DomainReportsTab
            domainId={domainId}
            domainName={domainName}
            summary={data.summary}
          />
        ) : null}
        {tab === 'transport' ? (
          <DomainTransportTab
            domainName={domainName}
            tls={data.tls}
            forensic={data.forensic}
          />
        ) : null}
      </div>
    </>
  )
}
