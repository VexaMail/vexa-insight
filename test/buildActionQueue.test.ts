import type {
  DomainPeriodTotals,
  IngestionHealth,
  SourcePeriodRow,
} from '@/types/dashboard'
import {
  buildActionQueue,
  buildChangeList,
  resolveTriageWindow,
  unixDay,
} from '@/utils/dashboard'
import { describe, expect, it } from 'vitest'

const NAME = 'a.example.com'
const now = new Date('2026-10-19T12:00:00Z')
const today = unixDay(now)
const window = resolveTriageWindow({ days: 30, now })

const healthy: IngestionHealth = {
  state: 'healthy',
  intervalMinutes: 60,
  lastRunAtMs: now.getTime(),
  lastRunSuccess: true,
  lastRunProcessed: 1,
  lastRunIngested: 1,
  lastRunError: null,
  previousRunProcessed: null,
  lastSuccessAtMs: now.getTime(),
  nextRunAtMs: now.getTime(),
  mailboxFreshAtMs: now.getTime(),
  lastRunDurationMs: 1000,
  mailboxCount: 1,
  recentErrorCount: 0,
  newestReportDay: today,
}

function domain(
  name: string,
  current: [number, number],
  previous: [number, number],
  lastReportDay: number | null = today,
): DomainPeriodTotals {
  return {
    domainId: name.length,
    domainName: name,
    createdAtMs: 0,
    lastReportDay,
    current: { total: current[0], passed: current[1] },
    previous: { total: previous[0], passed: previous[1] },
  }
}

const source: SourcePeriodRow = {
  ip: '192.0.2.10',
  countryCode: null,
  domainName: NAME,
  currentTotal: 40,
  currentFailed: 40,
  previousFailed: 0,
  lastFailedAt: 1,
}

function run(domains: DomainPeriodTotals[], sources: SourcePeriodRow[] = []) {
  const input = {
    window,
    domains,
    sources,
    ingestion: healthy,
    todayDay: today,
  }
  return { queue: buildActionQueue(input), changes: buildChangeList(input) }
}

describe('buildActionQueue', () => {
  it('queues a compliance drop as new and critical below 80%', () => {
    const { queue } = run([domain(NAME, [100, 60], [100, 99])])
    expect(queue).toHaveLength(1)
    expect(queue[0]).toMatchObject({
      issue: 'DMARC compliance dropped',
      severity: 'critical',
      isNew: true,
      impactMessages: 40,
      href: '/domains/a.example.com',
    })
  })

  it('keeps low compliance that was already low as long-standing', () => {
    const { queue } = run([domain(NAME, [100, 90], [100, 91])])
    expect(queue[0]).toMatchObject({
      issue: 'Low DMARC compliance',
      isNew: false,
    })
  })

  it('ignores a domain without enough messages to judge', () => {
    expect(run([domain(NAME, [10, 1], [10, 10])]).queue).toEqual([])
  })

  it('queues a domain whose reports stopped, using the coverage threshold', () => {
    const silent = domain(NAME, [0, 0], [500, 500], today - 6)
    expect(run([silent]).queue[0]).toMatchObject({ issue: 'Reports stopped' })
    const late = domain(NAME, [0, 0], [500, 500], today - 3)
    expect(run([late]).queue).toEqual([])
  })

  it('queues a source that started failing and lists it as a change', () => {
    const { queue, changes } = run([], [source])
    expect(queue[0]).toMatchObject({
      issue: 'New failing source',
      href: '/ips/192.0.2.10',
    })
    expect(changes.map((c) => c.id)).toContain('new-failing-sources')
  })

  it('puts failed ingestion first', () => {
    const input = {
      window,
      domains: [domain(NAME, [100, 50], [100, 50])],
      sources: [],
      ingestion: { ...healthy, state: 'failing' as const },
      todayDay: today,
    }
    expect(buildActionQueue(input)[0]?.issue).toBe('Last ingestion run failed')
  })
})

describe('buildChangeList', () => {
  it('reports the overall failure rate change in points', () => {
    const { changes } = run([domain(NAME, [100, 96], [100, 90])])
    const rate = changes.find((c) => c.id === 'failure-rate')
    expect(rate).toMatchObject({ value: '-6.0 pts', direction: 'better' })
    expect(changes.find((c) => c.id === 'now-compliant')).toBeDefined()
  })
})
