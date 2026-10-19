import type { DiagnosticsFindingSeverity } from '@/types/diagnostics'
import type { LucideIcon } from 'lucide-react'
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  MinusCircle,
  XCircle,
} from 'lucide-react'

export const findingSeverityIcons: Record<
  DiagnosticsFindingSeverity,
  LucideIcon
> = {
  critical: XCircle,
  high: XCircle,
  medium: AlertTriangle,
  low: Info,
  info: MinusCircle,
  pass: CheckCircle2,
}
