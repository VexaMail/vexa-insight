import { beforeAll, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

describe('poll status row creation', () => {
  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  it('lets concurrent readers create the missing row without a conflict', async () => {
    const { getPollStatusFromDb } =
      await import('../src/services/job/getPollStatusFromDb')
    const { setPollStatusInDb } =
      await import('../src/services/job/setPollStatusInDb')

    const results = await Promise.all([
      getPollStatusFromDb(),
      getPollStatusFromDb(),
      setPollStatusInDb({}),
      getPollStatusFromDb(),
    ])

    expect(results[0].isRunning).toBe(false)
    expect((await getPollStatusFromDb()).isRunning).toBe(false)
  })
})
