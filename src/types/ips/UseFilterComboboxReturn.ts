export type UseFilterComboboxReturn = {
  readonly open: boolean
  readonly setOpen: (open: boolean) => void
  /** Reports the chosen value and closes the list. */
  readonly select: (value: string) => void
}
