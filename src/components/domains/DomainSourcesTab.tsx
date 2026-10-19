import { EnforcementReadinessCard } from '@/components/enforcement'
import { Panel } from '@/components/ui'
import { sourcesCsvHref } from '@/utils/domains'
import { Server } from 'lucide-react'
import DomainSourcesTable from './DomainSourcesTable'
import type { DomainSourcesTabProps } from './DomainSourcesTabProps'

/** Readiness detail, then every sending source with its auth results. */
export function DomainSourcesTab({
  domainId,
  data,
}: Readonly<DomainSourcesTabProps>) {
  const window =
    data.sourceDays == null
      ? 'all reports'
      : `the last ${String(data.sourceDays)} days`
  return (
    <div className="space-y-4">
      <EnforcementReadinessCard readiness={data.enforcement} />
      <div id="sources-table" className="scroll-mt-20">
        <Panel
          icon={<Server />}
          title="Sending sources"
          description={`Every IP that sent mail as this domain in ${window}. SPF and DKIM show the authentication result and, separately, whether it aligned with the From domain.`}
        >
          <DomainSourcesTable
            sources={data.sources}
            csvHref={sourcesCsvHref(domainId, data.sourceDays)}
            days={data.sourceDays}
          />
        </Panel>
      </div>
    </div>
  )
}
