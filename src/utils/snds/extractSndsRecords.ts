import { SNDS_ROW_WRAPPER_KEYS } from '@/constants/snds'
import { isSndsRecord } from './isSndsRecord'

/**
 * Finds the list of row objects in an SNDS response of unknown shape: a bare
 * array, an object wrapping one, or a single row object.
 */
export function extractSndsRecords(
  body: unknown,
): readonly Record<string, unknown>[] {
  if (Array.isArray(body)) return body.filter(isSndsRecord)
  if (!isSndsRecord(body)) return []
  for (const [key, value] of Object.entries(body)) {
    if (
      SNDS_ROW_WRAPPER_KEYS.includes(key.toLowerCase()) &&
      Array.isArray(value)
    ) {
      return value.filter(isSndsRecord)
    }
  }
  return [body]
}
