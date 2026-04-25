import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const ipAddresses = sqliteTable(
  'ip_addresses',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    ip: text('ip').notNull().unique(),
    countryCode: text('country_code', { length: 2 }),
    emailsSentCount: integer('emails_sent_count').notNull().default(0),
    firstSeenAt: integer('first_seen_at', { mode: 'timestamp' }).notNull(),
    lastSeenAt: integer('last_seen_at', { mode: 'timestamp' }).notNull(),
    locationLastUpdate: integer('location_last_update', { mode: 'timestamp' }),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  },
  (table) => [
    index('ip_location_last_update_idx').on(table.locationLastUpdate),
    index('ip_country_code_idx').on(table.countryCode),
  ],
)
