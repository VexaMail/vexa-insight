import { ISSUE_ROW_GRID } from '@/constants/dashboard'
import { cn } from '@/lib/utils'
import type { IssueRowHeaderProps } from './IssueRowHeaderProps'

/** Column labels of an issue list, shown once rows become columns. */
export function IssueRowHeader({ impactLabel }: Readonly<IssueRowHeaderProps>) {
  return (
    <div
      aria-hidden
      className={cn(
        'text-muted-foreground border-border hidden gap-x-3 border-b px-4 py-2 text-[11px] font-medium @xl:grid',
        ISSUE_ROW_GRID,
      )}
    >
      <span>Severity</span>
      <span>Domain / source</span>
      <span>Issue summary</span>
      <span className="text-right whitespace-nowrap">{impactLabel}</span>
      <span>Last seen</span>
      <span />
      <span className="hidden @4xl:block" />
    </div>
  )
}
