import type Database from 'better-sqlite3'

export function markApplied(db: Database.Database, tag: string): void {
  db.prepare('INSERT OR IGNORE INTO __app_migrations (tag) VALUES (?)').run(tag)
}
