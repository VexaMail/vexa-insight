import {
  Panel,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui'
import { DiagnosticsOverviewCard } from './DiagnosticsOverviewCard'
import type { DiagnosticsOverviewTableProps } from './DiagnosticsOverviewTableProps'
import { DiagnosticsOverviewTableRow } from './DiagnosticsOverviewTableRow'

/** Every domain's score and protocol states, lowest score first. */
export function DiagnosticsOverviewTable({
  rows,
}: Readonly<DiagnosticsOverviewTableProps>) {
  return (
    <Panel
      flush
      title="Domains"
      description={`${String(rows.length)} domains, lowest score first. Each run is reused for up to 5 minutes; open a domain for a live run.`}
    >
      <div className="hidden md:block">
        <Table className="text-[13px]">
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">Domain</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Protocols</TableHead>
              <TableHead className="text-right">Need action</TableHead>
              <TableHead className="pr-4">Last checked</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <DiagnosticsOverviewTableRow key={row.domainName} row={row} />
            ))}
          </TableBody>
        </Table>
      </div>
      <ul className="divide-border divide-y md:hidden">
        {rows.map((row) => (
          <DiagnosticsOverviewCard key={row.domainName} row={row} />
        ))}
      </ul>
    </Panel>
  )
}
