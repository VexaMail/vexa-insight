import type { SpfPlan } from '@/types/diagnostics'
import { buildSpfTreeNode } from './buildSpfTreeNode'
import { expandSpfRecord } from './expandSpfRecord'
import { resolveSpfTree } from './resolveSpfTree'
import { SPF_LOOKUP_LIMIT } from './spfLookupLimit'

/**
 * Counts the DNS lookups of a candidate SPF record for a domain, resolving
 * its includes live, next to the published record's count, so an operator
 * can see whether adding a sender keeps the record under the limit of ten
 * before publishing it.
 */
export async function planSpfRecord(
  domain: string,
  candidate: string,
): Promise<SpfPlan> {
  const normalized = domain.toLowerCase()
  const [published, planned] = await Promise.all([
    resolveSpfTree(normalized),
    expandSpfRecord(
      { domain: normalized, record: candidate, depth: 0 },
      {
        visited: new Set([normalized]),
        nodeCount: 1,
      },
      buildSpfTreeNode,
    ),
  ])
  return {
    limit: SPF_LOOKUP_LIMIT,
    publishedLookups:
      published?.missingRecord === false ? published.lookupCount : null,
    plannedLookups: planned.lookupCount,
    withinLimit: planned.lookupCount <= SPF_LOOKUP_LIMIT,
    tree: planned,
  }
}
