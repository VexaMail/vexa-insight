import type { SpfTreeBuildState, SpfTreeNode } from '@/types/diagnostics'
import { createSpfTreeLeaf } from './createSpfTreeLeaf'
import { extractSpfChildDomains } from './extractSpfChildDomains'
import { extractSpfEffectiveLookupMechanisms } from './extractSpfEffectiveLookupMechanisms'
import { extractSpfIgnoredRedirect } from './extractSpfIgnoredRedirect'
import { extractSpfMacroMechanisms } from './extractSpfMacroMechanisms'
import { extractSpfRecordFromTxt } from './extractSpfRecordFromTxt'
import { resolveTxtSafe } from './resolveTxtSafe'
import { SPF_LOOKUP_LIMIT } from './spfLookupLimit'
import { SPF_TREE_MAX_DEPTH } from './spfTreeMaxDepth'
import { SPF_TREE_MAX_NODES } from './spfTreeMaxNodes'
import { sumSpfLookupCounts } from './sumSpfLookupCounts'

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

  const mechanisms = extractSpfEffectiveLookupMechanisms(record)
  const children: SpfTreeNode[] = []
  if (depth < SPF_TREE_MAX_DEPTH) {
    for (const childDomain of extractSpfChildDomains(record)) {
      const child = await buildSpfTreeNode(childDomain, depth + 1, state)
      if (child) children.push(child)
    }
  }
  const lookupCount = mechanisms.length + sumSpfLookupCounts(children)

  return {
    domain: normalized,
    record,
    mechanisms,
    children,
    lookupCount,
    missingRecord: false,
    cycleDetected: false,
    exceedsLookupLimit: depth === 0 && lookupCount > SPF_LOOKUP_LIMIT,
    ignoredRedirect: extractSpfIgnoredRedirect(record),
    macroMechanisms: extractSpfMacroMechanisms(record),
  }
}
