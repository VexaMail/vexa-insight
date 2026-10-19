import type { StatusTone } from '@/types/ui'

/** Tinted square behind a tile's icon, per tone. */
export const ICON_TILE_CLASSES: Record<StatusTone, string> = {
  success: 'bg-success/12 text-success ring-success/20',
  warning: 'bg-warning/12 text-warning ring-warning/25',
  danger: 'bg-danger/12 text-danger ring-danger/25',
  info: 'bg-info/12 text-info ring-info/20',
  unknown: 'bg-unknown/12 text-unknown ring-unknown/20',
  neutral: 'bg-primary/10 text-primary ring-primary/20',
}
