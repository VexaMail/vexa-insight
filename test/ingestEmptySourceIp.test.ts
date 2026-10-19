import {
  eventRollupDaily,
  getDb,
  ipAddresses,
  normalizedEvents,
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
import { resetDmarcDb } from './setup/resetDmarcDb'
import { setupTestDb } from './setup/setupTestDb'

describe('ingestParsedReport with an unusable source_ip', () => {
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

  it('skips the record without an IP and ingests the valid one', async () => {
    const parsed = parseDmarcXml(readFileSync(FIXTURE))
    expect(parsed.events).toHaveLength(2)

    const result = await ingestParsedReport(parsed)
    expect(result.ingested).toBe(true)

    const events = getDb().select().from(normalizedEvents).all()
    expect(events).toHaveLength(1)
    expect(events[0]?.count).toBe(4)

    const ips = getDb().select().from(ipAddresses).all()
    expect(ips.map((row) => row.ip)).toEqual(['192.0.2.25'])

    const rollups = getDb().select().from(eventRollupDaily).all()
    const total = rollups.reduce((sum, row) => sum + row.totalCount, 0)
    expect(total).toBe(4)

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining('empty-source-ip-2026-10'),
    )
  })

  it('skips a record whose source_ip is not an IP address', async () => {
    const parsed = parseDmarcXml(readFileSync(FIXTURE))
    const first = parsed.events[0]
    if (!first) throw new Error('fixture must have events')
    first.sourceIp = 'not-an-ip'
    parsed.rawReport.reportId = 'garbage-source-ip-2026-10'

    const result = await ingestParsedReport(parsed)
    expect(result.ingested).toBe(true)
    expect(getDb().select().from(normalizedEvents).all()).toHaveLength(1)
  })
})
