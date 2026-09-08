'use client'

import { Search, X } from 'lucide-react'
import type { ModelComboboxSearchProps } from './ModelComboboxSearchProps'

export function ModelComboboxSearch({
  inputRef,
  query,
  onQueryChange,
  onKeyDown,
}: ModelComboboxSearchProps) {
  return (
    <div className="border-border/50 flex items-center gap-2 border-b px-3 py-2">
      <Search className="text-muted-foreground h-4 w-4 shrink-0" />
      <input
        ref={inputRef}
        type="text"
        className="placeholder:text-muted-foreground h-8 w-full bg-transparent text-sm outline-none"
        placeholder="Search models…"
        value={query}
        onChange={(e) => {
          onQueryChange(e.target.value)
        }}
        onKeyDown={onKeyDown}
      />
      {query !== '' && (
        <button
          type="button"
          onClick={() => {
            onQueryChange('')
          }}
          className="text-muted-foreground hover:text-foreground shrink-0"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}
