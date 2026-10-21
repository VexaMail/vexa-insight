import type { PublicCheckBadgeProps } from '../../types/public-check/PublicCheckBadgeProps'

export function PublicCheckBadge({ status }: Readonly<PublicCheckBadgeProps>) {
  if (status === 'pass')
    return (
      <span className="text-success bg-success/10 rounded-md px-2.5 py-1 text-xs font-medium">
        ✓ Record check passed
      </span>
    )
  if (status === 'info')
    return (
      <span className="text-info bg-info/10 rounded-md px-2.5 py-1 text-xs font-medium">
        ⓘ Policy information
      </span>
    )
  if (status === 'attention')
    return (
      <span className="text-warning bg-warning/10 rounded-md px-2.5 py-1 text-xs font-medium">
        ! Needs attention
      </span>
    )
  return (
    <span className="text-muted-foreground bg-muted rounded-md px-2.5 py-1 text-xs font-medium">
      — Not verified
    </span>
  )
}
