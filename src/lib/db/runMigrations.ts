import { getDatabaseUrl } from '@/lib/config'
import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'
import { applySqlFile } from './applySqlFile'
import { MIGRATIONS_TABLE } from './migrationsTable'
import { resolveDbFilePath } from './resolveDbFilePath'

/**
 * Runs Drizzle SQL migrations in order. Ensures data directory exists.
 * Uses DATABASE_URL from env or default file:./data/vexa.db.
 * Tracks applied migrations in __app_migrations so already-applied migrations
 * (e.g. from drizzle-kit migrate) are skipped and later ones still run.
 */
function runMigrations(): void {
  const dbUrl = getDatabaseUrl()
  const absPath = resolveDbFilePath(dbUrl)
  const dir = path.dirname(absPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  const journalPath = path.join(
    process.cwd(),
    'drizzle',
    'meta',
    '_journal.json',
  )
  if (!fs.existsSync(journalPath)) {
    return
  }
  const journal = JSON.parse(fs.readFileSync(journalPath, 'utf8')) as {
    entries?: Array<{ tag: string }>
  }
  const entries = journal.entries ?? []
  const db = new Database(absPath)
  db.exec(MIGRATIONS_TABLE)
  const drizzleDir = path.join(process.cwd(), 'drizzle')
  for (const entry of entries) {
    applySqlFile(db, entry.tag, drizzleDir)
  }
  db.close()
}

export { runMigrations }
