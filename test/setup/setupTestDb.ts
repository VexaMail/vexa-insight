import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

/**
 * Sets up an isolated SQLite DB for tests. Call BEFORE importing any module
 * that touches @/lib/db so the getDb() singleton picks up the test DATABASE_URL.
 *
 * Vitest gives each test file its own module scope, so the getDb() singleton
 * is fresh per file. Pair with a dynamic-import pattern in the test file:
 *
 *   setupTestDb()
 *   const { getDb } = await import('@/lib/db')
 *
 * Returns the temp DB path so callers can clean up if needed.
 */
export function setupTestDb(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vexa-test-'))
  const dbPath = path.join(dir, 'vexa.db')
  process.env.DATABASE_URL = `file:${dbPath}`
  return dbPath
}
