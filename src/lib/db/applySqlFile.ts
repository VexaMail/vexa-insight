import type Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'
import { isTolerableSqlError } from './isTolerableSqlError'
import { markApplied } from './markApplied'
import { migrationChecksum } from './migrationChecksum'
import { readAppliedChecksum } from './readAppliedChecksum'

/**
 * Applies one migration file, unless the ledger says it already ran.
 *
 * Two failures used to pass silently and now do not. A migration named in the
 * journal whose SQL file is missing was skipped, so a truncated deployment
 * looked like a healthy one. And an applied file that was edited afterwards
 * was never noticed, although the contributor documentation promises the
 * runner rejects a content change; the recorded checksum is what makes that
 * promise true. Rows written before the checksum column existed have no hash
 * and are left alone rather than reported as tampering.
 */
export function applySqlFile(
  db: Database.Database,
  tag: string,
  drizzleDir: string,
): void {
  const sqlPath = path.join(drizzleDir, `${tag}.sql`)
  if (!fs.existsSync(sqlPath)) {
    throw new Error(
      `Migration ${tag} is listed in drizzle/meta/_journal.json but ${sqlPath} does not exist`,
    )
  }
  const sql = fs.readFileSync(sqlPath, 'utf8')
  const checksum = migrationChecksum(sql)
  const recorded = readAppliedChecksum(db, tag)

  if (recorded !== undefined) {
    if (recorded !== null && recorded !== checksum) {
      throw new Error(
        `Migration ${tag} was already applied with different contents. Migrations are append-only: add a new file instead of editing this one.`,
      )
    }
    if (recorded === null) markApplied(db, tag, checksum)
    return
  }

  const statements = sql
    .split('--> statement-breakpoint')
    .flatMap((s) => s.split(';\\n'))
    .map((s) => s.trim())
    .filter(Boolean)
  let applied = false
  for (const stmt of statements) {
    try {
      db.prepare(stmt).run()
      applied = true
    } catch (err: unknown) {
      if (isTolerableSqlError(stmt, err)) applied = true
      else throw err
    }
  }
  if (applied) markApplied(db, tag, checksum)
}
