import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/ui'
import type { FilterComboboxListProps } from './FilterComboboxListProps'
import { FilterComboboxOption } from './FilterComboboxOption'
import { renderFilterItemIcon } from './renderFilterItemIcon'

/** The searchable option list: "All" first, then every item. */
export function FilterComboboxList({
  value,
  items,
  placeholder,
  emptyText,
  renderIcon,
  onSelect,
}: FilterComboboxListProps) {
  return (
    <Command>
      <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        <CommandGroup>
          <FilterComboboxOption
            commandValue="All"
            selected={value === 'All'}
            onSelect={() => {
              onSelect('All')
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
                onSelect(item.value)
              }}
            >
              {renderFilterItemIcon(item, renderIcon)}
              <span className="truncate pl-1">{item.label}</span>
            </FilterComboboxOption>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
