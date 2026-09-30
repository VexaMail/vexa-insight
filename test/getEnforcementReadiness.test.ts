import { domains, getDb, runMigrations } from '@/lib/db'
import { getEnforcementReadiness } from '@/services/enforcement'
import { ingestParsedReport } from '@/services/reports'
import { parseDmarcXml } from '@/utils/dmarc'
import { eq } from 'drizzle-orm'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { beforeAll, describe, expect, it } from 'vitest'
import { resetDmarcDb } from './setup/resetDmarcDb'
import { setupTestDb } from './setup/setupTestDb'

describe('getEnforcementReadiness', () => {
  beforeAll(() => {
    setupTestDb()
    runMigrations()
    resetDmarcDb()
  })

  it('adds up the stored events of a domain', async () => {
    const parsed = parseDmarcXml(
      readFileSync(path.join(__dirname, 'fixtures', 'dmarc', 'google.xml')),
    )
    const ingest = await ingestParsedReport(parsed)
    if (!ingest.ingested) throw new Error('fixture was not ingested')
    const expectedTotal = parsed.events.reduce((n, e) => n + e.count, 0)
    const expectedPassing = parsed.events
      .filter((e) => e.spfAligned || e.dkimAligned)
      .reduce((n, e) => n + e.count, 0)

    const domain = getDb()
      .select({ id: domains.id })
      .from(domains)
      .where(eq(domains.name, parsed.domain))
      .get()
    if (!domain) throw new Error('domain missing')
    const readiness = await getEnforcementReadiness(domain.id, 100_000)

    expect(readiness.totalMessages).toBe(expectedTotal)
    expect(readiness.passingMessages).toBe(expectedPassing)
    expect(readiness.reportDays).toBe(1)
  })
})
