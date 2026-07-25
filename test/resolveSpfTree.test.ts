import { afterEach, describe, expect, it, vi } from 'vitest'
import { mockResolveTxt } from './mockResolveTxt'

vi.mock('node:dns/promises', () => ({
  default: {
    resolveTxt: mockResolveTxt,
  },
}))

afterEach(() => {
  vi.resetAllMocks()
  delete (globalThis as { __vexaDiagnosticsCache?: unknown })
    .__vexaDiagnosticsCache
})

export function freshState() {
  return { visited: new Set<string>(), nodeCount: 0 }
}

describe('buildSpfTreeNode', () => {
  it('builds a single node with no children for a flat record', async () => {
    const { buildSpfTreeNode } =
      await import('../services/diagnostics/buildSpfTreeNode')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'example.com') return [['v=spf1 ip4:203.0.113.10 -all']]
      return []
    })

    const root = await buildSpfTreeNode('example.com', 0, freshState())

    expect(root).not.toBeNull()
    expect(root?.domain).toBe('example.com')
    expect(root?.record).toBe('v=spf1 ip4:203.0.113.10 -all')
    expect(root?.mechanisms).toEqual([])
    expect(root?.children).toEqual([])
    expect(root?.lookupCount).toBe(0)
    expect(root?.missingRecord).toBe(false)
    expect(root?.cycleDetected).toBe(false)
    expect(root?.exceedsLookupLimit).toBe(false)
  })

  it('resolves nested includes and rolls up lookup counts', async () => {
    const { buildSpfTreeNode } =
      await import('../services/diagnostics/buildSpfTreeNode')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'example.com') return [['v=spf1 include:a.example -all']]
      if (host === 'a.example') return [['v=spf1 include:b.example ~all']]
      if (host === 'b.example') return [['v=spf1 mx -all']]
      return []
    })

    const root = await buildSpfTreeNode('example.com', 0, freshState())

    expect(root?.mechanisms).toEqual(['include:a.example'])
    expect(root?.children).toHaveLength(1)
    expect(root?.children[0]?.domain).toBe('a.example')
    expect(root?.children[0]?.children[0]?.domain).toBe('b.example')
    expect(root?.children[0]?.children[0]?.mechanisms).toEqual(['mx'])
    // include:a (1) + include:b (1) + mx (1)
    expect(root?.lookupCount).toBe(3)
    expect(root?.children[0]?.lookupCount).toBe(2)
    expect(root?.children[0]?.children[0]?.lookupCount).toBe(1)
  })

  it('follows redirect= as a child node', async () => {
    const { buildSpfTreeNode } =
      await import('../services/diagnostics/buildSpfTreeNode')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'example.com') return [['v=spf1 redirect=_spf.example.net']]
      if (host === '_spf.example.net') return [['v=spf1 a -all']]
      return []
    })

    const root = await buildSpfTreeNode('example.com', 0, freshState())

    expect(root?.mechanisms).toEqual(['redirect=_spf.example.net'])
    expect(root?.children).toHaveLength(1)
    expect(root?.children[0]?.domain).toBe('_spf.example.net')
    expect(root?.children[0]?.mechanisms).toEqual(['a'])
    // redirect (1) + a (1)
    expect(root?.lookupCount).toBe(2)
  })

  it('ignores redirect= when the record also has an all mechanism', async () => {
    const { buildSpfTreeNode } =
      await import('../services/diagnostics/buildSpfTreeNode')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'example.com') {
        return [['v=spf1 include:a.example redirect=_spf.example.net -all']]
      }
      if (host === 'a.example') return [['v=spf1 ip4:203.0.113.10 -all']]
      if (host === '_spf.example.net') return [['v=spf1 mx mx:b.example -all']]
      return []
    })

    const root = await buildSpfTreeNode('example.com', 0, freshState())

    // RFC 7208 6.1: the redirect is never evaluated, so it is not followed and
    // consumes no lookup. Only the include remains.
    expect(root?.mechanisms).toEqual(['include:a.example'])
    expect(root?.children.map((c) => c.domain)).toEqual(['a.example'])
    expect(root?.lookupCount).toBe(1)
    expect(root?.ignoredRedirect).toBe('_spf.example.net')
  })

  it('honors redirect= and reports no ignored redirect without an all', async () => {
    const { buildSpfTreeNode } =
      await import('../services/diagnostics/buildSpfTreeNode')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'example.com') return [['v=spf1 redirect=_spf.example.net']]
      if (host === '_spf.example.net') return [['v=spf1 a -all']]
      return []
    })

    const root = await buildSpfTreeNode('example.com', 0, freshState())

    expect(root?.ignoredRedirect).toBeNull()
    expect(root?.children.map((c) => c.domain)).toEqual(['_spf.example.net'])
    expect(root?.lookupCount).toBe(2)
  })

  it('ignores redirect= placed before the all mechanism too', async () => {
    const { buildSpfTreeNode } =
      await import('../services/diagnostics/buildSpfTreeNode')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'example.com') {
        return [['v=spf1 redirect=_spf.example.net ~all']]
      }
      if (host === '_spf.example.net') return [['v=spf1 a -all']]
      return []
    })

    const root = await buildSpfTreeNode('example.com', 0, freshState())

    // "regardless of the relative ordering of the terms", and any qualifier.
    expect(root?.ignoredRedirect).toBe('_spf.example.net')
    expect(root?.children).toEqual([])
    expect(root?.lookupCount).toBe(0)
  })

  it('counts macro mechanisms without trying to resolve them', async () => {
    const { buildSpfTreeNode } =
      await import('../services/diagnostics/buildSpfTreeNode')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'example.com') {
        return [
          ['v=spf1 exists:%{ir}.%{v}._spf.example.com include:a.example -all'],
        ]
      }
      if (host === 'a.example') return [['v=spf1 -all']]
      return []
    })

    const root = await buildSpfTreeNode('example.com', 0, freshState())

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
    const { buildSpfTreeNode } =
      await import('../services/diagnostics/buildSpfTreeNode')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'example.com') {
        return [['v=spf1 include:%{d}.spf.example.net -all']]
      }
      return []
    })

    const root = await buildSpfTreeNode('example.com', 0, freshState())

    // Previously this produced a child flagged "No SPF record", which reads as
    // a misconfiguration rather than an unresolvable target.
    expect(root?.children).toEqual([])
    expect(root?.macroMechanisms).toEqual(['include:%{d}.spf.example.net'])
    expect(root?.lookupCount).toBe(1)
  })

  it('detects include cycles and marks the repeated node', async () => {
    const { buildSpfTreeNode } =
      await import('../services/diagnostics/buildSpfTreeNode')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'a.example') return [['v=spf1 include:b.example -all']]
      if (host === 'b.example') return [['v=spf1 include:a.example -all']]
      return []
    })

    const root = await buildSpfTreeNode('a.example', 0, freshState())
    const cycleNode = root?.children[0]?.children[0]

    expect(cycleNode?.domain).toBe('a.example')
    expect(cycleNode?.cycleDetected).toBe(true)
    expect(cycleNode?.children).toEqual([])
    expect(cycleNode?.record).toBeNull()
    expect(cycleNode?.missingRecord).toBe(false)
  })

  it('flags include targets without an SPF record as missing', async () => {
    const { buildSpfTreeNode } =
      await import('../services/diagnostics/buildSpfTreeNode')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'example.com') return [['v=spf1 include:gone.example -all']]
      return []
    })

    const root = await buildSpfTreeNode('example.com', 0, freshState())

    expect(root?.children[0]?.domain).toBe('gone.example')
    expect(root?.children[0]?.missingRecord).toBe(true)
    expect(root?.children[0]?.lookupCount).toBe(0)
    // The include itself still consumes one lookup at the root.
    expect(root?.lookupCount).toBe(1)
  })

  it('flags the root when the tree exceeds the 10-lookup limit', async () => {
    const { buildSpfTreeNode } =
      await import('../services/diagnostics/buildSpfTreeNode')
    const mechanisms = Array.from(
      { length: 11 },
      (_, i) => `exists:e${i}.example`,
    ).join(' ')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'example.com') return [[`v=spf1 ${mechanisms} -all`]]
      return []
    })

    const root = await buildSpfTreeNode('example.com', 0, freshState())

    expect(root?.lookupCount).toBe(11)
    expect(root?.exceedsLookupLimit).toBe(true)
  })

  it('stops descending past the maximum depth', async () => {
    const { buildSpfTreeNode } =
      await import('../services/diagnostics/buildSpfTreeNode')
    mockResolveTxt.mockImplementation(async (host: string) => {
      const match = /^d(\d+)\.example$/.exec(host)
      if (!match) return []
      const next = Number(match[1]) + 1
      return [[`v=spf1 include:d${next}.example -all`]]
    })

    const root = await buildSpfTreeNode('d0.example', 0, freshState())

    let depth = 0
    let node = root
    while (node && node.children.length > 0) {
      node = node.children[0] ?? null
      depth += 1
    }

    // Depth 10 is the last level allowed to recurse into children.
    expect(depth).toBe(10)
  })

  it('stops creating nodes past the 30-node budget', async () => {
    const { buildSpfTreeNode } =
      await import('../services/diagnostics/buildSpfTreeNode')
    // Wide tree: root includes 40 sibling domains, all flat records.
    const includes = Array.from(
      { length: 40 },
      (_, i) => `include:w${i}.example`,
    ).join(' ')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'example.com') return [[`v=spf1 ${includes} -all`]]
      return [['v=spf1 -all']]
    })

    const state = freshState()
    const root = await buildSpfTreeNode('example.com', 0, state)

    expect(state.nodeCount).toBe(30)
    // Root plus 29 children fit in the budget; the rest are dropped.
    expect(root?.children).toHaveLength(29)
  })
})

describe('resolveSpfTree', () => {
  it('caches the resolved tree per domain', async () => {
    const { resolveSpfTree } =
      await import('../services/diagnostics/resolveSpfTree')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === 'cached.example') return [['v=spf1 -all']]
      return []
    })

    const first = await resolveSpfTree('cached.example')
    const callsAfterFirst = mockResolveTxt.mock.calls.length
    const second = await resolveSpfTree('cached.example')

    expect(first?.domain).toBe('cached.example')
    expect(second).toEqual(first)
    expect(mockResolveTxt.mock.calls).toHaveLength(callsAfterFirst)
  })
})
