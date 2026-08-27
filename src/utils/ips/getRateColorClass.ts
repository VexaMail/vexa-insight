import { HEALTHY_THRESHOLD } from './healthyThreshold'
import { NEEDS_REVIEW_THRESHOLD } from './needsReviewThreshold'

export function getRateColorClass(rate: number): string {
  if (rate >= HEALTHY_THRESHOLD) return 'text-emerald-600 dark:text-emerald-400'
  if (rate >= NEEDS_REVIEW_THRESHOLD)
    return 'text-amber-600 dark:text-amber-400'
  return 'text-red-600 dark:text-red-400'
}
