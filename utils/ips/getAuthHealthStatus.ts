import type { AuthHealthStatus } from '@/types/AuthHealthStatus'
import { HEALTHY_THRESHOLD } from './healthyThreshold'
import { NEEDS_REVIEW_THRESHOLD } from './needsReviewThreshold'

export function getAuthHealthStatus(
  fullyAlignedRate: number,
): AuthHealthStatus {
  if (fullyAlignedRate >= HEALTHY_THRESHOLD) return 'healthy'
  if (fullyAlignedRate >= NEEDS_REVIEW_THRESHOLD) return 'needs-review'
  return 'failing'
}
