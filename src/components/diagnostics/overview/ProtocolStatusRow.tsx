import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react'
import type { ProtocolStatusRowProps } from './ProtocolStatusRowProps'

export function ProtocolStatusRow({
  protocol,
  status,
  detail,
}: Readonly<ProtocolStatusRowProps>) {
  const statusConfig = {
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
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="hover:bg-muted/50 flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors">
      <span className="text-foreground text-sm font-medium">{protocol}</span>
      <div className="flex items-center gap-2">
        {detail !== undefined && detail !== '' && (
          <span className="text-muted-foreground hidden text-xs sm:inline">
            {detail}
          </span>
        )}
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.className} ${config.bgClassName}`}
        >
          <Icon className="h-3.5 w-3.5" />
          {config.label}
        </span>
      </div>
    </div>
  )
}
