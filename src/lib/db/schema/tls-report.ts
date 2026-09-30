import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core'

/**
 * One SMTP TLS report (RFC 8460) as received. A report id is only unique
 * within its reporting organisation, so the key is the pair.
 */
export const tlsReports = sqliteTable(
  'tls_reports',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    reportId: text('report_id').notNull(),
    orgName: text('org_name').notNull(),
    contactInfo: text('contact_info'),
    beginDate: integer('begin_date').notNull(),
    endDate: integer('end_date').notNull(),
    rawJson: text('raw_json').notNull(),
    sourceMessageId: text('source_message_id'),
    ingestedAt: integer('ingested_at', { mode: 'timestamp' }).notNull(),
  },
  (t) => [unique('tls_reports_org_report_idx').on(t.orgName, t.reportId)],
)
