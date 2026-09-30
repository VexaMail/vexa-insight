import { FAILING_KIND_LABEL } from './failingKindLabel'
import type { FailingSourcesTableProps } from './FailingSourcesTableProps'

/** The sources with the most DMARC-failing mail and how each is read. */
export function FailingSourcesTable({ sources }: FailingSourcesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-muted-foreground text-left">
          <tr>
            <th className="py-2 pr-4 font-medium">Source</th>
            <th className="py-2 pr-4 font-medium">Sender</th>
            <th className="py-2 pr-4 font-medium">Reading</th>
            <th className="py-2 pr-4 text-right font-medium">Failing</th>
            <th className="py-2 text-right font-medium">Pass rate</th>
          </tr>
        </thead>
        <tbody>
          {sources.map((source) => (
            <tr key={source.sourceIp}>
              <td className="py-2 pr-4">
                <span className="font-mono">{source.sourceIp}</span>
                {source.hostname ? (
                  <span className="text-muted-foreground block text-xs">
                    {source.hostname}
                  </span>
                ) : null}
              </td>
              <td className="py-2 pr-4">{source.sender?.name ?? 'Unknown'}</td>
              <td className="py-2 pr-4">{FAILING_KIND_LABEL[source.kind]}</td>
              <td className="py-2 pr-4 text-right tabular-nums">
                {source.failingMessages.toLocaleString()}
              </td>
              <td className="py-2 text-right tabular-nums">
                {(source.passRate * 100).toFixed(0)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
