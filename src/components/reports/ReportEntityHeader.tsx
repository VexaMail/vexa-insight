import { BackButton } from '@/components/shell'
import { EntityHeader, StatusPill } from '@/components/ui'
import type { ReportEntityHeaderProps } from '@/types/reports'
import { formatReportDateRange } from '@/utils/format'
import {
  describeDmarcOutcome,
  reportOutcomeLabel,
  toReportDmarcOutcome,
} from '@/utils/reports'
import { ArrowLeft, Building2, CalendarRange } from 'lucide-react'
import { ReportHeaderActions } from './ReportHeaderActions'
import { ReportHeaderOtherDomains } from './ReportHeaderOtherDomains'
import { ReportIdChip } from './ReportIdChip'

/** Aggregate report header: domain, outcome, reporter, window and report id. */
export function ReportEntityHeader({
  report,
  stats,
  backHref,
  backLabel,
  navigatorSlot,
}: Readonly<ReportEntityHeaderProps>) {
  const domains = report.relatedDomains ?? []
  const primary = domains[0]?.domainName
  const outcome = toReportDmarcOutcome(stats)
  const pill = reportOutcomeLabel(outcome)

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <BackButton href={backHref}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          {backLabel}
        </BackButton>
        {navigatorSlot}
      </div>
      <EntityHeader
        kind="Aggregate report"
        title={primary ?? `Report ${report.reportId}`}
        chips={
          <>
            <span title={describeDmarcOutcome(outcome)}>
              <StatusPill tone={pill.tone} dot>
                {pill.label}
              </StatusPill>
            </span>
            <StatusPill tone="neutral">
              <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
              {report.orgName}
            </StatusPill>
            <StatusPill tone="neutral">
              <CalendarRange className="h-3.5 w-3.5" aria-hidden="true" />
              {formatReportDateRange(report.beginDate, report.endDate)}
            </StatusPill>
            <ReportIdChip reportId={report.reportId} />
          </>
        }
        actions={primary ? <ReportHeaderActions domain={primary} /> : null}
      />
      <ReportHeaderOtherDomains domains={domains.slice(1)} />
    </div>
  )
}
