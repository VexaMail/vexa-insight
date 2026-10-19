import type { StatusTone } from '@/types/ui'

/** Pill colours per tone; text stays at full token colour for contrast. */
export const STATUS_TONE_CLASSES: Record<StatusTone, string> = {
  success: 'border-success/30 bg-success/10 text-success',
  warning: 'border-warning/35 bg-warning/10 text-warning',
  danger: 'border-danger/35 bg-danger/10 text-danger',
  info: 'border-info/30 bg-info/10 text-info',
  unknown: 'border-unknown/30 bg-unknown/10 text-unknown',
  neutral: 'border-border bg-secondary text-muted-foreground',
}
