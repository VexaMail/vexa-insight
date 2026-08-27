import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { jobRuns } from './job-run'

/**
 * Single-row table for ingest job poll status (isRunning, lastCheck, progress, abort).
 * Row id 1 is the only row used.
 */
export const pollStatus = sqliteTable('poll_status', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  isRunning: integer('is_running', { mode: 'boolean' })
    .notNull()
    .default(false),
  lastCheck: integer('last_check', { mode: 'timestamp' }),
  currentProcessed: integer('current_processed').notNull().default(0),
  totalEmails: integer('total_emails').notNull().default(0),
  processingEmails: integer('processing_emails').notNull().default(0),
  etaMs: integer('eta_ms').notNull().default(0),
  abortRequested: integer('abort_requested', { mode: 'boolean' })
    .notNull()
    .default(false),
  activeJobRunId: integer('active_job_run_id').references(() => jobRuns.id),
  statusText: text('status_text'),
})
