/**
 * Appends the rows whose key is not present yet. Paging is ordered on the
 * server, but a row can still arrive twice if the underlying data changed
 * between two pages, and React keys must stay unique.
 */
export function appendUniqueRows<T>(
  current: T[],
  incoming: T[],
  keyOf: (row: T) => number | string,
): T[] {
  const seen = new Set(current.map(keyOf))
  return [...current, ...incoming.filter((row) => !seen.has(keyOf(row)))]
}
