/** A non-empty trimmed string field, or null when absent or not a string. */
export function readJsonString(
  obj: Record<string, unknown>,
  key: string,
): string | null {
  const value = obj[key]
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed === '' ? null : trimmed
}
