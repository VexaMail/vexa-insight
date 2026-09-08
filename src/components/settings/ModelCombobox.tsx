'use client'

import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui'
import { useModelCombobox } from '../../hooks/settings/useModelCombobox'
import { ModelComboboxList } from './ModelComboboxList'
import type { ModelComboboxProps } from './ModelComboboxProps'
import { ModelComboboxSearch } from './ModelComboboxSearch'
import { ModelComboboxTrigger } from './ModelComboboxTrigger'
import { MODEL_LISTBOX_ID } from './modelListboxId'

/**
 * Searchable combobox for selecting an AI model from a provider.
 * Uses Radix Popover with inline search and keyboard navigation.
 */
export function ModelCombobox({
  models,
  value,
  isLoading,
  error,
  savedModelMissing,
  onChange,
}: Readonly<ModelComboboxProps>) {
  const {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    filtered,
    highlightIndex,
    displayLabel,
    inputRef,
    listRef,
    handleSelect,
    handleClear,
    handleKeyDown,
  } = useModelCombobox(models, value, onChange)

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="ai-model-combobox" className="text-sm font-medium">
        Model{' '}
        <span className="text-muted-foreground font-normal">(optional)</span>
      </label>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverAnchor asChild>
          <ModelComboboxTrigger
            isOpen={isOpen}
            isLoading={isLoading}
            listboxId={MODEL_LISTBOX_ID}
            label={savedModelMissing ? `${value} (unavailable)` : displayLabel}
            hasValue={Boolean(value)}
            savedModelMissing={savedModelMissing}
            onToggle={() => {
              setIsOpen(!isOpen)
            }}
          />
        </PopoverAnchor>

        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          align="start"
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            inputRef.current?.focus()
          }}
        >
          <ModelComboboxSearch
            inputRef={inputRef}
            query={query}
            onQueryChange={setQuery}
            onKeyDown={handleKeyDown}
          />
          <ModelComboboxList
            listRef={listRef}
            listboxId={MODEL_LISTBOX_ID}
            models={filtered}
            query={query}
            value={value}
            highlightIndex={highlightIndex}
            onSelect={handleSelect}
            onClear={handleClear}
          />
          <div className="border-border/50 text-muted-foreground border-t px-3 py-1.5 text-xs">
            {filtered.length} of {models.length} models
          </div>
        </PopoverContent>
      </Popover>

      {error != null && error !== '' && (
        <p className="text-warning text-xs">{error}</p>
      )}
    </div>
  )
}
