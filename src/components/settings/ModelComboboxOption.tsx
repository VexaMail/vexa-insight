'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import type { ModelComboboxOptionProps } from './ModelComboboxOptionProps'

/** One listbox row: the check mark plus whatever the caller renders. */
export function ModelComboboxOption({
  selected,
  highlighted,
  onSelect,
  children,
}: ModelComboboxOptionProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      className={cn(
        'hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
        selected && 'bg-accent',
        highlighted && 'bg-accent/70',
      )}
      onClick={onSelect}
    >
      <Check
        className={cn(
          'h-4 w-4 shrink-0',
          selected ? 'opacity-100' : 'opacity-0',
        )}
      />
      {children}
    </button>
  )
}
