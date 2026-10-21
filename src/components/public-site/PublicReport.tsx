import type { PublicReportProps } from '../../types/public-check/PublicReportProps'
import { PublicCheckCard } from './PublicCheckCard'
import { PublicReportNote } from './PublicReportNote'
import { PublicReportSummary } from './PublicReportSummary'
import { PublicScore } from './PublicScore'

export function PublicReport({ report }: Readonly<PublicReportProps>) {
  return (
    <section aria-labelledby="report-heading" className="mt-12">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-muted-foreground mb-1 text-xs font-medium tracking-widest uppercase">
            Your DNS snapshot
          </p>
          <h1 id="report-heading" className="text-2xl font-semibold break-all">
            {report.domain}
          </h1>
        </div>
        <p className="text-muted-foreground text-xs">
          Checked{' '}
          <time dateTime={report.checkedAt}>
            {new Date(report.checkedAt).toLocaleString()}
          </time>{' '}
          · cached up to 5 minutes
        </p>
      </div>
      <PublicScore score={report.score} />
      <PublicReportSummary report={report} />
      <div className="grid gap-4 md:grid-cols-2">
        {report.checks.map((check) => (
          <PublicCheckCard key={check.name} check={check} />
        ))}
      </div>
      <div className="bg-primary/5 mt-5 flex flex-wrap items-center justify-between gap-5 rounded-xl border p-6">
        <p className="max-w-xl text-sm leading-relaxed">
          <strong>
            This is your configuration. Now see your actual senders.
          </strong>
          <br />
          Vexa Insight turns DMARC reports into a view of sending sources,
          authentication and changes over time.
        </p>
        <a
          href="#monitor"
          className="bg-primary text-primary-foreground rounded-md px-5 py-3 text-sm font-semibold"
        >
          Monitor your domain →
        </a>
      </div>
      <PublicReportNote />
    </section>
  )
}
