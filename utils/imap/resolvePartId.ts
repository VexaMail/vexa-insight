/**
 * Resolves the effective part ID from a body-structure node,
 * using the node's own partId/part property or falling back to the prefix.
 */
export function resolvePartId(
  node: Record<string, unknown>,
  prefix: string,
): string {
  return (
    (node.partId as string) ??
    (node.part as string) ??
    (prefix ? prefix.replace(/\.$/, '') : '1')
  )
}
