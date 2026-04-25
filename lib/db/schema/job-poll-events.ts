import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { imapAccounts } from './imap-accounts'
import { jobRuns } from './job-run'

/**
 * Persists the raw sequence of polling steps per job.
 */
export const jobPollEvents = sqliteTable('job_poll_events', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  jobRunId: integer('job_run_id')
    .notNull()
    .references(() => jobRuns.id),
  imapAccountId: integer('imap_account_id').references(() => imapAccounts.id),
  messageUid: text('message_uid').notNull(),
  step: text('step').notNull(),
  messageLabel: text('message_label'),
  error: text('error'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
