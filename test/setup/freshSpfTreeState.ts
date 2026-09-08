/** Empty traversal state for one `buildSpfTreeNode` run. */
export function freshSpfTreeState() {
  return { visited: new Set<string>(), nodeCount: 0 }
}
