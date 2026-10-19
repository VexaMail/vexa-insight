import { dnsSnapshots, getDb, runMigrations } from '@/lib/db'
import { listDnsHistory, recordDnsSnapshot } from '@/services/dns-history'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { makeDnsDiagnostics } from './setup/makeDnsDiagnostics'
import { setupTestDb } from './setup/setupTestDb'

const lookup = vi.hoisted(() => ({ current: {} }))
const dispatch = vi.hoisted(() => vi.fn())

vi.mock('@/services/diagnostics', () => ({
  getDomainDnsRecords: vi.fn(async () => Promise.resolve(lookup.current)),
}))
vi.mock('@/services/notifications', () => ({
  fireAndForgetDispatch: dispatch,
}))

const DOMAIN = 'example.com'
const SPF_BEFORE = 'v=spf1 include:_spf.example.net -all'
const SPF_AFTER = 'v=spf1 -all'

describe('recordDnsSnapshot', () => {
  beforeAll(() => {
    setupTestDb()
    runMigrations()
  })

  beforeEach(() => {
    getDb().delete(dnsSnapshots).run()
    dispatch.mockClear()
  })

  it('stores a baseline on the first lookup without announcing it', async () => {
    lookup.current = makeDnsDiagnostics({
      dkim: [{ selector: 'mail', record: 'v=DKIM1; p=AAA', valid: true }],
    })
    const changes = await recordDnsSnapshot(DOMAIN, 'scheduled', 1e12)
    expect(changes.map((c) => c.recordKind)).toEqual([
      'dkim:mail',
      'dmarc',
      'spf',
    ])
    expect(dispatch).not.toHaveBeenCalled()
  })

  it('stores and announces only what changed', async () => {
    lookup.current = makeDnsDiagnostics()
    await recordDnsSnapshot(DOMAIN, 'scheduled', 1e12)
    lookup.current = makeDnsDiagnostics({ spf: SPF_AFTER })
    const changes = await recordDnsSnapshot(DOMAIN, 'manual', 2e12)
    expect(changes).toEqual([
      {
        recordKind: 'spf',
        previous: SPF_BEFORE,
        current: SPF_AFTER,
      },
    ])
    expect(dispatch).toHaveBeenCalledWith('dns.record_changed', {
      domain: DOMAIN,
      record: 'spf',
      previous: SPF_BEFORE,
      current: SPF_AFTER,
    })
    const history = await listDnsHistory(DOMAIN)
    expect(history[0]).toMatchObject({
      recordKind: 'spf',
      value: SPF_AFTER,
      source: 'manual',
    })
  })

  it('records a DKIM selector that stops answering as removed', async () => {
    lookup.current = makeDnsDiagnostics({
      dkim: [{ selector: 'mail', record: 'v=DKIM1; p=AAA', valid: true }],
    })
    await recordDnsSnapshot(DOMAIN, 'scheduled', 1e12)
    lookup.current = makeDnsDiagnostics()
    const changes = await recordDnsSnapshot(DOMAIN, 'scheduled', 2e12)
    expect(changes).toEqual([
      { recordKind: 'dkim:mail', previous: 'v=DKIM1; p=AAA', current: null },
    ])
  })

  it('stores nothing when the records are unchanged', async () => {
    lookup.current = makeDnsDiagnostics()
    await recordDnsSnapshot(DOMAIN, 'scheduled', 1e12)
    expect(await recordDnsSnapshot(DOMAIN, 'scheduled', 2e12)).toEqual([])
    expect(await listDnsHistory(DOMAIN)).toHaveLength(2)
  })
})
