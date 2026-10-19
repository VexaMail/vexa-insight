import type { StatusTone } from '@/types/ui'

/** Line and bar colour of a sparkline, per tone. */
export const SPARKLINE_TONE_CLASSES: Record<StatusTone, string> = {
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  info: 'text-info',
  unknown: 'text-unknown',
  neutral: 'text-primary',
}
