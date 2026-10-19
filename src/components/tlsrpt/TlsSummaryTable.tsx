import { TlsSummaryRow } from './TlsSummaryRow'
import type { TlsSummaryTableProps } from './TlsSummaryTableProps'

/** TLS session totals per reporting organisation and policy type. */
export function TlsSummaryTable({ rows }: TlsSummaryTableProps) {
  const head = 'px-3 py-2 font-medium'
  return (
    <div className="border-border overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <thead className="text-muted-foreground border-border border-b text-left text-xs">
          <tr>
            <th className={head}>Reporter</th>
            <th className={head}>Policy</th>
            <th className={`${head} text-right`}>Reports</th>
            <th className={`${head} text-right`}>Successful</th>
            <th className={`${head} text-right`}>Failed</th>
            <th className={`${head} text-right`}>Success rate</th>
            <th className={head}>Last report</th>
          </tr>
        </thead>
        <tbody className="divide-border text-foreground divide-y">
          {rows.map((row) => (
            <TlsSummaryRow key={`${row.orgName}|${row.policyType}`} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
