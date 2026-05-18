import { readFileSync } from 'node:fs'
import path from 'node:path'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { runMigrations } from '@/lib/db'
import { ingestParsedReport } from '@/services/reports'
import { parseDmarcXml } from '@/utils/dmarc'
import { resetDmarcDb } from './setup/resetDmarcDb'
import { setupTestDb } from './setup/setupTestDb'

describe('ingestParsedReport idempotency', () => {
  const FIXTURE = path.join(__dirname, 'fixtures', 'dmarc', 'google.xml')

  beforeAll(() => {
    // setupTestDb sets DATABASE_URL to a temp file BEFORE the first call to
    // getDb() (which happens inside ingestParsedReport). runMigrations opens
    // its own handle via DATABASE_URL, so this order is required.
    setupTestDb()
    runMigrations()
  })

  beforeEach(() => {
    resetDmarcDb()
  })

  it('ingests a fresh report exactly once', async () => {
    const parsed = parseDmarcXml(readFileSync(FIXTURE))
    const result = await ingestParsedReport(parsed)
    expect(result.ingested).toBe(true)
    if (result.ingested) {
      expect(result.rawReportId).toBeGreaterThan(0)
    }
  })

  it('skips a duplicate reportId on second ingest', async () => {
    const parsed = parseDmarcXml(readFileSync(FIXTURE))
    const first = await ingestParsedReport(parsed)
    expect(first.ingested).toBe(true)
    const second = await ingestParsedReport(parsed)
    expect(second.ingested).toBe(false)
    if (!second.ingested) {
      expect(second.reason).toBe('duplicate_report_id')
    }
  })
})
