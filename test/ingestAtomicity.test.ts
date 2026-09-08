import { getDb, normalizedEvents, rawReports, runMigrations } from '@/lib/db'
import { ingestParsedReport } from '@/services/reports'
import { parseDmarcXml } from '@/utils/dmarc'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import type * as HasRawReportModule from '../src/services/reports/hasRawReport'
import { hasRawReport } from '../src/services/reports/hasRawReport'
import type * as WriteReportEventsModule from '../src/services/reports/writeReportEvents'
import { writeReportEvents } from '../src/services/reports/writeReportEvents'
import { resetDmarcDb } from './setup/resetDmarcDb'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('../src/services/reports/writeReportEvents', async (importOriginal) => {
  const actual = await importOriginal<typeof WriteReportEventsModule>()
  return { writeReportEvents: vi.fn(actual.writeReportEvents) }
})

vi.mock('../src/services/reports/hasRawReport', async (importOriginal) => {
  const actual = await importOriginal<typeof HasRawReportModule>()
  return { hasRawReport: vi.fn(actual.hasRawReport) }
})

describe('ingestParsedReport atomicity', () => {
  const FIXTURE = path.join(__dirname, 'fixtures', 'dmarc', 'google.xml')

  const countRows = (): { raw: number; events: number } => {
    const db = getDb()
    return {
      raw: db.select({ id: rawReports.id }).from(rawReports).all().length,
      events: db
        .select({ id: normalizedEvents.id })
        .from(normalizedEvents)
        .all().length,
    }
  }

  beforeAll(() => {
    // Same ordering constraint as ingestIdempotency: DATABASE_URL must point at
    // the temp file before getDb() is first called inside ingestParsedReport.
    setupTestDb()
    runMigrations()
  })

  beforeEach(() => {
    resetDmarcDb()
    vi.mocked(writeReportEvents).mockClear()
    vi.mocked(hasRawReport).mockClear()
  })

  it('leaves no raw report behind when the events write throws, and the retry ingests', async () => {
    const parsed = parseDmarcXml(readFileSync(FIXTURE))
    vi.mocked(writeReportEvents).mockImplementationOnce(() => {
      throw new Error('simulated events failure')
    })

    await expect(ingestParsedReport(parsed)).rejects.toThrow(
      'simulated events failure',
    )
    expect(countRows()).toEqual({ raw: 0, events: 0 })

    const retry = await ingestParsedReport(parsed)
    expect(retry.ingested).toBe(true)
    expect(countRows()).toEqual({ raw: 1, events: parsed.events.length })
  })

  it('stores the raw report and its events on a normal ingest', async () => {
    const parsed = parseDmarcXml(readFileSync(FIXTURE))
    const result = await ingestParsedReport(parsed)
    expect(result.ingested).toBe(true)
    if (!result.ingested) throw new Error('report was not ingested')

    const stored = getDb()
      .select({ id: rawReports.id, reportId: rawReports.reportId })
      .from(rawReports)
      .all()
    expect(stored).toEqual([
      { id: result.rawReportId, reportId: parsed.rawReport.reportId },
    ])
    expect(countRows().events).toBe(parsed.events.length)
  })

  it('still reports duplicate_report_id on a second ingest', async () => {
    const parsed = parseDmarcXml(readFileSync(FIXTURE))
    await ingestParsedReport(parsed)
    const second = await ingestParsedReport(parsed)
    expect(second).toMatchObject({
      ingested: false,
      reason: 'duplicate_report_id',
    })
    expect(countRows()).toEqual({ raw: 1, events: parsed.events.length })
  })

  it('returns duplicate_report_id without writing events when the pre-check is raced', async () => {
    const parsed = parseDmarcXml(readFileSync(FIXTURE))
    await ingestParsedReport(parsed)
    // Simulate a concurrent ingest that inserted the row after this one's
    // pre-check: the read says "new", the unique constraint says otherwise.
    vi.mocked(hasRawReport).mockReturnValueOnce(false)

    const raced = await ingestParsedReport(parsed)
    expect(raced).toEqual({ ingested: false, reason: 'duplicate_report_id' })
    expect(vi.mocked(writeReportEvents)).toHaveBeenCalledTimes(1)
    expect(countRows()).toEqual({ raw: 1, events: parsed.events.length })
  })
})
