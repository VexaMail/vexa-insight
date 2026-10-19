import type { InsightSeverity } from '@/types/ai'
import type { LucideIcon } from 'lucide-react'
import {
  CircleAlert,
  CircleCheck,
  Info,
  OctagonAlert,
  TriangleAlert,
} from 'lucide-react'

/** The icon drawn before an insight's title, per severity. */
export const SEVERITY_ICONS: Record<InsightSeverity, LucideIcon> = {
  critical: OctagonAlert,
  high: CircleAlert,
  medium: TriangleAlert,
  low: Info,
  info: CircleCheck,
}
