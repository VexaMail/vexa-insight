import type * as React from 'react'

import { cn } from '@/lib/utils'

export const DialogHeader = ({
  className,
  ...props
}: Readonly<React.HTMLAttributes<HTMLDivElement>>) => (
  <div
    className={cn(
      'flex flex-col space-y-1.5 text-center sm:text-left',
      className,
    )}
    {...props}
  />
)
DialogHeader.displayName = 'DialogHeader'
