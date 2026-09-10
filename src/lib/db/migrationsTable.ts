/**
 * The applied-migration ledger. `checksum` is the SHA-256 of the SQL that was
 * applied, so a file edited after it shipped is detected rather than ignored;
 * it is nullable because rows written before the column existed have no
 * recorded hash and must not be treated as a mismatch.
 */
export const MIGRATIONS_TABLE =
  'CREATE TABLE IF NOT EXISTS __app_migrations (tag TEXT PRIMARY KEY, checksum TEXT)'
