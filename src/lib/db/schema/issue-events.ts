import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Append-only history of what operators did with an issue from the triage
 * queue. An issue is not stored: it is derived from report and DNS data each
 * time, and `issueKey` (e.g. `compliance_low:example.com`) ties these rows to
 * it. The latest row that is not a `note` gives the issue's current state, and
 * the whole list doubles as the remediation history.
 */
export const issueEvents = sqliteTable(
  'issue_events',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    issueKey: text('issue_key').notNull(),
    action: text('action', {
      enum: ['acknowledge', 'snooze', 'reopen', 'resolve', 'note'],
    }).notNull(),
    /** Unix seconds; set on `snooze`, the issue returns after it. */
    snoozedUntil: integer('snoozed_until'),
    note: text('note'),
    actorId: text('actor_id'),
    actorName: text('actor_name'),
    createdAt: integer('created_at').notNull(),
  },
  (table) => [
    index('issue_events_key_idx').on(table.issueKey, table.createdAt),
  ],
)
