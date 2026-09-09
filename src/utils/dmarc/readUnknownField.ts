/**
 * Reads `key` from an unknown value, returning undefined unless the value is
 * an object that owns `key`.
 */
export function readUnknownField(item: unknown, key: string): unknown {
  if (typeof item !== 'object' || item === null || !(key in item)) {
    return undefined
  }
  return (item as Record<string, unknown>)[key]
}
