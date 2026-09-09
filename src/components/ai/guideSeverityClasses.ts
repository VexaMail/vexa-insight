import type { DiagnosticsAdminGuide } from '@/types/diagnostics'

/** Border and background tint of an admin guide card by severity. */
export function guideSeverityClasses(
  severity: DiagnosticsAdminGuide['severity'],
): string {
  if (severity === 'critical') return 'border-red-500/30 bg-red-500/5'
  if (severity === 'high') return 'border-orange-500/30 bg-orange-500/5'
  if (severity === 'medium') return 'border-amber-500/30 bg-amber-500/5'
  return 'border-emerald-500/30 bg-emerald-500/5'
}
