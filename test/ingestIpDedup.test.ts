import { getDb, ipAddresses, runMigrations } from '@/lib/db'
import { ingestParsedReport } from '@/services/reports'
import { parseDmarcXml } from '@/utils/dmarc'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { resetDmarcDb } from './setup/resetDmarcDb'
import { setupTestDb } from './setup/setupTestDb'

describe('ingestParsedReport IP dedup', () => {
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

  it('inserts at most one ip_addresses row when the same IP appears in many events', async () => {
    const parsed = parseDmarcXml(readFileSync(FIXTURE))
    const baseEvent = parsed.events[0]
    if (!baseEvent) throw new Error('fixture must have at least one event')
    parsed.events = Array.from({ length: 50 }, (_, i) => ({
      ...baseEvent,
      count: i + 1,
    }))
    parsed.rawReport.reportId = `dedup-${Date.now()}`

    const before = getDb().select().from(ipAddresses).all().length
    const result = await ingestParsedReport(parsed)
    expect(result.ingested).toBe(true)
    const after = getDb().select().from(ipAddresses).all().length
    expect(after - before).toBe(1)
  })
})
