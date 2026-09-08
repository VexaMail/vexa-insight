'use client'

import type { ModelComboboxModelLabelProps } from './ModelComboboxModelLabelProps'

/** Model name, with the raw id underneath when the two differ. */
export function ModelComboboxModelLabel({
  model,
}: ModelComboboxModelLabelProps) {
  return (
    <div className="flex min-w-0 flex-col items-start">
      <span className="truncate">{model.name}</span>
      {model.name !== model.id && (
        <span className="text-muted-foreground truncate text-xs">
          {model.id}
        </span>
      )}
    </div>
  )
}
