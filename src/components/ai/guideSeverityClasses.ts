import type { DiagnosticsAdminGuide } from '@/types/diagnostics'

/** Border and background tint of an admin guide card by severity. */
export function guideSeverityClasses(
  severity: DiagnosticsAdminGuide['severity'],
): string {
  if (severity === 'critical') return 'border-danger/30 bg-danger/5'
  if (severity === 'high') return 'border-danger/25 bg-danger/5'
  if (severity === 'medium') return 'border-warning/35 bg-warning/5'
  return 'border-info/30 bg-info/5'
}
