'use client'

import { cn } from '@/lib/utils'
import { ChevronsUpDown, Loader2 } from 'lucide-react'
import type { ModelComboboxTriggerProps } from './ModelComboboxTriggerProps'

/** The closed state of the combobox, and its popover anchor. */
export function ModelComboboxTrigger({
  isOpen,
  isLoading,
  listboxId,
  label,
  hasValue,
  savedModelMissing,
  onToggle,
}: ModelComboboxTriggerProps) {
  return (
    <button
      id="ai-model-combobox"
      type="button"
      role="combobox"
      aria-expanded={isOpen}
      aria-controls={listboxId}
      aria-haspopup="listbox"
      disabled={isLoading}
      onClick={onToggle}
      className={cn(
        'border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        savedModelMissing && 'border-warning',
      )}
    >
      <span
        className={cn(
          'truncate',
          !hasValue && 'text-muted-foreground',
          savedModelMissing && 'text-warning',
        )}
      >
        {label}
      </span>
      <span className="flex items-center gap-1">
        {isLoading ? (
          <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
        ) : null}
        <ChevronsUpDown className="text-muted-foreground h-4 w-4 shrink-0 opacity-50" />
      </span>
    </button>
  )
}
