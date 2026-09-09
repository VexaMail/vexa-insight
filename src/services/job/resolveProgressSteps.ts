import type { ProgressStep } from '@/types/dashboard'
import { EMAIL_PROGRESS_STEP_LABELS } from '@/utils/dashboard'
import { errorProgressSteps } from './errorProgressSteps'
import { orderedProgressSteps } from './orderedProgressSteps'
import type { ResolvedProgressSteps } from './ResolvedProgressSteps'
import { TERMINAL_STEPS } from './terminalSteps'

/** The step list and overall status an email reaches with this event. */
export function resolveProgressSteps(
  step: string,
  prevSteps: readonly ProgressStep[],
): ResolvedProgressSteps {
  if (step === 'already_processed') {
    return {
      steps: [
        {
          key: 'already_processed',
          label:
            EMAIL_PROGRESS_STEP_LABELS['already_processed'] ??
            'Already processed',
          status: 'done',
        },
      ],
      status: 'done',
    }
  }
  if (step === 'error') {
    return { steps: errorProgressSteps(prevSteps), status: 'error' }
  }
  return {
    steps: orderedProgressSteps(step),
    status: TERMINAL_STEPS.has(step) ? 'done' : 'active',
  }
}
