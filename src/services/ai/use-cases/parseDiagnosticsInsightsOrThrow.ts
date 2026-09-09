import type { DiagnosticsInsight } from '@/types/ai'
import { AIServiceErrorException } from '../core/AiServiceErrorException'
import { parseDiagnosticsInsightsFromContent } from './parseDiagnosticsInsightsFromContent'

/** Parses the model's insights, logging a sample of anything unparseable. */
export function parseDiagnosticsInsightsOrThrow(
  content: string,
): DiagnosticsInsight[] {
  const insights = parseDiagnosticsInsightsFromContent(content)
  if (insights) return insights
  console.error(
    '[ai/diagnostics] MALFORMED_RESPONSE — raw content:',
    content.slice(0, 500),
  )
  throw new AIServiceErrorException(
    'MALFORMED_RESPONSE',
    'AI produced an unexpected response. Please try again.',
  )
}
