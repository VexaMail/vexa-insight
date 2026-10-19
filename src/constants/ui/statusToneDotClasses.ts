import type { StatusTone } from '@/types/ui'

export const STATUS_TONE_DOT_CLASSES: Record<StatusTone, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
  unknown: 'bg-unknown',
  neutral: 'bg-muted-foreground',
}
