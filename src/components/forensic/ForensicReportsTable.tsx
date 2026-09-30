import { formatRelativeDate } from '@/utils/format'
import type { ForensicReportsTableProps } from './ForensicReportsTableProps'

/** Recent failure reports: one identified message each. */
export function ForensicReportsTable({ rows }: ForensicReportsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-muted-foreground text-left">
          <tr>
            <th className="py-2 pr-4 font-medium">Arrived</th>
            <th className="py-2 pr-4 font-medium">Source IP</th>
            <th className="py-2 pr-4 font-medium">Failed</th>
            <th className="py-2 pr-4 font-medium">From / envelope</th>
            <th className="py-2 pr-4 font-medium">DKIM</th>
            <th className="py-2 pr-4 font-medium">List</th>
            <th className="py-2 font-medium">Reporter</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td className="py-2 pr-4 whitespace-nowrap">
                {formatRelativeDate(row.arrivalDate).absolute}
              </td>
              <td className="py-2 pr-4 font-mono">{row.sourceIp ?? '-'}</td>
              <td className="py-2 pr-4 font-mono">
                {row.authFailure ?? row.dmarcResult ?? '-'}
              </td>
              <td className="py-2 pr-4">
                {row.headerFromDomain ?? '-'} / {row.envelopeFromDomain ?? '-'}
              </td>
              <td className="py-2 pr-4 font-mono">
                {row.dkimDomain
                  ? `${row.dkimDomain}${row.dkimSelector ? ` (${row.dkimSelector})` : ''}`
                  : '-'}
              </td>
              <td className="py-2 pr-4">{row.listId ?? '-'}</td>
              <td className="py-2">{row.reportingMta ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
