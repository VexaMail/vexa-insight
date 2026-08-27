import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const rawReports = sqliteTable('raw_reports', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  reportId: text('report_id').notNull().unique(),
  orgName: text('org_name').notNull(),
  beginDate: integer('begin_date').notNull(),
  endDate: integer('end_date').notNull(),
  rawXml: text('raw_xml').notNull(),
  sourceEmail: text('source_email'),
  sourceMessageId: text('source_message_id'),
  ingestedAt: integer('ingested_at', { mode: 'timestamp' }).notNull(),
})
