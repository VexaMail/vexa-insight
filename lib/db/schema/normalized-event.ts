import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { domains } from './domain'
import { ipAddresses } from './ip-addresses'
import { rawReports } from './raw-report'

export const normalizedEvents = sqliteTable(
  'normalized_events',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    rawReportId: integer('raw_report_id')
      .notNull()
      .references(() => rawReports.id),
    domainId: integer('domain_id')
      .notNull()
      .references(() => domains.id),
    ipAddressId: integer('ip_address_id')
      .notNull()
      .references(() => ipAddresses.id),
    spfResult: text('spf_result').notNull(),
    dkimResult: text('dkim_result').notNull(),
    spfAuthResult: text('spf_auth_result', {
      enum: [
        'pass',
        'fail',
        'softfail',
        'permerror',
        'temperror',
        'neutral',
        'none',
      ],
    })
      .notNull()
      .default('none'),
    spfAligned: integer('spf_aligned', { mode: 'boolean' }).notNull(),
    dkimAligned: integer('dkim_aligned', { mode: 'boolean' }).notNull(),
    disposition: text('disposition').notNull(),
    count: integer('count').notNull(),
    reportBeginDate: integer('report_begin_date').notNull(),
    reportEndDate: integer('report_end_date').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  },
  (table) => [
    index('domain_date_idx').on(table.domainId, table.reportBeginDate),
    index('domain_spf_auth_idx').on(table.domainId, table.spfAuthResult),
  ],
)
