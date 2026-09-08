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

describe('resolveSpfTree', () => {
  it('caches the resolved tree per domain', async () => {
    const { resolveSpfTree } =
      await import('../src/services/diagnostics/resolveSpfTree')
    mockSpfZone({ 'cached.example': 'v=spf1 -all' })

    const first = await resolveSpfTree('cached.example')
    const callsAfterFirst = mockResolveTxt.mock.calls.length
    const second = await resolveSpfTree('cached.example')

    expect(first?.domain).toBe('cached.example')
    expect(second).toEqual(first)
    expect(mockResolveTxt.mock.calls).toHaveLength(callsAfterFirst)
  })
})
