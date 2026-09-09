export type ModelComboboxOpenState = {
  readonly isOpen: boolean
  /** Closing this way also clears the query and highlight. */
  readonly setIsOpen: (open: boolean) => void
  /** Closes the list without touching the query or highlight. */
  readonly closeList: () => void
  readonly highlightIndex: number
  readonly setHighlightIndex: (update: (prev: number) => number) => void
  readonly setQuery: (q: string) => void
}
