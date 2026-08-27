import { sql } from 'drizzle-orm'
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { lookupStatusEnum } from './lookupStatusEnum'

export const ipHostnameEnrichments = sqliteTable(
  'ip_hostname_enrichments',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    ip: text('ip').notNull().unique(),
    hostname: text('hostname'),
    lookupStatus: text('lookup_status', { enum: lookupStatusEnum })
      .notNull()
      .default('pending'),
    lastLookupAt: integer('last_lookup_at', { mode: 'timestamp' }),
    nextLookupAt: integer('next_lookup_at', { mode: 'timestamp' }),
    lastSuccessAt: integer('last_success_at', { mode: 'timestamp' }),
    lookupError: text('lookup_error'),
    retryCount: integer('retry_count').notNull().default(0),
    resolverProvider: text('resolver_provider'),
    createdAt: integer('created_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer('updated_at', { mode: 'timestamp' })
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex('ip_hostname_ip_idx').on(table.ip),
    index('ip_hostname_next_lookup_idx').on(table.nextLookupAt),
    index('ip_hostname_status_idx').on(table.lookupStatus),
    index('ip_hostname_status_next_idx').on(
      table.lookupStatus,
      table.nextLookupAt,
    ),
  ],
)
