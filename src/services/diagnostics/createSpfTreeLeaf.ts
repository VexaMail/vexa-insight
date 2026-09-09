import type { SpfTreeNode } from '@/types/diagnostics'

/** A tree node with no record to expand: the domain was already visited or has no SPF. */
export function createSpfTreeLeaf(
  domain: string,
  reason: 'cycle' | 'missing',
): SpfTreeNode {
  return {
    domain,
    record: null,
    mechanisms: [],
    children: [],
    lookupCount: 0,
    missingRecord: reason === 'missing',
    cycleDetected: reason === 'cycle',
    exceedsLookupLimit: false,
    ignoredRedirect: null,
    macroMechanisms: [],
  }
}
