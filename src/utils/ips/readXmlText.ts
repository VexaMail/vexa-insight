/** The text of `key` on a parsed XML node, or '' when it is not a string. */
export function readXmlText(node: unknown, key: string): string {
  if (typeof node !== 'object' || node === null) return ''
  const value = (node as Record<string, unknown>)[key]
  return typeof value === 'string' ? value : ''
}
