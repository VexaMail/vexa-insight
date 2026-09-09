import type { ProgressStep } from '@/types/dashboard'
import { EMAIL_PROGRESS_STEP_LABELS } from '@/utils/dashboard'

/** Marks the active step as failed and appends the error step. */
export function errorProgressSteps(
  prevSteps: readonly ProgressStep[],
): ProgressStep[] {
  return [
    ...prevSteps.map((s) =>
      s.status === 'active' ? { ...s, status: 'error' as const } : s,
    ),
    {
      key: 'error',
      label: EMAIL_PROGRESS_STEP_LABELS['error'] ?? 'Error',
      status: 'error',
    },
  ]
}
