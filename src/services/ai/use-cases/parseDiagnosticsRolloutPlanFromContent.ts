import { jsonrepair } from 'jsonrepair'

import { extractRolloutPlanFromJson } from './extractRolloutPlanFromJson'

/**
 * Parses AI completion content into the ordered rollout plan steps.
 * Returns an empty array when the response has no usable rollout plan.
 */
export function parseDiagnosticsRolloutPlanFromContent(
  content: string,
): string[] {
  try {
    const repaired = jsonrepair(content)
    const parsed: unknown = JSON.parse(repaired)
    return extractRolloutPlanFromJson(parsed)
  } catch {
    return []
  }
}
