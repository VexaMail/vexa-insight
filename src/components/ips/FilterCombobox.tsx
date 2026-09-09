'use client'

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui'
import { useFilterCombobox } from '@/hooks/ips'
import { ChevronsUpDown } from 'lucide-react'
import { FilterComboboxOption } from './FilterComboboxOption'
import type { FilterComboboxProps } from './FilterComboboxProps'
import { FilterComboboxTriggerLabel } from './FilterComboboxTriggerLabel'
import { renderFilterItemIcon } from './renderFilterItemIcon'

export function FilterCombobox({
  value,
  onChange,
  items,
  placeholder,
  emptyText,
  renderIcon,
}: FilterComboboxProps) {
  const { open, setOpen } = useFilterCombobox()
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
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
          />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              <FilterComboboxOption
                commandValue="All"
                selected={value === 'All'}
                onSelect={() => {
                  onChange('All')
                  setOpen(false)
                }}
              >
                All
              </FilterComboboxOption>
              {items.map((item) => (
                <FilterComboboxOption
                  key={item.value}
                  commandValue={item.label}
                  selected={value === item.value}
                  onSelect={() => {
                    onChange(item.value)
                    setOpen(false)
                  }}
                >
                  {renderFilterItemIcon(item, renderIcon)}
                  <span className="truncate pl-1">{item.label}</span>
                </FilterComboboxOption>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
