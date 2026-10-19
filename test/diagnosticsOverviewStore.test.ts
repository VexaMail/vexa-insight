import { domainDiagnostics, domains, getDb, runMigrations } from '@/lib/db'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { insertSeedDomains } from './setup/insertSeedDomains'
import { makeHealthyDnsDiagnostics } from './setup/makeHealthyDnsDiagnostics'
import { setupTestDb } from './setup/setupTestDb'

const lookups = vi.hoisted(() => ({ count: 0 }))

vi.mock('@/services/auth', () => ({
  getAllowedDomainIds: vi.fn(async () => Promise.resolve(null)),
}))
vi.mock('@/services/diagnostics/getDomainDnsRecords', () => ({
  getDomainDnsRecords: vi.fn(async (domain: string) => {
    lookups.count += 1
    return Promise.resolve(makeHealthyDnsDiagnostics({ domain }))
  }),
}))
vi.mock('@/services/diagnostics/getReportedDkimSelectors', () => ({
  getReportedDkimSelectors: vi.fn(async () => Promise.resolve([])),
}))

const { loadDiagnosticsOverview, refreshDiagnosticsOverview } =
  await import('@/services/diagnostics')

describe('diagnostics index store', () => {
  let ids: number[] = []

  beforeAll(() => {
    setupTestDb()
    runMigrations()
  })

  beforeEach(() => {
    getDb().delete(domainDiagnostics).run()
    getDb().delete(domains).run()
    ids = insertSeedDomains(3, new Date('2026-10-19T00:00:00.000Z'))
    lookups.count = 0
  })

  it('lists every domain without a lookup, none checked yet', async () => {
    const rows = await loadDiagnosticsOverview()
    expect(rows.map((row) => row.check)).toEqual([null, null, null])
    expect(lookups.count).toBe(0)
  })

  it('stores a refreshed batch so the next load reads it back', async () => {
    const [first, second] = ids
    const refreshed = await refreshDiagnosticsOverview([
      first ?? 0,
      second ?? 0,
    ])
    expect(refreshed.map((row) => row.domainId)).toEqual([first, second])
    expect(lookups.count).toBe(2)

    const rows = await loadDiagnosticsOverview()
    const checked = rows.filter((row) => row.check !== null)
    expect(checked.map((row) => row.domainId).toSorted()).toEqual(
      [first, second].toSorted(),
    )
    expect(checked[0]?.check?.resolved).toBe(true)
    expect(checked[0]?.check?.protocols.map((p) => p.id).toSorted()).toEqual(
      ['bimi', 'dkim', 'dmarc', 'mtaSts', 'spf', 'tlsRpt'].toSorted(),
    )
    expect(rows.at(-1)?.check).toBeNull()
  })

  it('leaves out ids that are not domains', async () => {
    expect(await refreshDiagnosticsOverview([9999])).toEqual([])
    expect(lookups.count).toBe(0)
  })
})
