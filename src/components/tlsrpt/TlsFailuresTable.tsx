import { formatRelativeDate } from '@/utils/format'
import type { TlsFailuresTableProps } from './TlsFailuresTableProps'

/** Failed TLS sessions per failure result type and receiving MX. */
export function TlsFailuresTable({ rows }: TlsFailuresTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-muted-foreground text-left">
          <tr>
            <th className="py-2 pr-4 font-medium">Result type</th>
            <th className="py-2 pr-4 font-medium">Receiving MX</th>
            <th className="py-2 pr-4 text-right font-medium">
              Failed sessions
            </th>
            <th className="py-2 font-medium">Last seen</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.resultType}|${row.receivingMxHostname ?? ''}`}>
              <td className="py-2 pr-4 font-mono">{row.resultType}</td>
              <td className="py-2 pr-4 font-mono">
                {row.receivingMxHostname ?? '-'}
              </td>
              <td className="py-2 pr-4 text-right tabular-nums">
                {row.failedSessionCount.toLocaleString()}
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
