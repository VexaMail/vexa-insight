'use client'

import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown, Loader2, Search, X } from 'lucide-react'
import { useModelCombobox } from '../../hooks/settings/useModelCombobox'
import type { ModelComboboxProps } from './ModelComboboxProps'

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

  const listboxId = 'ai-model-listbox'

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="ai-model-combobox" className="text-sm font-medium">
        Model{' '}
        <span className="text-muted-foreground font-normal">(optional)</span>
      </label>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverAnchor asChild>
          <button
            id="ai-model-combobox"
            type="button"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-haspopup="listbox"
            disabled={isLoading}
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            className={cn(
              'border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              savedModelMissing && 'border-warning',
            )}
          >
            <span
              className={cn(
                'truncate',
                !value && 'text-muted-foreground',
                savedModelMissing && 'text-warning',
              )}
            >
              {savedModelMissing ? `${value} (unavailable)` : displayLabel}
            </span>
            <span className="flex items-center gap-1">
              {isLoading ? (
                <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
              ) : null}
              <ChevronsUpDown className="text-muted-foreground h-4 w-4 shrink-0 opacity-50" />
            </span>
          </button>
        </PopoverAnchor>

        <PopoverContent
          className="w-(--radix-popover-trigger-width) p-0"
          align="start"
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            inputRef.current?.focus()
          }}
        >
          {/* Search input */}
          <div className="border-border/50 flex items-center gap-2 border-b px-3 py-2">
            <Search className="text-muted-foreground h-4 w-4 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              className="placeholder:text-muted-foreground h-8 w-full bg-transparent text-sm outline-none"
              placeholder="Search models…"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
              }}
              onKeyDown={handleKeyDown}
            />
            {query !== '' && (
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                }}
                className="text-muted-foreground hover:text-foreground shrink-0"
              >
                <X className="h-3 w-3" />
              </button>
            )}
          </div>

          {/* Model list */}
          <div
            ref={listRef}
            id={listboxId}
            role="listbox"
            className="max-h-64 overflow-y-auto p-1"
          >
            {/* Default option */}
            <button
              type="button"
              role="option"
              aria-selected={!value}
              className={cn(
                'hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
                !value && 'bg-accent',
              )}
              onClick={() => {
                handleClear()
              }}
            >
              <Check
                className={cn(
                  'h-4 w-4 shrink-0',
                  value ? 'opacity-0' : 'opacity-100',
                )}
              />
              <span className="text-muted-foreground">Default (auto)</span>
            </button>

            {filtered.length === 0 && query !== '' && (
              <div className="text-muted-foreground px-2 py-6 text-center text-sm">
                No models match &quot;{query}&quot;
              </div>
            )}

            {filtered.map((m, i) => (
              <button
                key={m.id}
                type="button"
                role="option"
                aria-selected={m.id === value}
                className={cn(
                  'hover:bg-accent hover:text-accent-foreground flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm',
                  m.id === value && 'bg-accent',
                  i === highlightIndex && 'bg-accent/70',
                )}
                onClick={() => {
                  handleSelect(m.id)
                }}
              >
                <Check
                  className={cn(
                    'h-4 w-4 shrink-0',
                    m.id === value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                <div className="flex min-w-0 flex-col items-start">
                  <span className="truncate">{m.name}</span>
                  {m.name !== m.id && (
                    <span className="text-muted-foreground truncate text-xs">
                      {m.id}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Footer with count */}
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
