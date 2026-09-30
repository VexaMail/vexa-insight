import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { tlsReportPolicies } from './tls-report-policy'

/** One `failure-details[]` entry of a TLS report policy. */
export const tlsReportFailures = sqliteTable(
  'tls_report_failures',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    policyId: integer('policy_id')
      .notNull()
      .references(() => tlsReportPolicies.id, { onDelete: 'cascade' }),
    resultType: text('result_type').notNull(),
    sendingMtaIp: text('sending_mta_ip'),
    receivingMxHostname: text('receiving_mx_hostname'),
    receivingIp: text('receiving_ip'),
    failedSessionCount: integer('failed_session_count').notNull(),
    failureReasonCode: text('failure_reason_code'),
  },
  (t) => [index('tls_report_failures_policy_idx').on(t.policyId)],
)
