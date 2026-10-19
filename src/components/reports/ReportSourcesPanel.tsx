import { EmptyState, Panel } from '@/components/ui'
import type { ReportSourcesPanelProps } from '@/types/reports'
import { sourceRowKey } from '@/utils/reports'
import { Network } from 'lucide-react'
import { ReportSourceCard } from './ReportSourceCard'
import { ReportSourceRow } from './ReportSourceRow'
import { ReportSourcesTableHeader } from './ReportSourcesTableHeader'

/** Every sending source of the report: auth result and alignment, apart. */
export function ReportSourcesPanel({
  sources,
}: Readonly<ReportSourcesPanelProps>) {
  return (
    <Panel
      title="Sending sources"
      description="Each IP that sent as the domain: the SPF and DKIM result, whether it aligns with the From domain, and what the receiver did. DMARC passes when either aligns."
      icon={<Network />}
      flush
    >
      {sources.length === 0 ? (
        <EmptyState className="m-4">
          No sending sources found for this report.
        </EmptyState>
      ) : (
        <>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <ReportSourcesTableHeader />
              <tbody className="divide-border divide-y">
                {sources.map((source) => (
                  <ReportSourceRow key={sourceRowKey(source)} source={source} />
                ))}
              </tbody>
            </table>
          </div>
          <ul className="divide-border divide-y md:hidden">
            {sources.map((source) => (
              <ReportSourceCard key={sourceRowKey(source)} source={source} />
            ))}
          </ul>
        </>
      )}
    </Panel>
  )
}
