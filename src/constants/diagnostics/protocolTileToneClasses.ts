import type { StatusTone } from '@/types/ui'

/** Background and border tint of a protocol tile, per state tone. */
export const protocolTileToneClasses: Record<StatusTone, string> = {
  success: 'border-success/25 bg-success/[0.06] hover:border-success/45',
  warning: 'border-warning/30 bg-warning/[0.07] hover:border-warning/50',
  danger: 'border-danger/30 bg-danger/[0.07] hover:border-danger/50',
  info: 'border-info/25 bg-info/[0.06] hover:border-info/45',
  unknown: 'border-unknown/25 bg-unknown/[0.06] hover:border-unknown/45',
  neutral: 'border-border bg-card hover:border-foreground/25',
}
