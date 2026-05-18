import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

/**
 * Single-row table (id = 1) caching the result of the most recent
 * GitHub release lookup. Used to avoid hitting the GitHub API on every
 * request and to surface the "update available" badge in the UI.
 */
export const updateState = sqliteTable('update_state', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
  channel: text('channel').notNull().default('stable'),
  currentVersion: text('current_version'),
  latestVersion: text('latest_version'),
  latestUrl: text('latest_url'),
  latestPublishedAt: integer('latest_published_at', { mode: 'timestamp' }),
  latestNotes: text('latest_notes'),
  lastCheckedAt: integer('last_checked_at', { mode: 'timestamp' }),
  lastErrorAt: integer('last_error_at', { mode: 'timestamp' }),
  lastError: text('last_error'),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
})
