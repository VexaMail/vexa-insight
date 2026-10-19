import type { FailingSource, FailingTrafficKind } from '@/types/enforcement'

/** Failing messages in each reading. */
export function sumFailingMessagesByKind(
  failing: readonly FailingSource[],
): Record<FailingTrafficKind, number> {
  const sums: Record<FailingTrafficKind, number> = {
    legitimate: 0,
    forwarded: 0,
    unknown: 0,
  }
  for (const source of failing) sums[source.kind] += source.failingMessages
  return sums
}
