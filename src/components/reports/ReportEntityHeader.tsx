import { CopyIconButton, EntityHeader, IconTile } from '@/components/ui'
import type { ReportEntityHeaderProps } from '@/types/reports'
import { formatReportDateRange } from '@/utils/format'
import { toReportDmarcOutcome } from '@/utils/reports'
import { Building2, CalendarRange, FileText } from 'lucide-react'
import { ReportHeaderActions } from './ReportHeaderActions'
import { ReportHeaderDomain } from './ReportHeaderDomain'
import { ReportHeaderFact } from './ReportHeaderFact'
import { ReportHeaderOtherDomains } from './ReportHeaderOtherDomains'
import { ReportOutcomePill } from './ReportOutcomePill'

/** Report id with copy, its outcome, receiver, domain and period. */
export function ReportEntityHeader({
  report,
  stats,
  navigatorSlot,
}: Readonly<ReportEntityHeaderProps>) {
  const domains = report.relatedDomains ?? []
  const primary = domains[0]?.domainName
  return (
    <div className="space-y-3">
      <EntityHeader
        kind="Aggregate report"
        title={report.reportId}
        mono
        leading={
          <IconTile className="hidden sm:inline-flex">
            <FileText />
          </IconTile>
        }
        titleAddon={
          <CopyIconButton value={report.reportId} label="report ID" />
        }
        chips={
          <>
            <ReportOutcomePill outcome={toReportDmarcOutcome(stats)} />
            <ReportHeaderFact icon={<Building2 />} label="Receiver">
              {report.orgName}
            </ReportHeaderFact>
            {primary ? <ReportHeaderDomain domain={primary} /> : null}
            <ReportHeaderFact icon={<CalendarRange />} label="Period">
              {formatReportDateRange(report.beginDate, report.endDate)}
            </ReportHeaderFact>
          </>
        }
        actions={
          <>
            {navigatorSlot ? (
              <div className="[&>div]:border-border [&>div]:bg-card [&_svg]:text-muted-foreground [&>div]:min-h-10 [&>div]:py-0 [&>div]:shadow-none">
                {navigatorSlot}
              </div>
            ) : null}
            {primary ? <ReportHeaderActions domain={primary} /> : null}
          </>
        }
      />
      <ReportHeaderOtherDomains domains={domains.slice(1)} />
    </div>
  )
}
