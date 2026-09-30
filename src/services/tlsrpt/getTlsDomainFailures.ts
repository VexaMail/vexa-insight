import {
  getDb,
  tlsReportFailures,
  tlsReportPolicies,
  tlsReports,
} from '@/lib/db'
import type { TlsFailureSummaryRow } from '@/types/tlsrpt'
import { desc, eq, max, sum } from 'drizzle-orm'

/**
 * Failed TLS sessions for one policy domain, per failure result type and
 * receiving MX, largest first.
 */
export function getTlsDomainFailures(
  domainName: string,
): TlsFailureSummaryRow[] {
  const failedSessionCount = sum(tlsReportFailures.failedSessionCount)
  const rows = getDb()
    .select({
      resultType: tlsReportFailures.resultType,
      receivingMxHostname: tlsReportFailures.receivingMxHostname,
      failedSessionCount,
      lastEndDate: max(tlsReports.endDate),
    })
    .from(tlsReportFailures)
    .innerJoin(
      tlsReportPolicies,
      eq(tlsReportPolicies.id, tlsReportFailures.policyId),
    )
    .innerJoin(tlsReports, eq(tlsReports.id, tlsReportPolicies.tlsReportId))
    .where(eq(tlsReportPolicies.policyDomain, domainName.toLowerCase()))
    .groupBy(
      tlsReportFailures.resultType,
      tlsReportFailures.receivingMxHostname,
    )
    .orderBy(desc(failedSessionCount))
    .all()

  return rows.map((row) => ({
    resultType: row.resultType,
    receivingMxHostname: row.receivingMxHostname,
    failedSessionCount: Number(row.failedSessionCount ?? 0),
    lastEndDate: row.lastEndDate ?? 0,
  }))
}
