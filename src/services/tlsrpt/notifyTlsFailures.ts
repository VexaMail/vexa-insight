import { fireAndForgetDispatch } from '@/services/notifications'
import type { TlsReport } from '@/types/tlsrpt'

/**
 * Dispatches `tls.failure_detected` once per policy domain that had failed
 * sessions, so a subscriber sees which domain and which failure classes.
 */
export function notifyTlsFailures(report: TlsReport): void {
  for (const policy of report.policies) {
    if (policy.failedSessionCount === 0) continue
    fireAndForgetDispatch('tls.failure_detected', {
      domain: policy.policyDomain,
      reportId: report.reportId,
      reportingOrg: report.orgName,
      policyType: policy.policyType,
      successfulSessionCount: policy.successfulSessionCount,
      failedSessionCount: policy.failedSessionCount,
      failures: policy.failureDetails.map((detail) => ({
        resultType: detail.resultType,
        receivingMxHostname: detail.receivingMxHostname,
        failedSessionCount: detail.failedSessionCount,
      })),
      reportBeginDate: report.beginDate,
      reportEndDate: report.endDate,
    })
  }
}
