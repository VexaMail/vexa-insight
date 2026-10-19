import type { StatusTone } from '@/types/ui'
import type { LucideIcon } from 'lucide-react'
import { Check, Info, Minus, TriangleAlert, X } from 'lucide-react'

/** The glyph a pass/fail pill leads with, by tone. */
export const IP_VERDICT_ICONS: Record<StatusTone, LucideIcon> = {
  success: Check,
  danger: X,
  warning: TriangleAlert,
  info: Info,
  unknown: Minus,
  neutral: Minus,
}
