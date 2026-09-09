import { beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { seedReportSourcesFixture } from './setup/seedReportSourcesFixture'
import { setupTestDb } from './setup/setupTestDb'

const REPORT_END = '2026-07-03T00:00:00Z'
const IP_B = '198.51.100.20'
const IP_A = '203.0.113.10'

describe('getReportSources', () => {
  beforeAll(async () => {
    setupTestDb()
    const { runMigrations } = await import('@/lib/db')
    runMigrations()
  })

  beforeEach(async () => {
    const { resetDmarcDb } = await import('./setup/resetDmarcDb')
    resetDmarcDb()
  })

  it('collapses events that share every grouped column and orders by volume', async () => {
    const { getReportSources } = await import('@/services/reports')
    const { rawReportId } = seedReportSourcesFixture(new Date(REPORT_END))

    const sources = await getReportSources(rawReportId)

    expect(sources.map((s) => [s.ip, s.messageCount, s.disposition])).toEqual([
      [IP_B, 10, 'none'],
      [IP_A, 8, 'none'],
      [IP_A, 2, 'quarantine'],
    ])
  })

  it('resolves the hostname enrichment, leaving unenriched IPs null', async () => {
    const { getReportSources } = await import('@/services/reports')
    const { rawReportId } = seedReportSourcesFixture(new Date(REPORT_END))

    const sources = await getReportSources(rawReportId)
    const byIp = new Map(sources.map((s) => [s.ip, s.hostname]))

    expect(byIp.get(IP_A)).toBe('mail-a.example.net')
    expect(byIp.get(IP_B)).toBeNull()
  })

  it('unions policy override types across every event of the same source IP', async () => {
    const { getReportSources } = await import('@/services/reports')
    const { rawReportId } = seedReportSourcesFixture(new Date(REPORT_END))

    const sources = await getReportSources(rawReportId)

    // Both IP-A rows carry the union of IP A's overrides, not just their own
    // group's: the override lookup is keyed by source IP, not by grouped row.
    for (const source of sources.filter((s) => s.ip === IP_A)) {
      expect(
        [...source.overrideTypes].sort((a, b) => a.localeCompare(b)),
      ).toEqual(['forwarded', 'mailing_list'])
    }
    expect(sources.find((s) => s.ip === IP_B)?.overrideTypes).toEqual([
      'sampled_out',
    ])
  })

  it('reports the first DKIM auth result found for the source IP', async () => {
    const { getReportSources } = await import('@/services/reports')
    const { rawReportId } = seedReportSourcesFixture(new Date(REPORT_END))

    const sources = await getReportSources(rawReportId)

    // IP A's lowest event id has no DKIM row, so the next one wins for every
    // IP-A group.
    for (const source of sources.filter((s) => s.ip === IP_A)) {
      expect(source.primaryDkimDomain).toBe('a1.example.com')
      expect(source.primaryDkimSelector).toBe('s1')
    }

    const ipB = sources.find((s) => s.ip === IP_B)
    expect(ipB?.primaryDkimDomain).toBe('b.example.com')
    expect(ipB?.primaryDkimSelector).toBe('sb')
  })

  it('returns an empty list for a report with no events', async () => {
    const { getReportSources } = await import('@/services/reports')
    const { rawReportId } = seedReportSourcesFixture(new Date(REPORT_END))

    expect(await getReportSources(rawReportId + 999)).toEqual([])
  })
})
