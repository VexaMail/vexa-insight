import { StatusPill } from '@/components/ui'
import { cn } from '@/lib/utils'
import { sndsFilterTone } from '@/utils/ips'
import { formatSndsRate, isSndsAlertRow } from '@/utils/snds'
import Link from 'next/link'
import type { SndsReputationRowProps } from './SndsReputationRowProps'

/** One IP's latest SNDS day, highlighted when it needs attention. */
export function SndsReputationRow({ row }: SndsReputationRowProps) {
  return (
    <tr className={cn('h-11', isSndsAlertRow(row) && 'bg-danger/5')}>
      <td className="px-4 py-2 font-mono">
        <Link
          href={`/ips/${encodeURIComponent(row.ip)}`}
          className="text-foreground hover:text-primary transition-colors duration-150"
        >
          {row.ip}
        </Link>
      </td>
      <td className="text-muted-foreground px-4 py-2 font-mono">
        {row.reportDate}
      </td>
      <td className="px-4 py-2">
        <StatusPill tone={sndsFilterTone(row.filterResult)} dot>
          {row.filterResult ?? 'n/a'}
        </StatusPill>
      </td>
      <td className="px-4 py-2 text-right font-mono tabular-nums">
        {row.messageRecipients?.toLocaleString('en-US') ?? '-'}
      </td>
      <td className="px-4 py-2 text-right font-mono tabular-nums">
        {formatSndsRate(row.complaintRate)}
      </td>
      <td className="px-4 py-2 text-right font-mono tabular-nums">
        {row.trapHits ?? 0}
      </td>
    </tr>
  )
}
