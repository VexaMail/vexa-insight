import { eventRollupDaily, getDb, runMigrations } from '@/lib/db'
import { checkReportCoverage } from '@/services/gaps'
import { getOrCreateDomainId } from '@/services/reports'
import { isReportCoverageStale } from '@/utils/gaps'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { resetDmarcDb } from './setup/resetDmarcDb'
import { setupTestDb } from './setup/setupTestDb'

const NOW = Date.parse('2026-09-30T12:00:00Z')
const TODAY = Math.floor(NOW / 86_400_000)

describe('isReportCoverageStale', () => {
  it('flags a domain silent for more than three days', () => {
    expect(isReportCoverageStale(TODAY - 4, NOW)).toBe(true)
    expect(isReportCoverageStale(TODAY - 3, NOW)).toBe(false)
  })

  it('does not flag a domain that never had reports', () => {
    expect(isReportCoverageStale(null, NOW)).toBe(false)
  })
})

describe('checkReportCoverage', () => {
  beforeAll(() => {
    setupTestDb()
    runMigrations()
  })

  beforeEach(() => {
    resetDmarcDb()
  })

  async function seed(name: string, day: number): Promise<void> {
    const domainId = await getOrCreateDomainId(getDb(), name)
    getDb()
      .insert(eventRollupDaily)
      .values({ domainId, day, totalCount: 1, passedCount: 1 })
      .run()
  }

  it('announces a domain on the day it crosses the threshold, once', async () => {
    await seed('silent.example.com', TODAY - 4)
    await seed('long-silent.example.com', TODAY - 9)
    await seed('fresh.example.com', TODAY - 1)
    expect(await checkReportCoverage(NOW)).toEqual(['silent.example.com'])
  })
})
