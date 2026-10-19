import fs from 'node:fs'
import path from 'node:path'
import { beforeAll, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

/**
 * `ip_hostname_enrichments.created_at` and `updated_at` are timestamp-mode
 * integers, but their default was `CURRENT_TIMESTAMP`, which SQLite stores as
 * 'YYYY-MM-DD HH:MM:SS' text. Drizzle then read every defaulted row back as an
 * Invalid Date. The fix changes the default to unix seconds and backfills the
 * rows the old default already wrote.
 */
describe('ip_hostname_enrichments timestamp migration', () => {
  let dbPath = ''

  beforeAll(async () => {
    dbPath = setupTestDb()
    const { default: Database } = await import('better-sqlite3')
    const { applySqlFile, MIGRATIONS_TABLE } = await import('@/lib/db')
    const drizzleDir = path.join(process.cwd(), 'drizzle')
    const journal = JSON.parse(
      fs.readFileSync(path.join(drizzleDir, 'meta', '_journal.json'), 'utf8'),
    ) as { entries: Array<{ tag: string }> }
    const lastBuggyTag = '0039_webhook_last_attempts'
    const stop = journal.entries.findIndex((e) => e.tag === lastBuggyTag)

    // Bring a database to the last release with the CURRENT_TIMESTAMP
    // default and let that default write a row, as production did.
    const db = new Database(dbPath)
    db.exec(MIGRATIONS_TABLE)
    for (const entry of journal.entries.slice(0, stop + 1)) {
      applySqlFile(db, entry.tag, drizzleDir)
    }
    db.prepare(
      "INSERT INTO ip_hostname_enrichments (ip, hostname, lookup_status) VALUES ('192.0.2.10', 'mail.example.com', 'success')",
    ).run()
    db.close()

    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  }, 30_000)

  it('converts text timestamps written by the old default to integers', async () => {
    const { default: Database } = await import('better-sqlite3')
    const db = new Database(dbPath)
    const row = db
      .prepare(
        "SELECT typeof(created_at) AS c, typeof(updated_at) AS u FROM ip_hostname_enrichments WHERE ip = '192.0.2.10'",
      )
      .get() as { c: string; u: string }
    db.close()
    expect(row).toEqual({ c: 'integer', u: 'integer' })
  })

  it('reads the backfilled row back as valid Dates', async () => {
    const { getDb, ipHostnameEnrichments } = await import('@/lib/db')
    const { eq } = await import('drizzle-orm')
    const row = getDb()
      .select()
      .from(ipHostnameEnrichments)
      .where(eq(ipHostnameEnrichments.ip, '192.0.2.10'))
      .get()
    expect(row?.hostname).toBe('mail.example.com')
    expect(Number.isNaN(row?.createdAt.getTime())).toBe(false)
    expect(Number.isNaN(row?.updatedAt.getTime())).toBe(false)
    expect(row?.createdAt.getFullYear()).toBeGreaterThanOrEqual(2026)
  })

  it('defaults new rows to unix seconds', async () => {
    const { default: Database } = await import('better-sqlite3')
    const db = new Database(dbPath)
    db.prepare(
      "INSERT INTO ip_hostname_enrichments (ip) VALUES ('2001:db8::1')",
    ).run()
    const row = db
      .prepare(
        "SELECT typeof(created_at) AS c, typeof(updated_at) AS u FROM ip_hostname_enrichments WHERE ip = '2001:db8::1'",
      )
      .get() as { c: string; u: string }
    db.close()
    expect(row).toEqual({ c: 'integer', u: 'integer' })
  })

  it('keeps every index on the rebuilt table', async () => {
    const { default: Database } = await import('better-sqlite3')
    const db = new Database(dbPath)
    const names = (
      db
        .prepare(
          "SELECT name FROM sqlite_master WHERE type = 'index' AND tbl_name = 'ip_hostname_enrichments' AND name NOT LIKE 'sqlite_%' ORDER BY name",
        )
        .all() as { name: string }[]
    ).map((r) => r.name)
    db.close()
    expect(names).toEqual([
      'ip_hostname_enrichments_ip_unique',
      'ip_hostname_ip_idx',
      'ip_hostname_next_lookup_idx',
      'ip_hostname_status_idx',
      'ip_hostname_status_next_idx',
    ])
  })
})
