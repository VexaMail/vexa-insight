import type { StatusBadgeProps } from './StatusBadgeProps'
import { STATUS_ICONS } from './statusIcons'
import { STATUS_STYLES } from './statusStyles'

export function StatusBadge({ status, label }: Readonly<StatusBadgeProps>) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      <span aria-hidden="true">{STATUS_ICONS[status]}</span>
      <span className="sr-only">Status:</span>
      {label}
    </span>
  )
}
