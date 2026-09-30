import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * The current SNDS IP status list: ranges Outlook.com is blocking or
 * otherwise flagging. Replaced as a whole on each sync, since the API always
 * answers with the present state only.
 */
export const sndsIpStatus = sqliteTable('snds_ip_status', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  firstIp: text('first_ip'),
  lastIp: text('last_ip'),
  blocked: text('blocked'),
  details: text('details'),
  raw: text('raw').notNull(),
  fetchedAt: integer('fetched_at', { mode: 'timestamp' }).notNull(),
})
