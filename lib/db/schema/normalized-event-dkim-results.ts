import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { normalizedEvents } from './normalized-event'

export const normalizedEventDkimResults = sqliteTable(
  'normalized_event_dkim_results',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    eventId: integer('event_id')
      .notNull()
      .references(() => normalizedEvents.id, { onDelete: 'cascade' }),
    domain: text('domain').notNull(),
    selector: text('selector').notNull(),
    result: text('result', {
      enum: ['pass', 'fail', 'permerror', 'temperror', 'neutral', 'none'],
    }).notNull(),
    isAligned: integer('is_aligned', { mode: 'boolean' }).notNull(),
  },
  (table) => [index('dkim_results_event_id_idx').on(table.eventId)],
)
