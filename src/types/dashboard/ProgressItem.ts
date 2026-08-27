import type { ProgressStep } from './ProgressStep'
/**
 * One progress item (e.g. per account or folder) with steps and overall status.
 */
export type ProgressItem = {
  emailDate?: string | undefined
  id: string
  label: string
  processedAt?: string | undefined
  status: string
  steps: readonly ProgressStep[]
}
