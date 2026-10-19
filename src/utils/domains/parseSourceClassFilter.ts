import { SOURCE_CLASS_OPTIONS } from '@/constants/domains'
import type { SourceClassFilter } from '@/types/domains'

/** The `?class=` value as a filter; anything unknown shows every source. */
export function parseSourceClassFilter(
  value: string | null | undefined,
): SourceClassFilter {
  const option = SOURCE_CLASS_OPTIONS.find((o) => o.value === value)
  return option?.value ?? 'all'
}
