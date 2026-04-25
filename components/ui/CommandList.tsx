'use client'

import { Command as CommandPrimitive } from 'cmdk'
import * as React from 'react'

import { cn } from '@/lib/utils'

export const CommandList = React.forwardRef<
  React.ComponentRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn('max-h-[300px] overflow-x-hidden overflow-y-auto', className)}
    {...props}
  />
))
CommandList.displayName = CommandPrimitive.List.displayName
