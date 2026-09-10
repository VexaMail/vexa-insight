import fs from 'node:fs'
import path from 'node:path'
import { beforeEach, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

/**
 * `docs/MIGRATIONS.md` tells contributors that migrations are append-only and
 * that the runner rejects a content change. It did not: the ledger stored only
 * the tag, so an edited file was silently accepted, and a migration whose SQL
 * file was missing was silently skipped, which made a truncated deployment
 * look healthy.
 */
describe('migration ledger', () => {
  let dbPath = ''

  beforeEach(() => {
    dbPath = setupTestDb()
  })

  const openDb = async () => {
    const { default: Database } = await import('better-sqlite3')
    return new Database(dbPath)
  }

  it('records a checksum for every migration it applies', async () => {
    const { runMigrations } = await import('@/lib/db')
    runMigrations()

    const db = await openDb()
    const rows = db
      .prepare('SELECT tag, checksum FROM __app_migrations')
      .all() as { tag: string; checksum: string | null }[]
    db.close()

    expect(rows.length).toBeGreaterThan(0)
    expect(rows.every((row) => (row.checksum ?? '').length === 64)).toBe(true)
  })

  it('refuses a migration whose contents changed after it was applied', async () => {
    const { runMigrations } = await import('@/lib/db')
    const { applySqlFile } = await import('@/lib/db')
    runMigrations()

    const db = await openDb()
    const tag = (
      db.prepare('SELECT tag FROM __app_migrations LIMIT 1').get() as {
        tag: string
      }
    ).tag
    db.prepare('UPDATE __app_migrations SET checksum = ? WHERE tag = ?').run(
      'f'.repeat(64),
      tag,
    )

    expect(() => {
      applySqlFile(db, tag, path.join(process.cwd(), 'drizzle'))
    }).toThrow(/append-only/)
    db.close()
  })

  it('fails loudly when a journal entry has no SQL file', async () => {
    const { runMigrations } = await import('@/lib/db')
    const { applySqlFile } = await import('@/lib/db')
    runMigrations()
    const db = await openDb()

    expect(() => {
      applySqlFile(db, '9999_absent', path.join(process.cwd(), 'drizzle'))
    }).toThrow(/does not exist/)
    db.close()
    expect(fs.existsSync(dbPath)).toBe(true)
  })

  it('upgrades a ledger written before checksums existed', async () => {
    const { default: Database } = await import('better-sqlite3')
    const { runMigrations } = await import('@/lib/db')
    const journal = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), 'drizzle', 'meta', '_journal.json'),
        'utf8',
      ),
    ) as { entries: { tag: string }[] }

    // An install from an earlier release: every migration is recorded, but the
    // ledger has only the tag column.
    const legacy = new Database(dbPath)
    legacy.exec('CREATE TABLE __app_migrations (tag TEXT PRIMARY KEY)')
    for (const entry of journal.entries) {
      legacy
        .prepare('INSERT INTO __app_migrations (tag) VALUES (?)')
        .run(entry.tag)
    }
    legacy.close()

    expect(() => {
      runMigrations()
    }).not.toThrow()

    const db = await openDb()
    const rows = db.prepare('SELECT checksum FROM __app_migrations').all() as {
      checksum: string | null
    }[]
    db.close()
    expect(rows.every((row) => (row.checksum ?? '').length === 64)).toBe(true)
  })
})
