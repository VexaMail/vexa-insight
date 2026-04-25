import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const domains = sqliteTable('domains', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
})
