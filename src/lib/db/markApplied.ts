import type Database from 'better-sqlite3'

export function markApplied(
  db: Database.Database,
  tag: string,
  checksum: string,
): void {
  db.prepare(
    'INSERT OR REPLACE INTO __app_migrations (tag, checksum) VALUES (?, ?)',
  ).run(tag, checksum)
}
