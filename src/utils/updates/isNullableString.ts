/** True for a string or an explicit null, the shape of GitHub's text fields. */
export function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === 'string'
}
