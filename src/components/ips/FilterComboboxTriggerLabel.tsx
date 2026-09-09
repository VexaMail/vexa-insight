import { Filter } from 'lucide-react'
import type { FilterComboboxTriggerLabelProps } from './FilterComboboxTriggerLabelProps'
import { renderFilterItemIcon } from './renderFilterItemIcon'

export function FilterComboboxTriggerLabel({
  selectedItem,
  placeholder,
  renderIcon,
}: FilterComboboxTriggerLabelProps) {
  return (
    <div className="flex items-center gap-2 truncate">
      <Filter className="text-muted-foreground h-4 w-4 shrink-0" />
      {selectedItem ? (
        <>
          {renderFilterItemIcon(selectedItem, renderIcon)}
          <span className="truncate">{selectedItem.label}</span>
        </>
      ) : (
        placeholder
      )}
    </div>
  )
}
