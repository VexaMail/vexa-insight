import type { DomainSourceRow, SourceClassFilter } from '@/types/domains'

/** Whether a source belongs to the class the sources filter asks for. */
export function matchesSourceClass(
  row: DomainSourceRow,
  filter: SourceClassFilter,
): boolean {
  if (filter === 'all') return true
  if (row.failing <= 0) return false
  return filter === 'failing' || row.kind === filter
}
