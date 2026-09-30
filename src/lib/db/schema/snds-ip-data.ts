import {
  index,
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'

/**
 * One Microsoft SNDS data row: what Outlook.com saw from one IP on one day.
 * The parsed columns feed the UI; `raw` keeps the row exactly as the API
 * returned it, so a field the parser does not know yet is never lost.
 */
export const sndsIpData = sqliteTable(
  'snds_ip_data',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    reportDate: text('report_date').notNull(),
    ip: text('ip').notNull(),
    activityStart: text('activity_start'),
    activityEnd: text('activity_end'),
    rcptCommands: integer('rcpt_commands'),
    dataCommands: integer('data_commands'),
    messageRecipients: integer('message_recipients'),
    filterResult: text('filter_result'),
    complaintRate: real('complaint_rate'),
    trapPeriodStart: text('trap_period_start'),
    trapPeriodEnd: text('trap_period_end'),
    trapHits: integer('trap_hits'),
    sampleHelo: text('sample_helo'),
    sampleMailFrom: text('sample_mail_from'),
    comments: text('comments'),
    raw: text('raw').notNull(),
    fetchedAt: integer('fetched_at', { mode: 'timestamp' }).notNull(),
  },
  (table) => [
    uniqueIndex('snds_ip_data_date_ip_idx').on(table.reportDate, table.ip),
    index('snds_ip_data_ip_idx').on(table.ip),
  ],
)
