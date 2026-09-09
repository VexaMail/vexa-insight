/**
 * Extracts the ordered rollout plan steps from a parsed AI response value.
 * Returns an empty array when the field is missing or malformed.
 */
export function extractRolloutPlanFromJson(parsed: unknown): string[] {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return []
  }
  const obj = parsed as Record<string, unknown>
  if (!Array.isArray(obj['rolloutPlan'])) {
    return []
  }
  return obj['rolloutPlan'].filter(
    (step): step is string => typeof step === 'string' && step.trim() !== '',
  )
}
