'use client'

import { useCommandState } from 'cmdk'
import * as React from 'react'

/**
 * Renders the "no results" message as a disabled option.
 *
 * cmdk's own `Command.Empty` uses `role="presentation"`, which leaves the
 * surrounding `role="listbox"` without a single `option` child and trips axe's
 * `aria-required-children` (wcag2a). Dropping the listbox instead is worse: the
 * input's `aria-controls` would then dangle.
 *
 * cmdk drives keyboard navigation off the `[cmdk-item]` attribute, which this
 * element does not carry, so it stays unreachable by the arrow keys.
 */
export const CommandEmpty = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'>
>((props, ref) => {
  const isEmpty = useCommandState((state) => state.filtered.count === 0)

  if (!isEmpty) return null

  return (
    <div
      ref={ref}
      className="py-6 text-center text-sm"
      {...props}
      cmdk-empty=""
      role="option"
      aria-disabled="true"
      aria-selected={false}
    />
  )
})
CommandEmpty.displayName = 'CommandEmpty'
