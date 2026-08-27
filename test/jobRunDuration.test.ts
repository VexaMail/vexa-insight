import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/services/config', () => ({
  getConfig: () => ({
    ingestionDaysBack: 30,
    imapAccounts: [{ id: 1, label: 'test' }],
  }),
}))
vi.mock('@/services/notifications', () => ({ fireAndForgetDispatch: vi.fn() }))
vi.mock('../src/services/job/processAccount', () => ({
  // Stands in for the real IMAP work so the run has a measurable duration.
  processAccount: vi.fn(() => {
    vi.advanceTimersByTime(4_000)
    return Promise.resolve({
      processed: 7,
      ingested: 5,
      skipped: 2,
      errors: [],
    })
  }),
}))
vi.mock('../src/services/job/repairStuckEvents', () => ({
  repairStuckEvents: vi.fn(() => Promise.resolve(undefined)),
}))
vi.mock('../src/services/job/setPollStatusInDb', () => ({
  setPollStatusInDb: vi.fn(() => Promise.resolve(undefined)),
}))
vi.mock('../src/services/job/getPollStatusFromDb', () => ({
  getPollStatusFromDb: vi.fn(() => Promise.resolve({ abortRequested: false })),
}))
vi.mock('../src/services/job/createJobEventBuffer', () => ({
  createJobEventBuffer: () => ({
    add: vi.fn(() => Promise.resolve(undefined)),
    flush: vi.fn(() => Promise.resolve(undefined)),
  }),
}))
vi.mock('../src/services/job/createPollStatusCoalescer', () => ({
  createPollStatusCoalescer: () => ({
    flush: vi.fn(() => Promise.resolve(undefined)),
  }),
}))

describe('job_runs timing', () => {
  const ELAPSED_MS = 4_000

  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-08-26T10:00:00.000Z'))
  })

  afterAll(() => {
    vi.useRealTimers()
  })

  it('keeps runAt at the start and records completedAt at the end', async () => {
    const { getDb, jobRuns } = await import('@/lib/db')
    const { runIngestJob } = await import('../src/services/job/runIngestJob')

    const startedAt = new Date()
    await runIngestJob()

    const row = getDb().select().from(jobRuns).all().at(-1)
    expect(row?.runAt.getTime()).toBe(startedAt.getTime())
    expect(row?.completedAt?.getTime()).toBe(startedAt.getTime() + ELAPSED_MS)
  })

  it('records a duration that matches the work done', async () => {
    const { getDb, jobRuns } = await import('@/lib/db')

    const row = getDb().select().from(jobRuns).all().at(-1)
    const durationMs =
      (row?.completedAt?.getTime() ?? 0) - (row?.runAt.getTime() ?? 0)
    expect(durationMs).toBe(ELAPSED_MS)
    expect(row?.processed).toBe(7)
    expect(row?.ingested).toBe(5)
  })
})
