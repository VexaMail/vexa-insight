import { beforeAll, describe, expect, it, vi } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

const config = {
  ingestionIntervalMinutes: 60,
  imapAccounts: [
    { server: 'imap.example.com', username: 'dmarc', password: 'secret' },
  ],
}

vi.mock('@/services/config', () => ({ getConfig: () => config }))

const NOW = new Date('2026-09-30T12:00:00.000Z')
const minutesAgo = (minutes: number) =>
  new Date(NOW.getTime() - minutes * 60 * 1000)

describe('checkIngestFreshness', () => {
  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  async function insertRun(runAt: Date, success: boolean) {
    const { getDb, jobRuns } = await import('@/lib/db')
    getDb().insert(jobRuns).values({ runAt, success }).run()
  }

  it('reads a fresh process with no runs yet as ok', async () => {
    const { checkIngestFreshness } = await import('../src/services/health')
    expect(await checkIngestFreshness(NOW)).toBe('ok')
  })

  it('counts a failed run as a sign the scheduler is alive', async () => {
    const { checkIngestFreshness } = await import('../src/services/health')
    await insertRun(minutesAgo(90), false)
    expect(await checkIngestFreshness(NOW)).toBe('ok')
  })

  it('reports stale once two intervals and the grace have passed', async () => {
    const { checkIngestFreshness } = await import('../src/services/health')
    const later = new Date(NOW.getTime() + 60 * 60 * 1000)
    // The newest run is now 150 minutes old; the limit is 130.
    expect(await checkIngestFreshness(later)).toBe('stale')
  })

  it('is idle when no mailbox is configured', async () => {
    const { checkIngestFreshness } = await import('../src/services/health')
    const saved = config.imapAccounts
    config.imapAccounts = []
    try {
      expect(await checkIngestFreshness(NOW)).toBe('idle')
    } finally {
      config.imapAccounts = saved
    }
  })
})
