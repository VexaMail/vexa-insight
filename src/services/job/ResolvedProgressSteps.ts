import type { ProgressStep } from '@/types/dashboard'

export type ResolvedProgressSteps = {
  readonly steps: ProgressStep[]
  readonly status: string
}
