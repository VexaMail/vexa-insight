import DomainSourcesTable from './DomainSourcesTable'
import type { DomainSourcesTabProps } from './DomainSourcesTabProps'
import { EnforcementBlockers } from './EnforcementBlockers'
import { SourcesExportMenu } from './SourcesExportMenu'

/** Every sending source with its results, then what blocks enforcement. */
export function DomainSourcesTab({
  domainId,
  domainName,
  data,
}: Readonly<DomainSourcesTabProps>) {
  const window =
    data.sourceDays == null
      ? 'all reports'
      : `the last ${String(data.sourceDays)} days`
  return (
    <div className="space-y-4">
      <section id="sources-table" className="scroll-mt-20 space-y-3">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-foreground text-lg font-semibold">
              Sending sources
            </h2>
            <p className="text-muted-foreground text-sm">
              Every IP that sent mail as {domainName} in {window}, with its
              aligned SPF, DKIM and DMARC results and its classification. Hover
              or tap a badge for the authentication result.
            </p>
          </div>
          <SourcesExportMenu domainId={domainId} days={data.sourceDays} />
        </header>
        <DomainSourcesTable sources={data.sources} days={data.sourceDays} />
      </section>
      <EnforcementBlockers
        domainName={domainName}
        readiness={data.enforcement}
      />
    </div>
  )
}
