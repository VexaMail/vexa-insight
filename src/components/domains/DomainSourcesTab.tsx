import { EnforcementReadinessCard } from '@/components/enforcement'
import { sourcesCsvHref } from '@/utils/domains'
import DomainSourcesTable from './DomainSourcesTable'
import type { DomainSourcesTabProps } from './DomainSourcesTabProps'

/** Every sending source with its auth results, then the readiness detail. */
export function DomainSourcesTab({
  domainId,
  data,
}: Readonly<DomainSourcesTabProps>) {
  const window =
    data.sourceDays == null
      ? 'all reports'
      : `the last ${String(data.sourceDays)} days`
  return (
    <div className="space-y-6">
      <section id="sources-table" className="scroll-mt-20 space-y-3">
        <p className="text-muted-foreground text-xs">
          Every IP that sent mail as this domain in {window}. SPF and DKIM pills
          show whether the result aligned with the From domain; the
          authentication result shows under the pill when it differs.
        </p>
        <DomainSourcesTable
          sources={data.sources}
          csvHref={sourcesCsvHref(domainId, data.sourceDays)}
          days={data.sourceDays}
        />
      </section>
      <EnforcementReadinessCard readiness={data.enforcement} />
    </div>
  )
}
