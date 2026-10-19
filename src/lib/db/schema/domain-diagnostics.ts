import type { DiagnosticsProtocolState } from '@/types/diagnostics'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { domains } from './domain'

/**
 * The last DNS run of each domain, reduced to what the diagnostics index
 * shows, so the index reads every domain at once instead of resolving them
 * all on each visit. `checkedAt` is unix seconds.
 */
export const domainDiagnostics = sqliteTable('domain_diagnostics', {
  domainId: integer('domain_id')
    .primaryKey()
    .references(() => domains.id, { onDelete: 'cascade' }),
  checkedAt: integer('checked_at').notNull(),
  resolved: integer('resolved', { mode: 'boolean' }).notNull(),
  grade: text('grade', { enum: ['A', 'B', 'C', 'D', 'F'] }).notNull(),
  percentage: integer('percentage').notNull(),
  protocols: text('protocols', { mode: 'json' })
    .$type<DiagnosticsProtocolState[]>()
    .notNull(),
})
