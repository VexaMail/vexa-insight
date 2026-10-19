import { ForensicReportTableRow } from './ForensicReportTableRow'
import type { ForensicReportsTableProps } from './ForensicReportsTableProps'

/** Recent failure reports: one identified message each. */
export function ForensicReportsTable({ rows }: ForensicReportsTableProps) {
  const head = 'px-3 py-2 font-medium'
  return (
    <div className="border-border overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="text-muted-foreground border-border border-b text-left text-xs">
          <tr>
            <th className={head}>Arrived</th>
            <th className={head}>Source IP</th>
            <th className={head}>Failed</th>
            <th className={head}>From / envelope</th>
            <th className={head}>DKIM</th>
            <th className={head}>List</th>
            <th className={head}>Reporter</th>
          </tr>
        </thead>
        <tbody className="divide-border text-foreground divide-y">
          {rows.map((row) => (
            <ForensicReportTableRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
