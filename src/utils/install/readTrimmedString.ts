import { isString } from './isString'

/**
 * Reads `key` as a trimmed string, or '' when it is missing or not a string.
 */
export function readTrimmedString(
  o: Record<string, unknown>,
  key: string,
): string {
  const value = o[key]
  return isString(value) ? value.trim() : ''
}
