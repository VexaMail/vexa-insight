import type Database from 'better-sqlite3'

/**
 * The checksum recorded for an applied migration: a string when one was
 * recorded, `null` when the row predates the checksum column, and `undefined`
 * when the migration has not been applied at all.
 */
export function readAppliedChecksum(
  db: Database.Database,
  tag: string,
): string | null | undefined {
  const row = db
    .prepare('SELECT checksum FROM __app_migrations WHERE tag = ?')
    .get(tag) as { checksum: string | null } | undefined
  return row ? row.checksum : undefined
}
