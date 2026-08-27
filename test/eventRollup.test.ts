import { runMigrations } from '@/lib/db'
import { parseDmarcXml } from '@/utils/dmarc'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { resetDmarcDb } from './setup/resetDmarcDb'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/services/auth', () => ({
  getAllowedDomainIds: vi.fn(() => Promise.resolve(null)),
  getSession: vi.fn(() => Promise.resolve(null)),
}))

describe('event_rollup_daily consistency', () => {
  const FIXTURE = path.join(__dirname, 'fixtures', 'dmarc', 'google.xml')

  beforeAll(() => {
    setupTestDb()
    runMigrations()
  })

  beforeEach(() => {
    resetDmarcDb()
  })

  it('rollup aggregates match the ingested events and survive a rebuild', async () => {
    const { ingestParsedReport, getAggregateStats, rebuildEventRollup } =
      await import('@/services/reports')

    const parsed = parseDmarcXml(readFileSync(FIXTURE))
    parsed.rawReport.reportId = `rollup-${String(Date.now())}`

    const expectedTotal = parsed.events.reduce((sum, ev) => sum + ev.count, 0)
    const expectedPassed = parsed.events.reduce(
      (sum, ev) =>
        ev.spfResult === 'pass' || ev.dkimResult === 'pass'
          ? sum + ev.count
          : sum,
      0,
    )

    const result = await ingestParsedReport(parsed)
    expect(result.ingested).toBe(true)

    const incremental = await getAggregateStats()
    expect(incremental.totalEmails).toBe(expectedTotal)
    expect(incremental.overallPassRate).toBeCloseTo(
      expectedTotal > 0 ? (expectedPassed / expectedTotal) * 100 : 0,
      6,
    )

    // A full recompute must agree with the incremental rollup written at ingest.
    const rows = await rebuildEventRollup()
    expect(rows).toBeGreaterThan(0)
    const rebuilt = await getAggregateStats()
    expect(rebuilt.totalEmails).toBe(expectedTotal)
    expect(rebuilt.overallPassRate).toBeCloseTo(incremental.overallPassRate, 6)
  })
})
