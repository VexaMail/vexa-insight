import type {
  SpfChildBuilder,
  SpfRecordAtDepth,
  SpfTreeBuildState,
  SpfTreeNode,
} from '@/types/diagnostics'
import { extractSpfChildDomains } from './extractSpfChildDomains'
import { extractSpfEffectiveLookupMechanisms } from './extractSpfEffectiveLookupMechanisms'
import { extractSpfIgnoredRedirect } from './extractSpfIgnoredRedirect'
import { extractSpfMacroMechanisms } from './extractSpfMacroMechanisms'
import { SPF_LOOKUP_LIMIT } from './spfLookupLimit'
import { SPF_TREE_MAX_DEPTH } from './spfTreeMaxDepth'
import { sumSpfLookupCounts } from './sumSpfLookupCounts'

/**
 * The tree node of one SPF record, resolving its includes and redirect from
 * DNS through `buildChild`. Split from `buildSpfTreeNode`, which passes
 * itself, so a record that is not published yet (a planned change) can be
 * counted the same way.
 */
export async function expandSpfRecord(
  { domain, record, depth }: SpfRecordAtDepth,
  state: SpfTreeBuildState,
  buildChild: SpfChildBuilder,
): Promise<SpfTreeNode> {
  const mechanisms = extractSpfEffectiveLookupMechanisms(record)
  const children: SpfTreeNode[] = []
  if (depth < SPF_TREE_MAX_DEPTH) {
    for (const childDomain of extractSpfChildDomains(record)) {
      const child = await buildChild(childDomain, depth + 1, state)
      if (child) children.push(child)
    }
  }
  const lookupCount = mechanisms.length + sumSpfLookupCounts(children)

  return {
    domain,
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
