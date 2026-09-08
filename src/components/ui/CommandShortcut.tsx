import type * as React from 'react'

import { cn } from '@/lib/utils'

export const CommandShortcut = ({
  className,
  ...props
}: Readonly<React.HTMLAttributes<HTMLSpanElement>>) => {
  return (
    <span
      className={cn(
        'text-muted-foreground ml-auto text-xs tracking-widest',
        className,
      )}
      {...props}
    />
  )
}
CommandShortcut.displayName = 'CommandShortcut'
