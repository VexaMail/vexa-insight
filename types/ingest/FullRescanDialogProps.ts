/**
 * Props for the full rescan confirmation dialog.
 */
export type FullRescanDialogProps = {
  /** Disables the trigger button (missing API key, job already running). */
  disabled?: boolean
  /** Called once the user confirms the full mailbox rescan. */
  onConfirm: () => void
}
