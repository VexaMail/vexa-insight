'use client'

import { Command as CommandPrimitive } from 'cmdk'
import * as React from 'react'

import { cn } from '@/lib/utils'

export const Command = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'bg-popover text-popover-foreground flex h-full w-full flex-col overflow-hidden rounded-md',
      className,
    )}
    {...props}
  />
))
Command.displayName = CommandPrimitive.displayName
