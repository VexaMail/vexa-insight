import { TableCell, TableRow } from '@/components/ui'
import { countActionableFindings } from '@/utils/diagnostics'
import { formatRunAt } from '@/utils/format'
import type { DiagnosticsOverviewRowProps } from './DiagnosticsOverviewRowProps'
import { OverviewDomainLink } from './OverviewDomainLink'
import { OverviewProtocols } from './OverviewProtocols'
import { OverviewScore } from './OverviewScore'

export function DiagnosticsOverviewTableRow({
  row,
}: Readonly<DiagnosticsOverviewRowProps>) {
  return (
    <TableRow>
      <TableCell className="py-2.5 pl-4">
        <OverviewDomainLink row={row} />
      </TableCell>
      <TableCell className="py-2.5">
        <OverviewScore row={row} />
      </TableCell>
      <TableCell className="py-2.5">
        <OverviewProtocols row={row} />
      </TableCell>
      <TableCell className="text-muted-foreground py-2.5 text-right font-mono text-xs tabular-nums">
        {countActionableFindings(row.findings)}
      </TableCell>
      <TableCell className="text-muted-foreground py-2.5 pr-4 font-mono text-xs whitespace-nowrap">
        <time dateTime={row.checkedAt}>
          {formatRunAt(new Date(row.checkedAt))}
        </time>
      </TableCell>
    </TableRow>
  )
}
