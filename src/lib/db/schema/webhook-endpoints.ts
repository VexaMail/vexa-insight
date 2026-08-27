import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const webhookEndpoints = sqliteTable(
  'webhook_endpoints',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    url: text('url').notNull(),
    enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
    events: text('events').notNull(),
    secret: text('secret'),
    lastDispatchAt: integer('last_dispatch_at', { mode: 'timestamp' }),
    lastStatus: text('last_status'),
    lastError: text('last_error'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  },
  (table) => [index('webhook_endpoints_enabled_idx').on(table.enabled)],
)
