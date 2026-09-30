import { runMigrations } from '@/lib/db'
import { ingestParsedReport } from '@/services/reports'
import { parseDmarcXml } from '@/utils/dmarc'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { beforeAll, describe, expect, it } from 'vitest'
import { queryIpDetailRow } from '../src/services/reports/queryIpDetailRow'
import { resetDmarcDb } from './setup/resetDmarcDb'
import { setupTestDb } from './setup/setupTestDb'

describe('RFC 9990 pass disposition', () => {
  beforeAll(() => {
    setupTestDb()
    runMigrations()
    resetDmarcDb()
  })

  it('counts pass with none in the IP disposition breakdown', async () => {
    const parsed = parseDmarcXml(
      readFileSync(
        path.join(__dirname, 'fixtures', 'dmarc', 'rfc9990-example.xml'),
      ),
    )
    const ingest = await ingestParsedReport(parsed)
    if (!ingest.ingested) throw new Error('fixture was not ingested')

    const row = await queryIpDetailRow('192.0.2.123', null)

    expect(row?.totalMessages).toBe(123)
    expect(row?.dispositionNone).toBe(123)
    expect(row?.dispositionQuarantine).toBe(0)
    expect(row?.dispositionReject).toBe(0)
  })
})
