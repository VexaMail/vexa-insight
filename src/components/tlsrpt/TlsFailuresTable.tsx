import { formatRelativeDate } from '@/utils/format'
import type { TlsFailuresTableProps } from './TlsFailuresTableProps'

/** Failed TLS sessions per failure result type and receiving MX. */
export function TlsFailuresTable({ rows }: TlsFailuresTableProps) {
  return (
    <div className="border-border overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <caption className="text-muted-foreground px-3 py-2 text-left text-xs">
          Failed sessions by result type and receiving MX
        </caption>
        <thead className="text-muted-foreground border-border border-y text-left text-xs">
          <tr>
            <th className="px-3 py-2 font-medium">Result type</th>
            <th className="px-3 py-2 font-medium">Receiving MX</th>
            <th className="px-3 py-2 text-right font-medium">
              Failed sessions
            </th>
            <th className="px-3 py-2 font-medium">Last seen</th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {rows.map((row) => (
            <tr key={`${row.resultType}|${row.receivingMxHostname ?? ''}`}>
              <td className="text-danger px-3 py-2 font-mono">
                {row.resultType}
              </td>
              <td className="text-foreground px-3 py-2 font-mono">
                {row.receivingMxHostname ?? '-'}
              </td>
              <td className="text-foreground px-3 py-2 text-right font-mono tabular-nums">
                {row.failedSessionCount.toLocaleString('en-US')}
              </td>
              <td className="text-muted-foreground px-3 py-2 whitespace-nowrap">
                {formatRelativeDate(row.lastEndDate).absolute}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
