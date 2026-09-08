export type ModelComboboxTriggerProps = {
  readonly isOpen: boolean
  readonly isLoading: boolean
  readonly listboxId: string
  readonly label: string
  readonly hasValue: boolean
  readonly savedModelMissing: boolean
  readonly onToggle: () => void
}
