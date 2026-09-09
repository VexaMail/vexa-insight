/**
 * Parses a query-string date; empty and unparsable values become undefined
 * so a stale link degrades to "no bound" instead of a 400.
 */
export function parseLenientDate(
  value: string | null | undefined,
): Date | undefined {
  if (!value) return undefined
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? undefined : parsed
}
