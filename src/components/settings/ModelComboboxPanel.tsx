'use client'

import { PopoverContent } from '@/components/ui'
import { ModelComboboxList } from './ModelComboboxList'
import type { ModelComboboxPanelProps } from './ModelComboboxPanelProps'
import { ModelComboboxSearch } from './ModelComboboxSearch'
import { MODEL_LISTBOX_ID } from './modelListboxId'

/** The dropdown body: search box, filtered list and the result count. */
export function ModelComboboxPanel({
  combobox,
  models,
  value,
}: ModelComboboxPanelProps) {
  return (
    <PopoverContent
      className="w-(--radix-popover-trigger-width) p-0"
      align="start"
      onOpenAutoFocus={(e) => {
        e.preventDefault()
        combobox.inputRef.current?.focus()
      }}
    >
      <ModelComboboxSearch
        inputRef={combobox.inputRef}
        query={combobox.query}
        onQueryChange={combobox.setQuery}
        onKeyDown={combobox.handleKeyDown}
      />
      <ModelComboboxList
        listRef={combobox.listRef}
        listboxId={MODEL_LISTBOX_ID}
        models={combobox.filtered}
        query={combobox.query}
        value={value}
        highlightIndex={combobox.highlightIndex}
        onSelect={combobox.handleSelect}
        onClear={combobox.handleClear}
      />
      <div className="border-border/50 text-muted-foreground border-t px-3 py-1.5 text-xs">
        {combobox.filtered.length} of {models.length} models
      </div>
    </PopoverContent>
  )
}
