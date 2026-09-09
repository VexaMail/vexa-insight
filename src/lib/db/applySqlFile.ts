import type Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'
import { isApplied } from './isApplied'
import { isTolerableSqlError } from './isTolerableSqlError'
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
      if (isTolerableSqlError(stmt, err)) applied = true
      else throw err
    }
  }
  if (applied) markApplied(db, tag)
}
