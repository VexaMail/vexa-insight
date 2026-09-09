export function isPlainRecord(
  entry: unknown,
): entry is Record<string, unknown> {
  return entry !== null && typeof entry === 'object' && !Array.isArray(entry)
}
