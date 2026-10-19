import type { SpfTreeNode } from '@/types/diagnostics'

/** Everything in a planned SPF tree a receiver would trip over. */
export function spfPlanWarnings(node: SpfTreeNode): string[] {
  const warnings: string[] = []
  if (node.missingRecord) {
    warnings.push(`${node.domain} publishes no SPF record`)
  }
  if (node.cycleDetected) {
    warnings.push(`${node.domain} is included twice: an include loop`)
  }
  if (node.macroMechanisms.length > 0) {
    warnings.push(
      `${node.domain} uses macros that cannot be counted: ${node.macroMechanisms.join(' ')}`,
    )
  }
  if (node.ignoredRedirect !== null) {
    warnings.push(
      `${node.domain}: redirect=${node.ignoredRedirect} is ignored because the record has an all mechanism`,
    )
  }
  return [...warnings, ...node.children.flatMap(spfPlanWarnings)]
}
