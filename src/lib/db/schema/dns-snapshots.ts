import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * One row per observed value of a tracked DNS record, written only when the
 * value differs from the last one stored for that domain and record kind, so
 * the table reads as a change history. `value` is null while the record is
 * absent. `recordKind` is `spf`, `dmarc`, `mx`, `mta_sts`, `tls_rpt`, `bimi`
 * or `dkim:<selector>`.
 */
export const dnsSnapshots = sqliteTable(
  'dns_snapshots',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    domainName: text('domain_name').notNull(),
    recordKind: text('record_kind').notNull(),
    value: text('value'),
    observedAt: integer('observed_at').notNull(),
    source: text('source', { enum: ['scheduled', 'manual'] }).notNull(),
  },
  (table) => [
    index('dns_snapshots_domain_kind_idx').on(
      table.domainName,
      table.recordKind,
      table.observedAt,
    ),
  ],
)
