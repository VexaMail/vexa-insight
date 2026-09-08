import { fireAndForgetDispatch } from '@/services/notifications'
import type { ParseResult } from '@/types/dmarc'

/** Dispatches the unauthorized-source event for IPs that aligned on neither. */
export function notifyUnauthorizedSources(report: ParseResult): void {
  const unauthorizedIps = Array.from(
    new Set(
      report.events
        .filter((ev) => !ev.spfAligned && !ev.dkimAligned)
        .map((ev) => ev.sourceIp),
    ),
  )
  if (unauthorizedIps.length === 0) return

  fireAndForgetDispatch('unauthorized_source.detected', {
    domain: report.domain,
    reportId: report.rawReport.reportId,
    reportingOrg: report.rawReport.orgName,
    unauthorizedIps,
    reportBeginDate: report.rawReport.beginDate,
    reportEndDate: report.rawReport.endDate,
  })
}
