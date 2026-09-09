import { BackButton, PageEyebrow } from '@/components/shell'
import { formatReportDateRange } from '@/utils/format'
import { ReportHeaderMeta } from './ReportHeaderMeta'
import { ReportHeaderOtherDomains } from './ReportHeaderOtherDomains'
import type { ReportHeaderProps } from './ReportHeaderProps'
import { ReportHeaderTitle } from './ReportHeaderTitle'

export function ReportHeader({
  report,
  backHref,
  backLabel,
  navigatorSlot,
}: Readonly<ReportHeaderProps>) {
  const dateRange = formatReportDateRange(report.beginDate, report.endDate)
  const domains = report.relatedDomains ?? []

  return (
    <header className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <BackButton href={backHref}>{backLabel}</BackButton>
        {navigatorSlot}
      </div>

      <div className="space-y-3">
        <PageEyebrow>DMARC aggregate report</PageEyebrow>

        <ReportHeaderTitle
          primaryDomain={domains[0]}
          reportId={report.reportId}
        />

        <ReportHeaderMeta
          orgName={report.orgName}
          dateRange={dateRange}
          reportId={report.reportId}
        />

        <ReportHeaderOtherDomains domains={domains.slice(1)} />
      </div>
    </header>
  )
}
