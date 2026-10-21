import type { PublicReportProps } from '../../types/public-check/PublicReportProps'
import { PublicCheckCard } from './PublicCheckCard'
import { PublicReportHeader } from './PublicReportHeader'
import { PublicReportInterpretation } from './PublicReportInterpretation'
import { PublicReportNote } from './PublicReportNote'
import { PublicReportSummary } from './PublicReportSummary'
import { PublicScore } from './PublicScore'
import { orderPublicChecks } from './orderPublicChecks'

export function PublicReport({ report }: Readonly<PublicReportProps>) {
  return (
    <section aria-labelledby="report-heading">
      <PublicReportHeader report={report} />
      <PublicScore score={report.score} />
      <PublicReportInterpretation report={report} />
      <PublicReportSummary report={report} />
      <div className="grid gap-4 md:grid-cols-2">
        {orderPublicChecks(report.checks).map((check) => (
          <PublicCheckCard key={check.name} check={check} />
        ))}
      </div>
      <PublicReportNote />
    </section>
  )
}
