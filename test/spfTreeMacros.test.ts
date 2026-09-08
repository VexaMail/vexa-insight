import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockResolveTxt } from './mockResolveTxt'
import { freshSpfTreeState } from './setup/freshSpfTreeState'
import { loadBuildSpfTreeNode } from './setup/loadBuildSpfTreeNode'
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

describe('buildSpfTreeNode: macro mechanisms', () => {
  it('counts macro mechanisms without trying to resolve them', async () => {
    const buildSpfTreeNode = await loadBuildSpfTreeNode()
    mockSpfZone({
      'example.com':
        'v=spf1 exists:%{ir}.%{v}._spf.example.com include:a.example -all',
      'a.example': 'v=spf1 -all',
    })

    const root = await buildSpfTreeNode('example.com', 0, freshSpfTreeState())

    expect(root?.macroMechanisms).toEqual([
      'exists:%{ir}.%{v}._spf.example.com',
    ])
    // The exists still consumes a lookup at evaluation time.
    expect(root?.lookupCount).toBe(2)
    // ...but no node is created for it, and no literal macro DNS query is made.
    expect(root?.children.map((c) => c.domain)).toEqual(['a.example'])
    expect(
      mockResolveTxt.mock.calls.some(([host]) => String(host).includes('%{')),
    ).toBe(false)
  })

  it('does not expand a macro include as a missing-record child', async () => {
    const buildSpfTreeNode = await loadBuildSpfTreeNode()
    mockSpfZone({
      'example.com': 'v=spf1 include:%{d}.spf.example.net -all',
    })

    const root = await buildSpfTreeNode('example.com', 0, freshSpfTreeState())

    // Previously this produced a child flagged "No SPF record", which reads as
    // a misconfiguration rather than an unresolvable target.
    expect(root?.children).toEqual([])
    expect(root?.macroMechanisms).toEqual(['include:%{d}.spf.example.net'])
    expect(root?.lookupCount).toBe(1)
  })
})
