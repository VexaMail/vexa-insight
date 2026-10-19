import { StatusPill } from '@/components/ui'
import type { ReporterCoverageRowProps } from '@/types/domains'
import { formatUnixDateTime } from '@/utils/domains'
import { formatTimeAgo, SECONDS_PER_DAY } from '@/utils/format'
import { ToneIcon } from './ToneIcon'

/** One receiver in the coverage table. */
export function ReporterCoverageRow({
  row,
}: Readonly<ReporterCoverageRowProps>) {
  const state = row.silent
    ? `Silent ${String(row.daysSilent)} ${row.daysSilent === 1 ? 'day' : 'days'}`
    : row.daysSilent <= 1
      ? 'Reporting'
      : formatTimeAgo(row.daysSilent * SECONDS_PER_DAY)
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
        <StatusPill
          tone={row.silent ? 'warning' : 'success'}
          icon={<ToneIcon tone={row.silent ? 'warning' : 'success'} />}
        >
          {state}
        </StatusPill>
      </td>
    </tr>
  )
}
