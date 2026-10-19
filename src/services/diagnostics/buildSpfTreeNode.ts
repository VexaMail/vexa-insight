import type { SpfTreeBuildState, SpfTreeNode } from '@/types/diagnostics'
import { createSpfTreeLeaf } from './createSpfTreeLeaf'
import { expandSpfRecord } from './expandSpfRecord'
import { extractSpfRecordFromTxt } from './extractSpfRecordFromTxt'
import { resolveTxtSafe } from './resolveTxtSafe'
import { SPF_TREE_MAX_NODES } from './spfTreeMaxNodes'

/**
 * Recursively resolves the SPF include/redirect tree for a domain.
 * Returns null when the total-node budget is exhausted.
 */
export async function buildSpfTreeNode(
  domain: string,
  depth: number,
  state: SpfTreeBuildState,
): Promise<SpfTreeNode | null> {
  if (state.nodeCount >= SPF_TREE_MAX_NODES) return null
  state.nodeCount += 1

  const normalized = domain.toLowerCase()
  if (state.visited.has(normalized)) {
    return createSpfTreeLeaf(normalized, 'cycle')
  }
  state.visited.add(normalized)

  const record = extractSpfRecordFromTxt(await resolveTxtSafe(normalized))
  if (record === null) {
    return createSpfTreeLeaf(normalized, 'missing')
  }
  return expandSpfRecord(
    { domain: normalized, record, depth },
    state,
    buildSpfTreeNode,
  )
}
