import { integer, sqliteTable, text, unique } from 'drizzle-orm/sqlite-core'
import { imapAccounts } from './imap-accounts'
import { jobRuns } from './job-run'

/**
 * Tracks processed message IDs per IMAP account to avoid re-processing.
 * Unique on (imap_account_id, message_id).
 */
export const processedMessages = sqliteTable(
  'processed_messages',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    imapAccountId: integer('imap_account_id')
      .notNull()
      .references(() => imapAccounts.id),
    messageId: text('message_id').notNull(),
    processedAt: integer('processed_at', { mode: 'timestamp' }).notNull(),
    jobRunId: integer('job_run_id').references(() => jobRuns.id),
  },
  (t) => [
    unique('processed_messages_imap_message_idx').on(
      t.imapAccountId,
      t.messageId,
    ),
  ],
)
