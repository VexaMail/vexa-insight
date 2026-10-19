import type { ChangeDirection } from '@/types/dashboard'

/** Better or worse depending on which way is good; neutral at zero. */
export function changeDirection(
  delta: number | null,
  higherIsBetter: boolean | null,
): ChangeDirection {
  if (delta === null || delta === 0 || higherIsBetter === null) return 'neutral'
  return delta > 0 === higherIsBetter ? 'better' : 'worse'
}
