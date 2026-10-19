import type { StatusTone } from '@/types/ui'

export const STATUS_TONE_TEXT_CLASSES: Record<StatusTone, string> = {
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
  info: 'text-info',
  unknown: 'text-unknown',
  neutral: 'text-foreground',
}
