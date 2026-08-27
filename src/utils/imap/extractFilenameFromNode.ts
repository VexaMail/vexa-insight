/**
 * Extracts the filename from a body-structure node's parameters
 * and disposition parameters.
 */
export function extractFilenameFromNode(
  node: Record<string, unknown>,
): string | null {
  const params = (node.parameters as Record<string, string>) ?? {}
  const disp = (node.dispositionParameters as Record<string, string>) ?? {}
  const name = params.filename ?? params.name ?? disp.filename ?? disp.name
  return typeof name === 'string' ? name : null
}
