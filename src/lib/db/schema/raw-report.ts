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
  /**
   * Set only by the demo seeder. `wipeDemoData` deletes on this and nothing
   * else: it used to match `report_id LIKE 'demo-%'`, and a report id is
   * written by the reporting organisation, so a genuine report whose id began
   * `demo-` was deleted along with the synthetic ones.
   */
  isDemo: integer('is_demo', { mode: 'boolean' }).notNull().default(false),
})
