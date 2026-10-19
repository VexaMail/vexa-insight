import { cn } from '@/lib/utils'
import type { TabNavScrollerProps } from '@/types/ui'

/**
 * A horizontally scrolling tab strip with a fade on each side that has more
 * tabs, so a phone shows that the row continues. The fades follow the scroll
 * position where the browser supports scroll timelines; elsewhere the end
 * fade stays on below `md`.
 */
export function TabNavScroller({
  children,
  className,
}: Readonly<TabNavScrollerProps>) {
  return (
    <div
      className={cn(
        'border-border relative -mx-1 border-b [timeline-scope:--tabnav]',
        className,
      )}
    >
      <div className="[scrollbar-width:none] overflow-x-auto overscroll-x-contain [scroll-timeline:--tabnav_x] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
      <span aria-hidden className="tabnav-fade tabnav-fade-start" />
      <span aria-hidden className="tabnav-fade tabnav-fade-end" />
    </div>
  )
}
