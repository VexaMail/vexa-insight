/**
 * Adds the checksum column to a ledger created by an older release. SQLite has
 * no `ADD COLUMN IF NOT EXISTS`, so the caller runs this and tolerates the
 * duplicate-column error.
 */
export const MIGRATIONS_TABLE_CHECKSUM_COLUMN =
  'ALTER TABLE __app_migrations ADD COLUMN checksum TEXT'
