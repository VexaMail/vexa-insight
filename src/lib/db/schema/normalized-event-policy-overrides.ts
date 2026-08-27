import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { normalizedEvents } from './normalized-event'

export const normalizedEventPolicyOverrides = sqliteTable(
  'normalized_event_policy_overrides',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    eventId: integer('event_id')
      .notNull()
      .references(() => normalizedEvents.id, { onDelete: 'cascade' }),
    type: text('type', {
      enum: [
        'forwarded',
        'local_policy',
        'trusted_forwarder',
        'mailing_list',
        'sampled_out',
        'other',
      ],
    }).notNull(),
    comment: text('comment'),
  },
  (table) => [index('policy_overrides_event_id_idx').on(table.eventId)],
)
