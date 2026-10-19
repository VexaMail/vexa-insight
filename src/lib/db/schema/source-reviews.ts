import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'

/**
 * An operator's verdict on a sending source for one domain. It changes how
 * Vexa classifies and alerts on that source; it never changes DNS or what
 * receivers do with the mail.
 */
export const sourceReviews = sqliteTable(
  'source_reviews',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    ip: text('ip').notNull(),
    domainName: text('domain_name').notNull(),
    verdict: text('verdict', {
      enum: ['legitimate', 'forwarder', 'unauthorized'],
    }).notNull(),
    note: text('note'),
    reviewedById: text('reviewed_by_id'),
    reviewedByName: text('reviewed_by_name'),
    reviewedAt: integer('reviewed_at').notNull(),
  },
  (table) => [
    uniqueIndex('source_reviews_ip_domain_idx').on(table.ip, table.domainName),
    index('source_reviews_domain_idx').on(table.domainName),
  ],
)
