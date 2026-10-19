import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockResolveTxt } from './mockResolveTxt'
import { mockSpfZone } from './setup/mockSpfZone'
import { resetSpfDiagnosticsCache } from './setup/resetSpfDiagnosticsCache'

vi.mock('node:dns/promises', () => ({
  default: {
    resolveTxt: mockResolveTxt,
  },
}))

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
