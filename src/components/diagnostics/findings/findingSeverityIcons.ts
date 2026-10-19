import type { DiagnosticsFindingSeverity } from '@/types/diagnostics'
import type { LucideIcon } from 'lucide-react'
import {
  CircleAlert,
  CircleCheck,
  CircleMinus,
  Info,
  TriangleAlert,
} from 'lucide-react'

export const findingSeverityIcons: Record<
  DiagnosticsFindingSeverity,
  LucideIcon
> = {
  critical: CircleAlert,
  high: CircleAlert,
  medium: TriangleAlert,
  low: Info,
  info: CircleMinus,
  pass: CircleCheck,
}
