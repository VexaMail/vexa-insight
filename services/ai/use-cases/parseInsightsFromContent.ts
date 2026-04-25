import type { ReportInsight } from '../contracts'
import { parseAiInsightsBase } from './parseAiInsightsBase'

/**
 * Parses AI completion content into an array of ReportInsight objects.
 * Returns null if parsing fails entirely.
 */
export function parseInsightsFromContent(
  content: string,
): ReportInsight[] | null {
  const base = parseAiInsightsBase(content)
  if (!base) return null
  return base as ReportInsight[]
}
