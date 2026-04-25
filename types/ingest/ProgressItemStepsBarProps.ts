import type { ProgressStep } from '@/types/dashboard'

/**
 * Props for the progress item steps bar (segmented bar showing all steps).
 */
export type ProgressItemStepsBarProps = {
  steps: readonly ProgressStep[]
}
