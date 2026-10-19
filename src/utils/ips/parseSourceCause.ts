import { SOURCE_CAUSE_ORDER } from '@/constants/ips'
import type { SourceCause } from '@/types/ips'

/** The `?cause=` filter of the sources list, or null for every source. */
export function parseSourceCause(
  value: string | string[] | undefined,
): SourceCause | null {
  const raw = Array.isArray(value) ? value[0] : value
  return SOURCE_CAUSE_ORDER.find((cause) => cause === raw) ?? null
}
