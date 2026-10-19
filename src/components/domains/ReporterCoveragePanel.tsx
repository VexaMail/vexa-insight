import { Panel } from '@/components/ui'
import type { ReporterCoveragePanelProps } from '@/types/domains'
import { Radio } from 'lucide-react'
import { ReporterCoverageRow } from './ReporterCoverageRow'

/** Which receivers report on the domain, and which regular one went quiet. */
export function ReporterCoveragePanel({
  coverage,
}: Readonly<ReporterCoveragePanelProps>) {
  const silent = coverage.filter((row) => row.silent).length
  return (
    <Panel
      flush
      icon={<Radio />}
      title="Coverage by receiver"
      description={
        silent === 0
          ? 'Every receiver that reported here, newest first.'
          : `${String(silent)} regular receiver${silent === 1 ? '' : 's'} stopped reporting. Check the rua= address still accepts their mail.`
      }
    >
      <table className="w-full text-sm">
        <thead className="text-muted-foreground border-border border-b text-left text-xs">
          <tr>
            <th className="px-4 py-2 font-medium">Receiver</th>
            <th className="px-4 py-2 font-medium">Latest report</th>
            <th className="hidden px-4 py-2 text-right font-medium sm:table-cell">
              Reports (30 days)
            </th>
            <th className="px-4 py-2 text-right font-medium">State</th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {coverage.map((row) => (
            <ReporterCoverageRow key={row.orgName} row={row} />
          ))}
        </tbody>
      </table>
    </Panel>
  )
}
