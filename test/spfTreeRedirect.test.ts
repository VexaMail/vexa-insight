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
const TARGET = '_spf.example.net'
const TARGET_RECORD = 'v=spf1 a -all'

describe('buildSpfTreeNode: redirect=', () => {
  it('follows redirect= as a child node', async () => {
    const buildSpfTreeNode = await loadBuildSpfTreeNode()
    mockSpfZone({
      [ROOT]: `v=spf1 redirect=${TARGET}`,
      [TARGET]: TARGET_RECORD,
    })

    const root = await buildSpfTreeNode(ROOT, 0, freshSpfTreeState())

    expect(root?.mechanisms).toEqual([`redirect=${TARGET}`])
    expect(root?.children).toHaveLength(1)
    expect(root?.children[0]?.domain).toBe(TARGET)
    expect(root?.children[0]?.mechanisms).toEqual(['a'])
    // redirect (1) + a (1)
    expect(root?.lookupCount).toBe(2)
  })

  it('ignores redirect= when the record also has an all mechanism', async () => {
    const buildSpfTreeNode = await loadBuildSpfTreeNode()
    mockSpfZone({
      [ROOT]: `v=spf1 include:a.example redirect=${TARGET} -all`,
      'a.example': 'v=spf1 ip4:203.0.113.10 -all',
      [TARGET]: 'v=spf1 mx mx:b.example -all',
    })

    const root = await buildSpfTreeNode(ROOT, 0, freshSpfTreeState())

    // RFC 7208 6.1: the redirect is never evaluated, so it is not followed and
    // consumes no lookup. Only the include remains.
    expect(root?.mechanisms).toEqual(['include:a.example'])
    expect(root?.children.map((c) => c.domain)).toEqual(['a.example'])
    expect(root?.lookupCount).toBe(1)
    expect(root?.ignoredRedirect).toBe(TARGET)
  })

  it('honors redirect= and reports no ignored redirect without an all', async () => {
    const buildSpfTreeNode = await loadBuildSpfTreeNode()
    mockSpfZone({
      [ROOT]: `v=spf1 redirect=${TARGET}`,
      [TARGET]: TARGET_RECORD,
    })

    const root = await buildSpfTreeNode(ROOT, 0, freshSpfTreeState())

    expect(root?.ignoredRedirect).toBeNull()
    expect(root?.children.map((c) => c.domain)).toEqual([TARGET])
    expect(root?.lookupCount).toBe(2)
  })

  it('ignores redirect= placed before the all mechanism too', async () => {
    const buildSpfTreeNode = await loadBuildSpfTreeNode()
    mockSpfZone({
      [ROOT]: `v=spf1 redirect=${TARGET} ~all`,
      [TARGET]: TARGET_RECORD,
    })

    const root = await buildSpfTreeNode(ROOT, 0, freshSpfTreeState())

    // "regardless of the relative ordering of the terms", and any qualifier.
    expect(root?.ignoredRedirect).toBe(TARGET)
    expect(root?.children).toEqual([])
    expect(root?.lookupCount).toBe(0)
  })
})
