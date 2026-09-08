import { ReportSourceRow } from './ReportSourceRow'
import { ReportSourcesTableHeader } from './ReportSourcesTableHeader'
import type { ReportSourcesTableProps } from './ReportSourcesTableProps'

export function ReportSourcesTable({
  sources,
}: Readonly<ReportSourcesTableProps>) {
  if (sources.length === 0) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-800">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          No sending sources found for this report.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        Sending Sources
      </h2>
      <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
        <table className="w-full text-sm">
          <ReportSourcesTableHeader />
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
            {sources.map((source) => (
              <ReportSourceRow
                key={`${source.ip}-${source.spfResult}-${source.dkimResult}`}
                source={source}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
