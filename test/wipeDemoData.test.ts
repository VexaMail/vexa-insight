import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { setupTestDb } from './setup/setupTestDb'

/**
 * `wipeDemoData` used to delete every report whose id began `demo-`. A report
 * id is written by the reporting organisation, so `--force` took genuine
 * reports with it. Provenance is now a column the seeder sets.
 */
describe('demo data wipe', () => {
  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { getDb, rawReports } = await import('@/lib/db')
    await getDb().delete(rawReports)
  })

  const insertReport = async (reportId: string, isDemo: boolean) => {
    const { getDb, rawReports } = await import('@/lib/db')
    await getDb().insert(rawReports).values({
      reportId,
      orgName: 'reporter.example.com',
      beginDate: 1_700_000_000,
      endDate: 1_700_086_400,
      rawXml: '<feedback/>',
      ingestedAt: new Date(),
      isDemo,
    })
  }

  const remainingReportIds = async () => {
    const { getDb, rawReports } = await import('@/lib/db')
    return getDb()
      .select({ reportId: rawReports.reportId })
      .from(rawReports)
      .all()
      .map((row) => row.reportId)
  }

  it('keeps a genuine report whose id begins with the demo prefix', async () => {
    const { wipeDemoData } = await import('@/services/seed')
    await insertReport('demo-corp-2026-09-01', false)
    await insertReport('demo-example.com-2026-09-01', true)

    wipeDemoData()

    expect(await remainingReportIds()).toEqual(['demo-corp-2026-09-01'])
  })

  it('reports nothing seeded when only genuine reports carry the prefix', async () => {
    const { isDemoAlreadySeeded } = await import('@/services/seed')
    await insertReport('demo-corp-2026-09-02', false)

    expect(isDemoAlreadySeeded()).toBe(false)
  })
})
