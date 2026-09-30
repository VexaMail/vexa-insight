import { getDb, tlsReportPolicies, tlsReports } from '@/lib/db'
import type { TlsDomainSummaryRow } from '@/types/tlsrpt'
import { desc, eq, max, sql, sum } from 'drizzle-orm'

/**
 * TLS session totals for one policy domain, per reporting organisation and
 * policy type, most recently reported first.
 */
export function getTlsDomainSummary(domainName: string): TlsDomainSummaryRow[] {
  const lastEndDate = max(tlsReports.endDate)
  const rows = getDb()
    .select({
      orgName: tlsReports.orgName,
      policyType: tlsReportPolicies.policyType,
      reportCount: sql<number>`count(distinct ${tlsReports.id})`,
      successfulSessionCount: sum(tlsReportPolicies.successfulSessionCount),
      failedSessionCount: sum(tlsReportPolicies.failedSessionCount),
      lastEndDate,
    })
    .from(tlsReportPolicies)
    .innerJoin(tlsReports, eq(tlsReports.id, tlsReportPolicies.tlsReportId))
    .where(eq(tlsReportPolicies.policyDomain, domainName.toLowerCase()))
    .groupBy(tlsReports.orgName, tlsReportPolicies.policyType)
    .orderBy(desc(lastEndDate))
    .all()

  return rows.map((row) => ({
    orgName: row.orgName,
    policyType: row.policyType,
    reportCount: row.reportCount,
    successfulSessionCount: Number(row.successfulSessionCount ?? 0),
    failedSessionCount: Number(row.failedSessionCount ?? 0),
    lastEndDate: row.lastEndDate ?? 0,
  }))
}
