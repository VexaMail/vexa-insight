import type { ProgressStep } from '@/types/dashboard'

/**
 * Returns the step to display: active if any, else last done/error, else first step.
 */
export function getCurrentProgressStep(
  steps: readonly ProgressStep[],
): ProgressStep | undefined {
  if (steps.length === 0) return undefined
  const active = steps.find((s) => s.status === 'active')
  if (active) return active
  for (let i = steps.length - 1; i >= 0; i--) {
    const s = steps[i]

    if (s?.status === 'done' || s?.status === 'error') return s
  }
  return steps[0]
}
