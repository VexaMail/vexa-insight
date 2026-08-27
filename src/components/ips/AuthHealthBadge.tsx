import type { AuthHealthBadgeProps } from './AuthHealthBadgeProps'
import { STATUS_CONFIG } from './statusConfig'

export default function AuthHealthBadge({
  status,
}: Readonly<AuthHealthBadgeProps>) {
  const config = STATUS_CONFIG[status]

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  )
}
