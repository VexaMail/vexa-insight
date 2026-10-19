import { formatRelativeDate, formatSessionSuccessRate } from '@/utils/format'
import type { TlsSummaryRowProps } from './TlsSummaryRowProps'

/** TLS session totals of one reporter and policy type. */
export function TlsSummaryRow({ row }: Readonly<TlsSummaryRowProps>) {
  const num = 'px-3 py-2 text-right font-mono tabular-nums'
  const failed = row.failedSessionCount > 0
  return (
    <tr className={failed ? 'bg-danger/5' : undefined}>
      <td className="px-3 py-2">{row.orgName}</td>
      <td className="px-3 py-2 font-mono">{row.policyType}</td>
      <td className={num}>{row.reportCount.toLocaleString('en-US')}</td>
      <td className={num}>
        {row.successfulSessionCount.toLocaleString('en-US')}
      </td>
      <td className={failed ? `${num} text-danger` : num}>
        {row.failedSessionCount.toLocaleString('en-US')}
      </td>
      <td className={num}>
        {formatSessionSuccessRate(
          row.successfulSessionCount,
          row.failedSessionCount,
        )}
      </td>
      <td className="text-muted-foreground px-3 py-2 whitespace-nowrap">
        {formatRelativeDate(row.lastEndDate).absolute}
      </td>
    </tr>
  )
}
