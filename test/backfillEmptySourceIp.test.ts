import {
  getDb,
  normalizedEventDkimResults,
  normalizedEvents,
  rawReports,
  runMigrations,
} from '@/lib/db'
import { ingestParsedReport } from '@/services/reports'
import { parseDmarcXml } from '@/utils/dmarc'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { backfillReportEvents } from '../src/services/reports/backfillReportEvents'
import { resetDmarcDb } from './setup/resetDmarcDb'
import { setupTestDb } from './setup/setupTestDb'

describe('backfillReportEvents with a skipped empty source_ip record', () => {
  const FIXTURE = path.join(
    __dirname,
    'fixtures',
    'dmarc',
    'empty-source-ip.xml',
  )

  beforeAll(() => {
    setupTestDb()
    runMigrations()
  })

  beforeEach(() => {
    resetDmarcDb()
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('aligns the stored event with the record that was ingested', async () => {
    const db = getDb()
    const result = await ingestParsedReport(
      parseDmarcXml(readFileSync(FIXTURE)),
    )
    expect(result.ingested).toBe(true)

    const [raw] = db.select({ id: rawReports.id }).from(rawReports).all()
    if (!raw) throw new Error('raw report must be stored')
    const events = db.select().from(normalizedEvents).all()
    expect(events).toHaveLength(1)
    const eventId = events[0]?.id
    if (eventId == null) throw new Error('event must be stored')

    // Simulate an event whose diagnostic fields need re-deriving.
    db.update(normalizedEvents).set({ spfAuthResult: 'none' }).run()
    db.delete(normalizedEventDkimResults).run()

    const counts = await backfillReportEvents(raw.id, [eventId])
    expect(counts).toEqual({ processed: 1, skipped: 0 })

    const [patched] = db.select().from(normalizedEvents).all()
    expect(patched?.spfAuthResult).toBe('pass')
    const dkim = db.select().from(normalizedEventDkimResults).all()
    expect(dkim).toHaveLength(1)
    expect(dkim[0]?.selector).toBe('s1')
  })
})
