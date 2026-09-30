import { beforeAll, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

describe('default project name', () => {
  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  it('is "Vexa Insight" on a fresh database', async () => {
    const { appSettings, getDb } = await import('@/lib/db')
    const row = getDb()
      .select({ projectName: appSettings.projectName })
      .from(appSettings)
      .get()
    expect(row?.projectName).toBe('Vexa Insight')
  })
})
