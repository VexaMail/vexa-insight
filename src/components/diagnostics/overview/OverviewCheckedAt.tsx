import { formatRunAt } from '@/utils/format'
import type { DiagnosticsOverviewRowProps } from './DiagnosticsOverviewRowProps'

/** When the domain's stored DNS run was made, or a dash before the first. */
export function OverviewCheckedAt({
  row,
}: Readonly<DiagnosticsOverviewRowProps>) {
  if (!row.check) return <span className="text-muted-foreground">—</span>
  return (
    <time dateTime={row.check.checkedAt} className="font-mono">
      {formatRunAt(new Date(row.check.checkedAt))}
    </time>
  )
}
