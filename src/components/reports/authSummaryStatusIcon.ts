import { AlertTriangle, CheckCircle, Info } from 'lucide-react'

export const AUTH_SUMMARY_STATUS_ICON = {
  healthy: CheckCircle,
  degraded: Info,
  critical: AlertTriangle,
} as const
