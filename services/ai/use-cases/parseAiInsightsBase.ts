import { jsonrepair } from 'jsonrepair'

import type { BaseInsight } from './BaseInsight'
import { extractInsightsFromJson } from './extractInsightsFromJson'

/**
 * Parses AI insight responses using jsonrepair to handle
 * markdown fences, invalid escapes, truncated JSON, and
 * other common LLM output quirks.
 * Returns null if parsing fails entirely.
 */
export function parseAiInsightsBase(content: string): BaseInsight[] | null {
  try {
    const repaired = jsonrepair(content)
    const parsed: unknown = JSON.parse(repaired)
    return extractInsightsFromJson(parsed)
  } catch {
    return null
  }
}
