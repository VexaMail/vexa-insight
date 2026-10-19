import type { DomainSourceRow } from '@/types/domains'

/** The `limit` sources with the most messages, largest first. */
export function topSourcesByVolume(
  rows: readonly DomainSourceRow[],
  limit: number,
): DomainSourceRow[] {
  return [...rows].sort((a, b) => b.count - a.count).slice(0, limit)
}
