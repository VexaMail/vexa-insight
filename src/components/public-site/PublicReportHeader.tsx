import type { PublicReportProps } from '../../types/public-check/PublicReportProps'
import { PublicShareReport } from './PublicShareReport'

export function PublicReportHeader({ report }: Readonly<PublicReportProps>) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1
          id="report-heading"
          className="text-3xl font-semibold break-all sm:text-4xl"
        >
          {report.domain}
        </h1>
        <p className="text-muted-foreground mt-2 text-xs">
          Checked{' '}
          <time dateTime={report.checkedAt}>
            {new Date(report.checkedAt).toLocaleString()}
          </time>{' '}
          · cached up to 5 minutes
        </p>
      </div>
      <PublicShareReport key={report.domain} domain={report.domain} />
    </div>
  )
}
