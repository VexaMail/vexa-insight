import { cn } from '@/lib/utils'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import type { ChevronProps } from 'react-day-picker'

export function CalendarChevron({
  className,
  orientation,
  ...props
}: Readonly<ChevronProps>) {
  if (orientation === 'left') {
    return <ChevronLeftIcon className={cn('size-4', className)} {...props} />
  }

  if (orientation === 'right') {
    return <ChevronRightIcon className={cn('size-4', className)} {...props} />
  }

  return <ChevronDownIcon className={cn('size-4', className)} {...props} />
}
