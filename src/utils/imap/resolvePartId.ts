/**
 * Resolves the effective part ID from a body-structure node,
 * using the node's own partId/part property or falling back to the prefix.
 */
export function resolvePartId(
  node: Record<string, unknown>,
  prefix: string,
): string {
  const partId = typeof node.partId === 'string' ? node.partId : undefined
  const part = typeof node.part === 'string' ? node.part : undefined
  return partId ?? part ?? (prefix ? prefix.replace(/\.$/, '') : '1')
}
