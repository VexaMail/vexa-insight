import type { SpfFlattenSuggestion, SpfTreeNode } from '@/types/diagnostics'

/**
 * Top-level includes that cost more than one lookup, heaviest first:
 * publishing their IP ranges instead saves every lookup they make, at the
 * price of updating the ranges when the provider changes them.
 */
export function spfFlattenSuggestions(
  tree: SpfTreeNode,
): SpfFlattenSuggestion[] {
  return tree.children
    .filter((child) => !child.missingRecord && !child.cycleDetected)
    .map((child) => ({ domain: child.domain, lookups: 1 + child.lookupCount }))
    .filter((suggestion) => suggestion.lookups > 1)
    .toSorted((a, b) => b.lookups - a.lookups)
}
