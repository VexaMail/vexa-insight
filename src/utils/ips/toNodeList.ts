/** A repeated XML element parses to an object for one and an array for more. */
export function toNodeList(value: unknown): unknown[] {
  if (Array.isArray(value)) return [...(value as unknown[])]
  if (value === undefined || value === null || value === '') return []
  return [value]
}
