import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { tlsReports } from './tls-report'

/** One `policies[]` entry of a TLS report, with its session totals. */
export const tlsReportPolicies = sqliteTable(
  'tls_report_policies',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    tlsReportId: integer('tls_report_id')
      .notNull()
      .references(() => tlsReports.id, { onDelete: 'cascade' }),
    policyType: text('policy_type').notNull(),
    policyDomain: text('policy_domain').notNull(),
    mxHosts: text('mx_hosts').notNull(),
    successfulSessionCount: integer('successful_session_count').notNull(),
    failedSessionCount: integer('failed_session_count').notNull(),
  },
  (t) => [
    index('tls_report_policies_domain_idx').on(t.policyDomain),
    index('tls_report_policies_report_idx').on(t.tlsReportId),
  ],
)
