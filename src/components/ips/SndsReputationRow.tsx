import {
  formatSndsRate,
  isSndsAlertRow,
  sndsFilterBadgeClass,
} from '@/utils/snds'
import type { SndsReputationRowProps } from './SndsReputationRowProps'

/** One IP's latest SNDS day, highlighted when it needs attention. */
export function SndsReputationRow({ row }: SndsReputationRowProps) {
  return (
    <tr className={isSndsAlertRow(row) ? 'bg-destructive/5' : undefined}>
      <td className="py-2 pr-4 font-mono">{row.ip}</td>
      <td className="py-2 pr-4">{row.reportDate}</td>
      <td className="py-2 pr-4">
        <span
          className={`rounded-md px-2 py-0.5 text-xs font-semibold ${sndsFilterBadgeClass(row.filterResult)}`}
        >
          {row.filterResult ?? 'n/a'}
        </span>
      </td>
      <td className="py-2 pr-4 text-right tabular-nums">
        {row.messageRecipients?.toLocaleString() ?? '-'}
      </td>
      <td className="py-2 pr-4 text-right tabular-nums">
        {formatSndsRate(row.complaintRate)}
      </td>
      <td className="py-2 text-right tabular-nums">{row.trapHits ?? 0}</td>
    </tr>
  )
}
