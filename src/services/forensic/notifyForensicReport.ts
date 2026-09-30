import { fireAndForgetDispatch } from '@/services/notifications'
import type { ForensicReport } from '@/types/forensic'

/** Dispatches `failure_report.received` for a newly stored failure report. */
export function notifyForensicReport(report: ForensicReport): void {
  fireAndForgetDispatch('failure_report.received', {
    domain: report.reportedDomain,
    authFailure: report.authFailure,
    sourceIp: report.sourceIp,
    reportingMta: report.reportingMta,
    headerFromDomain: report.headerFromDomain,
    envelopeFromDomain: report.envelopeFromDomain,
    dkimDomain: report.dkimDomain,
    listId: report.listId,
    arrivalDate: report.arrivalDate,
  })
}
