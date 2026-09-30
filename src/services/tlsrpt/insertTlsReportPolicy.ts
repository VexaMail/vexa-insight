import { tlsReportFailures, tlsReportPolicies } from '@/lib/db'
import type { ReportTransaction } from '@/types/reports'
import type { TlsReportPolicy } from '@/types/tlsrpt'

/** Inserts one policy of a TLS report and its failure details. */
export function insertTlsReportPolicy(
  tx: ReportTransaction,
  tlsReportId: number,
  policy: TlsReportPolicy,
): void {
  const inserted = tx
    .insert(tlsReportPolicies)
    .values({
      tlsReportId,
      policyType: policy.policyType,
      policyDomain: policy.policyDomain,
      mxHosts: JSON.stringify(policy.mxHosts),
      successfulSessionCount: policy.successfulSessionCount,
      failedSessionCount: policy.failedSessionCount,
    })
    .returning({ id: tlsReportPolicies.id })
    .get()

  if (policy.failureDetails.length === 0) return
  tx.insert(tlsReportFailures)
    .values(
      policy.failureDetails.map((detail) => ({
        policyId: inserted.id,
        ...detail,
      })),
    )
    .run()
}
