import { CommandItem } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import type { FilterComboboxOptionProps } from './FilterComboboxOptionProps'

export function FilterComboboxOption({
  commandValue,
  selected,
  onSelect,
  children,
}: FilterComboboxOptionProps) {
  return (
    <CommandItem value={commandValue} onSelect={onSelect}>
      <Check
        className={cn(
          'mr-2 h-4 w-4 shrink-0',
          selected ? 'opacity-100' : 'opacity-0',
        )}
      />
      {children}
    </CommandItem>
  )
}
