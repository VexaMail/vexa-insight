import { HEALTHY_THRESHOLD } from './healthyThreshold'
import { NEEDS_REVIEW_THRESHOLD } from './needsReviewThreshold'

export function getRateColorClass(rate: number): string {
  if (rate >= HEALTHY_THRESHOLD) return 'text-success'
  if (rate >= NEEDS_REVIEW_THRESHOLD) return 'text-warning'
  return 'text-danger'
}
