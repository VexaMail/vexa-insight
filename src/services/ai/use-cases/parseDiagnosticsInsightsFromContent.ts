import type { DiagnosticsInsight } from '@/types/ai'
import { parseAiInsightsBase } from './parseAiInsightsBase'

/**
 * Parses AI completion content into an array of DiagnosticsInsight objects.
 * Returns null if parsing fails entirely.
 */
export function parseDiagnosticsInsightsFromContent(
  content: string,
): DiagnosticsInsight[] | null {
  const base = parseAiInsightsBase(content)
  if (!base) return null
  return base as DiagnosticsInsight[]
}
