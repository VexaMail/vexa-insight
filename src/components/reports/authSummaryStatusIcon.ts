import { CircleCheck, Info, TriangleAlert } from 'lucide-react'

export const AUTH_SUMMARY_STATUS_ICON = {
  healthy: CircleCheck,
  degraded: Info,
  critical: TriangleAlert,
} as const
