import { StatusPill } from '@/components/ui'
import type { ReporterCoverageRowProps } from '@/types/domains'
import { formatUnixDateTime } from '@/utils/domains'

/** One receiver in the coverage table. */
export function ReporterCoverageRow({
  row,
}: Readonly<ReporterCoverageRowProps>) {
  const state = row.silent
    ? `Silent ${String(row.daysSilent)}d`
    : row.daysSilent <= 1
      ? 'Reporting'
      : `${String(row.daysSilent)}d ago`
  return (
    <tr className="h-11">
      <td className="text-foreground px-4 font-medium">{row.orgName}</td>
      <td className="text-muted-foreground px-4 font-mono text-xs">
        {formatUnixDateTime(row.lastReportEnd)}
      </td>
      <td className="hidden px-4 text-right font-mono tabular-nums sm:table-cell">
        {row.recentReportCount}
      </td>
      <td className="px-4 text-right">
        <StatusPill tone={row.silent ? 'warning' : 'success'} dot>
          {state}
        </StatusPill>
      </td>
    </tr>
  )
}
