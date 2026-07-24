import type { SpfTreeNode } from '@/types/diagnostics'

export function sumSpfLookupCounts(nodes: SpfTreeNode[]): number {
  return nodes.reduce((total, node) => total + node.lookupCount, 0)
}
