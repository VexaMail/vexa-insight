import { SndsReputationRow } from './SndsReputationRow'
import type { SndsReputationTableProps } from './SndsReputationTableProps'

/** The latest SNDS day for each IP. */
export function SndsReputationTable({ rows }: SndsReputationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-muted-foreground text-left">
          <tr>
            <th className="py-2 pr-4 font-medium">IP</th>
            <th className="py-2 pr-4 font-medium">Day</th>
            <th className="py-2 pr-4 font-medium">Filter</th>
            <th className="py-2 pr-4 text-right font-medium">Recipients</th>
            <th className="py-2 pr-4 text-right font-medium">Complaints</th>
            <th className="py-2 text-right font-medium">Trap hits</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <SndsReputationRow key={row.ip} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
