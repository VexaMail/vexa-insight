import type { StatusTone } from '@/types/ui'

/** Marker colours of the event stepper, by the stage's tone. */
export const STEP_RING_CLASSES: Record<StatusTone, string> = {
  success: 'bg-success/10 text-success ring-success/30',
  danger: 'bg-danger/10 text-danger ring-danger/30',
  warning: 'bg-warning/10 text-warning ring-warning/30',
  info: 'bg-info/10 text-info ring-info/30',
  unknown: 'bg-secondary text-unknown ring-border',
  neutral: 'bg-secondary text-muted-foreground ring-border',
}
