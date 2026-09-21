import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { seedDomainsSummaryFixture } from './setup/seedDomainsSummaryFixture'
import { setupTestDb } from './setup/setupTestDb'

vi.mock('@/services/auth', () => ({
  getAllowedDomainIds: vi.fn(async () => Promise.resolve(null)),
  getSession: vi.fn(async () => Promise.resolve(null)),
}))

describe('IP detail listings can be searched, filtered and sorted', () => {
  const BEGIN_UNIX = Math.floor(
    new Date('2026-01-01T00:00:00Z').getTime() / 1000,
  )
  const END_UNIX = Math.floor(new Date('2026-01-31T00:00:00Z').getTime() / 1000)
  const NOW = new Date('2026-01-15T12:00:00Z')
  const IP = '203.0.113.1'

  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { resetDmarcDb } = await import('./setup/resetDmarcDb')
    resetDmarcDb()
    const { getAllowedDomainIds } = await import('@/services/auth')
    vi.mocked(getAllowedDomainIds).mockResolvedValue(null)
    seedDomainsSummaryFixture({
      domainCount: 3,
      reportsPerDomain: 1,
      eventsPerReport: 3,
      beginUnix: BEGIN_UNIX,
      endUnix: END_UNIX,
      now: NOW,
    })
  })

  it('narrows related domains by search text', async () => {
    const { getIpDomains } = await import('@/services/reports')

    const rows = await getIpDomains({
      ip: IP,
      query: { search: 'example1', sort: 'volume' },
    })

    expect(rows.map((row) => row.domain)).toEqual(['example1.com'])
  })

  it('sorts related domains by name when asked', async () => {
    const { getIpDomains } = await import('@/services/reports')

    const rows = await getIpDomains({
      ip: IP,
      query: { search: '', sort: 'domain' },
    })

    expect(rows.map((row) => row.domain)).toEqual([
      'example0.com',
      'example1.com',
      'example2.com',
    ])
  })

  it('never repeats a domain across pages', async () => {
    const { getIpDomains } = await import('@/services/reports')

    const first = await getIpDomains({ ip: IP, limit: 2 })
    const second = await getIpDomains({ ip: IP, limit: 2, offset: 2 })
    const ids = [...first, ...second].map((row) => row.domainId)

    expect(new Set(ids).size).toBe(ids.length)
    expect(ids).toHaveLength(3)
  })

  it('filters events by authentication result', async () => {
    const { getIpLogs } = await import('@/services/reports')

    const passed = await getIpLogs({
      ip: IP,
      query: {
        search: '',
        disposition: '',
        spfResult: 'pass',
        dkimResult: '',
        sort: 'newest',
      },
    })

    expect(passed).not.toHaveLength(0)
    expect(passed.every((row) => row.spfResult === 'pass')).toBe(true)
  })

  it('filters events by report id search', async () => {
    const { getIpLogs } = await import('@/services/reports')

    const rows = await getIpLogs({
      ip: IP,
      query: {
        search: 'd1-r0',
        disposition: '',
        spfResult: '',
        dkimResult: '',
        sort: 'newest',
      },
    })

    expect(rows).not.toHaveLength(0)
    expect(rows.every((row) => row.reportId === 'd1-r0')).toBe(true)
  })

  it('sorts events by volume and pages them without repeats', async () => {
    const { getIpLogs } = await import('@/services/reports')

    const query = {
      search: '',
      disposition: '',
      spfResult: '',
      dkimResult: '',
      sort: 'volume',
    } as const

    const first = await getIpLogs({ ip: IP, limit: 4, query })
    const second = await getIpLogs({ ip: IP, limit: 4, offset: 4, query })
    const all = [...first, ...second]

    expect(new Set(all.map((row) => row.eventId)).size).toBe(all.length)
    expect(first.map((row) => row.count)).toEqual([3, 3, 3, 2])
  })
})
