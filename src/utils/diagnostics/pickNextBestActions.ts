import type { DiagnosticsAdminGuide } from '@/types/diagnostics'

/**
 * The three most urgent runbook items. The overall-score summary is left out:
 * it restates the score instead of naming a change to make.
 */
export function pickNextBestActions(
  guides: readonly DiagnosticsAdminGuide[],
): DiagnosticsAdminGuide[] {
  return guides.filter((guide) => guide.id !== 'low-overall-score').slice(0, 3)
}
