'use client'

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui'
import { useFilterCombobox } from '@/hooks/ips'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, Filter } from 'lucide-react'
import type { FilterComboboxProps } from './FilterComboboxProps'

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
          <div className="flex items-center gap-2 truncate">
            <Filter className="text-muted-foreground h-4 w-4 shrink-0" />
            {selectedItem ? (
              <>
                {selectedItem.code !== undefined &&
                  selectedItem.code !== '' &&
                  renderIcon !== undefined &&
                  renderIcon(selectedItem.code)}
                <span className="truncate">{selectedItem.label}</span>
              </>
            ) : (
              placeholder
            )}
          </div>
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
              <CommandItem
                value="All"
                onSelect={() => {
                  onChange('All')
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4 shrink-0',
                    value === 'All' ? 'opacity-100' : 'opacity-0',
                  )}
                />
                All
              </CommandItem>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.label}
                  onSelect={() => {
                    onChange(item.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4 shrink-0',
                      value === item.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {item.code !== undefined &&
                    item.code !== '' &&
                    renderIcon !== undefined &&
                    renderIcon(item.code)}
                  <span className="truncate pl-1">{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
