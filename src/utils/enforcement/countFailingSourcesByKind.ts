import type { FailingSource, FailingTrafficKind } from '@/types/enforcement'

/** How many failing sources fall in each reading. */
export function countFailingSourcesByKind(
  failing: readonly FailingSource[],
): Record<FailingTrafficKind, number> {
  const counts: Record<FailingTrafficKind, number> = {
    legitimate: 0,
    forwarded: 0,
    unknown: 0,
  }
  for (const source of failing) counts[source.kind] += 1
  return counts
}
