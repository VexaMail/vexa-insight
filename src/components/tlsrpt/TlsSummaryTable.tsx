import { formatRelativeDate, formatSessionSuccessRate } from '@/utils/format'
import type { TlsSummaryTableProps } from './TlsSummaryTableProps'

/** TLS session totals per reporting organisation and policy type. */
export function TlsSummaryTable({ rows }: TlsSummaryTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-muted-foreground text-left">
          <tr>
            <th className="py-2 pr-4 font-medium">Reporter</th>
            <th className="py-2 pr-4 font-medium">Policy</th>
            <th className="py-2 pr-4 text-right font-medium">Reports</th>
            <th className="py-2 pr-4 text-right font-medium">Successful</th>
            <th className="py-2 pr-4 text-right font-medium">Failed</th>
            <th className="py-2 pr-4 text-right font-medium">Success rate</th>
            <th className="py-2 font-medium">Last report</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={`${row.orgName}|${row.policyType}`}
              className={
                row.failedSessionCount > 0 ? 'bg-destructive/5' : undefined
              }
            >
              <td className="py-2 pr-4">{row.orgName}</td>
              <td className="py-2 pr-4 font-mono">{row.policyType}</td>
              <td className="py-2 pr-4 text-right tabular-nums">
                {row.reportCount.toLocaleString()}
              </td>
              <td className="py-2 pr-4 text-right tabular-nums">
                {row.successfulSessionCount.toLocaleString()}
              </td>
              <td className="py-2 pr-4 text-right tabular-nums">
                {row.failedSessionCount.toLocaleString()}
              </td>
              <td className="py-2 pr-4 text-right tabular-nums">
                {formatSessionSuccessRate(
                  row.successfulSessionCount,
                  row.failedSessionCount,
                )}
              </td>
              <td className="py-2">
                {formatRelativeDate(row.lastEndDate).absolute}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
