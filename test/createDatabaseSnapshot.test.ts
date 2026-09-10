import fs from 'node:fs'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

/**
 * The pre-update backup exists so an operator can go back. In WAL mode a
 * committed row can still live only in the `-wal` file, so a plain file copy
 * of the main database restores a database that is missing data nobody thinks
 * they lost. This pins the difference.
 */
describe('database snapshot', () => {
  let dbPath = ''

  beforeEach(async () => {
    dbPath = setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  afterEach(() => {
    fs.rmSync(`${dbPath}.snapshot`, { force: true })
    fs.rmSync(`${dbPath}.copy`, { force: true })
  })

  const countUsers = async (file: string): Promise<number> => {
    const { default: Database } = await import('better-sqlite3')
    const db = new Database(file, { readonly: true })
    try {
      const row = db.prepare('SELECT COUNT(*) AS n FROM users').get() as {
        n: number
      }
      return row.n
    } finally {
      db.close()
    }
  }

  it('keeps rows that a plain copy of the main file loses', async () => {
    const { createUser } = await import('@/services/users')
    const { createDatabaseSnapshot } = await import('@/services/backup')
    await createUser({
      username: 'kept@example.com',
      password: 'Str0ngPass!23',
    })

    createDatabaseSnapshot(`${dbPath}.snapshot`)
    fs.copyFileSync(dbPath, `${dbPath}.copy`)

    expect(await countUsers(`${dbPath}.snapshot`)).toBe(1)
    expect(await countUsers(`${dbPath}.copy`)).toBe(0)
  })
})
