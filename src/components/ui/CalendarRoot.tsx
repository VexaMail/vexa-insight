import { cn } from '@/lib/utils'
import type { RootProps } from 'react-day-picker'

export function CalendarRoot({ className, rootRef, ...props }: RootProps) {
  return (
    <div
      data-slot="calendar"
      ref={rootRef}
      className={cn(className)}
      {...props}
    />
  )
}
