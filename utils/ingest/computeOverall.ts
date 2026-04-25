import type { ProgressStep } from '@/types/dashboard'
import type { OverallResult } from './OverallResult'

export function computeOverall(steps: readonly ProgressStep[]): OverallResult {
  const total = steps.length || 1
  const doneCount = steps.filter((s) => s.status === 'done').length
  const hasError = steps.some((s) => s.status === 'error')
  const hasActive = steps.some((s) => s.status === 'active')
  const percent = Math.round((doneCount / total) * 100)

  let overall: 'pending' | 'active' | 'done' | 'error' = 'pending'
  if (hasError) overall = 'error'
  else if (doneCount === total) overall = 'done'
  else if (hasActive || doneCount > 0) overall = 'active'

  return { total, doneCount, percent, overall }
}
