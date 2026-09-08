import type { SpfTreeNode } from '@/types/diagnostics'
import { buildSpfTreeNode } from './buildSpfTreeNode'
import { withDiagnosticsCache } from './withDiagnosticsCache'

export async function resolveSpfTree(
  domain: string,
): Promise<SpfTreeNode | null> {
  return withDiagnosticsCache(`spf-tree:${domain}`, 5 * 60 * 1000, async () =>
    buildSpfTreeNode(domain, 0, { visited: new Set<string>(), nodeCount: 0 }),
  )
}
