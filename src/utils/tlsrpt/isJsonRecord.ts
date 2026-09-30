/** Whether a parsed JSON value is a plain object (not null, not an array). */
export function isJsonRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
