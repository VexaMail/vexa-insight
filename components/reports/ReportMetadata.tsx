import { ChevronRight } from 'lucide-react'
import type { ReportMetadataProps } from './ReportMetadataProps'

export function ReportMetadata({ report }: Readonly<ReportMetadataProps>) {
  const ingestedAt = new Date(report.ingestedAt).toLocaleString()

  return (
    <details className="group rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
      <summary className="flex cursor-pointer items-center gap-2 px-4 py-3 text-sm font-medium text-zinc-700 select-none dark:text-zinc-300">
        <ChevronRight
          className="h-4 w-4 transition-transform group-open:rotate-90"
          aria-hidden="true"
        />
        Report Metadata
      </summary>
      <dl className="grid gap-3 border-t border-zinc-200 p-4 sm:grid-cols-2 dark:border-zinc-700">
        <div>
          <dt className="text-sm text-zinc-500 dark:text-zinc-400">
            Report ID
          </dt>
          <dd className="font-mono text-zinc-900 dark:text-zinc-50">
            {report.reportId}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-zinc-500 dark:text-zinc-400">Org</dt>
          <dd className="text-zinc-900 dark:text-zinc-50">{report.orgName}</dd>
        </div>
        <div>
          <dt className="text-sm text-zinc-500 dark:text-zinc-400">
            Source email
          </dt>
          <dd className="text-zinc-900 dark:text-zinc-50">
            {report.sourceEmail ?? '—'}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-zinc-500 dark:text-zinc-400">
            Ingested at
          </dt>
          <dd className="text-zinc-900 dark:text-zinc-50">{ingestedAt}</dd>
        </div>
      </dl>
    </details>
  )
}
