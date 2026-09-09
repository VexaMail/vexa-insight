import type { ProgressStep } from '@/types/dashboard'
import { EMAIL_PROGRESS_STEP_LABELS } from '@/utils/dashboard'
import { STEP_ORDER } from './stepOrder'
import { TERMINAL_STEPS } from './terminalSteps'

/** Every known step up to the current one; an unknown step stands alone. */
export function orderedProgressSteps(step: string): ProgressStep[] {
  const stepIdx = STEP_ORDER.indexOf(step)
  if (stepIdx < 0) {
    return [
      {
        key: step,
        label: EMAIL_PROGRESS_STEP_LABELS[step] ?? step,
        status: TERMINAL_STEPS.has(step) ? 'done' : 'active',
      },
    ]
  }
  return STEP_ORDER.slice(0, stepIdx + 1).map((key, i) => {
    const isLast = i === stepIdx
    let stepStatus: ProgressStep['status'] = 'done'
    if (isLast && !TERMINAL_STEPS.has(step)) {
      stepStatus = 'active'
    }
    return {
      key,
      label: EMAIL_PROGRESS_STEP_LABELS[key] ?? key,
      status: stepStatus,
    }
  })
}
