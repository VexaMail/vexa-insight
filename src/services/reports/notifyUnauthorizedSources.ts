import { fireAndForgetDispatch } from '@/services/notifications'
import { getTrustedSourceIps } from '@/services/source-reviews'
import type { ParseResult } from '@/types/dmarc'

/**
 * Dispatches the unauthorized-source event for IPs that aligned on neither,
 * leaving out the ones an operator marked legitimate or a forwarder for the
 * domain, so a known sender is not reported again with every report.
 */
export async function notifyUnauthorizedSources(
  report: ParseResult,
): Promise<void> {
  const trusted = await getTrustedSourceIps(report.domain)
  const unauthorizedIps = Array.from(
    new Set(
      report.events
        .filter((ev) => !ev.spfAligned && !ev.dkimAligned)
        .map((ev) => ev.sourceIp),
    ),
  ).filter((ip) => !trusted.has(ip))
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
