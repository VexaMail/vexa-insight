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

const ROOT = 'example.com'

describe('buildSpfTreeNode: cycles, gaps and budgets', () => {
  it('detects include cycles and marks the repeated node', async () => {
    const buildSpfTreeNode = await loadBuildSpfTreeNode()
    mockSpfZone({
      'a.example': 'v=spf1 include:b.example -all',
      'b.example': 'v=spf1 include:a.example -all',
    })

    const root = await buildSpfTreeNode('a.example', 0, freshSpfTreeState())
    const cycleNode = root?.children[0]?.children[0]

    expect(cycleNode?.domain).toBe('a.example')
    expect(cycleNode?.cycleDetected).toBe(true)
    expect(cycleNode?.children).toEqual([])
    expect(cycleNode?.record).toBeNull()
    expect(cycleNode?.missingRecord).toBe(false)
  })

  it('flags include targets without an SPF record as missing', async () => {
    const buildSpfTreeNode = await loadBuildSpfTreeNode()
    mockSpfZone({ [ROOT]: 'v=spf1 include:gone.example -all' })

    const root = await buildSpfTreeNode(ROOT, 0, freshSpfTreeState())

    expect(root?.children[0]?.domain).toBe('gone.example')
    expect(root?.children[0]?.missingRecord).toBe(true)
    expect(root?.children[0]?.lookupCount).toBe(0)
    // The include itself still consumes one lookup at the root.
    expect(root?.lookupCount).toBe(1)
  })

  it('flags the root when the tree exceeds the 10-lookup limit', async () => {
    const buildSpfTreeNode = await loadBuildSpfTreeNode()
    const mechanisms = Array.from(
      { length: 11 },
      (_, i) => `exists:e${String(i)}.example`,
    ).join(' ')
    mockSpfZone({ [ROOT]: `v=spf1 ${mechanisms} -all` })

    const root = await buildSpfTreeNode(ROOT, 0, freshSpfTreeState())

    expect(root?.lookupCount).toBe(11)
    expect(root?.exceedsLookupLimit).toBe(true)
  })

  it('stops descending past the maximum depth', async () => {
    const buildSpfTreeNode = await loadBuildSpfTreeNode()
    mockResolveTxt.mockImplementation(async (host: string) => {
      const match = /^d(\d+)\.example$/.exec(host)
      if (!match) return Promise.resolve([])
      const next = Number(match[1]) + 1
      return Promise.resolve([[`v=spf1 include:d${String(next)}.example -all`]])
    })

    const root = await buildSpfTreeNode('d0.example', 0, freshSpfTreeState())

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
    const buildSpfTreeNode = await loadBuildSpfTreeNode()
    // Wide tree: root includes 40 sibling domains, all flat records.
    const includes = Array.from(
      { length: 40 },
      (_, i) => `include:w${String(i)}.example`,
    ).join(' ')
    mockResolveTxt.mockImplementation(async (host: string) => {
      if (host === ROOT) return Promise.resolve([[`v=spf1 ${includes} -all`]])
      return Promise.resolve([['v=spf1 -all']])
    })

    const state = freshSpfTreeState()
    const root = await buildSpfTreeNode(ROOT, 0, state)

    expect(state.nodeCount).toBe(30)
    // Root plus 29 children fit in the budget; the rest are dropped.
    expect(root?.children).toHaveLength(29)
  })
})
