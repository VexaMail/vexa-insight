import { dnsSnapshots, getDb, runMigrations, sourceReviews } from '@/lib/db'
import { getDomainHealthTimeline } from '@/services/timeline'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { insertSeedDomains } from './setup/insertSeedDomains'
import { insertSeedEvents } from './setup/insertSeedEvents'
import { insertSeedIp } from './setup/insertSeedIp'
import { insertSeedReport } from './setup/insertSeedReport'
import { resetDmarcDb } from './setup/resetDmarcDb'
import { setupTestDb } from './setup/setupTestDb'

const NOW_MS = Date.UTC(2026, 0, 31)
const NOW = Math.floor(NOW_MS / 1000)
const DAY = 86_400

describe('getDomainHealthTimeline', () => {
  beforeAll(() => {
    setupTestDb()
    runMigrations()
  })

  beforeEach(() => {
    resetDmarcDb()
    getDb().delete(dnsSnapshots).run()
    getDb().delete(sourceReviews).run()
  })

  it('puts daily results next to DNS, source and review events', async () => {
    const now = new Date(NOW_MS)
    const [domainId = 0] = insertSeedDomains(1, now)
    const ipId = insertSeedIp(now)
    const rawReportId = insertSeedReport({
      domainIndex: 0,
      reportIndex: 0,
      beginUnix: NOW - 2 * DAY,
      endUnix: NOW - DAY,
      now,
    })
    insertSeedEvents({
      rawReportId,
      domainId,
      ipId,
      eventsPerReport: 2,
      beginUnix: NOW - 2 * DAY,
      endUnix: NOW - DAY,
      now,
    })
    getDb()
      .insert(dnsSnapshots)
      .values({
        domainName: 'example0.com',
        recordKind: 'dkim:mail',
        value: null,
        observedAt: NOW - 3600,
        source: 'scheduled',
      })
      .run()
    getDb()
      .insert(sourceReviews)
      .values({
        ip: '203.0.113.1',
        domainName: 'example0.com',
        verdict: 'legitimate',
        note: 'billing platform',
        reviewedAt: NOW - 60,
      })
      .run()

    const timeline = await getDomainHealthTimeline('example0.com', 30, NOW_MS)

    expect(timeline.days).toEqual([
      { day: Math.floor((NOW - DAY) / DAY), total: 3, aligned: 3 },
    ])
    expect(timeline.events.map((event) => event.title)).toEqual([
      'Source marked legitimate',
      'DKIM mail record removed',
      'New sending source',
    ])
    expect(timeline.events[2]?.href).toBe('/ips/203.0.113.1')
  })
})
