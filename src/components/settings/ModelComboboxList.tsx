'use client'

import type { ModelComboboxListProps } from './ModelComboboxListProps'
import { ModelComboboxModelLabel } from './ModelComboboxModelLabel'
import { ModelComboboxOption } from './ModelComboboxOption'

/** The default entry, the no-match notice, and one row per matching model. */
export function ModelComboboxList({
  listRef,
  listboxId,
  models,
  query,
  value,
  highlightIndex,
  onSelect,
  onClear,
}: ModelComboboxListProps) {
  return (
    <div
      ref={listRef}
      id={listboxId}
      role="listbox"
      className="max-h-64 overflow-y-auto p-1"
    >
      <ModelComboboxOption
        selected={!value}
        highlighted={false}
        onSelect={onClear}
      >
        <span className="text-muted-foreground">Default (auto)</span>
      </ModelComboboxOption>

      {models.length === 0 && query !== '' && (
        <div className="text-muted-foreground px-2 py-6 text-center text-sm">
          No models match &quot;{query}&quot;
        </div>
      )}

      {models.map((m, i) => (
        <ModelComboboxOption
          key={m.id}
          selected={m.id === value}
          highlighted={i === highlightIndex}
          onSelect={() => {
            onSelect(m.id)
          }}
        >
          <ModelComboboxModelLabel model={m} />
        </ModelComboboxOption>
      ))}
    </div>
  )
}
