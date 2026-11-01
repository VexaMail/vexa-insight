/** Imports `buildSpfTreeNode` after the DNS mock is in place. */
export async function loadBuildSpfTreeNode() {
  const imported = await import('@/services/diagnostics')
  return imported.buildSpfTreeNode
}
