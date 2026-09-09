/**
 * Reads `key` from an unknown value, returning '' unless the value is an
 * object whose `key` holds a string.
 */
export function readStringField(item: unknown, key: string): string {
  if (typeof item !== 'object' || item === null || !(key in item)) return ''
  const value = (item as Record<string, unknown>)[key]
  return typeof value === 'string' ? value : ''
}
