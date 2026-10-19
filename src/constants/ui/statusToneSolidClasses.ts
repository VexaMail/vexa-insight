import type { StatusTone } from '@/types/ui'

/** Filled badge colours per tone, for severities and verdicts that must pop. */
export const STATUS_TONE_SOLID_CLASSES: Record<StatusTone, string> = {
  success: 'border-transparent bg-success text-success-foreground',
  warning: 'border-transparent bg-warning text-warning-foreground',
  danger: 'border-transparent bg-danger text-danger-foreground',
  info: 'border-transparent bg-info text-info-foreground',
  unknown: 'border-transparent bg-unknown text-unknown-foreground',
  neutral: 'border-transparent bg-muted-foreground/70 text-background',
}
