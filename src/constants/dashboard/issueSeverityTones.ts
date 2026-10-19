import type { ActionSeverity, SeverityBadge } from '@/types/dashboard'

/** Badge tone and label of each issue severity. */
export const ISSUE_SEVERITY_TONES: Readonly<
  Record<ActionSeverity, SeverityBadge>
> = {
  critical: { tone: 'danger', label: 'Critical' },
  warning: { tone: 'warning', label: 'Warning' },
  info: { tone: 'info', label: 'Info' },
}
