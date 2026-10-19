/** The child `key` of a parsed XML node, or undefined. */
export function readXmlNode(node: unknown, key: string): unknown {
  if (typeof node !== 'object' || node === null) return undefined
  return (node as Record<string, unknown>)[key]
}
