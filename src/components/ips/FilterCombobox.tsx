'use client'

import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui'
import { useFilterCombobox } from '@/hooks/ips'
import { ChevronsUpDown } from 'lucide-react'
import { FilterComboboxList } from './FilterComboboxList'
import type { FilterComboboxProps } from './FilterComboboxProps'
import { FilterComboboxTriggerLabel } from './FilterComboboxTriggerLabel'

export function FilterCombobox({
  value,
  onChange,
  items,
  placeholder,
  emptyText,
  renderIcon,
}: FilterComboboxProps) {
  const { open, setOpen, select } = useFilterCombobox(onChange)
  const selectedItem = items.find((item) => item.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="bg-card border-border/50 h-9 w-[240px] justify-between overflow-hidden shadow-sm transition-colors"
        >
          <FilterComboboxTriggerLabel
            selectedItem={selectedItem}
            placeholder={placeholder}
            renderIcon={renderIcon}
          />
          <ChevronsUpDown className="text-muted-foreground/70 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0" align="start">
        <FilterComboboxList
          value={value}
          items={items}
          placeholder={placeholder}
          emptyText={emptyText}
          renderIcon={renderIcon}
          onSelect={select}
        />
      </PopoverContent>
    </Popover>
  )
}
