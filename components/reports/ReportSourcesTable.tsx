import { IpDisplay } from '@/components/ips'
import { AlignmentIndicator } from './AlignmentIndicator'
import { deriveSourceSeverity } from './deriveSourceSeverity'
import type { ReportSourcesTableProps } from './ReportSourcesTableProps'
import { SourceSeverityDot } from './SourceSeverityDot'
import { SpfDkimBadge } from './SpfDkimBadge'

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
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50">
              <th className="px-3 py-2 text-left font-medium text-zinc-500 dark:text-zinc-400">
                <span className="sr-only">Severity</span>
              </th>
              <th className="px-3 py-2 text-left font-medium text-zinc-500 dark:text-zinc-400">
                Source IP
              </th>
              <th className="px-3 py-2 text-left font-medium text-zinc-500 dark:text-zinc-400">
                Hostname
              </th>
              <th className="px-3 py-2 text-right font-medium text-zinc-500 dark:text-zinc-400">
                Messages
              </th>
              <th className="px-3 py-2 text-center font-medium text-zinc-500 dark:text-zinc-400">
                SPF
              </th>
              <th className="px-3 py-2 text-center font-medium text-zinc-500 dark:text-zinc-400">
                DKIM
              </th>
              <th className="px-3 py-2 text-center font-medium text-zinc-500 dark:text-zinc-400">
                Alignment
              </th>
              <th className="px-3 py-2 text-left font-medium text-zinc-500 dark:text-zinc-400">
                Disposition
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-700">
            {sources.map((source) => {
              const severity = deriveSourceSeverity(
                source.spfAligned,
                source.dkimAligned,
              )
              const isRowCritical = severity === 'critical'

              return (
                <tr
                  key={`${source.ip}-${source.spfResult}-${source.dkimResult}`}
                  className={
                    isRowCritical
                      ? 'bg-red-50/50 dark:bg-red-950/20'
                      : 'bg-white dark:bg-zinc-800'
                  }
                >
                  <td className="px-3 py-2">
                    <SourceSeverityDot
                      spfAligned={source.spfAligned}
                      dkimAligned={source.dkimAligned}
                    />
                  </td>
                  <td className="px-3 py-2 font-mono text-sm text-zinc-900 dark:text-zinc-50">
                    <IpDisplay
                      ip={source.ip}
                      countryCode={source.countryCode}
                      layout="inline"
                      showHostname={false}
                    />
                  </td>
                  <td
                    className="max-w-[200px] truncate px-3 py-2 text-zinc-600 dark:text-zinc-400"
                    title={source.hostname ?? undefined}
                  >
                    {source.hostname ?? '—'}
                  </td>
                  <td className="px-3 py-2 text-right font-medium text-zinc-900 dark:text-zinc-50">
                    {source.messageCount.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <SpfDkimBadge result={source.spfResult} />
                  </td>
                  <td className="px-3 py-2 text-center">
                    <SpfDkimBadge result={source.dkimResult} />
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center gap-1.5">
                      <AlignmentIndicator
                        aligned={source.spfAligned}
                        label="SPF"
                      />
                      <AlignmentIndicator
                        aligned={source.dkimAligned}
                        label="DKIM"
                      />
                    </div>
                  </td>
                  <td className="px-3 py-2 text-zinc-600 dark:text-zinc-400">
                    {source.disposition}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
