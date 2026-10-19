import { FailingSourceRow } from './FailingSourceRow'
import type { FailingSourcesTableProps } from './FailingSourcesTableProps'

/** The sources with the most DMARC-failing mail and how each is read. */
export function FailingSourcesTable({ sources }: FailingSourcesTableProps) {
  return (
    <div className="border-border overflow-x-auto rounded-md border">
      <table className="w-full text-sm">
        <caption className="text-muted-foreground px-3 py-2 text-left text-xs">
          Top failing sources in the window
        </caption>
        <thead className="text-muted-foreground border-border border-y text-left text-xs">
          <tr>
            <th className="px-3 py-2 font-medium">Source</th>
            <th className="px-3 py-2 font-medium">Sender</th>
            <th className="px-3 py-2 font-medium">Reading</th>
            <th className="px-3 py-2 text-right font-medium">Failing</th>
            <th className="px-3 py-2 text-right font-medium">
              DMARC pass rate
            </th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {sources.map((source) => (
            <FailingSourceRow key={source.sourceIp} source={source} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
