import type { BaseInsight } from './BaseInsight'

/**
 * Extracts an insight array from a parsed JSON value.
 * Handles both `{ insights: [...] }` objects and bare arrays.
 */
export function extractInsightsFromJson(parsed: unknown): BaseInsight[] | null {
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    const obj = parsed as Record<string, unknown>
    if (Array.isArray(obj['insights'])) {
      return obj['insights'] as BaseInsight[]
    }
    return []
  }
  if (Array.isArray(parsed)) {
    return parsed as BaseInsight[]
  }
  return null
}
