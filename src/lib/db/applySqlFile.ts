import type Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'
import { isApplied } from './isApplied'
import { markApplied } from './markApplied'

export function applySqlFile(
  db: Database.Database,
  tag: string,
  drizzleDir: string,
): void {
  if (isApplied(db, tag)) return
  const sqlPath = path.join(drizzleDir, `${tag}.sql`)
  if (!fs.existsSync(sqlPath)) return
  const sql = fs.readFileSync(sqlPath, 'utf8')
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
      const msg = err instanceof Error ? err.message : String(err)
      const isAlreadyExists =
        msg.includes('already exists') ||
        msg.includes('UNIQUE constraint') ||
        msg.includes('duplicate column name')

      const isDropMissingColumn =
        stmt.toLowerCase().includes('drop column') &&
        msg.includes('no such column')

      if (isAlreadyExists || isDropMissingColumn) applied = true
      else throw err
    }
  }
  if (applied) markApplied(db, tag)
}
