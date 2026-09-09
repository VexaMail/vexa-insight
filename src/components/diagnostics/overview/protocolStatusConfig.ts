import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'

/** Icon, label and colours for each protocol status shown in the overview rows. */
export const protocolStatusConfig = {
  valid: {
    icon: CheckCircle2,
    label: 'Valid',
    className: 'text-emerald-500',
    bgClassName: 'bg-emerald-500/10',
  },
  invalid: {
    icon: AlertTriangle,
    label: 'Invalid',
    className: 'text-amber-500',
    bgClassName: 'bg-amber-500/10',
  },
  'not-found': {
    icon: XCircle,
    label: 'Not Found',
    className: 'text-red-500',
    bgClassName: 'bg-red-500/10',
  },
} as const
