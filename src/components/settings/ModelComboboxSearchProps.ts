import type { KeyboardEvent, RefObject } from 'react'

export type ModelComboboxSearchProps = {
  readonly inputRef: RefObject<HTMLInputElement | null>
  readonly query: string
  readonly onQueryChange: (query: string) => void
  readonly onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
}
