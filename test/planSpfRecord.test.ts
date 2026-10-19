import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { mockResolveTxt } from './mockResolveTxt'
import { mockSpfZone } from './setup/mockSpfZone'
import { resetSpfDiagnosticsCache } from './setup/resetSpfDiagnosticsCache'

vi.mock('node:dns/promises', () => ({
  default: {
    resolveTxt: mockResolveTxt,
  },
}))

// The services barrel is a large cold import: load it once outside the
// per-test timeout, so a loaded machine does not time the first test out.
beforeAll(async () => {
  await import('@/services/diagnostics')
}, 60_000)

afterEach(() => {
  vi.resetAllMocks()
  resetSpfDiagnosticsCache()
})

describe('planSpfRecord', () => {
  it('counts a candidate record next to the published one', async () => {
    const { planSpfRecord } = await import('@/services/diagnostics')
    mockSpfZone({
      'example.com': 'v=spf1 include:a.example -all',
      'a.example': 'v=spf1 ip4:192.0.2.0/24 -all',
      'b.example': 'v=spf1 include:c.example include:d.example -all',
      'c.example': 'v=spf1 a mx -all',
      'd.example': 'v=spf1 ip4:198.51.100.0/24 -all',
    })

    const plan = await planSpfRecord(
      'example.com',
      'v=spf1 include:a.example include:b.example -all',
    )

    expect(plan.publishedLookups).toBe(1)
    expect(plan.plannedLookups).toBe(6)
    expect(plan.withinLimit).toBe(true)
    expect(plan.tree.children.map((child) => child.lookupCount)).toEqual([0, 4])
  })

  it('reports a candidate over the limit', async () => {
    const { planSpfRecord } = await import('@/services/diagnostics')
    mockSpfZone({})
    const includes = Array.from(
      { length: 11 },
      (_, i) => `include:s${String(i)}.example`,
    ).join(' ')

    const plan = await planSpfRecord('example.com', `v=spf1 ${includes} -all`)

    expect(plan.publishedLookups).toBeNull()
    expect(plan.plannedLookups).toBe(11)
    expect(plan.withinLimit).toBe(false)
  })
})

describe('findNonPublicSpfTargets', () => {
  it('flags includes that only resolve on a private network', async () => {
    const { findNonPublicSpfTargets } = await import('@/services/diagnostics')
    expect(
      findNonPublicSpfTargets(
        'v=spf1 include:_spf.example.net include:mail.corp include:intranet redirect=10.0.0.1',
      ),
    ).toEqual(['mail.corp', 'intranet', '10.0.0.1'])
  })
})

describe('planSpfRecord with untrusted includes', () => {
  it('does not resolve a private name reached through a public include', async () => {
    const { planSpfRecord } = await import('@/services/diagnostics')
    mockSpfZone({
      'a.example': 'v=spf1 include:mail.corp -all',
      'mail.corp': 'v=spf1 ip4:10.0.0.0/8 -all',
    })

    const plan = await planSpfRecord(
      'example.com',
      'v=spf1 include:a.example -all',
    )
    const hidden = plan.tree.children[0]?.children[0]

    expect(hidden?.domain).toBe('mail.corp')
    expect(hidden?.record).toBeNull()
    expect(mockResolveTxt).not.toHaveBeenCalledWith('mail.corp')
  })
})
