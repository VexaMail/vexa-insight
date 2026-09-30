import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const jobRuns = sqliteTable('job_runs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  runAt: integer('run_at', { mode: 'timestamp' }).notNull(),
  success: integer('success', { mode: 'boolean' }).notNull(),
  processed: integer('processed').notNull().default(0),
  ingested: integer('ingested').notNull().default(0),
  errorCount: integer('error_count').notNull().default(0),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  /** The first errors of a failed run, so the cause outlives the process log. */
  errorSummary: text('error_summary'),
})
