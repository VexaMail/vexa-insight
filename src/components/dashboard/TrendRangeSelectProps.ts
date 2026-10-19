import type { FilterOption } from '@/types/dashboard'

export type TrendRangeSelectProps = {
  readonly options: readonly FilterOption[]
  /** Value shown while the URL has no `?trend=`. */
  readonly fallback: string
}
