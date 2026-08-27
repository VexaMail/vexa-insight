import type Database from 'better-sqlite3'

/**
 * Applies the connection-level PRAGMAs that make the single-writer ingest
 * pipeline fast enough for large mailboxes (see ADR 0008).
 *
 * - WAL lets dashboard reads run concurrently with the ingest writer instead
 *   of blocking on it. The journal mode is persisted in the DB file header, so
 *   setting it once is enough, but it is cheap and idempotent to set on open.
 * - synchronous=NORMAL is the WAL-safe durability level: it fsyncs at
 *   checkpoints rather than on every commit, which is the difference between
 *   hundreds and tens of thousands of commits per second.
 * - busy_timeout stops a concurrent reader from failing with SQLITE_BUSY while
 *   the writer holds a lock; it waits instead.
 *
 * Foreign-key enforcement is intentionally left at SQLite's default (off): the
 * app has always run without it, and enabling it would change delete/insert
 * ordering semantics across the codebase, which is out of scope here.
 */
export function applyConnectionPragmas(sqlite: Database.Database): void {
  sqlite.pragma('journal_mode = WAL')
  sqlite.pragma('synchronous = NORMAL')
  sqlite.pragma('busy_timeout = 5000')
}
