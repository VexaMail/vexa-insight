import type Database from 'better-sqlite3'

export function isApplied(db: Database.Database, tag: string): boolean {
  const row = db
    .prepare('SELECT 1 FROM __app_migrations WHERE tag = ?')
    .get(tag)
  return Boolean(row)
}
