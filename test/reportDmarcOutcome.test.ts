import { runMigrations } from '@/lib/db'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { resetDmarcDb } from './setup/resetDmarcDb'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/services/auth', () => ({
  getAllowedDomainIds: vi.fn(async () => Promise.resolve(null)),
  getSession: vi.fn(async () => Promise.resolve(null)),
}))

const fixture = (name: string): Buffer =>
  readFileSync(path.join(__dirname, 'fixtures', 'dmarc', name))

describe('report list DMARC outcome', () => {
  beforeAll(() => {
    setupTestDb()
    runMigrations()
  })

  beforeEach(async () => {
    resetDmarcDb()
    const { ingestParsedReport } = await import('@/services/reports')
    const { parseDmarcXml } = await import('@/utils/dmarc')
    for (const name of [
      'mixed-dmarc-outcome.xml',
      'passing-dmarc-outcome.xml',
    ]) {
      const result = await ingestParsedReport(parseDmarcXml(fixture(name)))
      expect(result.ingested).toBe(true)
    }
  })

  it('counts messages where neither SPF nor DKIM is aligned as failing', async () => {
    const { getReports } = await import('@/services/reports')
    const { items } = await getReports(1, 25)
    const byReportId = new Map(items.map((r) => [r.reportId, r.dmarcOutcome]))

    expect(byReportId.get('mixed-dmarc-outcome-2026-10')).toEqual({
      totalMessages: 8,
      failingMessages: 3,
    })
    expect(byReportId.get('passing-dmarc-outcome-2026-10')).toEqual({
      totalMessages: 5,
      failingMessages: 0,
    })
  })

  it('attaches the same outcome to the latest reports', async () => {
    const { getLatestReports } = await import('@/services/reports')
    const items = await getLatestReports({ limit: 10 })
    const mixed = items.find(
      (r) => r.reportId === 'mixed-dmarc-outcome-2026-10',
    )
    expect(mixed?.dmarcOutcome).toEqual({
      totalMessages: 8,
      failingMessages: 3,
    })
  })
})
