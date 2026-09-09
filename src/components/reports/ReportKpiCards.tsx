import { buildReportKpiCards } from './buildReportKpiCards'
import { ReportKpiCard } from './ReportKpiCard'
import type { ReportKpiCardsProps } from './ReportKpiCardsProps'

export function ReportKpiCards({ stats }: Readonly<ReportKpiCardsProps>) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {buildReportKpiCards(stats).map((card) => (
        <ReportKpiCard key={card.label} card={card} />
      ))}
    </div>
  )
}
