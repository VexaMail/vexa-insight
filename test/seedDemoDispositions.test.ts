import { beforeAll, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

/**
 * The seeded demo is what a first-time reader sees, and screenshots of it go
 * out publicly. A uniformly random disposition produced rejected mail with SPF
 * and DKIM both aligned, which is the one thing a DMARC-literate reader checks.
 */
describe('demo seed dispositions', () => {
  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
    const { runSeedDemo } = await import('@/services/seed')
    runSeedDemo({ force: true })
  })

  it('never acts on a message that aligns on an identifier', async () => {
    const { getDb, normalizedEvents } = await import('@/lib/db')
    const rows = await getDb().select().from(normalizedEvents)

    expect(rows.length).toBeGreaterThan(0)
    const acted = rows.filter(
      (row) =>
        row.disposition !== 'none' && (row.spfAligned || row.dkimAligned),
    )
    expect(acted).toEqual([])
  })
})
