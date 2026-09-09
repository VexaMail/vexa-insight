import type { DiagnosticsSectionId } from '@/types/diagnostics'

/** Returns a new set with `id` added when absent and removed when present. */
export function toggleSectionId(
  openIds: ReadonlySet<DiagnosticsSectionId>,
  id: DiagnosticsSectionId,
): ReadonlySet<DiagnosticsSectionId> {
  const next = new Set(openIds)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
  }
  return next
}
