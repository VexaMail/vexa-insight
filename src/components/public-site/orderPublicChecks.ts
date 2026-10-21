import type { PublicCheck } from '../../types/public-check/PublicCheck'

export function orderPublicChecks(
  checks: readonly PublicCheck[],
): PublicCheck[] {
  const priority = { attention: 0, info: 1, unknown: 2, pass: 3 }
  return checks.toSorted(
    (left, right) => priority[left.status] - priority[right.status],
  )
}
