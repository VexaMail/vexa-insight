import { SndsReputationRow } from './SndsReputationRow'
import type { SndsReputationTableProps } from './SndsReputationTableProps'

/** The latest SNDS day for each IP; scrolls inside its panel on a phone. */
export function SndsReputationTable({ rows }: SndsReputationTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] text-[13px]">
        <thead className="text-muted-foreground border-border border-b text-left text-xs">
          <tr>
            <th className="px-4 py-2 font-medium">IP</th>
            <th className="px-4 py-2 font-medium">Day</th>
            <th className="px-4 py-2 font-medium">Filter</th>
            <th className="px-4 py-2 text-right font-medium">Recipients</th>
            <th className="px-4 py-2 text-right font-medium">Complaints</th>
            <th className="px-4 py-2 text-right font-medium">Trap hits</th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {rows.map((row) => (
            <SndsReputationRow key={row.ip} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
