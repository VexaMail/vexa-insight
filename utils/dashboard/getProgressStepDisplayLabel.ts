import type { ProgressStep } from '@/types/dashboard'
import { EMAIL_PROGRESS_STEP_LABELS } from './stepLabels'

/**
 * Returns the display label for a progress step (step.label, or stepLabels[key], or key).
 */
export function getProgressStepDisplayLabel(step: ProgressStep): string {
  if (step.label) return step.label
  const fromMap = EMAIL_PROGRESS_STEP_LABELS[step.key]
  return fromMap ?? step.key
}
