import type { StatusTone } from '@/types/ui'
import type { LucideIcon } from 'lucide-react'
import { Check, CircleHelp, Info, Minus, TriangleAlert, X } from 'lucide-react'

/** The icon inside a result pill: a check for a pass, a cross for a fail. */
export const OUTCOME_TONE_ICONS: Record<StatusTone, LucideIcon> = {
  success: Check,
  warning: TriangleAlert,
  danger: X,
  info: Info,
  unknown: CircleHelp,
  neutral: Minus,
}
