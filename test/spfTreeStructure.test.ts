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

describe('buildSpfTreeNode: tree shape', () => {
  it('builds a single node with no children for a flat record', async () => {
    const buildSpfTreeNode = await loadBuildSpfTreeNode()
    mockSpfZone({ 'example.com': 'v=spf1 ip4:203.0.113.10 -all' })

    const root = await buildSpfTreeNode('example.com', 0, freshSpfTreeState())

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
    const buildSpfTreeNode = await loadBuildSpfTreeNode()
    mockSpfZone({
      'example.com': 'v=spf1 include:a.example -all',
      'a.example': 'v=spf1 include:b.example ~all',
      'b.example': 'v=spf1 mx -all',
    })

    const root = await buildSpfTreeNode('example.com', 0, freshSpfTreeState())

    // include:a (1) + include:b (1) + mx (1) roll up to the root.
    expect(root).toMatchObject({
      mechanisms: ['include:a.example'],
      lookupCount: 3,
      children: [
        {
          domain: 'a.example',
          lookupCount: 2,
          children: [
            { domain: 'b.example', mechanisms: ['mx'], lookupCount: 1 },
          ],
        },
      ],
    })
    expect(root?.children).toHaveLength(1)
  })
})
